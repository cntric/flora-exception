"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$Tuple = exports.mapPredicates = void 0;
const faunadb_1 = require("faunadb");
/**
 *
 * @param obj
 * @param predicates
 */
const mapPredicates = (obj, predicates) => {
    return predicates.map((Predicate, index) => {
        return (0, faunadb_1.If)((0, faunadb_1.ContainsPath)(index, obj), Predicate((0, faunadb_1.Select)(index, obj)), Predicate.optional ? true : false);
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
    return (0, faunadb_1.If)((0, faunadb_1.IsArray)(obj), (0, faunadb_1.And)(mappedPredicates), false);
};
exports.$Tuple = $Tuple;
