import * as q from "faunadb/query";
export const $Index = (obj) => {
    return q.IsIndex(obj);
};
