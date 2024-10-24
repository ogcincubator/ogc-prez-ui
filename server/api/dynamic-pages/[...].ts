import {StoredDynamicPages} from "~/lib/dynamicPages";

export default defineCachedEventHandler(async (event) => {
  const pages = await useStorage('DYNAMIC_PAGES').getItem<StoredDynamicPages>('dynamicPages');
  const pagePath = event.context.params?._;
  if (!pagePath) {
    return null;
  }
  return pages?.full?.['/' + (pagePath === '_' ? '' : pagePath)];
}, {
  maxAge: 60 * 60,
});