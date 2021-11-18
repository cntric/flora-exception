import { query } from "faunadb";
export interface PredicateI {
    (obj: any): boolean;
}
export interface OptionalPredicateI extends PredicateI {
    optional: true;
}
export interface Typed$ObjectArgsI {
    [key: string]: PredicateI | OptionalPredicateI;
}
/**
 * Forms an optional field predicate.
 * @param predicate Is the type predicate used to verify the field if one is present
 * @returns
 */
export declare const $Optional: (predicate: (obj: any) => boolean) => OptionalPredicateI;
/**
 * Extracts predicates to check against type fields.
 * @param args are the typed object args.
 * @param obj is the obj to be checked.
 * @returns
 */
export declare const extractPredicates: (args: Typed$ObjectArgsI, obj: any) => import("faunadb").Expr[];
export declare const agg = "agg";
export declare const el = "el";
/**
 * Checks if all predicates are satisfied.
 * @param predicates
 * @returns
 */
export declare const PredicatesSatisfied: (predicates: query.ExprArg) => import("faunadb").Expr;
/**
 * Forms the predicate for a type object.
 * @param args
 * @returns
 */
export declare const $Object: (args?: Typed$ObjectArgsI | undefined) => (obj: any) => boolean;
