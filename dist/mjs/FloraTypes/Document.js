import { If, And, IsDoc, Select, ContainsPath } from "faunadb/query";
/**
 * Document type predicate. Chcecks that any object is a document and has matching data.
 * @param Predicate is the predicate used to check the data.
 * @returns
 */
export const $Document = (Predicate) => {
    const name = `${Predicate ? Predicate.name : "$Unspecified"}Doc`;
    const map = {
        [name]: (obj) => {
            return Predicate ? If(And(IsDoc(obj), ContainsPath("data", obj)), Predicate(Select("data", obj)), false) : IsDoc(obj);
        }
    };
    return map[name];
};
