import * as q from "faunadb/query";
import { floraCollectionKey } from "../Flora/Key";

export const DeployFloraCollection = ()=>{
    return q.If(
        q.Exists(q.Collection(floraCollectionKey)),
        q.Collection(floraCollectionKey),
        q.CreateCollection({
            name : floraCollectionKey
        })
    )
}