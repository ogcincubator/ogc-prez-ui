<script setup lang="ts">
import type {PrezDataItem} from "prez-lib";
import * as vNG from "v-network-graph";
import * as dagre from "dagre";
import {VNetworkGraph, VEdgeLabel} from 'v-network-graph';
import {useSparqlSelect} from "~/composables/useSparql";
import entityIcon from '@/assets/widgets/provenance/entity.svg';
import activityIcon from '@/assets/widgets/provenance/activity.svg';
import agentIcon from '@/assets/widgets/provenance/agent.svg';

type ProvType = 'self' | 'entity' | 'activity' | 'agent';

interface Node extends vNG.Node {
  id: string;
  label?: string | null;
  provType: ProvType;
  resourceType: 'uri' | 'bnode';
}

interface Edge extends vNG.Edge {
  predicate: string;
}

interface GraphData {
  nodes: Record<string, Node>;
  edges: Record<string, Edge>;
  layouts: vNG.Layouts;
}

const NODE_ICONS: Record<ProvType, string> = {
  'self': entityIcon,
  'entity': entityIcon,
  'activity': activityIcon,
  'agent': agentIcon,
};

const QUERY = `
PREFIX prov: <http://www.w3.org/ns/prov#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
SELECT * WHERE {
  {
    <__SUBJECT__> prov:wasGeneratedBy ?upstreamActivity
    OPTIONAL { ?upstreamActivity rdfs:label|skos:prefLabel ?upstreamActivityLabel }
    OPTIONAL {
      ?upstreamActivity prov:used ?upstreamEntity .
      OPTIONAL { ?upstreamEntity rdfs:label|skos:prefLabel ?upstreamEntityLabel }
    }
    OPTIONAL {
      ?upstreamActivity prov:wasAssociatedWith ?agent .
      OPTIONAL { ?agent rdfs:label|skos:prefLabel ?agentLabel }
      FILTER(ISIRI(?agent) || BOUND(?agentLabel))
    }
    FILTER(ISIRI(?upstreamActivity) || ISIRI(?upstreamEntity) || BOUND(?upstreamActivityLabel) || BOUND(?upstreamEntityLabel))
  } UNION {
    <__SUBJECT__> prov:wasDerivedFrom ?upstreamEntity
    OPTIONAL { ?upstreamEntity rdfs:label|skos:prefLabel ?upstreamEntityLabel }
    FILTER(ISIRI(?upstreamEntity) || BOUND(?upstreamEntityLabel))
  } UNION {
    <__SUBJECT__> prov:wasAttributedTo ?agent
    OPTIONAL { ?agent rdfs:label|skos:prefLabel ?agentLabel }
    FILTER(ISIRI(?agent) || BOUND(?agentLabel))
  } UNION {
    ?downstreamActivity prov:used <__SUBJECT__>
    OPTIONAL { ?downstreamActivity rdfs:label|skos:prefLabel ?downstreamActivityLabel }
    OPTIONAL {
      ?downstreamEntity prov:wasGeneratedBy ?downstreamActivity
      OPTIONAL { ?downstreamEntity rdfs:label|skos:prefLabel ?downstreamEntityLabel }
    }
    FILTER(ISIRI(?downstreamActivity) || ISIRI(?downstreamEntity) || BOUND(?downstreamActivityLabel) || BOUND(?downstreamEntityLabel))
  } UNION {
    ?downstreamActivity prov:wasGeneratedBy <__SUBJECT__>
    OPTIONAL { ?downstreamEntity rdfs:label|skos:prefLabel ?downstreamEntityLabel }
    FILTER(ISIRI(?downstreamEntity) || BOUND(?downstreamEntityLabel))
  }
}
`.trim();

const props = defineProps({
  data: {
    type: Object as PropType<PrezDataItem>,
  },
});

const graphData = ref<GraphData | null>(null);
const graphHeight = ref(200);

