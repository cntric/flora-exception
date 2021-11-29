import { values } from "faunadb";
import { Fx, mFx, Raise } from "../Flora";
import { $Any, $Document, $Ref } from "../FloraTypes";
import {query as q} from "faunadb";
import { FloraException } from "../Flora";

export const Read = <T extends any>(
    ref : values.Ref,
    $Predicate : (obj : any)=>obj is T = $Any
) : values.Document<T>=>{
    return q.If(
            q.Exists(ref),
            q.Get(ref),
            q.Abort("Could not read.")
        ) as unknown as values.Document<T>
}