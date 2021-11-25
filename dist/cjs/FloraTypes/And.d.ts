import { GuardedT } from "../Flora";
export declare const $And: <A extends ((obj: any) => boolean)[]>(...args: A) => (obj: any) => obj is GuardedT<A[number]>;
export declare const $Extends: <A extends ((obj: any) => boolean)[]>(...args: A) => (obj: any) => obj is GuardedT<A[number]>;
