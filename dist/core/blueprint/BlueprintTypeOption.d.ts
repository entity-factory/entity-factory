import { EntityObjectType } from '../common/EntityObjectType';
export declare type BlueprintOptions<Options> = Options & {
    __type: EntityObjectType<any> | string;
};
