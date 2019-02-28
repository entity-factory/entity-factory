/// <reference types="faker" />
import FakerStatic = Faker.FakerStatic;
import { BlueprintDeepPartial } from './BlueprintDeepPartial';
export declare type BlueprintDefinitionMethod<EntityType> = (fakerInstance: FakerStatic) => Promise<BlueprintDeepPartial<EntityType>>;
