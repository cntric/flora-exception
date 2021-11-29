"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mFx = exports.Fx = exports.getLocation = exports.getInstance = exports.stableExtractArgs = exports.extractArgs = exports.ExtractArgs = exports.ExtractArg = exports.togglePerformance = exports.FloraLocalState = void 0;
const faunadb_1 = require("faunadb");
const Exception_1 = require("./Exception");
const Raise_1 = require("./Raise");
const shortid_1 = require("shortid");
const random_word_slugs_1 = require("random-word-slugs");
const { Concat, Map, If, Var, Lambda, Format, ToString, Let } = faunadb_1.query;
exports.FloraLocalState = {
    performance: false
};
const togglePerformance = (b) => {
    exports.FloraLocalState.performance = b;
};
exports.togglePerformance = togglePerformance;
const result = "result";
const arg = "arg";
const xarg = "xarg";
/**
 * Extracts an arg from a TypePredicate tuple.
 * @param arg
 * @param loc
 * @returns
 */
const ExtractArg = (arg, loc) => {
    const predicateName = arg[1] ? arg[1].name || "$Unspecified" : "$Unspecified";
    const Predicate = arg[1] ? arg[1] : () => true;
    let arg0 = "";
    try {
        arg0 = `${arg[0].toString().slice(0, 20)}...`;
    }
    catch (_a) {
        arg0 = "[failedToString]";
    }
    return Let({
        [xarg]: arg[0],
        [result]: If(Predicate(Var(xarg)), Var(xarg), (0, Raise_1.Raise)((0, Exception_1.FloraException)({
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
exports.ExtractArg = ExtractArg;
/**
 * Extracts args for a n array of TypePredicate tuples.
 * @param args
 * @param loc
 * @returns
 */
const ExtractArgs = (args, loc) => {
    return Map(args, Lambda(arg, (0, exports.ExtractArg)(Var(arg), loc)));
};
exports.ExtractArgs = ExtractArgs;
/**
 * Extracts args from an array of type predicate Tuples on the client.
 * @param args
 * @param loc
 * @returns
 */
const extractArgs = (args, loc) => {
    return args.map((arg) => {
        return (0, exports.ExtractArg)(arg, loc);
    });
};
exports.extractArgs = extractArgs;
const stableExtractArgs = (args) => {
    return args.map((arg) => {
        return arg[0];
    });
};
exports.stableExtractArgs = stableExtractArgs;
const getInstance = () => {
    return `${(0, random_word_slugs_1.generateSlug)(1, {
        format: "title",
        partsOfSpeech: ["adjective",],
        categories: {
            adjective: ["personality"]
        }
    })}${(0, random_word_slugs_1.generateSlug)(1, {
        format: "title",
        partsOfSpeech: ["noun",],
        categories: {
            noun: ["animals"]
        }
    })}/${(0, shortid_1.generate)()}`;
};
exports.getInstance = getInstance;
const getLocation = (errorStack) => {
    const caller = errorStack.split("\n")[2].trim().split(" ")[1];
    const _location = `${(0, exports.getInstance)()}/${errorStack.split("\n").length}`;
    const mainLoaction = `${caller} $(${_location}/MAIN)`;
    const yieldLocation = `${caller} $(${_location}/YIELD(`;
    return [mainLoaction, yieldLocation];
};
exports.getLocation = getLocation;
const xargs = "xargs";
const Fx = (args, $ReturnType, expr) => {
    return expr(...(0, exports.stableExtractArgs)(args));
    /*const errorStack = new Error().stack || "";
    const [mainLocation, yieldLocation] = getLocation(errorStack);
    const predicateName = $ReturnType ? $ReturnType.name||"$Unspecified" : "$Unspecified";

    return Let(
        {
            [result] : Yield({
                name : yieldLocation,
                args : extractArgs(args, mainLocation),
                expr : expr
            })
        },
        If(
            $ReturnType(
                Var(result)
            ),
            Var(result),
            If(
                IsException(
                    Var(result)
                ),
                Var(result),
                Raise(
                    FloraException({
                        name : "ReturnTypeExcpetion",
                        msg :  Concat(
                            [
                                `Return does not match type ${predicateName}: Value {`,
                                Format('%@', Var(result)),
                                `} is not of type ${predicateName}`
                            ]
                        ) as unknown as string,
                        location : mainLocation
                    })
                )
            )
        )
    ) as GuardedT<R>*/
};
exports.Fx = Fx;
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
const mFx = ($ArgTypes, $ReturnType, expr) => (...args) => {
    return expr(...args);
    /*return Fx(
        reguardArgs(args, $ArgTypes),
        $ReturnType,
        expr as (...args : any[])=>GuardedT<R>
    )*/
};
exports.mFx = mFx;
