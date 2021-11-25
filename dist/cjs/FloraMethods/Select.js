"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dot = exports.mkDotProxyHandler = exports.NestedSelect = exports.Select = void 0;
const q = __importStar(require("faunadb/query"));
const Flora_1 = require("../Flora");
const FloraTypes_1 = require("../FloraTypes");
const Select = (path, obj, $Predicate = FloraTypes_1.$Any) => {
    return (0, Flora_1.Fx)([[path, FloraTypes_1.$String], [obj, $Predicate]], FloraTypes_1.$Any, (path, obj) => q.Select(path, obj));
};
exports.Select = Select;
/**
 * Uses a path to perform a nested select, no type checks yet.
 * @param path
 * @param expr
 * @returns
 */
const NestedSelect = (path, expr) => {
    return q.Select(path, expr);
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
    const __expr = q.If(true, _expr, _expr);
    const handler = (0, exports.mkDotProxyHandler)(__expr);
    return new Proxy(__expr, handler);
};
exports.Dot = Dot;
