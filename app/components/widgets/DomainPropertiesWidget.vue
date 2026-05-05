<script setup lang="ts">
import type { PrezDataItem } from "prez-lib";
import { useSparqlSelect } from "~/composables/useSparql";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
import { CircleHelp } from "lucide-vue-next";

const QUERY = `
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
SELECT DISTINCT ?property ?label ?range ?rangeLabel WHERE {
  ?property rdfs:domain <__SUBJECT__> .
  OPTIONAL { ?property rdfs:label|skos:prefLabel ?label }
  OPTIONAL {
    ?property rdfs:range ?range .
    OPTIONAL { ?range rdfs:label|skos:prefLabel ?rangeLabel }
  }
}
ORDER BY ?property ?range
`.trim();

interface LangCandidate {
  value: string;
  lang: string;
}

interface PropertyRow {
  uri: string;
  label: string;
  ranges: { uri: string; label: string }[];
}

const props = defineProps({
  data: {
    type: Object as PropType<PrezDataItem>,
  },
});

const apiEndpoint = useGetPrezAPIEndpoint();
const properties = ref<PropertyRow[]>([]);

const objectUrl = (uri: string) => {
  const base = apiEndpoint.endsWith('/') ? apiEndpoint.slice(0, -1) : apiEndpoint;
  return `${base}/object?uri=${encodeURIComponent(uri)}`;
};

const localName = (uri: string) => uri.replace(/.*[#/]/, '');

// Returns a numeric score for a language tag given the browser's preferred languages.
// Higher = better. Priority: browser lang > English > no lang tag > anything else.
const langScore = (lang: string, browserLangs: readonly string[]): number => {
  if (!lang) return 2;
  const l = lang.toLowerCase();
  for (let i = 0; i < browserLangs.length; i++) {
    const bl = browserLangs[i]!.toLowerCase();
    // Match if same base language (e.g. "en" matches "en-GB")
    if (l === bl || l.split('-')[0] === bl.split('-')[0]!) {
      return 10 - i * 0.01;
    }
  }
  if (l === 'en' || l.startsWith('en-')) return 3;
  return 1;
};

const pickBestLabel = (candidates: LangCandidate[], browserLangs: readonly string[]): string | undefined => {
  if (!candidates.length) return undefined;
  return candidates.reduce((best, c) =>
    langScore(c.lang, browserLangs) > langScore(best.lang, browserLangs) ? c : best
  ).value;
};

watchEffect(async () => {
  const subjectUri = props.data?.data?.value;
  properties.value = [];
  if (!subjectUri) return;

  const browserLangs: readonly string[] = typeof navigator !== 'undefined'
    ? navigator.languages
    : ['en'];

  const q = QUERY.replaceAll('__SUBJECT__', subjectUri);
  const bindings = (await useSparqlSelect(q))?.results?.bindings || [];

  // propLabels: property URI → label candidates
  const propLabels = new Map<string, LangCandidate[]>();
  // propRangeLabels: property URI → range URI → label candidates
  const propRangeLabels = new Map<string, Map<string, LangCandidate[]>>();

  for (const b of bindings) {
    const propUri: string = b.property.value;

    if (!propLabels.has(propUri)) propLabels.set(propUri, []);
    if (b.label) {
      propLabels.get(propUri)!.push({ value: b.label.value, lang: b.label['xml:lang'] ?? '' });
    }

    if (b.range) {
      if (!propRangeLabels.has(propUri)) propRangeLabels.set(propUri, new Map());
      const rangeMap = propRangeLabels.get(propUri)!;
      const rangeUri: string = b.range.value;
      if (!rangeMap.has(rangeUri)) rangeMap.set(rangeUri, []);
      if (b.rangeLabel) {
        rangeMap.get(rangeUri)!.push({ value: b.rangeLabel.value, lang: b.rangeLabel['xml:lang'] ?? '' });
      }
    }
  }

  properties.value = [...propLabels.entries()]
    .map(([uri, labelCandidates]) => {
      const rangeMap = propRangeLabels.get(uri);
      const ranges = rangeMap
        ? [...rangeMap.entries()].map(([rangeUri, rangeLabelCandidates]) => ({
            uri: rangeUri,
            label: pickBestLabel(rangeLabelCandidates, browserLangs) ?? localName(rangeUri),
          }))
        : [];
      return {
        uri,
        label: pickBestLabel(labelCandidates, browserLangs) ?? localName(uri),
        ranges,
      };
    })
    .sort((a, b) => a.label.localeCompare(b.label));
});
</script>

<template>
  <div v-if="properties.length" class="domain-properties-widget">
    <Card class="bg-slate-50 dark:bg-slate-900/50 gap-3">
      <CardHeader>
        <CardTitle class="flex items-center gap-1.5">
          Properties of this class
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger as-child>
                <CircleHelp class="size-4 text-muted-foreground cursor-help shrink-0" />
              </TooltipTrigger>
              <TooltipContent class="max-w-64">
                Properties that declare this class as their <code>rdfs:domain</code>, meaning they are intended to be used on instances of this class.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="flex flex-col gap-2 text-sm">
          <template v-for="(prop, i) in properties" :key="prop.uri">
            <dl class="flex items-center justify-between gap-4">
              <dt>
                <a
                  :href="objectUrl(prop.uri)"
                  target="_blank"
                  class="text-primary underline-offset-4 hover:underline"
                  :title="prop.uri"
                >{{ prop.label }}</a>
              </dt>
              <dd v-if="prop.ranges.length" class="text-muted-foreground text-right">
                <span class="font-medium">Types: </span>
                <template v-for="(range, j) in prop.ranges" :key="range.uri">
                  <a
                    :href="objectUrl(range.uri)"
                    target="_blank"
                    class="underline-offset-4 hover:underline"
                    :title="range.uri"
                  >{{ range.label }}</a><span v-if="j < prop.ranges.length - 1">, </span>
                </template>
              </dd>
            </dl>
            <Separator v-if="i < properties.length - 1" />
          </template>
        </div>
      </CardContent>
    </Card>
  </div>
</template>