const layoutNodes = () => {
  if (!graphData.value || !Object.keys(graphData.value.nodes).length) {
    return;
  }

  const nodeSize = 10;
  const { nodes, edges, layouts } = graphData.value;
  const g = new dagre.graphlib.Graph();
  g.setGraph({
    rankdir: 'LR',
    nodesep: nodeSize * 8,
    edgesep: nodeSize,
    ranksep: nodeSize * 16,
  });
  g.setDefaultEdgeLabel(() => ({}));
  Object.entries(nodes).forEach(([nodeId, node]) => {
    g.setNode(nodeId, { label: node.label, width: nodeSize, height: nodeSize });
  });
  // PROV-O edges point right-to-left (derived → original), so reverse for dagre LR ranking
  Object.values(edges).forEach(edge => {
    g.setEdge(edge.target, edge.source);
  });

  // Add phantom nodes so self is always in the center rank when one side is absent
  const selfNodeId = Object.entries(nodes).find(([, n]) => n.provType === 'self')?.[0];
  if (selfNodeId) {
    const hasUpstream = Object.values(edges).some(e => e.source === selfNodeId);
    const hasDownstream = Object.values(edges).some(e => e.target === selfNodeId);
    if (!hasUpstream) {
      g.setNode('__phantom_left__', { width: 0, height: 0 });
      g.setEdge('__phantom_left__', selfNodeId);
    }
    if (!hasDownstream) {
      g.setNode('__phantom_right__', { width: 0, height: 0 });
      g.setEdge(selfNodeId, '__phantom_right__');
    }
  }

  dagre.layout(g);

  const positions: {x: number, y: number}[] = [];
  g.nodes().forEach((nodeId: string) => {
    if (nodeId.startsWith('__phantom_')) return;
    const {x, y} = g.node(nodeId);
    layouts.nodes[nodeId] = {x, y};
    positions.push({x, y});
  });

  // Center vertically around y=0 and derive container height from content extent
  if (positions.length > 0) {
    const yMin = Math.min(...positions.map(p => p.y));
    const yMax = Math.max(...positions.map(p => p.y));
    const yOffset = (yMin + yMax) / 2;
    Object.values(layouts.nodes).forEach(n => { n.y -= yOffset; });
    graphHeight.value = Math.max(120, yMax - yMin + nodeSize * 8);
  }
};

const configs = reactive(
  vNG.defineConfigs({
    view: {
      autoPanAndZoomOnLoad: "fit-content",
      onBeforeInitialDisplay: layoutNodes,
    },
    edge: {
      type: 'curve',
      marker: {
        target: {
          type: 'arrow',
        },
      },
    },
    node: {
      label: {
        visible: true,
        direction: "south",
        text: 'label',
      },
    },
  }),
);

