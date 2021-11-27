import { Concat, Map, If, Var, Lambda, Format, Let } from "faunadb/query";
import { FloraException, IsException } from "./Exception";
import { Raise } from "./Raise";
import { Yield } from "./Yield";
import { generate } from "shortid";
import { generateSlug } from "random-word-slugs";
const result = "result";
const arg = "arg";
const xarg = "xarg";
/**
 * Extracts an arg from a TypePredicate tuple.
 * @param arg
 * @param loc
 * @returns
 */
export const ExtractArg = (arg, loc) => {
    const predicateName = arg[1] ? arg[1].name || "$Unspecified" : "$Unspecified";
    const Predicate = arg[1] ? arg[1] : () => true;
    let arg0 = "";
    try {
        arg0 = `${arg[0].toString().slice(0, 20)}...`;
    }
    catch {
        arg0 = "[failedToString]";
    }
    return Let({
        [xarg]: arg[0],
        [result]: If(Predicate(Var(xarg)), Var(xarg), Raise(FloraException({
            name: "TypeException",
            msg: Concat([
                `Argument does not match type ${predicateName}: Value {`,
                Format('%@', Var(xarg)),
                `} is not of type ${predicateName}`
            ]),
            location: loc
        })))
    }, Var(result));
};
/**
 * Extracts args for a n array of TypePredicate tuples.
 * @param args
 * @param loc
 * @returns
 */
export const ExtractArgs = (args, loc) => {
    return Map(args, Lambda(arg, ExtractArg(Var(arg), loc)));
};
/**
 * Extracts args from an array of type predicate Tuples on the client.
 * @param args
 * @param loc
 * @returns
 */
export const extractArgs = (args, loc) => {
    return args.map((arg) => {
        return ExtractArg(arg, loc);
    });
};
export const getInstance = () => {
    return `${generateSlug(1, {
        format: "title",
        partsOfSpeech: ["adjective",],
        categories: {
            adjective: ["personality"]
        }
    })}${generateSlug(1, {
        format: "title",
        partsOfSpeech: ["noun",],
        categories: {
            noun: ["animals"]
        }
    })}/${generate()}`;
};
export const getLocation = (errorStack) => {
    const caller = errorStack.split("\n")[2].trim().split(" ")[1];
    const _location = `${getInstance()}/${errorStack.split("\n").length}`;
    const mainLoaction = `${caller} $(${_location}/MAIN)`;
    const yieldLocation = `${caller} $(${_location}/YIELD(`;
    return [mainLoaction, yieldLocation];
};
const xargs = "xargs";
export const Fx = (args, $ReturnType, expr) => {
    const errorStack = new Error().stack || "";
    const [mainLocation, yieldLocation] = getLocation(errorStack);
    const predicateName = $ReturnType ? $ReturnType.name || "$Unspecified" : "$Unspecified";
    return Let({
        [result]: Yield({
            name: yieldLocation,
            args: extractArgs(args, mainLocation),
            expr: expr
        })
    }, If($ReturnType(Var(result)), Var(result), If(IsException(Var(result)), Var(result), Raise(FloraException({
        name: "ReturnTypeExcpetion",
        msg: Concat([
            `Return does not match type ${predicateName}: Value {`,
            Format('%@', Var(result)),
            `} is not of type ${predicateName}`
        ]),
        location: mainLocation
    })))));
};
const reguardArgs = (args, argTypes) => {
    return args.map((arg, index) => {
        return [
            arg,
            argTypes[index] ? argTypes[index] : () => true
        ];
    });
};
/**
 * Factory for a Fx function.
 * @param args
 * @param $ReturnType
 * @param expr
 * @returns
 */
export const mFx = ($ArgTypes, $ReturnType, expr) => (...args) => {
    return Fx(reguardArgs(args, $ArgTypes), $ReturnType, expr);
};
