<script setup lang="ts">
import type {StaticPageAttributes, PublicStaticPageAttributes} from "~/lib/staticPages";
import mermaid from "mermaid";
import TableOfContents from "~/components/staticPages/TableOfContents.vue";
import {useGetStaticPage} from "~/composables/useStaticPages";
import DOMPurify from "dompurify";

const props = defineProps({
  page: {
    type: Object as PropType<PublicStaticPageAttributes>,
    required: true,
  },
});
const mainContent = ref<Element>();
const { html: pageHtml, loading, error } = useGetStaticPage(computed(() => props.page?.path));

const purifiedHtml = computed(() => DOMPurify.sanitize(pageHtml.value));

watchEffect(() => {
  if (mainContent.value && pageHtml.value) {
    nextTick(() => mermaid.run({
      nodes: mainContent.value!.querySelectorAll('pre.mermaid'),
    }));
  }
});
</script>
<template>
  <NuxtLayout contentonly>
    <template #default>
      <div v-if="loading">
        <div class="h-[2em] w-3/4 mb-3 animate-pulse rounded-md bg-muted"></div>
        <div class="h-[2em] w-1/2 mb-3 animate-pulse rounded-md bg-muted"></div>
        <div class="h-[4em] w-full mb-3 animate-pulse rounded-md bg-muted"></div>
        <div class="h-[5em] w-1/2 mb-3 animate-pulse rounded-md bg-muted"></div>
        <div class="h-[4rem] w-3/4 animate-pulse rounded-md bg-muted"></div>
      </div>
      <div v-if="!loading && page?.toc" class="toc md:float-right my-2 md:m-5 md:max-w-[550px] text-sm rounded-md shadow-lg p-2">
        <p class="text-ogc-dark-blue font-bold">On this page</p>
        <TableOfContents :element="mainContent"></TableOfContents>
      </div>
      <div id="static-page-content" ref="mainContent" v-html="purifiedHtml">
      </div>
    </template>
  </NuxtLayout>
</template>