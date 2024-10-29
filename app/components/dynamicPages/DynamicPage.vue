<script setup lang="ts">
import type {DynamicPageAttributes, PublicDynamicPageAttributes} from "~/lib/dynamicPages";
import mermaid from "mermaid";
import TableOfContents from "~/components/dynamicPages/TableOfContents.vue";
import {useGetDynamicPage} from "~/composables/useDynamicPages";

const props = defineProps({
  page: {
    type: Object as PropType<PublicDynamicPageAttributes>,
    required: true,
  },
});
const mainContent = ref<Element>();
const { fullPage, loading, error } = useGetDynamicPage(computed(() => props.page?.path));

if (import.meta.client) {
  watchEffect(() => {
    if (mainContent.value && fullPage.value) {
      nextTick(() => mermaid.run({
        nodes: mainContent.value!.querySelectorAll('pre.mermaid'),
      }));
    }
  });
}
</script>
<template>
  <NuxtLayout contentonly>
    <template #default>
      <div v-if="loading">
        <Skeleton height="2rem" width="10rem" class="mb-2"></Skeleton>
        <Skeleton height="2rem" width="5rem" class="mb-2"></Skeleton>
        <Skeleton height="4rem" class="mb-2"></Skeleton>
        <Skeleton height="5rem" class="mb-2"></Skeleton>
        <Skeleton width="10rem" height="4rem"></Skeleton>
      </div>
      <div v-if="fullPage?.toc" class="toc md:float-right my-2 md:m-5 md:max-w-[550px] text-sm rounded-md shadow-lg p-2">
        <p class="text-ogc-dark-blue font-bold">On this page</p>
        <TableOfContents :element="mainContent"></TableOfContents>
      </div>
      <div ref="mainContent" v-html="fullPage?.html">
      </div>
    </template>
  </NuxtLayout>
</template>