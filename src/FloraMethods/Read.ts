import { values } from "faunadb";
import { Fx, mFx, Raise } from "../Flora";
import { $Any, $Document, $Ref } from "../FloraTypes";
import {query as q} from "faunadb";
import { FloraException } from "../Flora";

export const Read = <T extends any>(
    ref : values.Ref,
    $Predicate : (obj : any)=>obj is T = $Any
) : values.Document<T>=>{
    return Fx(
        [[ref, $Ref($Predicate)]], $Document($Predicate),
        (ref)=>q.If(
            q.Exists(ref),
            q.Get(ref),
            Raise(FloraException({
                name : "NoDocMatchingRef",
                msg : q.Concat(
                    [
                        `No document found for ref.`
                    ]
                ) as unknown as string
            }))
        ) as unknown as values.Document<T>
    )
}