import { Length, query, Subtract } from "faunadb";

const {
    If,
    IsObject,
    Select,
    Contains,
    Equals,
    Append,
    Merge
} = query;

export const isFloraExceptionKey = "isFloraException";
export const FloraExceptionType = "FloraException" as const;
export interface FloraExceptionI<T extends string = typeof FloraExceptionType> {
    [isFloraExceptionKey] : true,
    msg : string,
    result : query.ExprArg,
    type : T,
    context : string
}
/**
 * Client predicate for whether any obj is a FloraException.
 * @param obj 
 * @returns 
 */
 export const isFloraException = (obj : any) : obj is FloraExceptionI =>{

    return obj instanceof Object && obj[isFloraExceptionKey] === true;

}

/**
 * FQL expression to detect if something is a FloraException.
 * @param expr 
 * @returns 
 */
export const IsFloraException = (expr : query.ExprArg) : expr is FloraExceptionI=>{

    return If(
        IsObject(expr),
        If(
            Contains(isFloraExceptionKey, expr),
            Equals(
                Select(isFloraExceptionKey, expr),
                true
            ),
            false
        ),
        false
    ) as boolean

}

export interface FloraExceptionArgsI<T extends string = typeof FloraExceptionType> {
    result? : query.ExprArg,
    msg? : string,
    type? : T
    context? : string
}
export const NoExceptionMessage = "No message provided for this FloraException.";
export const DefaultFloraException : FloraExceptionI = {
    [isFloraExceptionKey] : true,
    result : false,
    msg : NoExceptionMessage,
    type : FloraExceptionType,
    context : "No context provided."
}

/**
 * FQL Expression to create a FloraException.
 * @param expr 
 * @param msg 
 * @returns 
 */
export const FloraException = <T extends string = typeof FloraExceptionType>(
    args? : FloraExceptionArgsI<T>
) : FloraExceptionI<T> =>{

    return Merge(
        DefaultFloraException,
        [ 
            args,
            {
                [isFloraExceptionKey] : true
            }
        ]
     ) as FloraExceptionI<T>

}

export const isFloraExceptionStackKey = "isFloraExceptionStack";
export interface FloraExceptionStackI {
    [isFloraExceptionStackKey] : true,
    exception : boolean,
    stack : FloraExceptionI[]
}

/**
 * Client predicate for whether any obj is a FloraException.
 * @param obj 
 * @returns 
 */
export const isFloraExceptionStack = (obj : any) : obj is FloraExceptionStackI=>{

    return obj instanceof Object && obj[isFloraExceptionStackKey] === true;

}

/**
 * FQL expression to detect if something is a FloraExceptionStack
 * @param expr 
 * @returns 
 */
export const IsFloraExceptionStack = (expr : query.ExprArg) : expr is FloraExceptionStackI=>{

    return If(
        IsObject(expr),
        If(
            Contains(isFloraExceptionStackKey, expr),
            Equals(
                Select(isFloraExceptionStackKey, expr),
                true
            ),
            false
        ),
        false
    ) as boolean

}


export interface FloraExceptionStackArgsI {
    exception? : boolean
    stack? : FloraExceptionI[]
}

export const DefaultFloraExceptionStack : FloraExceptionStackI = {
    [isFloraExceptionStackKey] : true,
    exception : false,
    stack : []
}

export const FloraExceptionStack = (
    args : FloraExceptionStackArgsI = DefaultFloraExceptionStack
 ) : FloraExceptionStackI=>{

    return Merge(
        DefaultFloraExceptionStack,
        [ 
            args,
            { 
                [isFloraExceptionStackKey] : true
            }
        ]
    ) as FloraExceptionStackI

}

/**
 * Adds ab exception to a FloraExceptionStack
 * @param stack 
 * @param exception 
 * @returns 
 */
export const AddToStack = (
    stack : FloraExceptionStackI, 
    exception : FloraExceptionI
) : FloraExceptionStackI=>{

    return FloraExceptionStack({
        stack : Append(
            [exception],
            Select("stack", stack) as FloraExceptionI[]
        ) as FloraExceptionI[],
        exception : true   
    });

}

export interface ExceptedStackI extends FloraExceptionStackI {
    exception : true
}

export const GetException = (stack : FloraExceptionStackI) : FloraExceptionI=>{

    return If(
        IsFloraExceptionStack(stack),
        Select(
            Subtract(Length(Select("stack", stack)), 1),
            Select("stack", stack)
        ),
        FloraException()
    ) as FloraExceptionI

}