"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$Tuple = exports.mapPredicates = void 0;
const faunadb_1 = require("faunadb");
const { IsArray, Reduce, If, Lambda, Var, And, Select, ContainsPath } = faunadb_1.query;
/**
 *
 * @param obj
 * @param predicates
 */
const mapPredicates = (obj, predicates) => {
    return predicates.map((Predicate, index) => {
        return If(ContainsPath(index, obj), Predicate(Select(index, obj)), Predicate.optional ? true : false);
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
    return If(IsArray(obj), And(mappedPredicates), false);
};
exports.$Tuple = $Tuple;
