export declare const $Map: <K extends string | number, V>($KeyPred?: (obj: any) => obj is K, $ValPred?: (obj: any) => obj is V) => (obj: any) => obj is {
    [key: string]: V;
};
