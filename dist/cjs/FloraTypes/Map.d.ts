export declare const $Map: <K, V extends string | number>($KeyPred?: (obj: any) => obj is K, $ValPred?: (obj: any) => obj is V) => (obj: any) => obj is {
    [key: string]: V;
};
