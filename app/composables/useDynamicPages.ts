import type {DynamicPageAttributes, PublicDynamicPageAttributes} from "~/lib/dynamicPages";
import {watchEffect} from "vue";

export const useDynamicPages = (): Ref<PublicDynamicPageAttributes[]> => useState<PublicDynamicPageAttributes[]>('dynamicPages', () => []);
export const useGetDynamicPage = (path: Ref<string> | string) => {
  const fullPage = ref();
  const loading = ref(false);
  const error = ref();
  watchEffect(async () => {
    let pathValue = toValue(path);
    if (pathValue) {
      if (pathValue == '/') {
        pathValue = '/_';
      }
      loading.value = true;
      try {
        const {data, error: err} = await useFetch(`/api/dynamic-pages${pathValue}`);
        if (err) {
          error.value = err.value;
        }
        if (data?.value) {
          fullPage.value = data.value;
        }
      } finally {
        loading.value = false;
      }
    }
  });
  return {fullPage, loading, error};
};