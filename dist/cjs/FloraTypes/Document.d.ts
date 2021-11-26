import { values } from "faunadb";
/**
 * Document type predicate. Chcecks that any object is a document and has matching data.
 * @param Predicate is the predicate used to check the data.
 * @returns
 */
export declare const $Document: <T>(Predicate?: ((obj: any) => obj is T) | undefined) => (obj: any) => obj is values.Document<T>;
