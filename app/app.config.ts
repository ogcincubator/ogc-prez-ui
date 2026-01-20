export default defineAppConfig({
    ogcMenu: [
        {"label": "Home", "url": "https://www.ogc.org"},
        {"label": "Browse", "url": "/catalogs"},
        {"label": "Search", "url": "/search"},
        {"label": "About", "url": "https://ogcincubator.github.io/rainbow-docs/about.html"},
      ],
});

declare module '@nuxt/schema' {
    interface AppConfigInput {
        menu?: Array<{ label: string, url: string, active?: boolean }>,
        nameSubstitutions?: Record<string, string>,
        breadcrumbPrepend?: Array<{ label: string, url: string }>,
        utilsMenu?: Array<{ label: string, url: string }>
    }
}
