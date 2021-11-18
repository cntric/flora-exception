import {query} from "faunadb";
import { GuardedT } from "Flora/Fx";
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
export const $Array = <P extends (obj : any)=>boolean>(Predicate : P)=>(obj : any) : obj is GuardedT<P>[]=>{
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
    ) as boolean
}
