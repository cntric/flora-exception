import { query as q } from "faunadb";
import { $Any, $Document, $Ref, } from "../FloraTypes";
import { Fx } from "../Flora/Fx";
import { FloraException } from "../Flora/Exception";
const ref = "ref";
/**
 * Updates a documented object.
 * @param Collection
 * @param obj
 * @param $Predicate
 * @returns
 */
export const UpdateDocument = (ref, data, $Predicate = $Any) => {
    return Fx([[ref, $Ref()], [data, $Predicate]], $Document($Predicate), (ref, data) => q.If(q.Exists(ref), q.Update(ref, {
        data: data
    }), FloraException({
        name: "NoDocMatchingRef",
        msg: q.Concat([
            `No document found for ref.`
        ])
    })));
};
