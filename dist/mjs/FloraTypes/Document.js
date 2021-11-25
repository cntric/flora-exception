import { If, IsDoc, Select } from "faunadb/query";
/**
 * Document type predicate. Chcecks that any object is a document and has matching data.
 * @param Predicate is the predicate used to check the data.
 * @returns
 */
export const $Document = (Predicate) => (obj) => {
    return Predicate ? If(IsDoc(obj), Predicate(Select("data", obj)), false) : IsDoc(obj);
};
