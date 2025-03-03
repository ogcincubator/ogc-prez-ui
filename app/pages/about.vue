<script setup lang="ts">

import TableOfContents from "~/components/dynamicPages/TableOfContents.vue";

const mainContent = ref();

</script>
<template>
  <NuxtLayout contentonly>
    <template #default>
      <h1>OGC RAINBOW <small class="text-base">(formerly OGC Definitions Server)</small></h1>

      <div class="toc md:float-right my-2 md:m-5 md:max-w-[550px] text-sm rounded-md shadow-lg p-2">
        <p class="text-ogc-dark-blue font-bold">On this page</p>
        <TableOfContents :element="mainContent"></TableOfContents>
      </div>
      <div ref="mainContent">
        <h2 id="1-0-about">About OGC RAINBOW</h2>
        <p>The OGC Registry for Accessible Identifiers of Names and Basic Ontologies for the Web (RAINBOW) is a Web
          accessible source of information about things (“Concepts”) the OGC defines or that communities ask the OGC to
          host on their behalf. It applies <a href="https://www.go-fair.org/fair-principles">FAIR principles</a> to the
          key concepts that underpin interoperability in systems using OGC specifications.</p>

        <h3>Where is it?</h3>
        <p>OGC RAINBOW is intended to be a <em>node</em> in an interoperable ecosystem of resources published by
          different
          communities. </p>
        <p>The “core” OGC RAINBOW can be accessed at <a
            href="https://www.opengis.net/def">https://www.opengis.net/def</a>
          and holds definitions for <strong>terms defined by OGC</strong> processes, along with a range of “metamodel”
          resources we use to describe and interconnect these resources. There are a number of different types of
          resource
          (all linked together to support the Findable principle). As these resource types mature more user friendly
          entry
          points will be provided.</p>
        <p>The OGC also hosts additional nodes for community content and specification development purposes.</p>
        <p>These are the set of nodes planned to come online shortly:</p>

        <ul>
          <li><strong>hosted</strong> – content hosted by OGC on behalf of communities using OGC standards
            <ul>
              <li><strong>vocabularies</strong> – vocabularies requiring a hosting solution for projects and communities
                the OGC supports that cannot provide long-term stable hosting for these resources <em>in a FAIR
                  way.</em>
              </li>

              <li><strong>profiles register </strong> – this is a register of specifications that use or refine OGC
                standards for use in specific domains, but may not include OGC managed resources. (This register will
                duplicate OGC defined profiles, however for these and any other profiles defined by external agencies
                their URIs will link back to the OGC authoritative versions)
              </li>

              <li><strong>examples</strong> – example data intended as a <em>reference implementation</em> to support
                externally hosted conted – such as <strong>observableProperties </strong>examples to support
                Observations
              </li>
            </ul>
          </li>

          <li><strong>staging</strong> – an environment where content may be reviewed before publishing to core or
            hosted
            environments
          </li>

          <li><strong>sandpit</strong> – an environment for developing and testing resources prior to submission for use
            in standards
          </li>
        </ul>

        <p>In addition, OGC manages a <strong>dev</strong> environment to test new functionality.</p>

        <p>This is all supported by a modular containerised open source deployment toolkit, allowing others to replicate
          such nodes. </p>

        <h3 id="1-1-offers">What does it define?</h3>

        <p>The <em>things</em> hosted by Definition Server nodes can be anything that is important in the course of
          interoperability around spatial information where the OGC plays a role in facilitating common understanding –
          either through publishing specifications or assisting communities to share related concepts. OGC uses stable
          web
          addresses (URIs) to unambiguously identify concepts in its specifications. RAINBOW makes those URIs “work” –
          i.e. makes them <em>dereference</em> to a definition that can be used.</p>

        <p>Examples include the <a href="http://www.opengis.net/def/glossary">OGC glossary</a>, terms from <a
            href="http://www.opengis.net/def/function/geosparql">GeoSPARQL</a>, technical terms from application schemas
          such as the <a href="https://www.opengis.net/def/appschema/hy_features/hyf/HY_HydroFeature">HY_Features
            schema</a> from the Hydrology Domain Working Group, and many others.</p>

        <p>The participation of OGC in the European Union’s Horizon 2020 research and innovation programme projects <a
            href="https://www.ogc.org/initiatives/databio/">DataBio</a> (Grant Agreement No 732064), <a
            href="https://www.ogc.org/initiatives/nextgeoss/">NextGEOSS</a> (Grant Agreement No 730329), <a
            href="https://www.ogc.org/initiatives/cybele/">CYBELE</a> (Grant Agreement No 825355),&nbsp;<a
            href="https://www.ogc.org/initiatives/iliad/">ILIAD</a> (Grant agreement No 101037643), and <a
            href="https://www.ogc.org/initiatives/demeter/">DEMETER</a> (Grant agreement No 857202) has contributed to
          the
          development of The OGC RAINBOW, ensuring that these and future projects can benefit from a free and
          sustainable
          service.</p>

        <h3>What does it do?</h3>

        <ol>
          <li>Implements a common way to <strong>resolve</strong> terms published by OGC to get details of definitions
            (instead of downloading large or complex documents in varying formats).
          </li>

          <li>Ability to get machine readable versions of these details (e.g. JSON to allow simple integration of
            details
            into Web and mobile applications).
          </li>

          <li>Per-term or as-package options for downloading details singly or in an appropriate scoped package.</li>

          <li>Flexible capability to cross-link between terms.</li>

          <li>Ability to use any information model to extend available details.</li>
        </ol>

        <h3 id="1-2-terminology"><a></a>Terminology</h3>

        <p>Terminology here is important and carefully specified because different types of things behave
          differently!</p>

        <ul>
          <li><em><strong>Concept</strong></em> – an individual definition&nbsp;</li>

          <li><em><strong>ConceptScheme</strong></em> – a set of <strong>Concepts</strong> and
            <strong>Collections</strong> managed as a whole – this is deemed to be a “Register” according to ISO19135
            (Procedures for Registration)&nbsp;
          </li>

          <li><em><strong>Collection</strong></em> – a way of grouping <strong>Concepts</strong> – inside or across
            ConceptSchemes, without requiring “broader/narrower” semantics.
          </li>

          <li><em><strong>Term</strong></em> – an identifiable object – i.e. any of <strong>Concept</strong>, <strong>ConceptScheme</strong>
            etc.&nbsp;
          </li>

          <li><em><strong>Definition</strong></em> – the content describing a <strong>term</strong> – may consist of
            text
            or a data object or a combination of both.&nbsp;
          </li>

          <li><em><strong>Resource</strong></em> – an information object on the Web. Typically the RAINBOW will redirect
            qualified <strong>term</strong> identifiers to some resource.
          </li>
        </ul>

        <p><strong>Concept</strong>, <strong>ConceptScheme</strong>, and <strong>Collections</strong> are defined by the
          Simple Knowledge Organization System (<a href="https://www.w3.org/TR/skos-reference">SKOS</a>) (see <a
              href="#ContentInterop">below</a>).</p>

        <h3 id="1-3-status"><a></a>Current Status</h3>

        <p>The RAINBOW has a complete set of <strong>terms</strong> that have been defined by OGC since the inception of
          the OGC Naming Authority – which aims to keep all such URL references consistent.</p>

        <p>Efforts are underway to improve the scope and detail of information available about each
          <strong>term</strong>
          – in particular cross references between specification documents and related <strong>Concepts</strong>.</p>

        <p>The access API implements the draft W3C Recommendation for <a href="https://www.w3.org/TR/dx-prof-conneg/">“Content
          Negotiation by Profile”</a>.</p>

        <h3 id="1-4-fair">Making Concepts FAIR – Findable, Accessible, Interoperable, and
          Reusable<br></h3>

        <h4><strong>Findable</strong></h4>

        <p>RAINBOW is implemented using Linked Data principles – so the combination of stable URIs allowing references
          to
          be made from outside, and “follow your nose” navigation via links from one <strong>term</strong> to related
          <strong>terms</strong> provides enhanced <em>findability</em>.</p>

        <p>Currently a limited search capability over <strong>Concept</strong> definitions is provided, however the
          contents are indexable by external search engines.</p>

        <h4><strong>Accessible</strong></h4>

        <p>RAINBOW does not make any assumptions about the client software that may be used now or in the future to
          access
          definitions, other than the use of HTTP protocols. This enhances <em>accessibility</em> for different
          environments.</p>

        <p>The “Web-friendly” way of using an identifier (i.e. a URL) to get more information is augmented by “content
          negotiation” – RAINBOW can deliver both user-friendly Web pages and other forms of resource representations,
          e.g. JSON-LD or Turtle (TTL).</p>

        <p>Figure 1 shows different views of the <strong>Concept</strong> of an <em>Area of Interest</em>. The left
          panel
          shows an HTML representation, the middle shows the same information using TTL, and the right using JSON. All
          three representations have the same content, but differ in its serialization/format. This allows both human
          users to explore the OGC Definition Server, as well as machines to process its content.</p>

        <figure class="size-large my-3 text-center">
          <img
              src="../../assets/img/about-fig1.png"
              alt="Various representations of the same content
            (fragments, HTML left, TTL middle, JSON right" class="inline-block">
          <figcaption><em><small>Figure 1. Various representations of the same content
            (fragments, HTML left, TTL middle, JSON right</small></em><br></figcaption>
        </figure>

        <h4><strong>Interoperable</strong></h4>

        <p>The <em>interoperability</em> of these term URI behaviours and the resources they provide access to is a key
          goal. There are several aspects of this handled using different mechanisms:</p>

        <ol>
          <li>Content model: can the client understand how the data is structured?</li>

          <li>Encoding: can the client parse the response?</li>

          <li>Interaction: how can a client ask for the form it needs?</li>
        </ol>

        <h5><a></a>Content Interoperability</h5>

        <p>The identifiers mentioned above, i.e. the URLs that can deliver content (in this case details of definitions)
          to the user, are termed <strong><a href="https://www.w3.org/TR/skos-reference/#concepts">Concepts</a></strong>
          and are organized into <strong><a
              href="https://www.w3.org/TR/skos-reference/#schemes">ConceptSchemes</a></strong> – and <strong><a
              href="https://www.w3.org/TR/skos-reference/#collections">Collections</a></strong>.</p>

        <p><em>NB: richer data models such as UML and OWL may provide the authoritative source of definitions, however
          these can all be mapped to the simplified Concept model to support common approaches to discovering these many
          and varied authoritative sources. </em></p>

        <p><strong>Concept</strong>, <strong>ConceptScheme</strong>, and <strong>Collections</strong> are defined by the
          <em>Simple Knowledge Organization System</em> (<a href="https://www.w3.org/TR/skos-reference">SKOS</a>). SKOS
          is
          a W3C recommendation and widely used as a standard data model for sharing and linking knowledge organization
          systems via the Web.</p>

        <p>So why SKOS? Many knowledge organization systems, such as thesauri, taxonomies, classification schemes, and
          subject heading systems, share similar structure, and are used in similar applications. Even though they might
          even share exact semantics, you need to learn that by explicitly discovering, accessing, and evaluating the
          content. Without a standardized interface, this endeavor is labor-intensive and can hardly be executed by
          machines.</p>

        <p>SKOS captures much of this similarity and makes it explicit. It enables data and technology sharing across
          diverse applications by providing a lightweight, intuitive language for developing and sharing knowledge. In
          most cases, existing knowledge can be transformed into SKOS, because the SKOS data model provides a standard,
          low-cost migration path for porting existing knowledge organization systems.</p>

        <h5>Encoding Interoperability</h5>

        <p>RAINBOW currently offers a range of encodings for all terms:&nbsp;</p>

        <ol>
          <li>HTML&nbsp;</li>

          <li>JSON (using <a href="https://json-ld.org/" target="_blank">JSON-LD</a> augmentations to specify URLs )&nbsp;
          </li>

          <li>RDF (as XML,TTL or JSON-LD)&nbsp;</li>

          <li>Plain text.</li>
        </ol>

        <p>Use of JSON-LD is suggested for most applications because it is simply JSON with extra annotations to turn
          relevant element names and values into unambiguous URIs. It’s an encoding of RDF, but easily parsed by
          browsers.</p>

        <p>Where applicable, certain types of resources are also available in the original or additional formats. For
          example, Application Schemas will be made available as XML schema (XSD) and UML (XMI) forms.</p>

        <h5>Interaction (API) Interoperability</h5>

        <p>The RAINBOW maximizes interoperability through its use of HTTP to access resources.</p>

        <p>Flexibility is managed through three key mechanisms based on W3C recommendations:</p>

        <ol>
          <li>Separation of the concepts of “things” and “information resources representing things”, as per <a
              href="https://www.w3.org/2001/tag/issues.html#httpRange-14">w3.org/2001/tag/issues.html#httpRange-14</a>
          </li>

          <li>Content-negotiation (asking for a specific encoding type in a HTTP GET response), as per <a
              href="https://www.w3.org/Protocols/rfc2616/rfc2616-sec12.html">w3.org/Protocols/rfc2616/rfc2616-sec12.html</a>
          </li>

          <li>Content-negotiation-by-application-profile (CNAP) (asking for a particular view of available information),
            as per <a href="https://www.w3.org/TR/dx-prof-conneg/">w3.org/TR/dx-prof-conneg/</a></li>
        </ol>

        <p><em>NB: CNAP is a recommendation undergoing final steps towards Recommendation at W3C with input from OGC
          RAINBOW design. </em></p>

        <p>As needs are identified, new profiles can be specified and arbitrary “graphs” created by custom API endpoints
          to deliver different views of the available semantic resources. Interoperability is supported by publishing
          these profiles as definition resources for reuse.</p>

        <h3>Reusable</h3>

        <p>The OGC Naming Authority manages RAINBOW to ensure all term URIs are stable with transparent governance.
          These
          identifiers can thus be safely used in external context. All content is freely available for reuse. Reuse is
          envisaged largely through the machine-readable versions.</p>

        <p><em>Note that documentation with appropriate licences will be retrofitted to this content – however its safe
          to
          assume that an appropriate licence is granted to re-use with attribution and without modification.</em></p>

        <h2 id="2-0-using">Using RAINBOW</h2>

        <h3 id="2-2-uri"><a></a>URI Access</h3>

        <p>RAINBOW can be accessed at <a href="https://www.opengis.net/def">https://www.opengis.net/def.</a></p>

        <p>Accessing definitions by following (i.e. “dereferencing”) OGC published URIs is supported.</p>

        <p>The server will respond with an HTTP 303 URI redirect to the current service interface appropriate to the
          requested profile (view) and format.</p>

        <p class="text-center"><code>http://www.opengis.net/def/docs/03-003r10<br>⇓<br>HTTP 303<br>Location: </code><a
            href="http://defs.opengis.net/vocprez/object?uri=http://www.opengis.net/def/docs/03-003r10">http://defs.opengis.net/vocprez/object?uri=http://www.opengis.net/def/do…</a>
        </p>

        <p>(this redirect is necessary for several reasones, such as the actual target resource URL may change as we
          improve the interface options for specific types of content, but the original URI will always work)</p>

        <h3 id="2-2-org"><a></a>Organization of ConceptSchemes, Collections, and Concepts</h3>

        <p>Every <strong>Concept</strong> belongs to a <strong>ConceptScheme</strong> that will usually be identified by
          the base part of the URI path:<br><code>http://www.opengis.net/def/docs/03-003r10 skos:inScheme
            http://www.opengis.net/def/docs</code></p>

        <p>Each <strong>ConceptScheme</strong> will have a “top level” <strong>Collection</strong> that contains a list
          of
          members (which may be a flat list or a list of sub-Collections). By default this will have a URI based on
          adding
          a “/” to the <strong>ConceptScheme</strong> URI. This is also made explicit in the data to allow link
          following:<br><code>http://www.opengis.net/def/docs
            policy:collectionView http://www.opengis.net/def/docs/</code></p>

        <p><em>NB: many systems conflate URL paths with and without trailing “/” to be the same thing – but this
          potentially leads to ambiguity and typically needs other non-standard mechanisms to access metadata about a
          collection.</em></p>

        <p><strong>Concepts</strong> may also be organised in a hierarchical “taxonomy” via a non-overlapping set of
          broader/narrower relationships, with the top of each hierarchy linked via skos:hasTopConcept from the parent
          <strong>ConceptScheme</strong>.</p>

        <p>This supports the following capabilities:</p>

        <ol>
          <li>ConceptSchemes are the “unit of governance” where metadata and download links for sets of definitions can
            be
            accessed
          </li>

          <li>Collections are a flexible nested way of listing related subsets of terms – where lists may overlap – but
            do
            not state semantic relationships between terms
          </li>

          <li>Concepts are the basic resources with definitions</li>

          <li>Concepts may be semantically related using broader/narrower and other match (e.g. skos:exactMatch)</li>
        </ol>

        <h3 id="2-3-search"><a></a>Search</h3>

        <p>A basic search capability over Concept definitions is provided via the underlying interface e.g.<br><code>http://defs.opengis.net/vocprez/search?search=Catchment&amp;from=all</code>
        </p>

        <h3 id="2-4-downloading"><a></a>Downloading Data</h3>

        <p>Every term includes a list of available formats for both the individual term and the collection or package
          that defines
          it:</p>

        <div>
          <figure class="text-center my-3">
            <img
                src="../../assets/img/about-fig2.png"
                alt="Resource alternate profiles / views"
                class="inline-block"
            >
            <figcaption><small><em>Figure 2. Resource alternate profiles / views</em></small></figcaption>
          </figure>
        </div>

        <p>The original sources can be downloaded from the OGC Naming Authority GitHub repository at <a
            href="https://github.com/opengeospatial/NamingAuthority" target="_blank">https://github.com/opengeospatial/NamingAuthority</a>
        </p>

        <h2 id="3-0-info"><a></a>For More Information</h2>

        <h3>Additional Resources</h3>

        <ul>
          <li><a href="https://www.w3.org/TR/skos-primer/">SKOS Primer</a></li>

          <li><a href="/standards/na">OGC Naming Authority (OGC-NA) Policies &amp; Procedures</a></li>
        </ul>

        <h3>Contact</h3>

        <p>OGC RAINBOW is managed by the OGC Naming Authority. <a href="/contact">Contact OGC</a> here.</p>

        <h3>Feedback</h3>

        <p>Feedback is welcome on how to improve any aspect of the OGC RAINBOW.</p>

        <p>If you intend to integrate or replicate aspects of the service please drop us a line so we can ensure future
          changes do not negatively impact you.</p>

        <p>The User Interface (HTML) views are largely “out-of-the-box”, and suggestions for improvement are welcome but
          may not be prioritized over content improvement and machine-readable options.</p>

        <h3>Additional Requirements</h3>

        <p>If RAINBOW is potentially able to solve a problem for a community, then it can be readily extended in various
          ways. In general, requests should be done through an existing OGC process, such as a Working Group, however
          technical feedback or requests to explore the feasibility of extended functionality can be made via the issues
          tracker here </p>
      </div>
    </template>
  </NuxtLayout>
</template>
