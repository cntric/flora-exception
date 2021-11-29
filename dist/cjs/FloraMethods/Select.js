"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dot = exports.mkDotProxyHandler = exports.NestedSelect = exports.Select = void 0;
const faunadb_1 = require("faunadb");
const FloraTypes_1 = require("../FloraTypes");
const Select = (path, obj, $Predicate = FloraTypes_1.$Any) => {
    return faunadb_1.query.Select(path, obj);
};
exports.Select = Select;
/**
 * Uses a path to perform a nested select, no type checks yet.
 * @param path
 * @param expr
 * @returns
 */
const NestedSelect = (path, expr) => {
    return faunadb_1.query.Select(path, expr);
};
exports.NestedSelect = NestedSelect;
const EscapeMemberCode = "!";
const mkDotProxyHandler = (expr) => {
    return {
        get: function (target, prop, receiver) {
            if (target[prop]) {
                return target[prop];
            }
            const _expr = Object.assign({}, expr);
            const __expr = Object.assign({}, expr);
            return new Proxy((0, exports.Select)(prop, _expr), (0, exports.mkDotProxyHandler)((0, exports.Select)(prop, __expr)));
        }
    };
};
exports.mkDotProxyHandler = mkDotProxyHandler;
const exprName = "expression";
/**
 *
 * @param path
 * @param obj
 * @param $Predicate
 * @returns
 */
const Dot = (obj) => {
    const _expr = Object.assign({}, obj);
    const __expr = faunadb_1.query.If(true, _expr, _expr);
    const handler = (0, exports.mkDotProxyHandler)(__expr);
    return new Proxy(__expr, handler);
};
exports.Dot = Dot;
