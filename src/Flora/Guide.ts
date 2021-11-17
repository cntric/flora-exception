import {
    query
} from "faunadb"
import {
    Blight,
    BlightI
} from "./Blight";
const {
    If,
    IsObject,
    Select,
    Contains,
    Equals,
    Append,
    Merge
} = query;

export interface GuidePostI<A extends any[]>{
    (...args : A) : boolean
}

export const isGuideSectionKey = "isGuideSection";
export interface GuideSectionI<A extends any[]>{
    [isGuideSectionKey] : true
    post : GuidePostI<A>,
    rail : string
}

export const DefaultRail = "No blight detected."
export const DefaultGuideSection : GuideSectionI<any[]> = {
    [isGuideSectionKey] : true,
    post : ()=>true,
    rail : DefaultRail
} as const

export interface GuideSectionArgsI<A extends any[]> {
    post : GuidePostI<A>,
    rail : string
}

export const GuideSection = <A extends any[]>(args ? : GuideSectionArgsI<A>) : GuideSectionI<A>=>{

    return {
        ...DefaultGuideSection,
        ...args,
        [isGuideSectionKey] : true
    }

}


export interface GuideI<A extends any[]>{
    (...args : A) : boolean
}
