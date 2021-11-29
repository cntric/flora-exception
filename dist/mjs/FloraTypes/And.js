import { And } from "faunadb";
export const $And = (...args) => (obj) => {
    const predicates = args.map((arg) => {
        return arg(obj);
    });
    return And(...predicates);
};
export const $Extends = $And;
