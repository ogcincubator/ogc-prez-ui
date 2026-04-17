<template>
  <NuxtLayout contentonly>
    <template #default>
      <h1 class="text-4xl pb-3 text-ogc-dark-blue">OGC Definitions Service</h1>
      <h2 class="text-2xl pb-3 text-ogc-dark-blue">A trusted source for geospatial definitions, identifiers, and
        vocabularies</h2>

      <p>
        The OGC Definitions Service is the Open Geospatial Consortium’s linked
        data registry, providing stable, unique web
        identifiers (IRIs/URIs) for a wide range of official OGC resources.
        These identifiers are assigned and maintained according to policies set by the OGC Naming Authority.
      </p>

      <p>
        At its core, the Definitions Service is powered by a flexible, extensible knowledge graph. It supports the
        registration of
        new terms and enhances cross-linkages between definitions over time—ensuring geospatial concepts remain
        connected, discoverable, and reusable.
      </p>
      <p>
        Definitions are published using the <a
        href="https://www.w3.org/TR/skos-reference/" target="_blank">SKOS model</a>
        (Simple Knowledge Organization System), making them available in both human-readable and machine-readable
        formats. Many also include richer content through alternative profiles that offer extended information.
      </p>
      <p>
        Resources are organized into <strong>ConceptSchemes</strong> (vocabulary sets), with individual
        entries referred to as <strong>Concepts</strong>.
        Each Concept may have multiple profile views, helping users find exactly the information they need.
      </p>
      <p>
        For a deeper dive into how the OGC Definitions Service works and how to use it, visit the
        <a href="https://ogcincubator.github.io/rainbow-docs/about.html">About page</a>.
      </p>
    </template>
  </NuxtLayout>
</template>
<script setup lang="ts">
</script>
<style lang="scss">
p, ol, ul {
  margin-bottom: 0.75rem;
}

ol, ul {
  margin-left: 1rem;
  padding-left: 1rem;
}

ul {
  list-style-type: disc;
}

.quote {
  position: relative;

  &:before {
    content: "“";
    position: absolute;
    display: block;
    font-size: 100px;
    opacity: 0.5;
    font-family: 'Georgia Pro', Georgia, 'DejaVu Serif', Times, 'Times New Roman', FreeSerif, 'DejaVu Math TeX', 'URW Bookman L', serif;
    top: 10px;
    left: 10px;
    line-height: 1;
  }
}

#target-audience {
  ul {
    margin: 0;
    list-style: none;
  }

  li {
    padding-left: 1rem;

    &:before {
      color: var(--color-emerald-600);
      content: "✓";
      font-weight: bold;
      position: absolute;
      margin-left: -1rem;
    }
  }
}

#what-rainbow-is-not {
  ul {
    margin: 0;
    list-style: none;
  }

  li {
    padding-left: 1rem;

    &:before {
      color: var(--color-red-600);
      content: "✗";
      font-weight: bold;
      position: absolute;
      margin-left: -1rem;
    }
  }
}

#what-rainbow-enables {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    padding-left: 1.5rem;
    background: no-repeat left 0.2em;
    background-size: 16px 16px;

    &.item-block {
      background-image: url(../assets/img/home/brick.svg);
    }

    &.item-crossdomain {
      background-image: url(../assets/img/home/crossdomain.svg);
    }

    &.item-cost {
      background-image: url(../assets/img/home/cost.svg);
    }

    &.item-trust {
      background-image: url(../assets/img/home/trust.svg);
    }

    &.item-ai {
      background-image: url(../assets/img/home/ai.svg);
    }
  }
}
</style>