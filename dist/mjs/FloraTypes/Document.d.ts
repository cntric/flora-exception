/**
 * Document type predicate. Chcecks that any object is a document and has matching data.
 * @param Predicate is the predicate used to check the data.
 * @returns
 */
export declare const $Document: (Predicate?: ((obj: any) => boolean) | undefined) => (obj: any) => boolean;
