import { values } from "faunadb";
export declare const Delete: <T extends unknown>(ref: values.Ref, $Predicate?: (obj: any) => obj is T) => values.Document<T>;
