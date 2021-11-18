"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fx = exports.getLocation = exports.getInstance = exports.extractArgs = exports.ExtractArgs = exports.ExtractArg = void 0;
const faunadb_1 = require("faunadb");
const Exception_1 = require("./Exception");
const Raise_1 = require("./Raise");
const Yield_1 = require("./Yield");
const shortid_1 = require("shortid");
const random_word_slugs_1 = require("random-word-slugs");
const { Map, If, Var, Lambda, ToString, Let } = faunadb_1.query;
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
    return Let({
        [xarg]: arg[0],
        [result]: If(Predicate(Var(xarg)), Var(xarg), (0, Raise_1.Raise)((0, Exception_1.FloraException)({
            name: "TypeException",
            msg: (0, faunadb_1.Concat)([
                `Argument does not match type ${predicateName}: Value {`,
                ToString(JSON.stringify(arg[0])),
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
    return Let({
        [result]: (0, Yield_1.Yield)({
            name: yieldLocation,
            args: (0, exports.extractArgs)(args, mainLocation),
            expr: expr
        })
    }, If($ReturnType(Var(result)), Var(result), If((0, Exception_1.IsException)(Var(result)), Var(result), (0, Raise_1.Raise)((0, Exception_1.FloraException)({
        name: "ReturnTypeExcpetion",
        msg: (0, faunadb_1.Concat)([
            `Return does not match type ${predicateName}: Value {`,
            Var(result),
            `} is not of type ${predicateName}`
        ]),
        location: mainLocation
    })))));
};
exports.Fx = Fx;
