<script setup lang="ts">
import ItemPage from 'prez-ui/components/ItemPage.vue';
import ItemList from 'prez-ui/components/ItemList.vue';

const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const {getPageUrl, pagination} = usePageInfo();

const urlPath = ref(getPageUrl());
const {status, error, data} = useGetItem(runtimeConfig.public.prezApiEndpoint, urlPath);
const isCatalog = computed(() => data.value?.data.rdfTypes?.find(n => n.value == 'http://www.w3.org/ns/dcat#Catalog'));
const membersUrl = computed(() => {
  const baseMembersUrl = data.value?.data?.members?.value;
  return baseMembersUrl ? baseMembersUrl + getPageUrl().replace(/^[^?]+/, '') : '';
});

// Workaround for when membersUrl is not yet ready and thus null
let membersData: any = null;
watch(membersUrl, () => {
  if (membersData || !membersUrl.value) {
    return;
  }
  const {data} = useGetList(runtimeConfig.public.prezApiEndpoint, membersUrl);
  membersData = data;
}, {
  immediate: true,
});
</script>
<template>
  <ItemPage>
    <template #item-members v-if="isCatalog && membersData?.data">
      <div class="mt-3">
        <h2 class="font-semibold">Collections in {{ data?.data?.label?.value || data!.data.value }}</h2>
        <ItemList v-if="membersData.data" :list="membersData.data" :key="membersUrl" />
        <Loading v-else />

        <slot name="pagination" :data="data" :pagination="pagination">
            <PrezPagination :totalItems="membersData.count" :pagination="pagination" :maxReached="membersData.maxReached" />
        </slot>
      </div>
    </template>
  </ItemPage>
</template>
