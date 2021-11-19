import { query } from "faunadb";
export declare const isFloraExceptionKey = "isFloraException";
export interface FloraExceptionI {
    location?: string;
    name: string;
    msg: string;
    at?: FloraExceptionI[];
    stack?: FloraExceptionI[];
    [isFloraExceptionKey]: true;
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
 * Asserts obj is Flora Exception at Client.
 * @param obj
 * @returns
 */
export declare const isFloraException: (obj: any) => boolean;
/**
 * Checks if object is an Exception on Fauna.
 * @param expr
 * @returns
 */
export declare const IsException: (expr: query.ExprArg) => boolean;
export declare const ContainsException: (exprs: query.ExprArg) => boolean;
export declare const GetExceptions: (exprs: any[]) => FloraExceptionI[];
