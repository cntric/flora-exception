import { query } from "faunadb";
import {
    BlightI, GetBlightName
} from "./Blight";
import { GetFloraCollectionName, GetFloraIndexName } from "./Flora";

export interface Catalog {
    (blight : BlightI) : BlightI
}
const {
    If, 
    Get,
    Exists,
    Let,
    Match,
    Var,
    Update,
    Create,
    Select
} = query;

const name = "name";
const match = "match";
const blightDoc = "blightDoc";
export const DefaultCatalog = (blight : BlightI) : BlightI=>{

    return Let(
        {
            [name] : GetBlightName(blight),
            [match] : Match(GetFloraIndexName(), Var(name)),
            [blightDoc] : If(
                Exists(Var(match)),
                Update(Var(match), blight),
                Create(GetFloraCollectionName(), blight)
            )
        },
        Select("data", Var(blightDoc))
    ) as BlightI

}