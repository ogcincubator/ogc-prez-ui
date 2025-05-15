<script setup lang="ts">
import ItemPage from '@/site/components/ItemPage.vue';
import ItemList from '@/base/components/ItemList.vue';
import Loading from '@/base/components/Loading.vue';

const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const {getPageUrl, navigateToPage, pagination} = usePageInfo();

const NON_MEMBER_CLASSES = [
  'http://www.w3.org/2004/02/skos/core#ConceptScheme',
  'http://www.w3.org/2004/02/skos/core#Concept',
]

const urlPath = ref(getPageUrl());
const {status, error, data} = useGetItem(runtimeConfig.public.prezApiEndpoint, urlPath);
const showMembersTable = computed(() => !data.value?.data.rdfTypes?.find(n => NON_MEMBER_CLASSES.includes(n.value)));
const membersUrl = computed(() => {
  const baseMembersUrl = data.value?.data?.members?.value;
  return baseMembersUrl ? baseMembersUrl + getPageUrl().replace(/^[^?]+/, '') : '';
});

// Workaround for when membersUrl is not yet ready and thus null
const membersData = shallowRef(null);
watch(membersUrl, () => {
  if (membersData.value || !membersUrl.value) {
    return;
  }
  const {data} = useGetList(runtimeConfig.public.prezApiEndpoint, membersUrl);
  membersData.value = data.value;

  watch(data, v => membersData.value = v);
}, {
  immediate: true,
});
</script>
<template>
  <ItemPage>
    <template #item-members v-if="!!membersUrl && showMembersTable">
      <h2 class="font-semibold pt-2">Collections in {{ data?.data?.label?.value || data!.data.value }}</h2>
      <div v-if="membersData?.data">
        <ItemList :list="membersData.data" :key="membersData"/>
        <Paginator
            v-if="membersData.count > pagination.limit!"
            :first="pagination.first"
            :rows="pagination.limit"
            :page="pagination.page"
            :totalRecords="membersData.count + (membersData.maxReached ? 1 : 0)"
            @page="navigateToPage"
        >
        </Paginator>
        <div v-if="membersData.count > 0" class="text-sm text-gray-500 text-center">
          Showing {{ pagination.first }} to
          {{ Math.min(pagination.first! + pagination.limit! - 1, membersData.count) }} of
          {{ membersData.count }}{{ membersData.maxReached ? '+' : '' }} items
        </div>
      </div>
      <Loading variant="item-table" v-else></Loading>
    </template>
  </ItemPage>
</template>