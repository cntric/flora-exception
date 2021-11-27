import { Fx, Raise } from "../Flora";
import { $Any, $Document, $Ref } from "../FloraTypes";
import * as q from "faunadb/query";
import { FloraException } from "../Flora";
export const Read = (ref, $Predicate = $Any) => {
    return Fx([[ref, $Ref($Predicate)]], $Document($Predicate), (ref) => q.If(q.Exists(ref), q.Get(ref), Raise(FloraException({
        name: "NoDocMatchingRef",
        msg: q.Concat([
            `No document found for ref.`
        ])
    }))));
};
