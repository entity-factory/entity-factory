import { BlueprintDeepPartialMethod } from './BlueprintDeepPartialMethod';
export declare type BlueprintDeepPartial<T> = {
    [P in keyof T]?: BlueprintDeepPartial<T[P]> | BlueprintDeepPartialMethod<BlueprintDeepPartial<T[P]>>;
};
