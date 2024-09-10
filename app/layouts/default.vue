<script setup lang="ts">
const props = defineProps<{ sidepanel?: boolean, contentonly?: boolean }>()
const appConfig = useAppConfig();
const runtimeConfig = useRuntimeConfig();
const menu = appConfig.menu;
const expanded = ref(!!localStorage.getItem('expanded'));
watch(expanded, val => localStorage.setItem('expanded', val && '1' || ''));
const appTitle = runtimeConfig.public.appTitle;

const socialLinks = [
  {href: 'https://twitter.com/opengeospatial', img: 'twitter.svg', alt: 'Twitter'},
  {href: 'https://www.linkedin.com/company/open-geospatial-consortium', img: 'linkedin.svg', alt: 'linkedin'},
  {href: 'https://www.youtube.com/@opengeospatial', img: 'youtube.svg', alt: 'youtube'},
  {href: 'https://discord.gg/VsfzaU5qgs', img: 'discord.svg', alt: 'discord'},
  {href: 'https://ogcpublic.slack.com/', img: 'slack.svg', alt: 'slack'},
];
</script>
<template>
  <div class="flex flex-col min-h-screen">

    <!-- Header -->
    <header class="bg-white h-32 shadow-md text-ogc-blue">
      <div class="container mx-auto px-4 h-full flex justify-between items-center">

        <!-- Logo -->
        <nuxt-link to="/" class="text-4xl hidden md:flex flex-1 items-center">
          <img class="h-[50px] inline-block mr-3" src="../../assets/img/ogc-logo.svg" alt="Open Geospatial Consortium">
          <span>{{ appTitle }}</span>
        </nuxt-link>

        <!-- Navigation -->
        <nav v-if="false" class="space-x-4 text-right">
          <nuxt-link to="/services"
                     class="hover:text-gray-400 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[2px] after:bg-orange-500 after:bottom-0 after:left-0 after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100">
            Privacy
          </nuxt-link>
          <nuxt-link to="/contact"
                     class="hover:text-gray-400 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[2px] after:bg-orange-500 after:bottom-0 after:left-0 after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100">
            Contact
          </nuxt-link>
        </nav>

      </div>
    </header>

    <div class="border-b">
      <nav class="container mx-auto px-4 py-4 hidden md:flex space-x-12 text-lg text-ogc-blue">
        <nuxt-link v-for="{label, url} in menu" :to="url"
                   class="border-b-[3px] border-transparent hover:border-ogc-blue">{{ label }}
        </nuxt-link>
      </nav>
    </div>

    <slot v-if="!contentonly" name="header">
      <div class="">
        <div class="container px-4 py-4 mx-auto">
          <slot name="breadcrumb"/>
          <div class="text-3xl pb-7 text-ogc-dark-blue text-[40px] font-bold">
            <slot name="header-text"/>
          </div>
        </div>
      </div>
    </slot>

    <div class="container mx-auto flex-grow">

      <div v-if="sidepanel" class="grid grid-cols-4 gap-4 px-4 py-4">
        <div :class="!expanded ? 'col-span-3 ... relative' : 'col-span-4 relative'">
          <slot/>
          <div class="absolute right-0 top-[-5px] pointer-events-auto" @click="()=>{ expanded = !expanded }">
            <i v-if="expanded" title="Show sidepanel"
               class="pi pi-angle-double-left text-xs p-[4px] hover:cursor-pointer hover:bg-gray-200 hover:rounded-full"/>
            <i v-else title="Expand and hide sidepanel"
               class="pi pi-angle-double-right text-xs p-[4px] hover:cursor-pointer hover:bg-gray-200 hover:rounded-full"/>
          </div>
        </div>
        <div v-if="!expanded" class="...">
          <slot name="sidepanel"></slot>
        </div>
      </div>
      <div v-else class="px-4 py-4">
        <slot/>
      </div>

    </div>

    <footer class="bg-ogc-blue text-white py-5">
      <div class="container mx-auto flex flex-col items-center justify-center">
        <img class="h-[60px] inline-block mr-3 logo my-3" src="../../assets/img/ogc-logo.svg"
             alt="Open Geospatial Consortium">
        <div class="ogc-contact">
          <div class="my-2 address">
            2300 Wilson Blvd. Suite 700-1026<br/>
            Arlington, VA 22201, USA
          </div>
          <div class="my-2 phone">
            +1 508 655 5858
          </div>
        </div>
        <div class="social">
          <div class="font-bold mt-2 mb-1">Follow us</div>
          <div class="social-links flex justify-between ">
            <a v-for="link of socialLinks" :href="link.href" target="_blank" class="mx-1.5">
              <img :src="`https://www.ogc.org/wp-content/themes/ogc/img/${link.img}`" :alt="link.alt">
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
<style lang="scss">
footer .logo {
  filter: brightness(0) invert(1);
}
</style>
