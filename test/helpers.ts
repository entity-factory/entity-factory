import { Post } from '../samples/00-entities/Post.entity';
import { User } from '../samples/00-entities/User.entity';
import { EntityFactory, TypeormProfile } from '../src';

export const getDefaultFactory = () => {
    return new EntityFactory();
};

export const defineUserProfile = (
    factory: EntityFactory,
): TypeormProfile<User> => {
    const profile = new TypeormProfile<User>();

    profile.type(User);
    profile.define(async faker => ({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        active: true,
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    }));

    factory.register(profile);

    return profile;
};

export const definePostProfile = (
    factory: EntityFactory,
): TypeormProfile<Post> => {
    const profile = new TypeormProfile<Post>();
    profile.type(Post);
    profile.define(async faker => ({
        title: faker.company.catchPhrase(),
        body: faker.lorem.paragraphs(2, '\n\n'),
    }));

    factory.register(profile);

    return profile;
};
