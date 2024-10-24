import {StoredDynamicPages} from "~/lib/dynamicPages";

export default defineEventHandler(async (event) => {
  const pages = await useStorage('DYNAMIC_PAGES').getItem<StoredDynamicPages>('dynamicPages');
  return pages ? pages.urls : [];
});