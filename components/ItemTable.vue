<script lang="ts" setup>
import { type PrezFocusNode } from 'prez-lib';
import { Table, TableBody, ItemTableRow,type ItemTableProps } from 'prez-components';

const props = withDefaults(defineProps<ItemTableProps>(), {
    _components: () => {
        return {
            itemTableRow: ItemTableRow,
        }
    }
});
const term = props.term as PrezFocusNode;

// const fieldNames = Object.keys(term.properties || {});

// const fields = computed(()=>
//     [...(props.fields || []).filter(f => fieldNames.includes(f.node.value)).map(f=>f.node.value),    // add fields that are in the list
//     ...fieldNames.filter(fname => !(props.fields || []).find(f=>f.node.value == fname))              // add the rest of the fields that are not in the list
//     ].filter(f=>f in (term.properties || {})).map(f=>term.properties![f] as PrezProperty)
// );
const hideSingleObjectPredicates = [
    'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
    'http://www.w3.org/2004/02/skos/core#prefLabel',
    'http://www.w3.org/2000/01/rdf-schema#label',
];
const hidePredicates = [
    'http://www.opengis.net/ogc-na#targetGraph',
];
const filteredFields = computed(() => {
  return Object.values(term.properties).value.filter(f => {
    if (hidePredicates.includes(f.predicate.value)) {
      return false;
    }
    if (f.objects.length === 1 && hideSingleObjectPredicates.includes(f.predicate.value)) {
      return false;
    }
    return true;
  });
});
</script>

<template>
    <!-- ItemTable -->
    <Table v-if="term?.properties" class="item-table">
        <TableBody role="rowgroup">
            <component :is="props._components.itemTableRow" v-for="(fieldProp, index) in filteredFields"
                :key="fieldProp?.predicate.value"
                :index="index"
                :term="term"
                :objects="fieldProp ? fieldProp.objects : []"
                :predicate="fieldProp!.predicate"
                :renderHtml="props.renderHtml"
                :renderMarkdown="props.renderMarkdown"
            />
        </TableBody>
    </Table>
</template>

