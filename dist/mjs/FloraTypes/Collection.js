import * as q from "faunadb/query";
import { $Any } from "./Any";
import { $Object } from "./Object";
import { $String } from "./Primitives";
/**
 * Collection type.
 * @param $Predicate as of 0.0.7 the predicate is only for the purpose of type suggestions in TypeScript.
 * @returns
 */
export const $Collection = ($Predicate = $Any) => {
    const name = `${$Predicate.name}Collection`;
    const map = {
        [name]: (obj) => {
            return q.IsCollection(obj);
        }
    };
    return map[name];
};
export const $CollectionObject = $Object({
    id: $String
});
