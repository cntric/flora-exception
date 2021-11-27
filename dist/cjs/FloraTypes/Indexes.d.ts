import { values } from "faunadb";
export interface IndexI extends values.Document {
    active: boolean;
    serialized: boolean;
    name: string;
    unique: boolean;
    source: values.Ref;
    terms: {
        field: string[];
    }[];
}
export declare const $Index: (obj: any) => obj is IndexI;
