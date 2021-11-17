import { Append, IsArray, Not, Or, query, Reduce} from "faunadb";
const {
    Var,
    Select,
    If, 
    IsObject,
    ContainsPath,
    Equals, 
    Filter,
    Lambda,
    And
} = query;

export const isFloraError = "isFloraError";
export interface FloraErrorI {
    location ? : string,
    name : string,
    msg : string,
    at ? : FloraErrorI[]
    [isFloraError] : true
}

/**
 * 
 * @param args 
 * @returns 
 */
export const FloraError = (args ? : {
    name ? : string,
    at ? : FloraErrorI[],
    location ? : string
    msg ? : string
}) : FloraErrorI=>{
    return {
        name : args && args.name ? args.name : "FloraError",
        msg : args && args.msg ? args.msg : "None",
        at : args && args.at ? args.at : [],
        location : args && args.location ? args.location : "None", 
        [isFloraError] : true
    } as FloraErrorI
}

/**
 * Checks if object is an error on Flora.
 * @param expr 
 * @returns 
 */
export const IsError = (expr : query.ExprArg) : boolean=>{
    return If(
        And(
            Not(IsArray(expr)),
            IsObject(expr)
        ),
        If(
            ContainsPath(isFloraError, expr),
            Equals(
                Select(isFloraError, expr),
                true
            ),
            false
        ),
        false
    ) as boolean
}

const agg = "agg";
const el = "el";
export const ContainsError = (exprs : query.ExprArg) : boolean=>{
    return Reduce(
        Lambda(
            [agg, el],
            Or(
                Var(agg),
                IsError(Var(el))
            )
        ),
        false,
        exprs
    ) as boolean
}

export const GetErrors = (exprs : any[]) : FloraErrorI[]=>{

    return Reduce(
        Lambda(
            [agg, el],
            If(
                IsError(Var(el)),
                Append([el], Var(agg)),
                Var(agg)
            )
        ),
        [],
        exprs
    ) as FloraErrorI[]
}