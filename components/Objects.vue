<script lang="ts" setup>
import Objects from 'prez-ui/components/Objects.vue';
import {type PrezNode, type PrezTerm} from 'prez-lib';

interface Props {
  term: PrezTerm; // parent term or root focus node
  predicate: PrezNode;
  objects: PrezTerm[];
}

const props = defineProps<Props>();

</script>
<template>
  <Objects :term="props.term" :predicate="props.predicate" :objects="props.objects">
    <template #default>
    </template>
  </Objects>
</template>
