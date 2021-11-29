import { IsArray, Reduce, If, Lambda, Var, And } from "faunadb";
const agg = "agg";
const el = "el";
/**
 * Checks if all elements in an array are of a certain type
 * @param Predicate
 * @returns
 */
export const $Array = (Predicate) => (obj) => {
    return If(IsArray(obj), Reduce(Lambda([agg, el], And(Var(agg), Predicate(Var(el)))), true, obj), false);
};
