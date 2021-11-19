import { GuardedT } from "../Flora";
export declare const $Or: <A extends ((obj: any) => boolean)[]>(...args: A) => (obj: any) => obj is GuardedT<A[number]>;
