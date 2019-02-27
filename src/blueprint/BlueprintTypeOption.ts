import { EntityObjectType } from '../common/EntityObjectType';

export type BlueprintOptions<Options> = Options & { __type: EntityObjectType<any> | string };
