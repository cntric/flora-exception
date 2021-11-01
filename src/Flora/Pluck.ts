import {
    query
} from "faunadb"
import { GetSeedBlight, IsSeed, IsSeedBlighted, SeedI } from "./Seed";
import {FruitT} from "./Fruit";

const {
    If,
    IsObject,
    Select,
    Contains,
    Equals,
    Append,
    Merge,
    Var,
    Let,
    Lambda,
    Map
} = query;

export type PluckedT<T> = T extends SeedI<infer X> ? X : T;
export type AllPluckedT<A extends FruitT<any>[]> = {
    [K in keyof A] : PluckedT<K>
} 

/**
 * Gets the value from a yield.
 * @param y 
 * @returns 
 */
 export const PluckYield = <T>(fruit : FruitT<T>) : T=>{

    return If(
        IsSeedBlighted(fruit as SeedI<T>),
        GetSeedBlight(fruit as SeedI<T>),
        Select(0, fruit)
    ) as T

}

/**
 * Gets the value from the yield or value.
 * @param fruit
 * @returns 
 */
export const Pluck = <T>(fruit : FruitT<T>) : T=>{

    return If(
        IsSeed(fruit),
        PluckYield(fruit),
        fruit
    ) as T

}

export const fruit = "fruit";
/**
 * Plucks fruit from an array of fruits.
 * @param fruits 
 * @returns 
 */
export const PluckAll = <A extends FruitT<any>[]>(fruits : A) : AllPluckedT<A>=>{

    return Map(
        fruits,
        Lambda(
            fruit,
            Pluck(Var(fruit))
        )
    ) as AllPluckedT<A>

}