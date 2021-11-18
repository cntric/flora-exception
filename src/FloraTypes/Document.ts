import {values, query, Select} from "faunadb";

const {
    If,
    IsDoc
} = query;

/**
 * Document type predicate. Chcecks that any object is a document and has matching data.
 * @param Predicate is the predicate used to check the data.
 * @returns A Predicate 
 */
export const $Document = (Predicate ? : (obj : any)=>boolean)=>(obj : any) : boolean=>{
    return Predicate ? If(
        IsDoc(obj),
        Predicate(Select("data", obj)),
        false
    ) as boolean : IsDoc(obj) as boolean
}