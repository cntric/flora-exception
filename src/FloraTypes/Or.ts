import { query } from "faunadb";
const {
    If,
    Select, Var, Lambda, And, ContainsPath, IsObject, Reduce, Or
} = query;

export const $Or = (...args : ((obj : any)=>boolean)[])=>(obj : any):boolean=>{

    const predicates = args.map((arg)=>{
        return arg(obj);
    })

    return Or(
        ...predicates
    ) as boolean

}