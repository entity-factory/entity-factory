import { EntityFactory } from '@entity-factory/core';
import { Post } from '../../../samples/00-entities/Post.entity';
import { User } from '../../../samples/00-entities/User.entity';
import { TypeormBlueprint } from '../TypeormBlueprint';
export declare const getDefaultFactory: () => EntityFactory;
export declare const defineUserProfile: (factory: EntityFactory) => TypeormBlueprint<User>;
export declare const definePostProfile: (factory: EntityFactory) => TypeormBlueprint<Post>;
