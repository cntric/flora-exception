import { values } from "faunadb";
/**
 * Gets the ref from a document.
 */
export declare const RefOf: (...args: values.Document<any>[]) => import("../FloraTypes").FloraRef<unknown>;
