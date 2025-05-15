<script lang="ts" setup>
import ItemTable from '@/base/components/ItemTable.vue';
import DataTable from 'primevue/datatable';

import {type PrezFocusNode, type PrezProperty, type PrezTerm, type PrezNodeList} from '@/base/lib';

interface Props {
  /** optional, fields in order to display */
  // fields?: PrezNodeList[];

  /** parent term or root focus node */
  term: PrezTerm;
}

const props = defineProps<Props>();
const term = props.term as PrezFocusNode;

const fieldNames = Object.keys(term.properties || {});

const fields = computed(() =>
    [...(props.fields || []).filter(f => fieldNames.includes(f.node.value)).map(f => f.node.value),    // add fields that are in the list
      ...fieldNames.filter(fname => !(props.fields || []).find(f => f.node.value == fname)),              // add the rest of the fields that are not in the list
    ].filter(f => f in (term.properties || {})).map(f => term.properties![f] as PrezProperty),
);

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

const propertiesFilter = ([propertyUri, value]: [string, PrezProperty]) => {
  if (hidePredicates.includes(propertyUri)) {
    return false;
  }
  if (value.objects.length === 1 && hideSingleObjectPredicates.includes(propertyUri)) {
    return false;
  }
  if (term?.rdfTypes?.length) {
    for (const rdfType of term.rdfTypes) {
      const hidePredicatesForType = hidePredicatesForClass[rdfType.value];
      if (hidePredicatesForType?.includes?.(propertyUri)) {
        return false;
      }
    }
  }
  return true;
};

const filteredProperties = computed(() => Object.fromEntries(
  Object.entries(term.properties).filter(propertiesFilter)
));

const filteredFields = computed(() => {
  return fields.value.filter(f => {
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

const newProps = computed(() => ({
    term: {
      ...props.term,
      properties: filteredProperties.value,
    }
}));
</script>
<template>
  <ItemTable v-bind="newProps">
  </ItemTable>
</template>
