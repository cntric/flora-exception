import {
    query
} from "faunadb"
import {
    Blight,
    BlightI
} from "./Blight";
import {
    GuideI
} from "./Guide"
import {
    SpringI
} from "./Spring";
import {
    generate
} from "shortid";
import { Garden, GardenI, IsHealthyGarden } from "./Garden";
import { DefaultResolve, mkDefaultResolve, ResolveI } from "./Resolve";
import {SeedI} from "./Seed";
import { AllPluckedT, PluckAll } from "./Pluck";
const {
    If,
    IsObject,
    Select,
    Contains,
    Equals,
    Append,
    Merge,
    Var,
    Let
} = query;




export interface _YieldArgsI<A extends any[], T>{
    name : string,
    soil : A,
    guide : GuideI<A>
    spring : SpringI<A, T>,
    resolve : ResolveI<A, T>
}


const garden = "garden";
const healthy = "healthy";
/**
 * Yields 
 * @param args 
 * @returns 
 */
 export const _Yield = <A extends any[], T>(args : _YieldArgsI<A, T>) : SeedI<T>=>{

    console.log(args);


    return Let(
        {
            [garden] : Garden(args),
            [healthy] : IsHealthyGarden(Var(garden) as GardenI<A>, args.guide),
        },
        If(
            Equals(Var(healthy), true),
            args.spring(...args.soil),
            args.resolve({
                soil : args.soil,
                guide : args.guide,
                name : args.name,
                spring : args.spring
            })
        )
    ) as SeedI<T>

}

export interface YieldArgsI<A extends any[], T>{
    name? : string,
    soil : A,
    guide : GuideI<A>
    spring : SpringI<A, T>,
    resolve? : ResolveI<A, T>
}

export const Yield =  <A extends any[], T>(args : YieldArgsI<A, T>) : SeedI<T>=>{

    const caller = (new Error()).stack?.split("\n")[2].trim().split(" ")[1];

    console.log(args);

    return _Yield({
        name : caller || "undefined",
        resolve : mkDefaultResolve({
            ...args,
            name : caller || "undefined"
        }),
        ...args
    } as _YieldArgsI<A, T>)

}