import { values } from "faunadb";
export declare const Read: <T extends unknown>(ref: values.Ref, $Predicate?: (obj: any) => obj is T) => values.Document<T>;
