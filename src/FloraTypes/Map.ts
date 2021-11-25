import * as q from "faunadb/query";
import { $Any } from "./Any";
import { $Tuple } from "./Tuple";

export const $Map = <K, V extends (string | number)>(
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