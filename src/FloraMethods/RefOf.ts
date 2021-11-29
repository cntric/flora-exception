import { mFx } from "../Flora/Fx";
import { $Any, $Document, $Ref } from "../FloraTypes";
import {query as q} from "faunadb";
import { values } from "faunadb";

/**
 * Gets the ref from a document.
 */
export const RefOf = (doc : values.Document)=>{
    return q.Select("ref", doc) as unknown as values.Ref
}