import fs from "node:fs";
import path from "node:path";
import fm, {FrontMatterResult} from "front-matter";
import {marked} from "marked";
import {DynamicPageAttributes, StoredDynamicPages} from "~/lib/dynamicPages";

marked.use({
  renderer: {
    code: (code) =>
      code.lang === 'mermaid' ? `<pre class="mermaid">${code.text}</pre>` : `<pre>${code.text}</pre>`
  },
});

export default defineNitroPlugin(async (nitroApp) => {
  const config = useRuntimeConfig();
  const pages: Array<DynamicPageAttributes> = [];
  const pagesDir = config.dynamicPagesPath;
    if (pagesDir) {
      console.log(`Dynamic pages will be loaded from ${pagesDir}`);

      let filenames: Array<string>;
      try {
        filenames = await fs.promises.readdir(pagesDir.toString());
        filenames.sort();
        for (const filename of filenames) {
          const fullPath = path.join(pagesDir.toString(), filename);
          if (!filename.match(/\.(html|md)$/) || !fs.lstatSync(fullPath).isFile()) {
            continue;
          }
          console.log(`Loading dynamic page from ${filename}`);
          const data = await fs.promises.readFile(fullPath, 'utf-8');
          const contents: FrontMatterResult<DynamicPageAttributes> = fm(data, {allowUnsafe: true});

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

        const storage = useStorage('DYNAMIC_PAGES');

        const storedPages: StoredDynamicPages = {
          urls: pages.map(page => {
            const {toc, html, ...rest} = page;
            return rest;
          }),
          full: Object.fromEntries(pages.map(page => [page.path, page])),
        }

        await storage.setItem('dynamicPages', storedPages);

        console.log(`${pages.length} dynamic pages added`);

      } catch (e) {
        console.error('Error loading dynamic pages', e);
      }
    } else {
      console.log('Dynamic pages are not configured');
    }
});