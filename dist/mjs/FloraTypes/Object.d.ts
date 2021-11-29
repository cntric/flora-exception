import { ExprArg } from "faunadb";
import { GuardedT } from "Flora";
export interface PredicateI {
    (obj: any): boolean;
}
export interface OptionalPredicateI extends PredicateI {
    optional: true;
}
export interface Typed$ObjectArgsI {
    [key: string]: PredicateI | OptionalPredicateI;
}
export declare type Typed$ObjectT<A extends Typed$ObjectArgsI> = {
    [key in keyof A]: GuardedT<A[key]>;
};
/**
 * Forms an optional field predicate.
 * @param predicate Is the type predicate used to verify the field if one is present
 * @returns
 */
export declare const $Optional: <P extends (obj: any) => boolean>(Predicate: P) => (obj: any) => obj is GuardedT<P> | undefined;
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
export declare const PredicatesSatisfied: (predicates: ExprArg) => import("faunadb").Expr;
/**
 * Forms the predicate for a type object.
 * @param args
 * @returns
 */
export declare const $Object: <O extends Typed$ObjectArgsI>(args?: O | undefined) => (obj: any) => obj is Typed$ObjectT<O>;