const getNodeLabel = (node: Node) => {
  return node.label || (node.resourceType === 'uri' ? node.id.replace(/.*[#/]/, '') : null);
};

const apiEndpoint = useGetPrezAPIEndpoint();

const eventHandlers: vNG.EventHandlers = {
  "node:click": ({ node }) => {
    const nodeUri = graphData.value?.nodes[node]?.id;
    if (!nodeUri) return;
    const base = apiEndpoint.endsWith('/') ? apiEndpoint.slice(0, -1) : apiEndpoint;
    window.open(`${base}/object?uri=${encodeURIComponent(nodeUri)}`, '_blank');
  },
};

watchEffect(async () => {
  const entityUri = props.data?.data?.value;
  graphData.value = null;
  if (!entityUri) {
    return;
  }
  const nodes: Record<string, Node> = {};
  const selfId = `uri-${entityUri}`;
  nodes[selfId] = {
    id: entityUri,
    provType: 'self',
    label: props.data.data.label?.value || entityUri.replace(/.*[#/]/, ''),
    resourceType: 'uri',
  };
  const edges: Record<string, Edge> = {};
  const layouts: vNG.Layouts = {
    nodes: {},
  };
  layouts['nodes'][selfId] = {
    x: 0,
    y: 0,
    fixed: true,
  };

  const q = QUERY.replaceAll('__SUBJECT__', entityUri);
  const bindings = (await useSparqlSelect(q))?.results?.bindings || [];

  if (!bindings.length) {
    return;
  }

  const addNode = (sparqlNode: Record<string, any>, provType: ProvType, label?: string) => {
    const nodeId = `${sparqlNode.type}-${sparqlNode.value}`;
    if (!Object.hasOwn(nodes, nodeId)) {
      nodes[nodeId] = {
        id: sparqlNode.value,
        provType,
        resourceType: sparqlNode.type,
        label: label || (sparqlNode.type === 'uri' ? sparqlNode.value.replace(/.*[#/]/, '') : null),
      };
    }
    return nodeId;
  };

  const addEdge = (sourceId: string, targetId: string, predicate: string) => {
    const edgeId = `${sourceId}__${targetId}`;
    if (!Object.hasOwn(edges, edgeId)) {
      edges[edgeId] = {
        source: sourceId,
        target: targetId,
        predicate,
      };
    }
    return edgeId;
  };

  bindings.forEach((binding: Record<string, any>) => {
    let agentId, upstreamActivityId, downstreamActivityId, upstreamEntityId, downstreamEntityId;
    /*if (binding.agent) {
      agentId = addNode(binding.agent, 'agent', binding.agentLabel.value);
    }*/
    /*if (binding.upstreamActivity) {
      upstreamActivityId = addNode(binding.upstreamActivity, 'activity', binding.upstreamActivityLabel?.value);
    }
    if (binding.downstreamActivity) {
      downstreamActivityId = addNode(binding.downstreamActivity, 'activity', binding.downstreamActivityLabel?.value);
    }*/
    if (binding.upstreamEntity) {
      upstreamEntityId = addNode(binding.upstreamEntity, 'entity', binding.upstreamEntityLabel?.value);
    }
    if (binding.downstreamEntity) {
      downstreamEntityId = addNode(binding.downstreamEntity, 'entity', binding.downstreamEntityLabel?.value);
    }
    if (agentId) {
      addEdge(selfId, agentId, 'wasAttributedTo');
      if (upstreamActivityId) {
        addEdge(upstreamActivityId, agentId, 'wasAssociatedWith');
      }
    }
    if (downstreamEntityId) {
      addEdge(downstreamEntityId, selfId, 'wasDerivedFrom');
      if (downstreamActivityId) {
        addEdge(downstreamEntityId, downstreamActivityId, 'wasGeneratedBy');
      }
    }
    if (downstreamActivityId) {
      addEdge(downstreamActivityId, selfId, 'used');
    }
    if (upstreamEntityId) {
      addEdge(selfId, upstreamEntityId, 'wasDerivedFrom');
      if (upstreamActivityId) {
        addEdge(upstreamActivityId, upstreamEntityId, 'used');
      }
    }
    if (upstreamActivityId) {
      addEdge(selfId, upstreamActivityId, 'wasGeneratedBy');
    }
  });

  graphData.value = {nodes, edges, layouts};
});

</script>

<template>
  <div class="provenance-widget" v-if="graphData" :style="{ height: graphHeight + 'px' }">
    <v-network-graph
      :zoom-level="0.5"
      :nodes="graphData.nodes"
      :edges="graphData.edges"
      :configs="configs"
      :layouts="graphData.layouts"
      :event-handlers="eventHandlers"
    >
      <template #override-node="{ nodeId, scale, config, ...slotProps }">
        <title>{{ graphData.nodes[nodeId]!.id }}</title>
        <image
          :class="`prov-type-${graphData.nodes[nodeId]!.provType}`"
          style="cursor: pointer"
          :x="-config.radius * scale"
          :y="-config.radius * scale"
          :width="config.radius * scale * 2"
          :height="config.radius * scale * 2"
          :xlink:href="NODE_ICONS[graphData.nodes[nodeId]!.provType]"
        />
      </template>

      <template #override-node-label="{ nodeId, x, y, config, textAnchor, dominantBaseline }">
        <text :x="x" :y="y" :text-anchor="textAnchor" :dominant-baseline="dominantBaseline" :font-size="config.fontSize" style="cursor: pointer">
          <title>{{ graphData.nodes[nodeId]!.id }}</title>
          {{ graphData.nodes[nodeId]!.label }}
        </text>
      </template>

      <template #edge-label="{ edge, ...slotProps }">
        <v-edge-label :text="edge.predicate" align="center" vertical-align="above" v-bind="slotProps"/>
      </template>
    </v-network-graph>
  </div>
</template>

<style>
.provenance-widget {
  width: 100%;
}
</style>
