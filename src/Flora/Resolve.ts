import {
    Do,
    query
} from "faunadb"
import {
    AddToBlight,
    Blight,
    BlightI
} from "./Blight";
import { BotherI } from "./Bother";
import { DefaultCatalog } from "./Catalog";
import { FruitT, HasBlightedFruit, IsFruitBlighted } from "./Fruit";
import { GuideI } from "./Guide";
import { DefaultInterpret } from "./Interpret";
import { GetSeedBlight, SeedI } from "./Seed";
import { SpringI } from "./Spring";
const {
    If,
    IsObject,
    Select,
    Contains,
    Equals,
    Append,
    Merge,
    Var,
    Filter,
    Let,
    Lambda,
    Map
} = query;

export interface ResolveArgsI<A extends FruitT<any>[], T>{
    soil : A,
    name : string,
    guide : GuideI<A>,
    spring : SpringI<A, T>
}
export interface ResolveI<A extends FruitT<any>[], T>{
    (args : ResolveArgsI<A, T>) : SeedI<T>
}

const fruit = "fruit";
/**
 * Filters to an array of fruits to just the blighted fruit.
 * @param fuits 
 * @returns 
 */
export const FilterToBlighted = (fuits : FruitT<any>[]) : FruitT<any>[]=>{
    return Filter(
        fuits,
        Lambda(
            [fruit],
            IsFruitBlighted(fruit)
        )
    ) as FruitT<any> []
}

/**
 * 
 * @param fruits 
 * @param bother 
 * @returns 
 */
export const AddAtBlighted = (fruits : FruitT<any>[], bother : BotherI) : BlightI[]=>{

    return Map(
        fruits,
        Lambda(
            [fruit],
            AddToBlight(
                GetSeedBlight(Var(fruit) as SeedI<any>),
                bother
            )
        )
    ) as BlightI[]

}

const blight = "blight";
export const UpdateBlighted = (
    blights : BlightI[],
    catalog : (blight : BlightI)=>BlightI,
) : BlightI[]=>{
    return Map(
        blights,
        Lambda(
            [blight],
            catalog(Var(blight) as BlightI)
        )
    ) as BlightI[]
}

const bother = "bother";
const blights = "blights";
export const mkResolve = <A extends FruitT<any>[], T>(
    catalog : (blight : BlightI)=>BlightI,
    interpret : (args : ResolveArgsI<A, T>)=>BotherI
)=>(args : ResolveArgsI<A, T>) : SeedI<T>=>{


    return Let(
        {
            [bother] : interpret(args),
            [blights] : UpdateBlighted(
                AddAtBlighted(
                    FilterToBlighted(
                        args.soil
                    ),
                    Var(bother) as BotherI
                ),
                catalog
            )
        },
        args.soil
    ) as SeedI<T>


}

export const Resolver = <A extends FruitT<any>[], T>(
    catalog : (blight : BlightI)=>BlightI,
    interpret : (args : ResolveArgsI<A, T>)=>BotherI,
    args : ResolveArgsI<A, T>
) : SeedI<T>=>{


    return Let(
        {
            [bother] : interpret(args),
            [blights] : UpdateBlighted(
                AddAtBlighted(
                    FilterToBlighted(
                        args.soil
                    ),
                    Var(bother) as BotherI
                ),
                catalog
            )
        },
        args.soil
    ) as SeedI<T>


}

/**
 * 
 * @param args 
 * @returns 
 */
export const DefaultResolve = <A extends FruitT<any>[], T>(
    args : ResolveArgsI<A, T>
) : SeedI<T> =>{


    return Resolver(DefaultCatalog, DefaultInterpret, args);

}

export const mkDefaultResolve = <A extends FruitT<any>[], T>(
    args : ResolveArgsI<A, T>
)=>(bargs : ResolveArgsI<A, T>)=>{

    console.log(args);

    DefaultResolve(args);

}