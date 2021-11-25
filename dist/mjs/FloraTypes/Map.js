import * as q from "faunadb/query";
import { $Any } from "./Any";
import { $Tuple } from "./Tuple";
export const $Map = ($KeyPred = $Any, $ValPred = $Any) => (obj) => {
    return q.If(q.IsObject(obj), q.All(q.Map(q.ToArray(obj), q.Lambda("el", $Tuple($KeyPred, $ValPred)(q.Var("el"))))), false);
};
