import { CreateIndex, Do, Index, query } from "faunadb";
import { Yield } from "./Yield";
import {SeedI} from "./Seed";
import {generate} from "shortid";
import {
    floraKey, generateFloraKey
} from "./Key";
import {
    Blight,
    BlightI
} from "./Blight";
import { FruitT } from "./Fruit";
const {
    Let,
    If,
    IsObject,
    Object : CreateObject,
    Select,
    Contains,
    Equals,
    Append,
    Merge,
    Var,
    Collection,
    Database,
    Delete
} = query;


export interface FloraI<T> {
    (expr : SeedI<T>) : SeedI<T> 
}

export const BlightEnvironmentCollection = (name : string)=>{
    return Collection(name)
}

export const BlightEnvironmentIndex = (name : string, collectionName : string)=>{

    return CreateIndex({
        name : name,
        source : Collection(collectionName),
        terms : {
            name : ['data', 'name']
        }
    })

}

export interface FloraEnvironmentI {
    collection : string,
    index  : string
}

const collectionKey = "collection";
const indexKey = "index";
export const FloraEnvironment = (
    collection : string,
    index : string
) : FloraEnvironmentI=>{

    return CreateObject([
        [collectionKey, collection],
        [indexKey, index] 
    ]) as FloraEnvironmentI
} 


/**
 * Gets a the FloraEnvironment by retrieving the object stored at the Flora Key.
 * @returns 
 */
export const GetFloraEnvironment = () : FloraEnvironmentI=>{
    return Var(floraKey) as FloraEnvironmentI;
}

/**
 * Gets the Flora collection name.
 * @returns 
 */
export const GetFloraCollectionName = () : string=>{
    return Select(collectionKey, GetFloraEnvironment()) as string
}

/**
 * Gets the Flora Collection index.
 * @returns 
 */
export const GetFloraIndexName = () : string=>{
    return Select(indexKey, GetFloraEnvironment()) as string
}

export const TeardownFloraColleciton = ()=>{
    return Delete(Collection(GetFloraCollectionName()))
}

export const TeardownFloraIndex = ()=>{
    return Delete(Index(GetFloraIndexName()))
}

const fruit = "fruit";
const teardown = "teardown";
/**
 * Runs an expression in a flora environment.
 * @param expr 
 * @returns 
 */
export const Flora = <T>(expr :FruitT<T>) : FruitT<T> =>{

    const collection = generateFloraKey("collection");
    const index = generateFloraKey("index");

    return Let(
        {
            [floraKey] : [collection, index],
            [fruit] : expr,
            [teardown] : Do([
                TeardownFloraIndex(),
                TeardownFloraColleciton()
            ])
        },
        Var(fruit)
    ) as SeedI<T>

}
