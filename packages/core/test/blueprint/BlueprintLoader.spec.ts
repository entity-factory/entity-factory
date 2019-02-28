import { ObjectBlueprint } from '../../adapters/object/ObjectBlueprint';
import { Blueprint } from '../../blueprint/Blueprint';
import { BlueprintLoader } from '../../blueprint/BlueprintLoader';

class FooEntity {}
// tslint:disable-next-line
class FooBlueprint extends ObjectBlueprint<any> {}
// tslint:disable-next-line
class BarBlueprint extends ObjectBlueprint<any> {}

describe('BlueprintLoader', () => {
    it('should load function entities', async () => {
        const loader = new BlueprintLoader([FooBlueprint, new BarBlueprint()]);

        const profiles = loader.getProfiles();

        expect(profiles.length).toEqual(2);
        for (const profile of profiles) {
            expect(profile).toBeInstanceOf(Blueprint);
        }

        expect(profiles[1]).toBeInstanceOf(Blueprint);
    });

    it('should load entities via glob pattern', async () => {
        const loader = new BlueprintLoader(['samples/TypeormAdapter/*.fixture.ts']);

        const profiles = loader.getProfiles();
        if (profiles) {
            expect(profiles.length).toEqual(4);
        }
    });

    it('should let a mix of entities, functions and instances', async () => {
        const loader = new BlueprintLoader([
            'packages/core/test/blueprint/blueprints/*.blueprint.ts',
            FooBlueprint,
            new BarBlueprint(),
        ]);

        const profiles = loader.getProfiles();
        expect(profiles.length).toEqual(3);
        for (const profile of profiles) {
            expect(profile).toBeInstanceOf(Blueprint);
        }
    });

    it('should only load profiles', async () => {
        const loader = new BlueprintLoader(['samples/TypeormAdapter/*.entity.ts', FooEntity, new FooBlueprint()]);

        const profiles = loader.getProfiles();

        expect(profiles.length).toEqual(1);

        for (const profile of profiles) {
            expect(profile).toBeInstanceOf(Blueprint);
        }
    });
});
