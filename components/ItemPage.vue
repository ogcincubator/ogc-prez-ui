<script setup lang="ts">
import ItemPage from 'prez-ui/components/ItemPage.vue';
import ItemList from 'prez-ui/components/ItemList.vue';
import type {ShallowRef} from "@vue/reactivity";

const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const {getPageUrl, pagination} = usePageInfo();

const SHOW_MEMBER_LIST_CLASSES = [
  'http://www.w3.org/ns/dcat#Catalog',
  'http://www.w3.org/ns/dcat#TopCatalog',
  'http://www.w3.org/2004/02/skos/core#Collection',
  'http://www.w3.org/2002/07/owl#Ontology',
]
const HIDE_MEMBERS_BUTTON_CLASSES = [
  'http://www.w3.org/2004/02/skos/core#Concept',
]

const urlPath = ref(getPageUrl());
const {status, error, data} = useGetItem(runtimeConfig.public.prezApiEndpoint, urlPath);
const showMembersTable = computed(() => data.value?.data.rdfTypes?.find(n => SHOW_MEMBER_LIST_CLASSES.includes(n.value)));
const hideMembersButton = computed(() => data.value?.data.rdfTypes?.find(n => HIDE_MEMBERS_BUTTON_CLASSES.includes(n.value)));
const membersUrl = computed(() => {
  const baseMembersUrl = data.value?.data?.members?.value;
  return baseMembersUrl ? baseMembersUrl + getPageUrl().replace(/^[^?]+/, '') : '';
});

// Workaround for when membersUrl is not yet ready and thus null
const membersData: ShallowRef<any> = shallowRef(null);
const membersError: ShallowRef<Error | null | undefined> = shallowRef(null);
watch(membersUrl, () => {
  if (membersData || !membersUrl.value || !showMembersTable) {
    return;
  }
  const {data, error} = useGetList(runtimeConfig.public.prezApiEndpoint, membersUrl);
  membersData.value = data.value;

  watch(data, v => membersData.value = v);
  watch(error, v => {
    membersError.value = v
  });
}, {
  immediate: true,
});
</script>
<template>
  <ItemPage>
    <template #item-members v-if="!!membersUrl && showMembersTable && !membersError">
      <div class="mt-3">
        <h2 class="font-semibold pt-2">Collections in {{ data?.data?.label?.value || data!.data.value }}</h2>
        <ItemList v-if="membersData.data" :list="membersData.data" :key="membersUrl"/>
        <Loading v-else/>

        <slot name="pagination" :data="data" :pagination="pagination">
          <PrezPagination :totalItems="membersData.count" :pagination="pagination"
                          :maxReached="membersData.maxReached"/>
        </slot>
      </div>
    </template>
    <template #item-members v-else-if="hideMembersButton"><span class="hidden"></span></template>
  </ItemPage>
</template>
