import { values } from "faunadb"
import {query as q} from "faunadb";
import { $Any } from "./Any";
import { $Object } from "./Object";
import { $String } from "./Primitives";

export interface CreateCollectionParamsI {
    name : string,
    data ? : {
        [key : string] : any
    },
    history_days ? : number,
    ttl_days ? : number
}

export interface CollectionI<T> extends values.Document{
    __fresh : false
}
export interface FreshCollectionI<T> extends values.Document {
    __fresh : true
}

/**
 * Collection type.
 * @param $Predicate as of 0.0.7 the predicate is only for the purpose of type suggestions in TypeScript. 
 * @returns 
 */
export const $Collection = <T extends any>(
    $Predicate : (obj : any)=> obj is T = $Any
) => {

    const name = `${$Predicate.name}Collection`;

    const map = {
        [name] : (obj : any): obj is CollectionI<T> =>{
            return q.IsCollection(obj) as unknown as boolean
        }
    }

    return map[name];

}

export interface CollectionObjectI {
    id : string
}
export const $CollectionObject : (obj : any)=>obj is CollectionObjectI= $Object({
    id : $String
});