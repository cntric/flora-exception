"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$Object = exports.PredicatesSatisfied = exports.el = exports.agg = exports.extractPredicates = exports.$Optional = void 0;
const query_1 = require("faunadb/query");
/**
 * Forms an optional field predicate.
 * @param predicate Is the type predicate used to verify the field if one is present
 * @returns
 */
const $Optional = (Predicate) => {
    Predicate.optional = true;
    return Predicate;
};
exports.$Optional = $Optional;
/**
 * Extracts predicates to check against type fields.
 * @param args are the typed object args.
 * @param obj is the obj to be checked.
 * @returns
 */
const extractPredicates = (args, obj) => {
    return Object.keys(args).map((key) => {
        return (0, query_1.If)((0, query_1.ContainsPath)(key, obj), args[key]((0, query_1.Select)(key, obj)), args[key].optional ? true : false);
    });
};
exports.extractPredicates = extractPredicates;
exports.agg = "agg";
exports.el = "el";
/**
 * Checks if all predicates are satisfied.
 * @param predicates
 * @returns
 */
const PredicatesSatisfied = (predicates) => {
    return (0, query_1.Reduce)((0, query_1.Lambda)([exports.agg, exports.el], (0, query_1.And)((0, query_1.Var)(exports.agg), (0, query_1.Var)(exports.el))), true, predicates);
};
exports.PredicatesSatisfied = PredicatesSatisfied;
/**
 * Forms the predicate for a type object.
 * @param args
 * @returns
 */
const $Object = (args) => (obj) => {
    return args ? (0, query_1.If)((0, query_1.IsObject)(obj), (0, exports.PredicatesSatisfied)((0, exports.extractPredicates)(args, obj)), false) : (0, query_1.IsObject)(obj);
};
exports.$Object = $Object;
