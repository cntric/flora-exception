import { IsSeed, IsSeedBlighted, SeedI } from "./Seed";
import {
    If,
    query
} from "faunadb";
const {
    Reduce,
    Lambda,
    Or,
    Var
} = query;


export type FruitT<T> = SeedI<T> | T;
export type F<T> = FruitT<T>; 

export const IsFruitBlighted = (fruit : FruitT<any>) : boolean=>{
    return If(
        IsSeed(fruit),
        IsSeedBlighted(fruit),
        false
    ) as boolean
}

const fruit = "fruit";
const truth = "truth";
export const HasBlightedFruit = (fruits : FruitT<any>) : boolean =>{

    return Reduce(
        Lambda(
            [truth, fruit],
            Or(
                Var(truth),
                Var(IsFruitBlighted(Var(fruit)))
            )
        ),
        false,
        fruits
    ) as boolean

}
