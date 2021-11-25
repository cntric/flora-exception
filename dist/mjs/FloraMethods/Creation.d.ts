import { values } from "faunadb";
import { CreateCollectionParamsI, FreshCollectionI, CollectionI } from "../FloraTypes";
import { GuardedT } from "../Flora/Fx";
/**
 * Creates a collection.
 * @param params
 * @param $Predicate optional purely for type inferance.
 * @returns
 */
export declare const CreateCollection: <P extends (obj: any) => obj is any>(params: CreateCollectionParamsI, $Predicate?: P) => FreshCollectionI<GuardedT<P>>;
/**
 * Gets a collection
 * @param name is the name of the collection.
 * @param $Predicate
 * @returns
 */
export declare const Collection: <P extends (obj: any) => obj is any>(name: string, $Predicate?: P) => CollectionI<GuardedT<P>>;
/**
 * Documents an object. (Creates a Document.)
 * @param Collection
 * @param obj
 * @param $Predicate
 * @returns
 */
export declare const Document: <P extends (obj: any) => obj is any>(Collection: CollectionI<GuardedT<P>>, obj: GuardedT<P>, $Predicate?: P) => values.Document<GuardedT<P>>;
