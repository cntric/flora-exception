import { mFx, Fx, GuardedT } from "../Flora";
import { $Any, $String, $Document, $Ref, FloraRef } from "../FloraTypes";
import { values } from "faunadb";
import {Dot, Select} from "./Select";
import {Get} from "./FaunaMethods";
import {query as q} from "faunadb";
import { NestedSelect } from "./Select";

/**
 * Gets the item if it is a ref.
 * @param obj 
 * @returns 
 */
export const Deref = <T extends any>(obj : T | FloraRef<T>) : T =>{

    return Fx(
        [ [obj, $Any ] ], $Any,
        (obj)=>q.If(
            $Ref()(obj),
            Get(obj as FloraRef<T>) as any,
            obj as any
        ) as T
    )
}


export const TraversalSelect = <T, Path extends keyof T>(
    path : Path,
    obj : T | FloraRef<T>,
) : MappedExtractTraversalT<T[Path]> =>{
    return Fx(
        [ [obj, $Any ] ], $Any,
        (obj)=>Dot(
            Deref(obj)
        )[path]
    )
}

export const NestedTraversalSelect =  (path : string[], expr : any)=>{

    return q.Reduce(
        q.Lambda(
            ["agg", "el"],
            TraversalSelect(q.Var("el") as unknown as string, q.Var("agg") as any)
        ),
        expr,
        path
    )

}

export type ExtractTraversalT<T> =  T extends FloraRef<infer Y > ?
                                        Y : T

export type MappedExtractTraversalT<T> = T extends ({} | []) ? ExtractTraversalT<T> & {
    [key in keyof T] : ExtractTraversalT<T[key]>
} : ExtractTraversalT<T>

export type Thing = MappedExtractTraversalT<{
    name : string,
    doc : values.Document<{
        name : string
    }>
}>


export const mkTraverseProxyHandler =(expr : any, path : string[]) : ProxyHandler<any>=>{

    return {
        get : function(target, prop, receiver){

            if(expr[prop]){
                return expr[prop]
            }

            return new Proxy(
                NestedSelect(path, target),   
                mkTraverseProxyHandler(Deref(receiver), [...path, prop as string])
            );

        }
    }

} 


const exprName = "expr";
/**
 * Traverses to another document by looking up from a key string.
 * @param key 
 * @param obj 
 * @param $Predicate 
 * @returns 
 */
export const Traverse = <
    T extends any,
    P extends (obj : any)=>obj is T, 
>(
    Doc : T,
    $Predicate : P = $Any as P
) : MappedExtractTraversalT<T> =>{
    
    const _expr = Object.assign({},Doc);

    const handler = mkTraverseProxyHandler(_expr, []);

    const __expr = q.Let(
        {
            [exprName] : _expr
        },
        q.Var(exprName)
    )

    return new Proxy(__expr, handler as any) as MappedExtractTraversalT<T>

}