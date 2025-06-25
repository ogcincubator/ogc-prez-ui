<script setup lang="ts">
import ListPage from 'prez-ui/components/ListPage.vue';
import {type PrezDataList} from 'prez-lib';

const getHeader = (data: PrezDataList | undefined) => {
  console.log(data);
  if (data?.parents?.length) {
    if (data.parents.length == 1) {
      return "Catalogs";
    }
    if (data.parents.length >= 2) {
      const parent = data!.parents[data!.parents.length - 2];
      if (parent.label) {
        return `Members in ${parent.label.value}`;
      }
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