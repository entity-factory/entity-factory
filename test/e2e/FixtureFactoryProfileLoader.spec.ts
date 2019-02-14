import { Comment } from '../../samples/entities/Comment';
import { CommentFixture } from '../../samples/fixtures/CommentFixture';
import { PostFixture } from '../../samples/fixtures/PostFixture';
import { UserFixture } from '../../samples/fixtures/UserFixture';
import { FixtureProfile } from '../../src';
import { FixtureProfileLoader } from '../../src/profile/FixtureProfileLoader';

describe('FixtureProfileLoader (e2e)', () => {
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
        const loader = new FixtureProfileLoader(['samples/fixtures/*.ts']);

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
            'samples/fixtures/UserFixture.ts',
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
            'samples/models/*.ts',
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
