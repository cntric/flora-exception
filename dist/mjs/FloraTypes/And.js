import { And } from "faunadb/query";
export const $And = (...args) => (obj) => {
    const predicates = args.map((arg) => {
        return arg(obj);
    });
    return And(...predicates);
};
export const $Extends = $And;
