import {
    If,
    IsDoc,
    IsRef,
    Get,
    Ref, 
    Exists
} from "faunadb/query";
import {
    values
} from "faunadb";
import { $Any } from "./Any";
import { $Object, $Optional } from "./Object";
import { $String } from "./Primitives";
import { $CollectionObject, CollectionObjectI } from "./Collection";

export interface FloraRef<T> extends values.Ref{
    __fauxValue ? : T
}

/**
 * Document type predicate. Chcecks that any object is a document and has matching data.
 * @param Predicate is the predicate used to check the data.
 * @returns
 */
export const $Ref = <T extends any>(
    Predicate  : (obj : any)=>obj is T = $Any
)=>{
    const name = `${Predicate.name}Ref`;
    const map = {
        [name] : (obj : any) : obj is FloraRef<T>=>{
            return Predicate ? If(
                IsRef(obj),
                If(
                    Exists(obj),
                    IsRef(obj),
                    Predicate(Get(obj)),
                ),
                false
            ) as unknown as boolean : IsRef(obj) as unknown as boolean
        }
    }
    return map[name];
}

export interface RefObjectI {
    id : string,
    collection ? : RefObjectI
}

