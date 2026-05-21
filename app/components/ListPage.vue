<script setup lang="ts">
import ListPage from 'prez-ui/app/components/ListPage.vue';
import {type PrezDataList} from 'prez-lib';
import { filterBreadcrumbParents } from '~/lib/ogc/breadcrumb';

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
    <template #breadcrumb="{ data }">
      <div :key="data?.parents.join()">
        <ItemBreadcrumb v-if="data" :prepend="useAppConfig().breadcrumbPrepend || []" :name-substitutions="useAppConfig().nameSubstitutions" :parents="filterBreadcrumbParents(data.parents)" />
        <ItemBreadcrumb v-else :prepend="useAppConfig().breadcrumbPrepend" :custom-items="[{ url: '#', label: '...' }]" />
      </div>
    </template>
    <template #header-text="{ data }">
      {{ getHeader(data) }}
    </template>
  </ListPage>
</template>