import { Comment } from '../../samples/00-entities/Comment.entity';
import { CommentFixture } from '../../samples/TypeormAdapter/Comment.fixture';
import { PostFixture } from '../../samples/TypeormAdapter/Post.fixture';
import { UserFixture } from '../../samples/TypeormAdapter/User.fixture';
import { BaseProfile } from './BaseProfile';
import { ProfileLoader } from './ProfileLoader';

describe('ProfileLoader', () => {
    it('should load function entities', async () => {
        const loader = new ProfileLoader([UserFixture, new PostFixture()]);

        const profiles = loader.getProfiles();

        expect(profiles.length).toEqual(2);
        for (const profile of profiles) {
            expect(profile).toBeInstanceOf(BaseProfile);
        }

        expect(profiles[1]).toBeInstanceOf(BaseProfile);
    });

    it('should load entities via glob pattern', async () => {
        const loader = new ProfileLoader([
            'samples/TypeormAdapter/*.fixture.ts',
        ]);

        const profiles = loader.getProfiles();
        if (profiles) {
            expect(profiles.length).toEqual(4);
        }
    });

    it('should let a mix of entities, functions and instances', async () => {
        const loader = new ProfileLoader([
            'samples/TypeormAdapter/User.fixture.ts',
            CommentFixture,
            new PostFixture(),
        ]);

        const profiles = loader.getProfiles();
        expect(profiles.length).toEqual(3);
        for (const profile of profiles) {
            expect(profile).toBeInstanceOf(BaseProfile);
        }
    });

    it('should only load profiles', async () => {
        const loader = new ProfileLoader([
            'samples/TypeormAdapter/*.entity.ts',
            Comment,
            new PostFixture(),
        ]);

        const profiles = loader.getProfiles();

        expect(profiles.length).toEqual(1);

        for (const profile of profiles) {
            expect(profile).toBeInstanceOf(BaseProfile);
        }
    });
});
