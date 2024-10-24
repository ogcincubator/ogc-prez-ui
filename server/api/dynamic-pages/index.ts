import {StoredDynamicPages} from "~/lib/dynamicPages";

export default defineCachedEventHandler(async (event) => {
  const pages = await useStorage('DYNAMIC_PAGES').getItem<StoredDynamicPages>('dynamicPages');
  return pages ? pages.urls : [];
}, {
  maxAge: 60 * 60,
});