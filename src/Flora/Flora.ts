import { Equals, ExprArg, query, ToString } from "faunadb";
import {
    FloraExceptionStackI,
    FloraExceptionI,
    FloraExceptionType,
    IsFloraExceptionStack,
    AddToStack,
    FloraExceptionStack,
    FloraException,
    IsFloraException,
    GetException
} from "./FloraException";

const {
    If, 
    IsArray,
    And,
    Count,
    GT,
    Select,
    Let,
    Var,
    Concat
} = query;

export type FloraTupleT<
    T, A extends string = typeof FloraExceptionType
> = [FloraExceptionStackI, T];

/**
 * Creates a FloraTuple.
 * @param val 
 * @param stack 
 * @returns 
 */
export const FloraTuple = <T>(
    val : T,
    stack : FloraExceptionStackI = FloraExceptionStack()
) : FloraTupleT<T> =>{

    return [stack, val];

}


/**
 * Whether an expression is a FloraTuple.
 * @param expr 
 * @returns 
 */
export const IsFloraTuple = (expr : query.ExprArg) : expr is FloraTupleT<any>=>{
    return If(
        IsArray(
            expr
        ),
        If(
            GT(Count(expr), 0),
            IsFloraExceptionStack(Select(0, expr)),
            false
        ),
        false
    ) as boolean
}

export const FloraTupleExceptionStack = (tuple : FloraTupleT<any>) : FloraExceptionStackI => {
    return If(
        IsFloraTuple(tuple),
        Select(
            "stack",
            Select(
                0,
                tuple
            ),
        ),
        FloraExceptionStack()
    ) as FloraExceptionStackI
}


export const FloraTupleHasException = (tuple : FloraTupleT<any>) : boolean=>{
    return Select(
        "exception",
        Select(
            0,
            tuple
        )
    ) as boolean
}


export const ConsumeFloraTuple = <T>(tuple : FloraTupleT<T>) : T=>{
    return Select(1, tuple) as T;
}

export interface FloraRuleI<T> {
    (val : T, name : string) : boolean | FloraExceptionI
    (val : T) : boolean | FloraExceptionI
}

export interface FloraResolveI<T> {
    (result : FloraTupleT<any>, exception : FloraExceptionI<any>) : FloraTupleT<T>
}

export const DefaultResolve = <T>(
    result : FloraTupleT<T>,
    Exception : FloraExceptionI
) : FloraTupleT<T>=>{

    return [
        AddToStack(
            Select(0, result) as FloraExceptionStackI,
            Exception
        ),
        ConsumeFloraTuple(result)
    ]

}


export interface FloraArgsI<T> {
    expr : FloraTupleT<T> | T,
    Rule : FloraRuleI<T>,
    Resolve ? : FloraResolveI<T>
    name  : string
}

export interface FloraArgsRequiredI<T> extends FloraArgsI<T> {
    Resolve : FloraResolveI<T>
    name : string,
    ruleFql : string
}

const NoFurtherInfo = "No further information provided."
const BadExceptionProvided = "The value thrown was not an exception." as const;
export const FallbackException = (
    name : string, 
    rule : string
) : FloraExceptionI<"FallbackFloraException">=>{
    return FloraException({
        type : "FallbackFloraException",
        context : name,
        msg : Concat([
            "The call to ",
            name, 
            " did not satisfy the following rule: ",
            ToString(rule)
        ]) as string
    })
}

export const GetExceptionMsg = (exception : FloraExceptionI<any>) : string=>{

    return If(
        IsFloraException(exception),
        Select("msg", exception),
        "Exception message not provided."
    ) as string

}

export const GetExceptionContext = (exception : FloraExceptionI<any>) : string=>{

    return If(
        IsFloraException(exception),
        Select("name", exception),
        "Exception name not provided."
    ) as string

}

export const RaiseException = (name : string, exception : FloraExceptionI<any>)=>{

    return FloraException({
        context : name,
        msg : Concat(
            [
                "Raising exceptions from ",
                GetExceptionContext(exception), 
                "."
            ]
        ) as string,
        type : "RaiseFloraException"
    })
}

export const _FloraOfValue = <T>(
   args : FloraArgsRequiredI<T>
)=>{

    return Let({
        "ruleResult" : args.Rule(args.expr as T, )
    }, 
        If(
            Equals(Var("ruleResult"), true),
            FloraTuple(args.expr as T),
            If(
                IsFloraException(Var("ruleResult")),
                args.Resolve(FloraTuple(args.expr as T), Var("ruleResult") as FloraExceptionI),
                args.Resolve(FloraTuple(args.expr as T), FallbackException(args.name, args.ruleFql))
            )
        )
    )

}

export const _FloraOfTuple = <T>(args : FloraArgsRequiredI<T>) : FloraTupleT<T>=>{

    return If(
        FloraTupleHasException(args.expr as FloraTupleT<T>),
        args.Resolve(args.expr as FloraTupleT<T>, RaiseException(
            args.name,
            GetException(
                FloraTupleExceptionStack(args.expr as FloraTupleT<T>)
            )
        )),
        _FloraOfValue({
            ...args,
            expr : ConsumeFloraTuple(args.expr as FloraTupleT<T>),
        })
    ) as FloraTupleT<T>

}


export const Flora = <T>(args : FloraArgsI<T>) : FloraTupleT<T>=>{

    const _args = {
        Resolve : DefaultResolve,
        ruleFql : args.Rule.toString(),
        ...args
    } as FloraArgsRequiredI<T>
    
    return Let({
        "val" : args.expr,
        "result" : If(
            IsFloraTuple(Var("val")),
            _FloraOfTuple(_args),
            _FloraOfValue(_args)
        )
    }, Var("result")) as FloraTupleT<T>

}