"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Yield = exports._Yield = exports.expressArgs = void 0;
const query_1 = require("faunadb/query");
const Exception_1 = require("./Exception");
const Fx_1 = require("./Fx");
const Raise_1 = require("./Raise");
const expressArgs = (args, evaluatedArgs, loc) => {
    return args.map((arg, index) => {
        return (0, query_1.If)((0, query_1.ContainsPath)(index, evaluatedArgs), (0, query_1.Select)(index, evaluatedArgs), (0, Exception_1.FloraException)({
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
    return (0, query_1.Let)({
        [bargs]: args.args,
        [result]: (0, query_1.If)((0, Exception_1.ContainsException)((0, query_1.Var)(bargs)), (0, Raise_1.Reraise)((0, Exception_1.GetExceptions)((0, query_1.Var)(bargs)), (0, Exception_1.FloraException)({
            name: "ReraisedException",
            msg: "This exception was reraised in a yield expression.",
            location: args.name
        })), args.expr(...(0, exports.expressArgs)(args.args, (0, query_1.Var)(bargs), args.name)))
    }, (0, query_1.Var)(result));
};
exports._Yield = _Yield;
const Yield = (args) => {
    var _a;
    if (Fx_1.FloraLocalState.performance) {
        return args.expr(...args.args);
    }
    const caller = (_a = (new Error()).stack) === null || _a === void 0 ? void 0 : _a.split("\n")[2].trim().split(" ")[1];
    const _args = Object.assign({ name: caller || "undefined" }, args);
    return (0, exports._Yield)(_args);
};
exports.Yield = Yield;
