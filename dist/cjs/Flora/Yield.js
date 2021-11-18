"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Yield = exports._Yield = exports.expressArgs = void 0;
const faunadb_1 = require("faunadb");
const Exception_1 = require("./Exception");
const Raise_1 = require("./Raise");
const { If, IsObject, Select, Contains, Equals, Append, Merge, Var, Let } = faunadb_1.query;
const expressArgs = (args, evaluatedArgs, loc) => {
    return args.map((arg, index) => {
        return If((0, faunadb_1.ContainsPath)(index, evaluatedArgs), Select(index, evaluatedArgs), (0, Exception_1.FloraException)({
            name: "UndefinedArgException",
            msg: `The arg at index ${index} was not defined.`,
            location: loc
        }));
    });
};
exports.expressArgs = expressArgs;
const bargs = "bargs";
const result = "result";
/**
 * Yields the result of an expression.
 * @param args
 * @returns
 */
const _Yield = (args) => {
    return Let({
        [bargs]: args.args,
        [result]: If((0, Exception_1.ContainsException)(Var(bargs)), (0, Raise_1.Reraise)((0, Exception_1.GetExceptions)(Var(bargs)), (0, Exception_1.FloraException)({
            name: "ReraisedException",
            msg: "This exception was reraised in a yield expression.",
            location: args.name
        })), args.expr(...(0, exports.expressArgs)(args.args, Var(bargs), args.name)))
    }, Var(result));
};
exports._Yield = _Yield;
const Yield = (args) => {
    var _a;
    const caller = (_a = (new Error()).stack) === null || _a === void 0 ? void 0 : _a.split("\n")[2].trim().split(" ")[1];
    const _args = Object.assign({ name: caller || "undefined" }, args);
    return (0, exports._Yield)(_args);
};
exports.Yield = Yield;
