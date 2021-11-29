import { values } from "faunadb";
import { Fx, FloraException } from "../Flora";
import { $Any, $Document, $Ref } from "../FloraTypes";
import {query as q} from "faunadb";

export const Delete = <T extends any>(
    ref : values.Ref,
    $Predicate : (obj : any)=>obj is T = $Any 
 ) : values.Document<T>=>{

    return q.If(
            q.Exists(ref),
            q.Delete(ref),
            q.Abort("No ref")
        ) as unknown as values.Document<T>


}