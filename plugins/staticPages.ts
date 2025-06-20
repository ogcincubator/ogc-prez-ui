import {apiGet} from "prez-lib";
import type {StaticPageAttributes} from "~/lib/staticPages";
import StaticPage from "~/components/staticPages/StaticPage.vue";
import {useSparqlSelect} from "~/composables/useSparql";

const GET_PAGES_QUERY = `
PREFIX prez: <https://prez.dev/>
PREFIX dct: <http://purl.org/dc/terms/>
SELECT DISTINCT ?title ?path ?toc WHERE {
  GRAPH <__GRAPH__> {
    ?page a prez:Page ;
      dct:title ?title ;
      prez:path ?path .
    OPTIONAL { ?page prez:toc ?toc }
  }
}`;

export default defineNuxtPlugin({
  async setup() {
    const config = useRuntimeConfig();

    if (!config.public.staticPagesGraphURI) {
      console.log('Static pages are not enabled');
      return;
    }
    console.log(`Loading dynamic pages from ${config.public.staticPagesGraphURI}`);

    const q = GET_PAGES_QUERY.replace('__GRAPH__', config.public.staticPagesGraphURI);
    try {
      const bindings = (await useSparqlSelect(q))?.results?.bindings || [];
      const pages: Array<StaticPageAttributes> = bindings.map((binding: any) => ({
        title: binding.title.value,
        path: binding.path.value,
        toc: binding?.toc?.value === "true",
      }));

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
            component: StaticPage,
            props: {
              page: page,
            },
          });
        });
      }

    } catch (e) {
      console.error('Error retrieving static pages', e);
    }
  }
});