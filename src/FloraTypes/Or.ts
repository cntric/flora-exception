import { query } from "faunadb";
import {GuardedT, GuardedsT} from "../Flora";
const {
    If,
    Select, Var, Lambda, And, ContainsPath, IsObject, Reduce, Or
} = query;

export const $Or = <A extends ((obj : any)=>boolean)[]>(
    ...args : A
)=>(obj : any) : obj is GuardedT<A[number]>=>{


    const predicates = args.map((arg)=>{
        return arg(obj);
    })

    return Or(
        ...predicates
    ) as boolean

}

