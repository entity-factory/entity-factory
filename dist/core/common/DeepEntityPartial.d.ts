export declare type DeepEntityPartial<T> = {
    [P in keyof T]?: DeepEntityPartial<T[P]>;
};
