<script lang="ts" setup>
import { ChevronRight, Info } from "lucide-vue-next";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { type SearchResultsProps } from "prez-components";
import type { PrezFocusNode, PrezLinkParent, PrezNode } from "prez-lib";

const node = resolveComponent("Node") as Component;
const term = resolveComponent("Term") as Component;
const literal = resolveComponent("Literal") as Component;
const itemLink = resolveComponent("ItemLink") as Component;

const props = defineProps<SearchResultsProps>();

const components = computed(() => props._components ?? { node, term, literal, itemLink });

function getParent(resource: PrezFocusNode): PrezLinkParent | undefined {
    // TODO: self should not be listed in parents
    return resource.links?.map(l => l.parents?.filter(p => p.label && p.url !== l.value).slice(-1)[0])[0];
}

const groupedResults = computed(() => {
    const map = new Map<string, { resource: PrezFocusNode; weight: number; predicates: PrezNode[] }>();
    for (const result of props.results) {
        const key = result.resource.value;
        const existing = map.get(key);
        if (existing) {
            if (result.weight > existing.weight) existing.weight = result.weight;
            if (!existing.predicates.some(p => p.value === result.predicate.value)) {
                existing.predicates.push(result.predicate);
            }
        } else {
            map.set(key, { resource: result.resource, weight: result.weight, predicates: [result.predicate] });
        }
    }
    return [...map.values()].sort((a, b) => b.weight - a.weight);
});
</script>

<template>
    <!-- SearchResults -->
    <Table v-if="props.results.length" class="search-results">
        <TableBody>
            <TableRow v-for="result in groupedResults" :key="result.resource.value">
                <TableCell class="flex flex-col gap-1 whitespace-normal">
                    <div class="flex flex-row items-center gap-2">
                        <template v-for="parent in [getParent(result.resource)]">
                            <span v-if="parent" class="inline-flex flex-row items-center gap-1">
                                <component :is="components.itemLink" :to="parent.url" variant="search-results">{{ parent.label?.value }}</component>
                                <ChevronRight class="size-4" />
                            </span>
                        </template>
                        <span class="font-bold mr-auto">
                            <component :is="components.term" :term="result.resource" variant="search-results" />
                        </span>
                        <span class="flex flex-row gap-1">
                            <Badge v-for="type in result.resource.rdfTypes" variant="outline" class="text-xs">
                                <component :is="components.node" :term="type" variant="search-results" />
                            </Badge>
                        </span>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger class="cursor-default">
                                    <span class="text-muted-foreground"><Info class="size-4" /></span>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <div v-for="predicate in result.predicates" :key="predicate.value">
                                        Matched on <component :is="components.node" :term="predicate" variant="search-results" />
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <div v-if="result.resource.description">
                        <component :is="components.literal" class="overflow-hidden text-ellipsis line-clamp-3 text-muted-foreground italic text-sm" hide-language :term="result.resource.description" />
                    </div>
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
</template>
