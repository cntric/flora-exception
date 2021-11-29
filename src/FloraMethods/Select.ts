import {query as q} from "faunadb"
import { Fx, GuardedT } from "../Flora"
import { $Any, $String, $Object, $Tuple, $Array} from "../FloraTypes"

export const Select = <
    P extends (obj : any)=>obj is any,
    T extends GuardedT<P>,
    Path extends keyof T
>(
    path : Path,
    obj : T,
    $Predicate : P = $Any as P
) : T[Path]=>{

    return Fx(
        [ [ path, $String ], [obj, $Predicate] ], $Any,
        (path, obj)=>q.Select(path as string, obj as q.ExprArg) as unknown as T[Path]
    )

}

/**
 * Uses a path to perform a nested select, no type checks yet.
 * @param path 
 * @param expr 
 * @returns 
 */
export const NestedSelect = (path : string[], expr : any)=>{

    return q.Select(
        path,
        expr
    )

}

const EscapeMemberCode = "!";

export const mkDotProxyHandler = (expr : any) : ProxyHandler<any>=>{

    return {
        get : function(target, prop, receiver){

            if(target[prop]){
                return target[prop]
            }

            const _expr = Object.assign({}, expr);
            const __expr = Object.assign({}, expr);

            return new Proxy(
                Select(prop, _expr),   
                mkDotProxyHandler(Select(prop, __expr))
            );

        }
    }

} 

const exprName = "expression";
/**
 * 
 * @param path 
 * @param obj 
 * @param $Predicate 
 * @returns 
 */
export const Dot = <
    T extends {[key : string] : any},
>(
    obj : T,
) : T => {


    const _expr = Object.assign({},obj);
    const __expr = q.If(
        true,
        _expr,
        _expr
    );

    const handler = mkDotProxyHandler(__expr);

    return new Proxy(__expr, handler) as T

}

