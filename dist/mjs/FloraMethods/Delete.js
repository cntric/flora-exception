import { FloraException } from "../Flora";
import { $Any } from "../FloraTypes";
import * as q from "faunadb/query";
export const Delete = (ref, $Predicate = $Any) => {
    return q.If(q.Exists(ref), q.Delete(ref), FloraException({
        name: "NoDocMatchingRef",
        msg: q.Concat([
            `No document found for ref.`
        ])
    }));
};
