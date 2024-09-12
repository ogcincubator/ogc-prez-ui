import fs from "fs";
import DynamicPage from "../components/DynamicPage.vue";
import {marked} from "marked";
import {useDynamicPages} from "~/composables/useDynamicPages";
import type {FrontMatterResult} from "front-matter";

export interface DynamicPageAttributes {
  readonly toc?: boolean;
  readonly title: string;
  readonly navigationMenu?: 'main' | 'top';
  html: string;
  path: string;
}

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig();
  const router = useRouter();

  const pagesDir = config.dynamicPagesPath;
  if (import.meta.server && pagesDir) {

    const path = await import('path');
    const fs = await import('fs');
    const fm = await import('front-matter');

    const pages: Array<DynamicPageAttributes> = [];
    let filenames: Array<string>;
    try {
      filenames = await fs.promises.readdir(pagesDir.toString());
      filenames.sort();
      for (const filename of filenames) {
        const fullPath = path.join(pagesDir.toString(), filename);
        if (!filename.match(/\.(html|md)$/) || !fs.lstatSync(fullPath).isFile()) {
          continue;
        }
        const data = await fs.promises.readFile(fullPath, 'utf-8');
        const contents: FrontMatterResult<DynamicPageAttributes> = fm.default(data, {allowUnsafe: true});

        if (contents.attributes.title) {
          if (!contents.attributes.path) {
            contents.attributes.path = '/' + filename.replace(/\.[^.]+$/, '');
          } else if (!contents.attributes.path.startsWith('/')) {
            contents.attributes.path = '/' + contents.attributes.path;
          }
          if (filename.endsWith('.md')) {
            contents.attributes.html = await marked.parse(contents.body);
          } else {
            contents.attributes.html = contents.body;
          }
          pages.push(contents.attributes);
        }
      }
      useDynamicPages().value = pages;
    } catch (e) {
      console.error('Error loading dynamic pages', e);
    }
  }

  const existingRoutes = Object.fromEntries(router.getRoutes()
    .map(route => [route.path, route.name]));

  const pages = useDynamicPages().value;
  if (pages?.length) {
    pages.forEach(page => {
      if (page.path in existingRoutes) {
        router.removeRoute(existingRoutes[page.path]!);
      }
      router.addRoute({
        path: page.path,
        component: DynamicPage,
        props: {
          title: page.title,
          toc: !!page.toc,
          html: page.html,
        },
      });
    })
  }
})