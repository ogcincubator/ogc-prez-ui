<script lang="ts" setup>
import ItemTable from 'prez-ui/components/ItemTable.vue';
import type {ItemTableProps} from "prez-components";
import {type PrezFocusNode} from 'prez-lib';

const props = defineProps<ItemTableProps>();

const hideSingleObjectPredicates = [
    'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
    'http://www.w3.org/2004/02/skos/core#prefLabel',
    'http://www.w3.org/2000/01/rdf-schema#label',
    'http://purl.org/dc/terms/title',
];
const hidePredicates = [
    'http://www.opengis.net/ogc-na#targetGraph',
];
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