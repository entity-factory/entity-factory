import { ObjectBlueprint } from '../../adapters/object/ObjectBlueprint';
import { Blueprint } from '../../blueprint/Blueprint';
import { BlueprintLoader } from '../../blueprint/BlueprintLoader';

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

    it('should load functions and instances', async () => {
        const loader = new BlueprintLoader([FooBlueprint, new BarBlueprint()]);

        const profiles = loader.getProfiles();
        expect(profiles.length).toEqual(2);
        for (const profile of profiles) {
            expect(profile).toBeInstanceOf(Blueprint);
        }
    });
});
