<script setup lang="ts">
const props = defineProps<{ sidepanel?: boolean, contentonly?: boolean }>();
const appConfig = useAppConfig();
const runtimeConfig = useRuntimeConfig();
const menu = appConfig.ogcMenu;
const expanded = ref(false);
const showDebugPanel = ref(false);

const logosGlob = import.meta.glob('../../assets/img/social/*.svg', {eager: true, query: '?raw'});
const logos = Object.fromEntries(
    Object.entries(logosGlob).map(([key, value]) => [key.replace(/.*\//, ''), (value as any).default]),
);

onBeforeMount(() => {
  if (typeof localStorage !== 'undefined') {
    expanded.value = !!localStorage.getItem('expanded');
    showDebugPanel.value = runtimeConfig.public.prezDebug && !!localStorage.getItem('debug');
    watch(expanded, val => localStorage.setItem('expanded', val && '1' || ''));
    watch(showDebugPanel, val => localStorage.setItem('debug', val && '1' || ''));
  }
});
const appTitle = runtimeConfig.public.appTitle;

const socialLinks = [
  {href: 'https://twitter.com/opengeospatial', img: 'twitter.svg', alt: 'Twitter'},
  {href: 'https://www.linkedin.com/company/open-geospatial-consortium', img: 'linkedin.svg', alt: 'LinkedIn'},
  {href: 'https://www.youtube.com/@opengeospatial', img: 'youtube.svg', alt: 'YouTube'},
  {href: 'https://discord.gg/VsfzaU5qgs', img: 'discord.svg', alt: 'Discord'},
  {href: 'https://ogcpublic.slack.com/', img: 'slack.svg', alt: 'Slack'},
];

const dynamicPages = toValue(useDynamicPages());
const fullMenu = computed(() => {
  if (!dynamicPages.length) {
    return menu;
  }
  const items = menu.map(m => ({label: dynamicPages.find(p => p.path === m.url)?.title || m.label, url: m.url}));
  for (const page of dynamicPages) {
    if (page.navigationMenu === 'main' && !items.find(i => i.url === page.path)) {
      items.push({label: page.title, url: page.path});
    }
  }
  return items;
});
const topMenu = computed(() => {
  if (!dynamicPages.length) {
    return [];
  }
  return dynamicPages.filter(p => p.navigationMenu === 'top');
});

const year = new Date().getFullYear();

const menuOpen = ref(false);
</script>
<template>
  <div class="flex flex-col min-h-screen">

    <!-- Header -->
    <header class="bg-white shadow-md text-ogc-blue py-5 md:py-10 flex flex-col">
      <div class="container mx-auto px-4 h-full flex justify-between items-center md:mb-4 order-2 md:order-1 mt-4 md:mt-0">

        <!-- Logo -->
        <a to="https://www.ogc.org" class="text-4xl flex flex-col md:flex-row flex-1 items-start md:items-center text-white">
          <img class="h-[50px] hidden md:inline-block mr-3 filter brightness-0 invert md:inline-block" src="../../assets/img/ogc-logo.svg"
               alt="Open Geospatial Consortium">
          <span>{{ appTitle }}</span>
        </a>

      </div>

      <div
        class="container mx-auto menu-container flex bg-white px-6 justify-between align-middle w-11/12 flex-col md:flex-row pb-3 md:pb-0 order-1 md:order-2"
      >
        <nav
          class="container py-4 md:flex flex-col md:flex-row md:space-x-12 text-lg text-ogc-blue flex-1 order-2 md:order-1 ml-5 md:ml-0"
          :class="{ hidden: !menuOpen, flex: menuOpen }"
        >
          <nuxt-link v-for="{label, url} in fullMenu" :to="url"
                     class="border-b-[3px] border-transparent hover:text-ogc-light-blue font-bold transition-colors">
            {{ label }}
          </nuxt-link>
          <div v-if="runtimeConfig.public.prezDebug" class="!ml-auto">
            <div v-if="showDebugPanel"><i title="Toggle debug off"
                                          class="hover:cursor-pointer hover:text-gray-500 pi pi-cog text-blue-400"
                                          @click="()=>{ showDebugPanel = !showDebugPanel }"></i></div>
            <i v-else title="Toggle debug on" class="hover:cursor-pointer hover:text-gray-500 pi pi-cog text-gray-300"
               @click="()=>{ showDebugPanel = !showDebugPanel }"></i>
          </div>
        </nav>

        <nav class="top-menu space-x-4 text-right flex-1 flex justify-end items-stretch md:items-center md:order-2 order-1 pt-3 md:p-0 text-2xl md:text-base">
          <nuxt-link to="/" class="w-[1em] md:hidden">
            <svg class="h-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 40 46" aria-hidden="true" focusable="false">
              <path fill="currentColor" d="M18.173 32.528v12.596L.001 34.633 0 13.638 18.172 24.13v4.198l-3.627-2.093-1.818-1.05-9.09-5.248v12.596l10.908 6.299v-4.2l-5.454-3.148v-4.199l9.082 5.243ZM19.993 16.795l-10.91-6.298 10.91-6.299 10.908 6.3-1.817 1.049-9.091 5.248Zm0-16.795L1.81 10.497l18.181 10.497 18.182-10.497L19.993 0ZM29.1 24.08l3.637-2.1 3.636-2.1v4.2L40 21.986v-8.35l-18.173 10.49v4.152h.001v16.796l-.01-.005v.058L40 34.63v-8.446l-3.627 2.095v4.198l-10.91 6.299.001-12.597 3.636-2.1Z"></path>
            </svg>
          </nuxt-link>
          <span class="flex-1"></span>
          <nuxt-link
              v-for="page of topMenu"
              :to="page.path"
              class="text-ogc-dark-blue hover:text-ogc-blue after:content-[''] after:absolute transition-colors">
            {{ page.title }}
          </nuxt-link>
          <a href="#" @click.prevent="menuOpen = !menuOpen" class="md:hidden">
            <i
              class="pi text-ogc-dark-blue text-2xl"
              :class="{ 'pi-bars': !menuOpen, 'pi-times': menuOpen }"
            ></i>
          </a>
        </nav>
      </div>
    </header>

    <slot v-if="!contentonly" name="header">
      <div class="">
        <div class="container px-4 py-4 mx-auto">
          <slot name="breadcrumb"/>
          <div class="text-3xl pb-7 text-ogc-dark-blue text-[40px] font-bold">
            <slot name="header-text"/>
          </div>
          <div v-if="showDebugPanel" class="m-2 bg-gray-200 rounded-lg text-[12px] leading-[12px]">
            <slot name="debug"/>
          </div>
        </div>
      </div>
    </slot>
    <div v-else-if="showDebugPanel" class="bg-gray-100">
      <div class="container px-4 py-4 mx-auto">
        <slot name="debug"/>
      </div>
    </div>

    <div class="container mx-auto flex-grow overflow-x-auto" id="main-content">

      <div v-if="sidepanel" class="md:grid grid-cols-4 gap-4 px-4 py-4">
        <div :class="!expanded ? 'col-span-3 ... relative' : 'col-span-4 relative'">
          <slot/>
          <div class="absolute right-0 top-[-5px] pointer-events-auto hidden md:block" @click="()=>{ expanded = !expanded }">
            <i v-if="expanded" title="Show sidepanel"
               class="pi pi-angle-double-left text-xs p-[4px] hover:cursor-pointer hover:bg-gray-200 hover:rounded-full"/>
            <i v-else title="Expand and hide sidepanel"
               class="pi pi-angle-double-right text-xs p-[4px] hover:cursor-pointer hover:bg-gray-200 hover:rounded-full"/>
          </div>
        </div>
        <div v-if="!expanded" class="... mt-4 md:mt-0">
          <slot name="sidepanel"></slot>
        </div>
      </div>
      <div v-else class="px-4 py-4">
        <slot/>
      </div>

    </div>

    <footer class="bg-ogc-dark-blue text-white pt-5 px-[4em] pb-[4em]">

      <div class="flex flex-col md:flex-row justify-center space-x-2 mb-10">
        <div class="follow-us md:w-1/4 w-full order-2 md:order-1 my-5 md:my-0">
          <div class="font-bold text-ogc-blue mt-2 mb-3 text-xs uppercase">Follow us</div>
          <div class="social-links space-x-2 flex">
            <a v-for="link of socialLinks" :href="link.href" target="_blank"
               class="size-10 rounded-full flex bg-white text-ogc-dark-blue hover:text-white hover:bg-ogc-light-blue transition-colors justify-center"
               v-html="logos[link.img]"
            >
            </a>
          </div>
        </div>

        <div class="where-we-are md:w-1/4 w-full order-1 md:order-2 my-5 md:my-0">
          <div class="font-bold text-ogc-blue mt-2 mb-3 text-xs uppercase">Where we are</div>
          <div class="address">
            2300 Wilson Blvd. Suite 700-1026<br/>
            Arlington, VA 22201, USA
          </div>
          <div class="phone">
            Tel: <a href="tel:+15086555858">+1 508 655 5858</a>
          </div>
        </div>
      </div>

      <div class="bottom text-xs flex flex-col items-center md:flex-row md:justify-between">
        <div class="copyright py-1 md:py-0 text-center md:text-left">
          Copyright © {{ year }} Open Geospatial Consortium. All Rights Reserved.
        </div>
        <div class="powered-by py-1 md:py-0 text-center md:text-right">
          The OGC RAINBOW is powered by <a class="font-bold" href="https://github.com/RDFLib/prez"
                                           target="_blank">Prez</a>
        </div>
      </div>
    </footer>
  </div>
</template>
<style lang="scss">
header {
  background: url(../../assets/img/header-bg.jpg) center 55% no-repeat;
  background-size: cover;

  .menu-container {
    --clip-corner-size-x: 30px;
    --clip-corner-size-y: 18px;
    clip-path: polygon(calc(0% + var(--clip-corner-size-x)) 0, 100% 0, 100% calc(100% - var(--clip-corner-size-y)), calc(100% - var(--clip-corner-size-x)) 100%, 0 100%, 0 calc(0% + var(--clip-corner-size-y)));
  }
}

footer {
  .social-links {
    svg {
      width: 50%;
    }
  }
}
</style>
