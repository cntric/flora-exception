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
import { Garden, garden as createGarden, GardenI, IsHealthyGarden, IsHealthyClientGarden } from "./Garden";
import { DefaultResolve, mkDefaultResolve, ResolveI } from "./Resolve";

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
 export const _Yield = <A extends any[], T>(args : _YieldArgsI<A, T>) : T=>{

    const {
        resolve,
        spring,
        guide,
        ...rest
    } = args;

    
    

    return Let(
        {
            [healthy] : IsHealthyClientGarden(createGarden(rest), guide),
        },
        If(
            Equals(Var(healthy), true),
            spring(...args.soil),
            resolve({
                soil : args.soil,
                guide : guide,
                name : args.name,
                spring : spring
            })
        )
    ) as T

}

export interface YieldArgsI<A extends any[], T>{
    name? : string,
    soil : A,
    guide : GuideI<A>
    spring : SpringI<A, T>,
    resolve? : ResolveI<A, T>
}

export const Yield =  <A extends any[], T>(args : YieldArgsI<A, T>) : T=>{

    const caller = (new Error()).stack?.split("\n")[2].trim().split(" ")[1];

    const _args = {
        name : caller || "undefined",
        resolve : mkDefaultResolve({
            ...args,
            name : caller || "undefined"
        }),
        ...args
    }

    return _Yield(_args as _YieldArgsI<A, T>)

}