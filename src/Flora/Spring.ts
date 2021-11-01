import {
    query
} from "faunadb"
import {
    Blight,
    BlightI
} from "./Blight";
const {
    If,
    IsObject,
    Select,
    Contains,
    Equals,
    Append,
    Merge
} = query;


export interface SpringI<A extends any[], T>{
    (...args : A) : T
}