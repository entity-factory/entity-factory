import { Comment } from '../samples/TypeormAdapter/Comment.entity';
import { CommentFixture } from '../samples/TypeormAdapter/Comment.fixture';
import { PostFixture } from '../samples/TypeormAdapter/Post.fixture';
import { UserFixture } from '../samples/TypeormAdapter/User.fixture';
import { FixtureProfile } from '../src';
import { FixtureProfileLoader } from '../src/profile/FixtureProfileLoader';

describe('FixtureProfileLoader', () => {
    it('should load function entities', async () => {
        const loader = new FixtureProfileLoader([
            UserFixture,
            new PostFixture(),
        ]);

        const profiles = loader.getProfiles();

        expect(profiles.length).toEqual(2);
        for (let i = 0; i < profiles.length; i++) {
            expect(profiles[i]).toBeInstanceOf(FixtureProfile);
        }

        expect(profiles[1]).toBeInstanceOf(FixtureProfile);
    });

    it('should load entities via glob pattern', async () => {
        const loader = new FixtureProfileLoader([
            'samples/TypeormAdapter/*.fixture.ts',
        ]);

        const profiles = loader.getProfiles();
        if (profiles) {
            expect(profiles.length).toEqual(3);
            for (let i = 0; i < profiles.length; i++) {
                expect(profiles[i]).toBeInstanceOf(FixtureProfile);
            }
        }
    });

    it('should let a mix of entities, functions and instances', async () => {
        const loader = new FixtureProfileLoader([
            'samples/TypeormAdapter/User.fixture.ts',
            CommentFixture,
            new PostFixture(),
        ]);

        const profiles = loader.getProfiles();
        expect(profiles.length).toEqual(3);
        for (let i = 0; i < profiles.length; i++) {
            expect(profiles[i]).toBeInstanceOf(FixtureProfile);
        }
    });

    it('should only load profiles', async () => {
        const loader = new FixtureProfileLoader([
            'samples/TypeormAdapter/*.entity.ts',
            Comment,
            new PostFixture(),
        ]);

        const profiles = loader.getProfiles();

        expect(profiles.length).toEqual(1);

        for (let i = 0; i < profiles.length; i++) {
            expect(profiles[i]).toBeInstanceOf(FixtureProfile);
        }
    });
});
