import {values} from "faunadb";
import * as q from "faunadb/query";

export interface IndexI extends values.Document {
    active : boolean,
    serialized : boolean,
    name : string,
    unique : boolean,
    source : values.Ref,
    terms : {field : string[]}[]
}

export const $Index = (obj : any) : obj is IndexI => {
    return q.IsIndex(obj) as unknown as boolean
} 