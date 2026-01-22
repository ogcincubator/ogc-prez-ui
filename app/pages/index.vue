<template>
  <NuxtLayout contentonly>
    <template #default>
      <h1 class="text-4xl pb-3 text-ogc-dark-blue">Welcome to the OGC RAINBOW</h1>

      <h2 class="text-2xl pb-3 text-ogc-dark-blue">What is the OGC RAINBOW</h2>

      <div class="flex items-start lg:flex-nowrap flex-wrap">
        <div class="flex-1">
          <p><strong>OGC RAINBOW</strong> is a methodology and shared framework developed by the Open Geospatial
            Consortium
            (OGC) to tackle one of the hardest problems in data interoperability: making meaning explicit, discoverable,
            and
            reusable for both people and machines.</p>
          <p>Across government, science, and industry, organizations rely on geospatial and related data to make
            decisions.
            Even when data follows standards, it is often hard to combine, reuse, and trust because:</p>
          <ul>
            <li>Different datasets use the same words to mean different things.</li>
            <li>Standards are long documents that people must interpret manually.</li>
            <li>Systems are technically connected but do not understand each other.</li>
            <li>Data integration is slow, expensive, and fragile.</li>
            <li>AI tools struggle because the meaning of data is unclear.</li>
          </ul>
        </div>

        <div
          class="quote lg:w-2/5 text-white mx-auto lg:ml-16 w-10/12 px-16 py-7 bg-gray-600 text-center rounded-md border-b-gray-800 lg:text-xl text-md italic">
          <strong>OGC RAINBOW</strong> provides a common way to describe and connect existing standards, models, and
          vocabularies—without
          creating
          <br class="hidden lg:block"/>
          yet another standard. It turns interoperability from a recurring problem into a managed capability.
        </div>

      </div>

      <div id="target-audience" class="my-12 grid md:grid-cols-2 grid-cols-1 gap-x-8 gap-y-8 max-w-240 mx-auto mb-6">
        <div id="target-developers" class="rounded-md shadow-lg p-5 border-gray-100 border">
          <h3 class="text-ogc-dark-blue text-xl font-bold text-center mb-1">For developers</h3>
          <ul>
            <li>Easier implementation through reusable <a href="https://blocks.ogc.org"><strong>OGC Blocks</strong></a>.
            </li>
            <li>Reduced ambiguity and faster integration.</li>
          </ul>
        </div>
        <div id="target-data-managers" class="rounded-md shadow-lg p-5 border-gray-100 border">
          <h3 class="text-ogc-dark-blue text-xl font-bold text-center mb-1">For data managers</h3>
          <ul>
            <li>Improved interoperability across domains without forcing a single model.</li>
            <li>Better provenance and trust.</li>
          </ul>
        </div>
        <div id="target-decision-makers" class="rounded-md shadow-lg p-5 border-gray-100 border">
          <h3 class="text-ogc-dark-blue text-xl font-bold text-center mb-1">For decision-makers</h3>
          <ul>
            <li>Strategic benefits: lower cost, faster integration, future-proofing.</li>
            <li>Turn interoperability into a scalable capability.</li>
          </ul>
        </div>
        <div id="target-ai" class="rounded-md shadow-lg p-5 border-gray-100 border">
          <h3 class="text-ogc-dark-blue text-xl font-bold text-center mb-1">For AI &amp; automation</h3>
          <ul>
            <li>Explicit semantics for better AI performance.</li>
            <li>Reduces hallucination and misinterpretation.</li>
          </ul>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <div id="what-rainbow-enables" class="">
          <h2 class="text-2xl pb-3 text-ogc-dark-blue">What RAINBOW enables</h2>

          <ul>
            <li class="item-block">Make standards easier to use: Break standards into clear, reusable blocks with explicit definitions.
            </li>
            <li class="item-crossdomain">Improve interoperability across domains: Align data without forcing uniformity.</li>
            <li class="item-cost">Reduce cost and time to market: Less manual interpretation, more reuse.</li>
            <li class="item-trust">Increase trust and transparency: Clear provenance and standards alignment.</li>
            <li class="item-ai">Prepare data for AI and automation: Explicit meaning improves reliability.</li>
          </ul>

        </div>

        <div id="what-rainbow-is-not" class="">
          <h2 class="text-2xl pb-3 text-ogc-dark-blue">What RAINBOW is not</h2>

          <p>RAINBOW is deliberately flexible, decentralized, and standards-based. It does not:</p>

          <ul>
            <li>Replace existing OGC standards. </li>
            <li>Force a single central system or platform. </li>
            <li>Lock organizations into specific tools or vendors.</li>
          </ul>

        </div>
      </div>

      <h2 class="text-2xl pb-3 text-ogc-dark-blue mt-12">OGC Definitions Service</h2>
      <h3 class="text-xl pb-3 text-ogc-dark-blue">A trusted source for geospatial definitions, identifiers, and
        vocabularies</h3>

      <p>
        Part of the OGC RAINBOW, the OGC Definitions Service is the Open Geospatial Consortium’s linked
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