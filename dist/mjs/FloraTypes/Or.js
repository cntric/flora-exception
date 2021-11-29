import { Or } from "faunadb";
export const $Or = (...args) => (obj) => {
    const predicates = args.map((arg) => {
        return arg(obj);
    });
    return Or(...predicates);
};
