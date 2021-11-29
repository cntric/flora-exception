import { Fx, FloraException } from "../Flora";
import { $Any, $Document, $Ref } from "../FloraTypes";
import { query as q } from "faunadb";
export const Delete = (ref, $Predicate = $Any) => {
    return Fx([[ref, $Ref($Document($Predicate))]], $Document($Predicate), (ref) => q.If(q.Exists(ref), q.Delete(ref), FloraException({
        name: "NoDocMatchingRef",
        msg: q.Concat([
            `No document found for ref.`
        ])
    })));
};
