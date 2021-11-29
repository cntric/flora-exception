
import {GuardedT, GuardedsT} from "../Flora";
import {
    Or
} from  "faunadb";

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

