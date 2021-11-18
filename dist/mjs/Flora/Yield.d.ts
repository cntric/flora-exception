import { query } from "faunadb";
export declare const expressArgs: <A extends any[]>(args: A, evaluatedArgs: query.ExprArg, loc: string) => A;
export interface _YieldArgsI<A extends any[], T> {
    name: string;
    args: A;
    expr: (...args: A) => T;
}
/**
 * Yields the result of an expression.
 * @param args
 * @returns
 */
export declare const _Yield: <A extends any[], T>(args: _YieldArgsI<A, T>) => T;
export interface YieldArgsI<A extends any[], T> {
    name?: string;
    args: A;
    expr: (...args: A) => T;
}
export declare const Yield: <A extends any[], T>(args: YieldArgsI<A, T>) => T;
