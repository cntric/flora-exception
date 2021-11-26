/**
 * A performance container type.
 * Use this when you want to maintain:
 * - type hinting
 * - readability of type predicates
 * But, need to exclude:
 * - Deep type checks
 * @param p
 * @returns
 */
export const $Perf = (p) => (obj) => true;
