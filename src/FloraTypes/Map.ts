import {query as q} from "faunadb";
import { $Any } from "./Any";
import { $Tuple } from "./Tuple";

export const $Map = <K extends (string | number), V>(
    $KeyPred : (obj : any)=>obj is K = $Any,
    $ValPred : (obj : any)=>obj is V = $Any
)=>(obj : any) : obj is {[key : string] : V}=>{

    return q.If(
        q.IsObject(obj),
            q.All(q.Map(
                q.ToArray(obj),
                q.Lambda(
                    "el",
                    $Tuple($KeyPred, $ValPred)(q.Var("el"))
                )
            )),
        false
    ) as unknown as boolean

}