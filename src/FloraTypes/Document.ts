import { values } from "faunadb";
import {If,
    IsDoc, Select} from "faunadb/query";


/**
 * Document type predicate. Chcecks that any object is a document and has matching data.
 * @param Predicate is the predicate used to check the data.
 * @returns
 */
export const $Document = <T>(Predicate ? : (obj : any)=>obj is T)=>(obj : any) : obj is values.Document<T>=>{
    return Predicate ? If(
        IsDoc(obj),
        Predicate(Select("data", obj)),
        false
    ) as unknown as boolean : IsDoc(obj) as unknown as boolean
}