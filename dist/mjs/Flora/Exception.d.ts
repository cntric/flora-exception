import { query } from "faunadb";
export declare const isFloraException = "isFloraException";
export interface FloraExceptionI {
    location?: string;
    name: string;
    msg: string;
    at?: FloraExceptionI[];
    stack?: FloraExceptionI[];
    [isFloraException]: true;
}
/**
 *
 * @param args
 * @returns
 */
export declare const FloraException: (args?: {
    name?: string | undefined;
    at?: FloraExceptionI[] | undefined;
    location?: string | undefined;
    msg?: string | undefined;
    stack?: FloraExceptionI[] | undefined;
} | undefined) => FloraExceptionI;
/**
 * Checks if object is an Exception on Flora.
 * @param expr
 * @returns
 */
export declare const IsException: (expr: query.ExprArg) => boolean;
export declare const ContainsException: (exprs: query.ExprArg) => boolean;
export declare const GetExceptions: (exprs: any[]) => FloraExceptionI[];
