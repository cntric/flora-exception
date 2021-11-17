import {
    Bother,
    BotherI
} from "./Bother";
import {
    ResolveArgsI
} from "./Resolve";
import {
    query
} from "faunadb";

const {
    Object : CreateObject,
    Select
} = query;

export interface InterpretI<A extends any[], T> {
    (args : ResolveArgsI<A, T>) : BotherI
}


const BotherType = "Bother";

export const makeDefaultBotherMessage = <A extends any[],T>(args : ResolveArgsI<A, T>) : string=>{

    return `Bother: ${args.name} received input which did not meet its guide.\n`
    + `Input:\n ${args.soil}\n`
    +  `Guide:\n ${args.guide.toString()}`

}

export const DefaultInterpret = <A extends any[],T>(args : ResolveArgsI<A, T>) : BotherI=>{

    return Bother({
        result : args.soil,
        type : BotherType,
        msg : makeDefaultBotherMessage(args)
    })

}