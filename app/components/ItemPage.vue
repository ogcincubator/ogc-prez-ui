<script setup lang="ts">
import ItemPage from '@/site/components/ItemPage.vue';
import ItemList from '@/base/components/ItemList.vue';

const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const { getPageUrl, navigateToPage, pagination } = usePageInfo();

const urlPath = ref(getPageUrl());
const { status, error, data } = useGetItem(runtimeConfig.public.prezApiEndpoint, urlPath);
const isCatalog = computed(() => data.value?.data.rdfTypes?.find(n => n.value == 'http://www.w3.org/ns/dcat#Catalog'));
const membersUrl = computed(() => {
  const baseUrl = data.value?.data?.members?.value;
  return baseUrl ? baseUrl + getPageUrl().replace(/^[^?]+/, '') : null;
});

// Workaround for when membersUrl is not yet ready and thus null
let membersData: any = null;
watch(membersUrl, () => {
    if (membersData || !membersUrl.value) {
      return;
    }
    const { data } = useGetList(runtimeConfig.public.prezApiEndpoint, membersUrl);
    membersData = data;
  }, {
    immediate: true,
});
</script>
<template>
  <ItemPage>
    <template #item-members v-if="isCatalog && membersData?.data">
      <div class="pt-4">
        <h2 class="font-semibold">Collections in {{ data?.data?.label?.value || data.data.value }}</h2>
        <ItemList :list="membersData.data" :key="membersData"/>
        <Paginator
            v-if="membersData.count > pagination.per_page!"
            :first="pagination.first"
            :rows="pagination.per_page"
            :page="pagination.page"
            :totalRecords="membersData.count + (membersData.maxReached ? 1 : 0)"
            @page="navigateToPage"
        >
        </Paginator>
        <div v-if="membersData.count > 0" class="text-sm text-gray-500 text-center">
            Showing {{ pagination.first }} to
                {{ Math.min(pagination.first! + pagination.per_page! - 1, membersData.count) }} of
                {{ membersData.count }}{{ membersData.maxReached ? '+' : '' }} items
        </div>
    </div>
    </template>
  </ItemPage>
</template>