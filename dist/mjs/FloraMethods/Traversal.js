import { Fx } from "../Flora";
import { $Any, $Ref } from "../FloraTypes";
import { Dot } from "./Select";
import { Get } from "./FaunaMethods";
import { query as q } from "faunadb";
import { NestedSelect } from "./Select";
/**
 * Gets the item if it is a ref.
 * @param obj
 * @returns
 */
export const Deref = (obj) => {
    return Fx([[obj, $Any]], $Any, (obj) => q.If($Ref()(obj), Get(obj), obj));
};
export const TraversalSelect = (path, obj) => {
    return Fx([[obj, $Any]], $Any, (obj) => Dot(Deref(obj))[path]);
};
export const NestedTraversalSelect = (path, expr) => {
    return q.Reduce(q.Lambda(["agg", "el"], TraversalSelect(q.Var("el"), q.Var("agg"))), expr, path);
};
export const mkTraverseProxyHandler = (expr, path) => {
    return {
        get: function (target, prop, receiver) {
            if (expr[prop]) {
                return expr[prop];
            }
            return new Proxy(NestedSelect(path, target), mkTraverseProxyHandler(Deref(receiver), [...path, prop]));
        }
    };
};
const exprName = "expr";
/**
 * Traverses to another document by looking up from a key string.
 * @param key
 * @param obj
 * @param $Predicate
 * @returns
 */
export const Traverse = (Doc, $Predicate = $Any) => {
    const _expr = Object.assign({}, Doc);
    const handler = mkTraverseProxyHandler(_expr, []);
    const __expr = q.Let({
        [exprName]: _expr
    }, q.Var(exprName));
    return new Proxy(__expr, handler);
};
