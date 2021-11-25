"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mFx = exports.Fx = exports.getLocation = exports.getInstance = exports.extractArgs = exports.ExtractArgs = exports.ExtractArg = void 0;
const query_1 = require("faunadb/query");
const Exception_1 = require("./Exception");
const Raise_1 = require("./Raise");
const Yield_1 = require("./Yield");
const shortid_1 = require("shortid");
const random_word_slugs_1 = require("random-word-slugs");
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
        arg0 = JSON.stringify(arg[0]);
    }
    catch (_a) {
        arg0 = "Too deep";
    }
    return (0, query_1.Let)({
        [xarg]: arg[0],
        [result]: (0, query_1.If)(Predicate((0, query_1.Var)(xarg)), (0, query_1.Var)(xarg), (0, Raise_1.Raise)((0, Exception_1.FloraException)({
            name: "TypeException",
            msg: (0, query_1.Concat)([
                `Argument does not match type ${predicateName}: Value {`,
                arg0,
                `} is not of type ${predicateName}`
            ]),
            location: loc
        })))
    }, (0, query_1.Var)(result));
};
exports.ExtractArg = ExtractArg;
/**
 * Extracts args for a n array of TypePredicate tuples.
 * @param args
 * @param loc
 * @returns
 */
const ExtractArgs = (args, loc) => {
    return (0, query_1.Map)(args, (0, query_1.Lambda)(arg, (0, exports.ExtractArg)((0, query_1.Var)(arg), loc)));
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
    const abbrev = errorStack.split("\n").slice(1).join("\n");
    const caller = errorStack.split("\n")[2].trim().split(" ")[1];
    const _location = `${(0, exports.getInstance)()}/${errorStack.split("\n").length}`;
    const mainLoaction = `${caller} $(${_location}/MAIN)\n${abbrev}`;
    const yieldLocation = `${caller} $(${_location}/YIELD)\n${abbrev}`;
    return [mainLoaction, yieldLocation];
};
exports.getLocation = getLocation;
const xargs = "xargs";
const Fx = (args, $ReturnType, expr) => {
    const errorStack = new Error().stack || "";
    const [mainLocation, yieldLocation] = (0, exports.getLocation)(errorStack);
    const predicateName = $ReturnType ? $ReturnType.name || "$Unspecified" : "$Unspecified";
    return (0, query_1.Let)({
        [result]: (0, Yield_1.Yield)({
            name: yieldLocation,
            args: (0, exports.extractArgs)(args, mainLocation),
            expr: expr
        })
    }, (0, query_1.If)($ReturnType((0, query_1.Var)(result)), (0, query_1.Var)(result), (0, query_1.If)((0, Exception_1.IsException)((0, query_1.Var)(result)), (0, query_1.Var)(result), (0, Raise_1.Raise)((0, Exception_1.FloraException)({
        name: "ReturnTypeExcpetion",
        msg: (0, query_1.Concat)([
            `Return does not match type ${predicateName}: Value {`,
            (0, query_1.Var)(result),
            `} is not of type ${predicateName}`
        ]),
        location: mainLocation
    })))));
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
    return (0, exports.Fx)(reguardArgs(args, $ArgTypes), $ReturnType, expr);
};
exports.mFx = mFx;
