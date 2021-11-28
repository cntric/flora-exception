export declare const FloraLocalState: {
    performance: boolean;
};
export declare const togglePerformance: (b: boolean) => void;
export interface FxArgI<T = any> {
    0: T;
    1?: (obj: any) => boolean;
}
declare type FxArgExtractedT<T> = T extends FxArgI<infer X> ? X : never;
declare type FxExtractedArgsT<T extends any[]> = {
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
export declare const stableExtractArgs: <A extends FxArgI<any>[]>(args: A) => FxExtractedArgsT<A>;
export declare const getInstance: () => string;
export declare const getLocation: (errorStack: string) => [string, string];
export declare const Fx: <A extends FxArgI<any>[], R extends (obj: any) => boolean>(args: A, $ReturnType: R, expr: (...args: FxExtractedArgsT<A>) => GuardedT<R>) => GuardedT<R>;
export declare type GuardedT<T> = T extends (obj: any) => obj is infer G ? G : any;
export declare type GuardedsT<T extends ((obj: any) => obj is any)[]> = {
    [key in keyof T]: GuardedT<T[key]>;
};
interface PredicateI<T> {
    (obj: any): obj is T;
}
/**
 * Factory for a Fx function.
 * @param args
 * @param $ReturnType
 * @param expr
 * @returns
 */
export declare const mFx: <A extends PredicateI<any>[], R extends (obj: any) => boolean>($ArgTypes: A, $ReturnType: R, expr: (...args: GuardedsT<A>) => GuardedT<R>) => (...args: GuardedsT<A>) => GuardedT<R>;
export {};
