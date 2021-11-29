import {
    IsArray,
    Reduce,
    If,
    Lambda,
    Var,
    And,
    Select,
    ContainsPath
} from "faunadb";
import { GuardedT } from "Flora/Fx";
import { OptionalPredicateI } from "FloraTypes";


/**
 * 
 * @param obj 
 * @param predicates 
 */
export const mapPredicates = (obj : any[], predicates : ((obj : any)=>boolean)[])=>{
    return predicates.map((Predicate, index)=>{
        return If(
            ContainsPath(index, obj),
            Predicate(Select(index, obj)),
            (Predicate as OptionalPredicateI).optional ? true : false
        )
    })  
}

const agg = "agg";
const el = "el";
/**
 * Checks if all elements in an array are of a certain type
 * @param Predicate 
 * @returns 
 */
export const $Tuple = <P extends ((obj : any)=>boolean)[]>(...predicates : P)=>(obj : any) : obj is GuardedT<P>[]=>{

    const mappedPredicates = mapPredicates(obj, predicates); 

    return If(
        IsArray(obj),
        And(mappedPredicates),
        false
    ) as unknown as boolean
}
