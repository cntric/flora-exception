
import {GuardedT, GuardedsT} from "../Flora";
import {
    If,
    Select, Var, Lambda, And, ContainsPath, IsObject, Reduce, Or
} from  "faunadb/query";

export const $Or = <A extends ((obj : any)=>boolean)[]>(
    ...args : A
)=>(obj : any) : obj is GuardedT<A[number]>=>{


    const predicates = args.map((arg)=>{
        return arg(obj);
    })

    return Or(
        ...predicates
    ) as unknown as  boolean

}

