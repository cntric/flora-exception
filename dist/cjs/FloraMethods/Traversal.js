"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Traverse = exports.mkTraverseProxyHandler = exports.NestedTraversalSelect = exports.TraversalSelect = exports.Deref = void 0;
const Flora_1 = require("../Flora");
const FloraTypes_1 = require("../FloraTypes");
const Select_1 = require("./Select");
const FaunaMethods_1 = require("./FaunaMethods");
const faunadb_1 = require("faunadb");
const Select_2 = require("./Select");
/**
 * Gets the item if it is a ref.
 * @param obj
 * @returns
 */
const Deref = (obj) => {
    return (0, Flora_1.Fx)([[obj, FloraTypes_1.$Any]], FloraTypes_1.$Any, (obj) => faunadb_1.query.If((0, FloraTypes_1.$Ref)()(obj), (0, FaunaMethods_1.Get)(obj), obj));
};
exports.Deref = Deref;
const TraversalSelect = (path, obj) => {
    return (0, Flora_1.Fx)([[obj, FloraTypes_1.$Any]], FloraTypes_1.$Any, (obj) => (0, Select_1.Dot)((0, exports.Deref)(obj))[path]);
};
exports.TraversalSelect = TraversalSelect;
const NestedTraversalSelect = (path, expr) => {
    return faunadb_1.query.Reduce(faunadb_1.query.Lambda(["agg", "el"], (0, exports.TraversalSelect)(faunadb_1.query.Var("el"), faunadb_1.query.Var("agg"))), expr, path);
};
exports.NestedTraversalSelect = NestedTraversalSelect;
const mkTraverseProxyHandler = (expr, path) => {
    return {
        get: function (target, prop, receiver) {
            if (expr[prop]) {
                return expr[prop];
            }
            return new Proxy((0, Select_2.NestedSelect)(path, target), (0, exports.mkTraverseProxyHandler)((0, exports.Deref)(receiver), [...path, prop]));
        }
    };
};
exports.mkTraverseProxyHandler = mkTraverseProxyHandler;
const exprName = "expr";
/**
 * Traverses to another document by looking up from a key string.
 * @param key
 * @param obj
 * @param $Predicate
 * @returns
 */
const Traverse = (Doc, $Predicate = FloraTypes_1.$Any) => {
    const _expr = Object.assign({}, Doc);
    const handler = (0, exports.mkTraverseProxyHandler)(_expr, []);
    const __expr = faunadb_1.query.Let({
        [exprName]: _expr
    }, faunadb_1.query.Var(exprName));
    return new Proxy(__expr, handler);
};
exports.Traverse = Traverse;
