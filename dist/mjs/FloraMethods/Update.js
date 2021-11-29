import { Abort, query as q } from "faunadb";
import { $Any, } from "../FloraTypes";
const ref = "ref";
/**
 * Updates a documented object.
 * @param Collection
 * @param obj
 * @param $Predicate
 * @returns
 */
export const UpdateDocument = (ref, data, $Predicate = $Any) => {
    return q.If(q.Exists(ref), q.Update(ref, {
        data: data
    }), Abort("No matching ref."));
};
