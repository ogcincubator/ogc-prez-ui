import type {PublicDynamicPageAttributes} from "~/lib/dynamicPages";
import {useDynamicPages} from "~/composables/useDynamicPages";
import DynamicPage from "~/components/dynamicPages/DynamicPage.vue";

export default defineNuxtPlugin({
  async setup() {
    let pages;
    if (import.meta.server) {
      const dynamicPages = await useFetch<PublicDynamicPageAttributes[]>('/api/dynamic-pages');
      pages = dynamicPages.data.value || [];
      useDynamicPages().value = pages;
    } else {
      pages = useDynamicPages().value;
    }
    const router = useRouter();
    const existingRoutes = Object.fromEntries(router.getRoutes()
      .map(route => [route.path, route.name]));

    if (pages?.length) {
      pages.forEach(page => {
        if (page.path in existingRoutes) {
          router.removeRoute(existingRoutes[page.path]!);
        }
        router.addRoute({
          path: page.path,
          component: DynamicPage,
          props: {
            page: page,
          },
        });
      });
    }
  },
});