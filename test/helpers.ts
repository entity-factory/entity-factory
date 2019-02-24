import { Post } from '../samples/TypeormAdapter/Post.entity';
import { User } from '../samples/TypeormAdapter/User.entity';
import {
    EntityFactory,
    ProfileBlueprint,
    TypeormAdapter,
    TypeormBlueprint,
    TypeormContext,
} from '../src';

export const getDefaultFactory = () => {
    return new EntityFactory();
};

export const defineUserBlueprint = (
    factory: EntityFactory,
): TypeormBlueprint<User> => {
    const blueprint = new ProfileBlueprint<
        User,
        TypeormAdapter,
        TypeormContext
    >();

    blueprint.setType(User);
    blueprint.define(async faker => ({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        active: true,
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    }));

    factory.register(blueprint);

    return blueprint;
};

export const definePostBlueprint = (
    factory: EntityFactory,
): ProfileBlueprint<Post, TypeormAdapter, TypeormContext> => {
    const blueprint = new ProfileBlueprint<
        Post,
        TypeormAdapter,
        TypeormContext
    >();
    blueprint.setType(Post);
    blueprint.define(async faker => ({
        title: faker.company.catchPhrase(),
        body: faker.lorem.paragraphs(2, '\n\n'),
    }));

    factory.register(blueprint);

    return blueprint;
};
