import { values } from "faunadb";
import { Fx, FloraException } from "../Flora";
import { $Any, $Document, $Ref } from "../FloraTypes";
import * as q from "faunadb/query";

export const Delete = <T extends any>(
    ref : values.Ref,
    $Predicate : (obj : any)=>obj is T = $Any 
 ) : values.Ref=>{

    return q.If(
            q.Exists(ref),
            q.Delete(ref),
            FloraException({
                name : "NoDocMatchingRef",
                msg : q.Concat(
                    [
                        `No document found for ref.`
                    ]
                ) as unknown as string
            })
        ) as unknown as values.Ref 

}