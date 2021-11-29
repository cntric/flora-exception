import { $Any } from "../FloraTypes";
import { query as q } from "faunadb";
export const Read = (ref, $Predicate = $Any) => {
    return q.If(q.Exists(ref), q.Get(ref), q.Abort("Could not read."));
};
