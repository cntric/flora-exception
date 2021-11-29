import { query as q } from "faunadb";
export const $Index = (obj) => {
    return q.IsIndex(obj);
};
