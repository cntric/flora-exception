import {
    Do,
    Length,
    query
} from "faunadb"
import {
    AddToBlight,
    Blight,
    BlightI,
    IsBlight
} from "./Blight";
import { BotherI } from "./Bother";
import { DefaultCatalog } from "./Catalog";
import { GuideI } from "./Guide";
import { DefaultInterpret } from "./Interpret";
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
    Map,
    GT
} = query;

export interface ResolveArgsI<A extends any[], T>{
    soil : A,
    name : string,
    guide : GuideI<A>,
    spring : SpringI<A, T>
}
export interface ResolveI<A extends any[], T>{
    (args : ResolveArgsI<A, T>) : T
}

const fruit = "fruit";
/**
 * Filters to an array of fruits to just the blighted fruit.
 * @param fuits 
 * @returns 
 */
export const FilterToBlighted = (fuits : any[]) : any[]=>{
    return Filter(
        fuits,
        Lambda(
            [fruit],
            IsBlight(fruit)
        )
    ) as BlightI[]
}

const blight = "blight";
/**
 * Adds a bother to blights.
 * @param blights 
 * @param bother 
 * @returns 
 */
export const _AddAtBlighted = (blights : BlightI[], bother : BotherI) : BlightI[]=>{

    return Map(
        blights,
        Lambda(
            [blight],
            AddToBlight(
                Var(blight) as BlightI,
                bother
            )
        )
    ) as BlightI[]

}

export const AddAtBlighted = (blights : BlightI[], bother : BotherI) : BlightI[]=>{
    return If(
        GT(0, Length(blights)),
        _AddAtBlighted(blights, bother),
        [
            Blight({
                spread : [bother]
            })
        ]
    ) as BlightI[]
}


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
export const mkResolve = <A extends any[], T>(
    catalog : (blight : BlightI)=>BlightI,
    interpret : (args : ResolveArgsI<A, T>)=>BotherI
)=>(args : ResolveArgsI<A, T>) : T=>{


    return Let(
        {
            [bother] : interpret(args),
            
        },
        Var(bother)
    ) as T


}

export const Resolver = <A extends any[], T>(
    catalog : (blight : BlightI)=>BlightI,
    interpret : (args : ResolveArgsI<A, T>)=>BotherI,
    args : ResolveArgsI<A, T>
) : T=>{


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
        Var(blights)
    ) as T


}

/**
 * 
 * @param args 
 * @returns 
 */
export const DefaultResolve = <A extends any[], T>(
    args : ResolveArgsI<A, T>
) : T =>{

    return Resolver(DefaultCatalog, DefaultInterpret, args);

}

export const mkDefaultResolve = <A extends any[], T>(
    args : ResolveArgsI<A, T>
)=>(bargs : ResolveArgsI<A, T>)=>{

    return DefaultResolve(args);

}