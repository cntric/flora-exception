import { FloraRef } from "../FloraTypes";
import { values } from "faunadb";
/**
 * Gets the item if it is a ref.
 * @param obj
 * @returns
 */
export declare const Deref: <T extends unknown>(obj: T | FloraRef<T>) => T;
export declare const TraversalSelect: <T, Path extends keyof T>(path: Path, obj: T | FloraRef<T>) => MappedExtractTraversalT<T[Path]>;
export declare const NestedTraversalSelect: (path: string[], expr: any) => import("faunadb").Expr;
export declare type ExtractTraversalT<T> = T extends FloraRef<infer Y> ? Y : T;
export declare type MappedExtractTraversalT<T> = T extends ({} | []) ? ExtractTraversalT<T> & {
    [key in keyof T]: ExtractTraversalT<T[key]>;
} : ExtractTraversalT<T>;
export declare type Thing = MappedExtractTraversalT<{
    name: string;
    doc: values.Document<{
        name: string;
    }>;
}>;
export declare const mkTraverseProxyHandler: (expr: any, path: string[]) => ProxyHandler<any>;
/**
 * Traverses to another document by looking up from a key string.
 * @param key
 * @param obj
 * @param $Predicate
 * @returns
 */
export declare const Traverse: <T extends unknown, P extends (obj: any) => obj is T>(Doc: T, $Predicate?: P) => MappedExtractTraversalT<T>;
