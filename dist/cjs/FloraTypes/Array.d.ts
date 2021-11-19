import { GuardedT } from "Flora/Fx";
/**
 * Checks if all elements in an array are of a certain type
 * @param Predicate
 * @returns
 */
export declare const $Array: <P extends (obj: any) => boolean>(Predicate: P) => (obj: any) => obj is GuardedT<P>[];
