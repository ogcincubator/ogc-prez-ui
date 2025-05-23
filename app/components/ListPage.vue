<script setup lang="ts">
import ListPage from '@/site/components/ListPage.vue';
import {type PrezDataList} from '@/base/lib';

const getHeader = (data: PrezDataList) => {
  if (data?.parents?.length >= 2) {
    const parent = data.parents[data.parents.length - 2];
    if (parent.label) {
      return `Members in ${parent.label.value}`;
    }
  }
  return data?.parents?.[data.parents.length - 1].segment || "Members";
};

</script>
<template>
  <ListPage>
    <template #header-text="{ data }">
      {{ getHeader(data) }}
    </template>
  </ListPage>
</template>