import { 
    Append, 
    IsArray, 
    Not, 
    Or, 
    Reduce,
    Var,
    Select,
    If, 
    IsObject,
    ContainsPath,
    Equals, 
    Filter,
    Lambda,
    And,
    ExprArg
} from "faunadb/query";


export const isFloraExceptionKey = "isFloraException";
export interface FloraExceptionI {
    location ? : string,
    name : string,
    msg : string,
    at ? : FloraExceptionI[],
    stack ? : FloraExceptionI[]
    [isFloraExceptionKey] : true
}

/**
 * 
 * @param args 
 * @returns 
 */
export const FloraException = (args ? : {
    name ? : string,
    at ? : FloraExceptionI[],
    location ? : string
    msg ? : string,
    stack ? : FloraExceptionI[]
}) : FloraExceptionI=>{
    return {
        name : args && args.name ? args.name : "FloraException",
        msg : args && args.msg ? args.msg : "None",
        at : args && args.at ? args.at : [],
        location : args && args.location ? args.location : "None", 
        stack : args && args.stack ? args.stack : [],
        [isFloraExceptionKey] : true
    } as FloraExceptionI
}

/**
 * Asserts obj is Flora Exception at Client.
 * @param obj 
 * @returns 
 */
export const isFloraException = (obj : any)=>{
    return obj instanceof Object && obj[isFloraExceptionKey] === true;
}

/**
 * Checks if object is an Exception on Fauna.
 * @param expr 
 * @returns 
 */
export const IsException = (expr : ExprArg) : boolean=>{
    return If(
        And(
            Not(IsArray(expr)),
            IsObject(expr)
        ),
        If(
            ContainsPath(isFloraExceptionKey, expr),
            Equals(
                Select(isFloraExceptionKey, expr),
                true
            ),
            false
        ),
        false
    ) as unknown as boolean
}

const agg = "agg";
const el = "el";
export const ContainsException = (exprs : ExprArg) : boolean=>{
    return Reduce(
        Lambda(
            [agg, el],
            Or(
                Var(agg),
                IsException(Var(el))
            )
        ),
        false,
        exprs
    ) as unknown as boolean
}

export const GetExceptions = (exprs : any[]) : FloraExceptionI[]=>{

    return Reduce(
        Lambda(
            [agg, el],
            If(
                IsException(Var(el)),
                Append([Var(el)], Var(agg)),
                Var(agg)
            )
        ),
        [],
        exprs
    ) as unknown as FloraExceptionI[]
}