import type {StaticPageAttributes, PublicStaticPageAttributes} from "~/lib/staticPages";
import {watchEffect} from "vue";
import {useSparqlSelect} from "~/composables/useSparql";
import {SYSTEM_PREDICATES} from "prez-lib";
import {marked} from "marked";

const GET_PAGE_CONTENT_QUERY = `
PREFIX prez: <https://prez.dev/>
PREFIX dct: <http://purl.org/dc/terms/>
SELECT ?content WHERE {
  GRAPH <__GRAPH__> {
    ?page a prez:Page ;
      prez:path "__PATH__" ;
      prez:content ?content .
  }
} LIMIT 1`;

const pagesCache = new Map<string, StaticPageAttributes>();

export const useStaticPages = (): Ref<PublicStaticPageAttributes[]> => useState<PublicStaticPageAttributes[]>('staticPages', () => []);
export const useGetStaticPage = (path: Ref<string> | string) => {
  const html = ref();
  const loading = ref(false);
  const error = ref();
  watchEffect(async () => {
    let pathValue = toValue(path);
    if (pathValue) {
      error.value = null;
      const cachedHtml = pagesCache.get(pathValue);
      if (cachedHtml) {
        html.value = cachedHtml;
        return;
      }
      loading.value = true;
      const config = useRuntimeConfig();
      const q = GET_PAGE_CONTENT_QUERY
        .replace('__GRAPH__', config.public.staticPagesGraphURI)
        .replace('__PATH__', pathValue);
      try {
        const bindings = (await useSparqlSelect(q))?.results?.bindings || [];
        if (bindings.length) {
          const content = bindings[0].content;
          if (content?.datatype == SYSTEM_PREDICATES.w3Markdown) {
            html.value = await marked.parse(content.value);
          } else {
            html.value = content.value;
          }
          pagesCache.set(pathValue, html.value);
        }
      } finally {
        loading.value = false;
      }
    }
  });
  return {html, loading, error};
};