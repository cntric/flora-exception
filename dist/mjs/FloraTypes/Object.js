import { query } from "faunadb";
const { If, Select, Var, Lambda, And, ContainsPath, IsObject, Reduce } = query;
/**
 * Forms an optional field predicate.
 * @param predicate Is the type predicate used to verify the field if one is present
 * @returns
 */
export const $Optional = (predicate) => {
    predicate.optional = true;
    return predicate;
};
/**
 * Extracts predicates to check against type fields.
 * @param args are the typed object args.
 * @param obj is the obj to be checked.
 * @returns
 */
export const extractPredicates = (args, obj) => {
    return Object.keys(args).map((key) => {
        return If(ContainsPath(key, obj), args[key](Select(key, obj)), args[key].optional ? true : false);
    });
};
export const agg = "agg";
export const el = "el";
/**
 * Checks if all predicates are satisfied.
 * @param predicates
 * @returns
 */
export const PredicatesSatisfied = (predicates) => {
    return Reduce(Lambda([agg, el], And(Var(agg), Var(el))), true, predicates);
};
/**
 * Forms the predicate for a type object.
 * @param args
 * @returns
 */
export const $Object = (args) => (obj) => {
    return args ? If(IsObject(obj), PredicatesSatisfied(extractPredicates(args, obj)), false) : IsObject(obj);
};
