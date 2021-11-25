import { GuardedT } from "../Flora";
export declare const Select: <P extends (obj: any) => obj is any, T extends GuardedT<P>, Path extends keyof T>(path: Path, obj: T, $Predicate?: P) => T[Path];
/**
 * Uses a path to perform a nested select, no type checks yet.
 * @param path
 * @param expr
 * @returns
 */
export declare const NestedSelect: (path: string[], expr: any) => import("faunadb").Expr;
export declare const mkDotProxyHandler: (expr: any) => ProxyHandler<any>;
/**
 *
 * @param path
 * @param obj
 * @param $Predicate
 * @returns
 */
export declare const Dot: <T extends {
    [key: string]: any;
}>(obj: T) => T;
