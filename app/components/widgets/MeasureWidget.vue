<script setup lang="ts">
import type {PrezDataItem, PrezTerm} from "prez-lib";
import {useSparqlSelect} from "~/composables/useSparql";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "~/components/ui/accordion";
import {Card, CardContent, CardHeader, CardTitle} from "~/components/ui/card";

const qualityMeasureParameter = 'http://www.opengis.net/def/metamodel/isodqm/qualityMeasureParameter';
const elementName = 'http://www.opengis.net/def/metamodel/isodqm/elementName';

const QUERY = `
SELECT ?desc ?descDefinition ?formula ?formulaDefinition ?formulaKey WHERE {
  <__SUBJECT__> <http://www.opengis.net/def/metamodel/isodqm/measureDescription> ?desc .
  ?desc <http://www.w3.org/2004/02/skos/core#definition> ?descDefinition ;
    <http://www.opengis.net/def/metamodel/isodqm/formula> ?formula .
  ?formula <http://www.w3.org/2004/02/skos/core#definition> ?formulaDefinition .
  OPTIONAL { ?formula <http://www.opengis.net/def/metamodel/isodqm/formulaKey> ?formulaKey }
}
`.trim();

const props = defineProps({
  data: {
    type: Object as PropType<PrezDataItem>,
  },
});

interface Formula {
  uri: string;
  value: string;
  key?: string;
}

interface MeasureDescription {
  uri: string;
  definition: string;
  formulas: Formula[];
}

interface Measure {
  uri: string;
  definition: string;
  parameters?: string[];
  elementNames?: string[];
}

const descriptions = computed(() => props.data?.data?.properties?.['http://www.opengis.net/def/metamodel/isodqm/measureDescription']?.objects as PrezTerm[]);
const hasDescription = computed(() => !!descriptions.value?.length);
const measureDescriptions = ref<MeasureDescription[]>();

const measure = computed(() => {
  if (!props.data?.data) {
    return;
  }
  return {
    uri: props.data.data.value,
    definition: props.data.data.description?.value,
    parameters: props.data.data.properties?.[qualityMeasureParameter]?.objects.map(o => o.label?.value).filter(o => !!o),
    elementNames: props.data.data.properties?.[elementName]?.objects.map(o => o.value),
  } as Measure;
});

watch(descriptions, async () => {
  const measureUri = props.data?.data?.value;
  if (!measureUri || !hasDescription.value) {
    measureDescriptions.value = [];
    return;
  }
  const q = QUERY.replaceAll('__SUBJECT__', measureUri);
  const bindings = (await useSparqlSelect(q))?.results?.bindings || [];
  const mdMap = new Map<string, MeasureDescription>();
  bindings.forEach((binding: any) => {
    const uri = binding.desc.value;
    const formula: Formula = {
      uri: binding.formula.value,
      value: binding.formulaDefinition.value,
      key: binding.formulaKey.value,
    }
    if (mdMap.has(uri)) {
      mdMap.get(uri)!.formulas.push(formula);
    } else {
      mdMap.set(uri, {
        uri,
        definition: binding.descDefinition.value,
        formulas: [formula],
      });
    }
  });
  measureDescriptions.value = [...mdMap.values()];
}, {immediate: true});
</script>

<template>
  <div v-if="hasDescription && measure" class="measure-formulas">
    <Card class="bg-slate-50 dark:bg-slate-900/50 gap-3">
      <CardHeader>
        <CardTitle>About this measure</CardTitle>
        <CardDescription v-if="measure.definition">{{ measure.definition }}</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="text-sm">
          <div v-if="measure.parameters?.length">
            Parameter(s): {{ measure.parameters.join(', ') }}
          </div>
          <div v-if="measure.elementNames?.length">
            Element name(s): {{ measure.elementNames.join(', ') }}
          </div>
        </div>
        <h4 class="text-sm font-bold mt-2">Descriptions</h4>
        <Accordion type="multiple" collapsible>
          <AccordionItem
            v-for="measureDescription in measureDescriptions"
            :key="measureDescription.uri"
            :value="measureDescription.uri"
          >
            <AccordionTrigger>{{ measureDescription.definition }}</AccordionTrigger>
            <AccordionContent>
              <div v-for="formula in measureDescription.formulas" class="flex flex-col md:flex-row">
                <span
                  v-if="formula.value.startsWith('<math ')"
                  v-dompurify-html:mathml="formula.value"
                  class="flex-1"
                >
                </span>
                <span v-else class="flex-1">
                  {{ formula.value }}
                </span>
                <div v-if="formula.key?.length" class="mt-2 md:mt-0 text-gray-700 text-sm whitespace-pre-line">
                  {{ formula.key }}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  </div>
</template>

<style scoped>

</style>