import { GuardedT } from "Flora/Fx";
/**
 *
 * @param obj
 * @param predicates
 */
export declare const mapPredicates: (obj: any[], predicates: ((obj: any) => boolean)[]) => import("faunadb").Expr[];
/**
 * Checks if all elements in an array are of a certain type
 * @param Predicate
 * @returns
 */
export declare const $Tuple: <P extends ((obj: any) => boolean)[]>(...predicates: P) => (obj: any) => obj is GuardedT<P>[];
