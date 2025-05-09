export default defineAppConfig({
    ogcMenu: [
        {"label": "Home", "url": "/"},
        {"label": "Browse", "url": "/catalogs"},
        {"label": "Search", "url": "/search"},
        {"label": "About", "url": "/about"},
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
