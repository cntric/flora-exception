import { values } from "faunadb";
/**
 * Updates a documented object.
 * @param Collection
 * @param obj
 * @param $Predicate
 * @returns
 */
export declare const UpdateDocument: <T extends unknown>(ref: values.Ref, data: T, $Predicate?: (obj: any) => obj is T) => values.Document<T>;
