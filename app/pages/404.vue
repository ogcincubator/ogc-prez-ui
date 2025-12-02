<script setup lang="ts">
const route = useRoute();
const resourceUri = route.query.uri;
</script>
<template>
  <NuxtLayout contentonly>
    <template #default>
      <h1 class="text-2xl mt-8">Resource not found</h1>
      <p v-if="resourceUri">Sorry, the requested resource (<code>{{ resourceUri }}</code>) could not be found.</p>
      <p v-else>Sorry, the requested resource could not be found.</p>
      <NuxtLink to="/">Go home</NuxtLink>
    </template>
  </NuxtLayout>
</template>
