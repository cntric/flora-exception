import { query } from "faunadb";
const { If, IsDoc, IsRef, Get } = query;
/**
 * Document type predicate. Chcecks that any object is a document and has matching data.
 * @param Predicate is the predicate used to check the data.
 * @returns
 */
export const $Ref = (Predicate) => (obj) => {
    return Predicate ? If(IsRef(obj), Predicate(Get(obj)), false) : IsRef(obj);
};
