import { values } from "faunadb";
export interface CreateCollectionParamsI {
    name: string;
    data?: {
        [key: string]: any;
    };
    history_days?: number;
    ttl_days?: number;
}
export interface CollectionI<T> extends values.Document {
    __fresh: false;
}
export interface FreshCollectionI<T> extends values.Document {
    __fresh: true;
}
/**
 * Collection type.
 * @param $Predicate as of 0.0.7 the predicate is only for the purpose of type suggestions in TypeScript.
 * @returns
 */
export declare const $Collection: <T extends unknown>($Predicate?: (obj: any) => obj is T) => (obj: any) => obj is CollectionI<T>;
