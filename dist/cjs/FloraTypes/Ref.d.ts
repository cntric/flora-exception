import { values } from "faunadb";
export interface FloraRef<T> extends values.Ref {
    __fauxValue?: T;
}
/**
 * Document type predicate. Chcecks that any object is a document and has matching data.
 * @param Predicate is the predicate used to check the data.
 * @returns
 */
export declare const $Ref: <T extends unknown>(Predicate?: (obj: any) => obj is T) => (obj: any) => obj is FloraRef<T>;
export interface RefObjectI {
    id: string;
    collection?: RefObjectI;
}
