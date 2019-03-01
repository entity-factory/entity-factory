import { ObjectBlueprint } from '../../adapters/object/ObjectBlueprint';
import { EntityFactory } from '../../EntityFactory';
export declare class User {
    id: number;
    username: string;
    email: string;
    active: boolean;
    posts: Post[];
}
interface Post {
    id: number;
    author: User;
    title: string;
    body: string;
}
export declare const definePostProfile: (factory: EntityFactory) => ObjectBlueprint<Post>;
export declare const defineUserProfile: (factory: EntityFactory) => ObjectBlueprint<User>;
export {};
