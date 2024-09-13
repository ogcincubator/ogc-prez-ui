<script setup lang="ts">
import mermaid from "mermaid";

const props = defineProps({
  html: String,
  toc: {
    type: Boolean,
    default: false,
  },
});
const mainContent = ref<Element>();

if (import.meta.client) {
  watchEffect(() => {
    if (mainContent.value) {
      mermaid.run({
        nodes: mainContent.value!.querySelectorAll('pre.mermaid'),
      });
    }
  });
}
</script>
<template>
  <NuxtLayout contentonly>
    <template #default>
      <div v-if="props.toc" class="toc md:float-right my-2 md:m-5 md:max-w-[550px] text-sm rounded-md shadow-lg p-2">
        <p class="text-ogc-dark-blue font-bold">On this page</p>
        <TableOfContents :element="mainContent"></TableOfContents>
      </div>
      <div ref="mainContent" v-html="props.html">
      </div>
    </template>
  </NuxtLayout>
</template>