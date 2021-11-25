import {
    If,
    IsDoc,
    IsRef,
    Get,
} from "faunadb/query";
import {
    values
} from "faunadb";
import { $Any } from "./Any";

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
)=>(obj : any) : obj is FloraRef<T>=>{
    return Predicate ? If(
        IsRef(obj),
        Predicate(Get(obj)),
        false
    ) as unknown as boolean : IsRef(obj) as unknown as boolean
}