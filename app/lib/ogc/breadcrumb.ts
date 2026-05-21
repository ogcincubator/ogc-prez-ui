import type { PrezLinkParent } from 'prez-lib';

/**
 * In prez URLs the path alternates between structural routing markers and
 * named resource segments:
 *   /catalogs / {id} / col / {id} / it1 / {id} / ...
 *    idx 0      1      2     3      4     5
 *
 * Index 0 ("catalogs") is the entry point and meaningful to display.
 * Every even index ≥ 2 is a structural marker (col, it1, it2, …) that
 * adds no navigational value and should be hidden from the breadcrumb.
 */
export function filterBreadcrumbParents(parents: PrezLinkParent[]): PrezLinkParent[] {
    return parents.filter((_, i) => i === 0 || i % 2 === 1);
}