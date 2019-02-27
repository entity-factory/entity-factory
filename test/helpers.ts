import { Post } from '../samples/00-entities/Post.entity';
import { User } from '../samples/00-entities/User.entity';
import { TypeormBlueprint } from '../src/adapters/typeorm/TypeormBlueprint';
import { EntityFactory } from '../src/EntityFactory';

export const getDefaultFactory = () => {
    return new EntityFactory();
};

export const defineUserProfile = (factory: EntityFactory): TypeormBlueprint<User> => {
    const profile = new TypeormBlueprint<User>();

    profile.type(User);
    profile.define(async (faker) => ({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        active: true,
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    }));

    factory.register(profile);

    return profile;
};

export const definePostProfile = (factory: EntityFactory): TypeormBlueprint<Post> => {
    const profile = new TypeormBlueprint<Post>();
    profile.type(Post);
    profile.define(async (faker) => ({
        title: faker.company.catchPhrase(),
        body: faker.lorem.paragraphs(2, '\n\n'),
    }));

    factory.register(profile);

    return profile;
};
