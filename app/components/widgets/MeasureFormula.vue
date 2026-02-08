<script setup lang="ts">
import type {PrezDataItem, PrezTerm} from "prez-lib";
import {useSparqlSelect} from "~/composables/useSparql";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "~/components/ui/accordion";
import {Card, CardContent, CardHeader, CardTitle} from "~/components/ui/card";

const QUERY = `
SELECT ?desc ?descDefinition ?formulaDefinition ?formulaKey WHERE {
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

interface MeasureDescription {
  uri: string;
  definition: string;
  formula: string;
  formulaKey?: string;
}

const descriptions = computed(() => props.data?.data?.properties?.['http://www.opengis.net/def/metamodel/isodqm/measureDescription']?.objects as PrezTerm[]);
const hasDescription = computed(() => !!descriptions.value?.length);
const measureDescriptions = ref<MeasureDescription[]>();

watch(descriptions, async () => {
  const measureUri = props.data?.data?.value;
  if (!measureUri || !hasDescription.value) {
    measureDescriptions.value = [];
    return;
  }
  const q = QUERY.replaceAll('__SUBJECT__', measureUri);
  const bindings = (await useSparqlSelect(q))?.results?.bindings || [];
  measureDescriptions.value = bindings.map((binding: any) => ({
    uri: binding.desc.value,
    definition: binding.descDefinition.value,
    formula: binding.formulaDefinition.value,
    formulaKey: binding.formulaKey?.value,
  }));
}, {immediate: true});
</script>

<template>
  <div v-if="hasDescription" class="measure-formulas">
    <Card class="bg-slate-50 dark:bg-slate-900/50">
      <CardHeader>
        <CardTitle>Available formulas for this measure</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" collapsible>
          <AccordionItem
            v-for="measureDescription in measureDescriptions"
            :key="measureDescription.uri"
            :value="measureDescription.uri"
          >
            <AccordionTrigger>{{ measureDescription.definition }}</AccordionTrigger>
            <AccordionContent class="flex flex-col md:flex-row">
              <span
                v-if="measureDescription.formula.startsWith('<math ')"
                v-dompurify-html:mathml="measureDescription.formula"
                class="flex-1"
              >
              </span>
              <span v-else class="flex-1">
                {{ measureDescription.formula }}
              </span>
              <div v-if="measureDescription.formulaKey?.length" class="mt-2 md:mt-0 text-gray-700 text-sm whitespace-pre-line">
                {{ measureDescription.formulaKey }}
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