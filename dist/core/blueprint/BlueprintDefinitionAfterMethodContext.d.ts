/// <reference types="faker" />
import { EntityFactory } from '../EntityFactory';
import FakerStatic = Faker.FakerStatic;
export interface BlueprintDefinitionAfterMethodContext<Adapter> {
    factory: EntityFactory;
    faker: FakerStatic;
    adapter: Adapter;
}
