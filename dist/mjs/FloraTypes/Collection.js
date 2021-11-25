import * as q from "faunadb/query";
import { $Any } from "./Any";
/**
 * Collection type.
 * @param $Predicate as of 0.0.7 the predicate is only for the purpose of type suggestions in TypeScript.
 * @returns
 */
export const $Collection = ($Predicate = $Any) => (obj) => {
    return q.IsCollection(obj);
};
