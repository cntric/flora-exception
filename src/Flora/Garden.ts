import {
    Let,
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
    generate
} from "shortid";
const {
    If,
    IsObject,
    Select,
    Contains,
    Equals,
    Append,
    Object : CreateObject,
    Merge,
    Var
} = query;

export const isGardenKey = "isGardenKey" as const;
export interface GardenI<A extends any[]> {
    [isGardenKey] : true,
    name : string,
    soil : A,
}

/**
 * Client predicate for whether any obj is a Garden.
 * @param obj 
 * @returns 
 */
export const isGarden = (obj : any) : obj is BlightI=>{

    return obj instanceof Object && obj[isGardenKey] === true;

}

/**
 * FQL expression to detect if something is a Garden.
 * @param expr 
 * @returns 
 */
export const IsGarden = (expr : query.ExprArg) : expr is BlightI=>{

    return If(
        IsObject(expr),
        If(
            Contains(isGardenKey, expr),
            Equals(
                Select(isGardenKey, expr),
                true
            ),
            false
        ),
        false
    ) as boolean

}



export const NoNameGarden = "NoName";
export const DefaultGarden : GardenI<[]> = {
    [isGardenKey] : true,
    name : `${NoNameGarden}-${generate()}`,
    soil : [],
}

export interface GardenArgsI<A extends any[]> {
    name ? : string,
    soil ? : GardenI<A>["soil"],
}
const merge = "merge";
const soil = "soil";
/**
 * Constructs a garden from the provided args.
 * @param args 
 * @returns 
 */
export const Garden = <A extends any[]>(
    args? : GardenArgsI<A>
) : GardenI<A>=>{

    

    // need to merge first, then select
    return Merge(
            DefaultGarden,
            [
                args || {}
            ]
    )as GardenI<A>

}

export const garden = <A extends any[]>(
    args ? : GardenArgsI<A>
)=>{

    return {
        ...DefaultGarden,
        ...args
    }

}


/**
 * Checks if the garden does not have a blight.
 * @param garden 
 * @returns 
 */
export const IsHealthyGarden = (garden : GardenI<any>, guide : GuideI<any>) : boolean=>{

    return guide(Select(soil, garden));

}

export const IsHealthyClientGarden = (
    garden : GardenI<any>, guide : GuideI<any>
) : boolean =>{
    
    return guide(...garden.soil);

}