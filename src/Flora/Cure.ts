import { floraNoExpression, floraNoFunctionName } from "./Key";
import { query } from "faunadb";
const {
    Merge
} = query;

export const isCureKey = "isCure";
export interface CureI {
    [isCureKey] : true, 
    site : string,
    expr : string
}

const DefaultCure : CureI = {
    [isCureKey] : true,
    site : floraNoFunctionName,
    expr : floraNoExpression
}

export interface CureArgsI {
    site ? : string,
    expr ? : string
}

export const Cure = (args ? : CureArgsI) : CureI=>{

    return Merge(
        DefaultCure,
        [
            args || {}
        ]
    ) as CureI

}