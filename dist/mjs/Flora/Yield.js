import { ContainsPath, query } from "faunadb";
import { ContainsException, FloraException, GetExceptions } from "./Exception";
import { Reraise } from "./Raise";
const { If, IsObject, Select, Contains, Equals, Append, Merge, Var, Let } = query;
export const expressArgs = (args, evaluatedArgs, loc) => {
    return args.map((arg, index) => {
        return If(ContainsPath(index, evaluatedArgs), Select(index, evaluatedArgs), FloraException({
            name: "UndefinedArgException",
            msg: `The arg at index ${index} was not defined.`,
            location: loc
        }));
    });
};
const bargs = "bargs";
const result = "result";
/**
 * Yields the result of an expression.
 * @param args
 * @returns
 */
export const _Yield = (args) => {
    return Let({
        [bargs]: args.args,
        [result]: If(ContainsException(Var(bargs)), Reraise(GetExceptions(Var(bargs)), FloraException({
            name: "ReraisedException",
            msg: "This exception was reraised in a yield expression.",
            location: args.name
        })), args.expr(...expressArgs(args.args, Var(bargs), args.name)))
    }, Var(result));
};
export const Yield = (args) => {
    const caller = (new Error()).stack?.split("\n")[2].trim().split(" ")[1];
    const _args = {
        name: caller || "undefined",
        ...args
    };
    return _Yield(_args);
};