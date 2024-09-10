<script setup lang="ts">
import {watch} from 'vue';
import {type TocItem} from '../lib/ogc/toc';
import TableOfContentsList from "~/components/TableOfContentsList.vue";

const props = defineProps({
  element: HTMLElement,
});

const element = props.element;

const tocItems: Array<TocItem> = [];

watchEffect(() => {
  tocItems.length = 0;
  if (!props.element) {
    return;
  }
  let currentItemList = tocItems,
      parentItemList: Array<TocItem> | null = null,
      lastItem: TocItem | null = null;

  const headings = props.element!.querySelectorAll('h1, h2, h3');
  for (const heading of headings) {
    if (!heading.textContent) {
      continue;
    }
    const newItem: TocItem = {
      label: heading.textContent,
      id: heading.id,
      element: heading,
    };
    const cmp = !lastItem ? 0 : heading.tagName.localeCompare(lastItem.element.tagName);
    if (cmp > 0) {
      lastItem!.children = [];
      parentItemList = currentItemList;
      currentItemList = lastItem!.children;
    } else if (cmp < 0) {
      currentItemList = parentItemList!;
    }
    currentItemList.push(newItem);
    lastItem = newItem;
  }
});
</script>
<template>
  <TableOfContentsList v-if="tocItems?.length" :list="tocItems"></TableOfContentsList>
</template>