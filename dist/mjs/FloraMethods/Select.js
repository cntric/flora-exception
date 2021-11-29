import { query as q } from "faunadb";
import { Fx } from "../Flora";
import { $Any, $String } from "../FloraTypes";
export const Select = (path, obj, $Predicate = $Any) => {
    return Fx([[path, $String], [obj, $Predicate]], $Any, (path, obj) => q.Select(path, obj));
};
/**
 * Uses a path to perform a nested select, no type checks yet.
 * @param path
 * @param expr
 * @returns
 */
export const NestedSelect = (path, expr) => {
    return q.Select(path, expr);
};
const EscapeMemberCode = "!";
export const mkDotProxyHandler = (expr) => {
    return {
        get: function (target, prop, receiver) {
            if (target[prop]) {
                return target[prop];
            }
            const _expr = Object.assign({}, expr);
            const __expr = Object.assign({}, expr);
            return new Proxy(Select(prop, _expr), mkDotProxyHandler(Select(prop, __expr)));
        }
    };
};
const exprName = "expression";
/**
 *
 * @param path
 * @param obj
 * @param $Predicate
 * @returns
 */
export const Dot = (obj) => {
    const _expr = Object.assign({}, obj);
    const __expr = q.If(true, _expr, _expr);
    const handler = mkDotProxyHandler(__expr);
    return new Proxy(__expr, handler);
};
