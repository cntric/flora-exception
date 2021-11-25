"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$Tuple = exports.mapPredicates = void 0;
const query_1 = require("faunadb/query");
/**
 *
 * @param obj
 * @param predicates
 */
const mapPredicates = (obj, predicates) => {
    return predicates.map((Predicate, index) => {
        return (0, query_1.If)((0, query_1.ContainsPath)(index, obj), Predicate((0, query_1.Select)(index, obj)), Predicate.optional ? true : false);
    });
};
exports.mapPredicates = mapPredicates;
const agg = "agg";
const el = "el";
/**
 * Checks if all elements in an array are of a certain type
 * @param Predicate
 * @returns
 */
const $Tuple = (...predicates) => (obj) => {
    const mappedPredicates = (0, exports.mapPredicates)(obj, predicates);
    return (0, query_1.If)((0, query_1.IsArray)(obj), (0, query_1.And)(mappedPredicates), false);
};
exports.$Tuple = $Tuple;
