<script lang="ts" setup>
import ItemTable from 'prez-ui/app/components/ItemTable.vue';
import type {ItemTableProps} from "prez-components";
import {type PrezFocusNode} from 'prez-lib';

const props = defineProps<ItemTableProps>();

const hideSingleObjectPredicates = [
  'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
  'http://www.w3.org/2004/02/skos/core#prefLabel',
  'http://www.w3.org/2000/01/rdf-schema#label',
];
const hidePredicates = [
  'http://www.opengis.net/ogc-na#targetGraph',
];
const hidePredicatesForClass: Record<string, string[]> = {
    'http://www.w3.org/ns/dcat#TopCatalog': [
        'http://purl.org/dc/terms/hasPart',
    ],
};
const term = props.term as PrezFocusNode;

const filteredProperties = computed(() => {
  if (!term?.properties) {
    return [];
  }
  return Object.values(term.properties).filter(f => {
    if (hidePredicates.includes(f.predicate.value)) {
      return false;
    }
    if (f.objects.length === 1 && hideSingleObjectPredicates.includes(f.predicate.value)) {
      return false;
    }
    if (term?.rdfTypes?.length) {
      for (const rdfType of term.rdfTypes) {
        const hidePredicatesForType = hidePredicatesForClass[rdfType.value];
        if (hidePredicatesForType?.includes?.(f.predicate.value)) {
          return false;
        }
      }
    }
    return true;
  });
});

const filteredProps = computed(() => {
  return {
    ...props,
    term: {
      ...props.term,
      properties: filteredProperties.value,
    },
  }
});
</script>

<template>
  <ItemTable
      v-bind="filteredProps"
  />
</template>