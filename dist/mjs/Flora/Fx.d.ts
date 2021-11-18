export interface FxArgI<T> {
    0: T;
    1?: (obj: any) => boolean;
}
declare type FxArgExtractedT<T> = T extends FxArgI<infer X> ? X : never;
declare type FxExtractedArgsT<T extends FxArgI<any>[]> = {
    [key in keyof T]: FxArgExtractedT<T[key]>;
};
/**
 * Extracts an arg from a TypePredicate tuple.
 * @param arg
 * @param loc
 * @returns
 */
export declare const ExtractArg: <A extends FxArgI<any>>(arg: A, loc: string) => FxArgExtractedT<A>;
/**
 * Extracts args for a n array of TypePredicate tuples.
 * @param args
 * @param loc
 * @returns
 */
export declare const ExtractArgs: <A extends FxArgI<any>[]>(args: A, loc: string) => FxExtractedArgsT<A>;
/**
 * Extracts args from an array of type predicate Tuples on the client.
 * @param args
 * @param loc
 * @returns
 */
export declare const extractArgs: <A extends FxArgI<any>[]>(args: A, loc: string) => FxExtractedArgsT<A>;
export declare const getInstance: () => string;
export declare const getLocation: (errorStack: string) => [string, string];
export declare const Fx: <A extends FxArgI<any>[], T>(args: A, $ReturnType: (obj: any) => boolean, expr: (...args: FxExtractedArgsT<A>) => T) => import("faunadb").Expr;
export {};
