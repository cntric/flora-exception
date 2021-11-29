import { query as q } from "faunadb";
/**
 * Gets the ref from a document.
 */
export const RefOf = (doc) => {
    return q.Select("ref", doc);
};
