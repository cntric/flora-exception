"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$Object = exports.PredicatesSatisfied = exports.el = exports.agg = exports.extractPredicates = exports.$Optional = void 0;
const faunadb_1 = require("faunadb");
const { If, Select, Var, Lambda, And, ContainsPath, IsObject, Reduce } = faunadb_1.query;
/**
 * Forms an optional field predicate.
 * @param predicate Is the type predicate used to verify the field if one is present
 * @returns
 */
const $Optional = (predicate) => {
    predicate.optional = true;
    return predicate;
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
        return If(ContainsPath(key, obj), args[key](Select(key, obj)), args[key].optional ? true : false);
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
    return Reduce(Lambda([exports.agg, exports.el], And(Var(exports.agg), Var(exports.el))), true, predicates);
};
exports.PredicatesSatisfied = PredicatesSatisfied;
/**
 * Forms the predicate for a type object.
 * @param args
 * @returns
 */
const $Object = (args) => (obj) => {
    return args ? If(IsObject(obj), (0, exports.PredicatesSatisfied)((0, exports.extractPredicates)(args, obj)), false) : IsObject(obj);
};
exports.$Object = $Object;
