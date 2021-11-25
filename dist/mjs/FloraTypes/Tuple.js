import { IsArray, If, And, Select, ContainsPath } from "faunadb/query";
/**
 *
 * @param obj
 * @param predicates
 */
export const mapPredicates = (obj, predicates) => {
    return predicates.map((Predicate, index) => {
        return If(ContainsPath(index, obj), Predicate(Select(index, obj)), Predicate.optional ? true : false);
    });
};
const agg = "agg";
const el = "el";
/**
 * Checks if all elements in an array are of a certain type
 * @param Predicate
 * @returns
 */
export const $Tuple = (...predicates) => (obj) => {
    const mappedPredicates = mapPredicates(obj, predicates);
    return If(IsArray(obj), And(mappedPredicates), false);
};
