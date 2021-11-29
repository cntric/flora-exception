import {query as q} from "faunadb";
import {
    values
} from "faunadb";
import {
    $Any,
    $Collection,
    $Document,
    CreateCollectionParamsI,
    FreshCollectionI,
    CollectionI,
    $String,
    $Ref,
    $Optional,
    $Or,
} from "../FloraTypes";
import {
    Fx,
    GuardedT,
    mFx
} from "../Flora/Fx";
import {
    Raise
} from "../Flora/Raise";
import {
    FloraException
} from "../Flora/Exception";

const ref = "ref";
/**
 * Updates a documented object.
 * @param Collection 
 * @param obj 
 * @param $Predicate 
 * @returns 
 */
export const UpdateDocument = <
    T extends any
>(
    ref : values.Ref,
    data : T,
    $Predicate : (obj : any)=>obj is T = $Any
) : values.Document<T> =>{

    return Fx(
        [ [ref, $Ref()], [data, $Predicate] ], $Document($Predicate),
        (ref, data)=>q.If(
                q.Exists(ref as q.ExprArg),
                q.Update(
                    ref as q.ExprArg,
                    {
                        data : data
                    }
                ),
                FloraException({
                    name : "NoDocMatchingRef",
                    msg : q.Concat(
                        [
                            `No document found for ref.`
                        ]
                    ) as unknown as string
                })
            ) as unknown as values.Document<T>
    ) as unknown as values.Document<T>

}