<script setup lang="ts">
import Literal from '@/base/components/Literal.vue';
import type {PrezLiteral} from "@/base/lib/types";
import DOMPurify from "dompurify";

interface Props {
    term: PrezLiteral;
}

const props = defineProps<Props>();

const mathMl = computed(() => {
  if ((props.term?.datatype?.value === 'http://www.w3.org/2001/XMLSchema#string' && props.term?.value?.trim?.()?.startsWith?.('<math '))
       || props.term?.datatype?.value === 'https://standards.isotc211.org/19157/-3/1/dqc/content/formulaType/MathML') {
    return DOMPurify.sanitize(props.term.value, {
      USE_PROFILES: {
        mathMl: true,
      },
    });
  }
  return null;
});

</script>
<template>
  <Literal v-bind="$props">
    <template #default>
      <div v-if="mathMl" v-html="mathMl">
      </div>
    </template>
  </Literal>
</template>