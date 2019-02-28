import { EntityFactoryExecutor } from '../EntityFactoryExecutor';
export declare type BlueprintDeepPartialMethod<Type> = (factory: EntityFactoryExecutor) => Type | Promise<Type>;
