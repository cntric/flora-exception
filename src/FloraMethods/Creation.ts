import * as q from "faunadb/query";
import {values} from "faunadb";
import { $Any, $Collection, $Document, CreateCollectionParamsI, FreshCollectionI, CollectionI, $String } from "../FloraTypes";
import { Fx, GuardedT } from "../Flora/Fx";
import { Raise } from "../Flora/Raise";
import { FloraException } from "../Flora/Exception";


/**
 * Creates a collection.
 * @param params 
 * @param $Predicate optional purely for type inferance.
 * @returns 
 */
export const CreateCollection = <P extends (obj : any)=>obj is any>(
    params : CreateCollectionParamsI,
    $Predicate : P = $Any as P
) : FreshCollectionI<GuardedT<P>> =>{

    return q.If(
        q.Exists(q.Collection(q.Select("name", params))),
        q.Collection(q.Select("name", params)),
        q.CreateCollection(params)
    ) as unknown as FreshCollectionI<GuardedT<P>>

}

/**
 * Gets a collection
 * @param name is the name of the collection.
 * @param $Predicate 
 * @returns 
 */
export const Collection = <P extends (obj : any)=>obj is any>(
    name : string,
    $Predicate : P = $Any as P
) : CollectionI<GuardedT<P>> =>{

    return Fx(
        [[name , $String]], $Collection(),
        (name : string)=>q.If(
            q.Exists(q.Collection(name)),
            q.Collection(name),
            Raise(FloraException({
                name : "CollectionDoesNotExist",
                msg : `The collection ${name} does not exist.`
            }))
        ) as unknown as CollectionI<GuardedT<P>>
    )

}

/**
 * Documents an object. (Creates a Document.)
 * @param Collection 
 * @param obj 
 * @param $Predicate 
 * @returns 
 */
export const Document = <
    P extends (obj : any)=>obj is any
>(
    Collection : CollectionI<GuardedT<P>>,
    obj : GuardedT<P>,
    $Predicate : P = $Any as P
) : values.Document<GuardedT<P>> =>{

    return Fx(
        [ [Collection, $Collection()], [obj, $Predicate] ], $Document($Predicate),
        (Collection, obj)=>q.Create(Collection, {
            data : obj
        }) as unknown as values.Document<GuardedT<P>>
    )

}