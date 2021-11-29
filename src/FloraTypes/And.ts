
import {GuardedT, GuardedsT} from "../Flora";
import {
    And
} from  "faunadb";

export const $And = <A extends ((obj : any)=>boolean)[]>(
    ...args : A
)=>(obj : any) : obj is GuardedT<A[number]>=>{


    const predicates = args.map((arg)=>{
        return arg(obj);
    })

    return And(
        ...predicates
    ) as unknown as  boolean

}

export const $Extends = $And;