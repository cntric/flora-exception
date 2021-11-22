import {values, query, Select} from "faunadb";

const {
    If,
    IsDoc,
    IsRef,
    Get
} = query;

/**
 * Document type predicate. Chcecks that any object is a document and has matching data.
 * @param Predicate is the predicate used to check the data.
 * @returns
 */
export const $Ref = (Predicate ? : (obj : any)=>boolean)=>(obj : any) : boolean=>{
    return Predicate ? If(
        IsRef(obj),
        Predicate(Get(obj)),
        false
    ) as boolean : IsRef(obj) as boolean
}