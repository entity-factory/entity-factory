import { ObjectAdapter } from '../../adapters/object/ObjectAdapter';
import { ObjectBlueprintOptions } from '../../adapters/object/ObjectBlueprintOptions';
import { BlueprintOptions } from '../../blueprint/BlueprintTypeOption';
import { DeepEntityPartial } from '../../common/DeepEntityPartial';
import { EntityFactory } from '../../EntityFactory';
import { CommentFixture } from '../test-fixtures/Comment.fixture';
import { Post } from '../test-fixtures/Post';
import { PostFixture } from '../test-fixtures/Post.fixture';
import { UserFixture } from '../test-fixtures/User.fixture';

interface IWidget {
    id: string;
    name: string;
    active: boolean;
}

class Widget {
    public id: number;
    public name: string;
    public active: boolean;

    public getName() {
        return this.name;
    }
}

// tslint:disable-next-line
class CustomIdClass {
    public customId: number;
    public name: string;
    public active: boolean;
}

const widgetPartial: DeepEntityPartial<IWidget> = {
    name: 'widgetA',
    active: true,
};

const widgetPartial2: DeepEntityPartial<IWidget> = {
    name: 'widgetB',
    active: true,
};

describe('ObjectAdapter', async () => {
    it('should return and entity based on a partial', async () => {
        const adapter = new ObjectAdapter();
        const result = await adapter.make([widgetPartial, widgetPartial2], {
            __type: 'widget',
        });

        expect(result[0].id).toBeUndefined();
        expect(result[1].id).toBeUndefined();
    });

    it('should create sequential ids when calling create by default', async () => {
        const adapter = new ObjectAdapter();
        const context = { __type: 'widget' };

        let result = await adapter.make([widgetPartial, widgetPartial2], context);
        result = await adapter.create(result, context);

        expect(result[0].id).toEqual(1);
        expect(result[1].id).toEqual(2);
    });

    it('should allow custom mappings for id attributes in options', async () => {
        const customPartial: DeepEntityPartial<CustomIdClass> = {
            name: 'custom',
        };

        const adapter = new ObjectAdapter();

        const context: BlueprintOptions<ObjectBlueprintOptions> = {
            __type: CustomIdClass,
            idAttribute: 'customId',
        };

        let results = await adapter.make([customPartial], context);
        results = await adapter.create(results, context);

        expect(results[0].customId).toEqual(1);
    });

    it('should allow string types to be used', async () => {
        const adapter = new ObjectAdapter();

        const context = { __type: 'interfaceType' };

        let results = await adapter.make([widgetPartial], context);

        expect(results[0].name).toEqual('widgetA');
        expect(results[0].active).toEqual(widgetPartial.active);

        results = await adapter.create(results, context);

        expect(results[0].id).toEqual(1);
    });

    it('should allow for id generation to be disabled', async () => {
        const adapter = new ObjectAdapter({
            generateId: false,
        });
        const context = { __type: Widget };

        let results = await adapter.make([widgetPartial], context);
        results = await adapter.create(results, context);

        expect(results[0].id).toBeUndefined();
    });

    it('should allow for id generation overridden by profile (enabled)', async () => {
        const adapter = new ObjectAdapter({
            generateId: false,
        });
        const context: BlueprintOptions<ObjectBlueprintOptions> = {
            __type: Widget,
            generateId: true,
        };

        let results = await adapter.make([widgetPartial], context);
        results = await adapter.create(results, context);

        expect(results[0].id).toEqual(1);
    });

    it('should allow for id generation overridden by profile (disabled)', async () => {
        const adapter = new ObjectAdapter({
            generateId: true,
        });
        const context: BlueprintOptions<ObjectBlueprintOptions> = {
            __type: Widget,
            generateId: false,
        };

        let results = await adapter.make([widgetPartial], context);
        results = await adapter.create(results, context);

        expect(results[0].id).toBeUndefined();
    });

    it('should allow the default id attribute to be changed', async () => {
        const context = { __type: CustomIdClass };

        const customPartial: DeepEntityPartial<CustomIdClass> = {
            name: 'custom',
        };

        const adapter = new ObjectAdapter({
            defaultIdAttribute: 'customId',
        });

        let results = await adapter.make([customPartial], context);
        results = await adapter.create(results, context);

        expect(results[0].customId).toEqual(1);
    });

    it('should handle properties that are falsy', async () => {
        const adapter = new ObjectAdapter();
        const partial: DeepEntityPartial<Widget> = {
            active: false,
        };

        const results = await adapter.make<Widget>([partial], {
            __type: Widget,
        });

        expect(results[0]).toBeInstanceOf(Widget);
        expect(results[0].getName()).toEqual(results[0].name);
        expect(results[0]).toBeInstanceOf(Widget);
        expect(results[0]).toHaveProperty('active');
        expect(results[0].active).toEqual(false);
    });

    describe('E2E', async () => {
        let factory: EntityFactory;

        beforeEach(async () => {
            const adapter = new ObjectAdapter();
            factory = new EntityFactory({
                adapter,
                profiles: [CommentFixture, PostFixture, UserFixture],
            });
        });

        it('should make an entity and its nested relations', async () => {
            const post = await factory
                .for(Post)
                .state('with-comments', 'with-author')
                .make();

            expect(post.author.id).toBeDefined();
            expect(post.comments.length).toBeGreaterThan(1);
            for (const comment of post.comments) {
                expect(comment.id).toBeDefined();
            }
        });

        it('should create an entity and its nested relations', async () => {
            const posts = await factory
                .for(Post)
                .state('with-comments', 'with-author')
                .create(3);

            for (const post of posts) {
                expect(post.id).toBeDefined();
                expect(post.author.id).toBeDefined();
                expect(post.comments.length).toBeGreaterThan(1);
                for (const comment of post.comments) {
                    expect(comment.id).toBeDefined();
                    expect(comment.user.id).toBeDefined();
                }
            }
        });
    });
});
