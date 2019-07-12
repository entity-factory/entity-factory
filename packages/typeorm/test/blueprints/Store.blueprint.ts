import { TypeormBlueprint } from '../../TypeormBlueprint';
import { Product } from '../entities/Product.entity';
import { Store } from '../entities/Store.entity';

export class StoreBlueprint extends TypeormBlueprint<Store> {
    constructor() {
        super();

        this.type(Store);

        this.define(async ({ faker }) => ({
            name: faker.company.companyName(),
        }));

        this.state('with-products-make', async ({ factory }) => ({
            products: await factory.for(Product).make(5),
        }));

        this.state('with-products-create', async ({ factory }) => ({
            products: await factory.for(Product).create(5),
        }));

        this.state('with-products-workaround', async () => ({
            products: [],
        }));

        this.afterCreatingState('with-products-workaround', async (store, { factory }) => {
            store.products = await factory.for(Product).create(5, { store });
        });
    }
}
