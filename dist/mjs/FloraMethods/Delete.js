import { $Any } from "../FloraTypes";
import { query as q } from "faunadb";
export const Delete = (ref, $Predicate = $Any) => {
    return q.If(q.Exists(ref), q.Delete(ref), q.Abort("No ref"));
};
