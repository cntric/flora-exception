import {query} from "faunadb";
const {
    IsArray,
    Reduce,
    If,
    Lambda,
    Var,
    And
} = query;

const agg = "agg";
const el = "el";
/**
 * Checks if all elements in an array are of a certain type
 * @param Predicate 
 * @returns 
 */
export const $Array = (Predicate : (obj : any)=>boolean)=>(obj : any)=>{
    return If(
        IsArray(obj),
        Reduce(
            Lambda(
                [agg, el],
                And(
                    Var(agg),
                    Predicate(Var(el))
                )
            ),
            true,
            obj
        ),
        false
    ) 
}