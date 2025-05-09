<script setup lang="ts">
import Literal from 'prez-ui/components/Literal.vue';
import type {LiteralProps} from "prez-components";
import {type PrezLiteral, SYSTEM_PREDICATES} from "prez-lib";

const props = defineProps<LiteralProps>();

const term = props.term as PrezLiteral;
const isMathMl = term.datatype?.value == SYSTEM_PREDICATES.xmlString && term.value.startsWith('<math ');

</script>
<template>
  <Literal v-bind="props">
    <template #text="slotProps">
      <span v-if="isMathMl" v-dompurify-html:mathml="term.value"></span>
    </template>
  </Literal>
</template>