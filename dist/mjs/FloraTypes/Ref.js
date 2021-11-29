import { If, IsRef, Get, Exists } from "faunadb";
import { $Any } from "./Any";
/**
 * Document type predicate. Chcecks that any object is a document and has matching data.
 * @param Predicate is the predicate used to check the data.
 * @returns
 */
export const $Ref = (Predicate = $Any) => {
    const name = `${Predicate.name}Ref`;
    const map = {
        [name]: (obj) => {
            return Predicate ? If(IsRef(obj), If(Exists(obj), IsRef(obj), Predicate(Get(obj))), false) : IsRef(obj);
        }
    };
    return map[name];
};
