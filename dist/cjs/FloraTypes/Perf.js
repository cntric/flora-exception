"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$Perf = void 0;
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
const $Perf = (p) => (obj) => true;
exports.$Perf = $Perf;
