import { query } from "faunadb";
import {
    BlightI, GetBlightName
} from "./Blight";
import { UpdateBlightOnFloraDocument} from "./Flora";

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

    

    return UpdateBlightOnFloraDocument(blight) as BlightI

}