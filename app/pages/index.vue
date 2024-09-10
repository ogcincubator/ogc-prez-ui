<template>
  <NuxtLayout contentonly>
    <template #default>
      <h1>Welcome to OGC RAINBOW</h1>

      <p>
        OGC RAINBOW publishes a range of resources managed by the OGC, and identified by unique stable web addresses
        (IRIs or URIs). These are determined through a set of policies managed by the OGC Naming Authority and managed
        through normal operational processes.
      </p>
      <p>
        The knowledge graph behind OGC RAINBOW is flexible and extensible, and the OGC will continue to register new
        terms and improve the cross-linkages between terms.
      </p>
      <p>
        Definitions are made available in an interoperable form using the <a
          href="https://www.w3.org/TR/skos-reference/" target="_blank">SKOS vocabulary</a> (or "taxonomy") model in both
        human- and machine-readable forms.
      </p>
      <p>
        Some definitions have richer information models with alternative profiles of the content available.
      </p>
      <p>
        Vocabularies are managed in sets called "ConceptSchemes", and definitions can usually be accessed individually
        as "Concepts" or via the containing set.
      </p>
      <p>
        The "alternate profiles" will provide a complete list of the available resources per definition.
      </p>
      <p>
        See the <nuxt-link to="/about" class="border-b-[3px] border-ogc-blue">about page</nuxt-link> page for more information on OGC
        RAINBOW.
      </p>
    </template>
  </NuxtLayout>
</template>