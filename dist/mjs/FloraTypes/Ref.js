import { If, IsRef, Get, } from "faunadb/query";
import { $Any } from "./Any";
/**
 * Document type predicate. Chcecks that any object is a document and has matching data.
 * @param Predicate is the predicate used to check the data.
 * @returns
 */
export const $Ref = (Predicate = $Any) => (obj) => {
    return Predicate ? If(IsRef(obj), Predicate(Get(obj)), false) : IsRef(obj);
};
