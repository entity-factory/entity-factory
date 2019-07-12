import { TypeormBlueprint } from '../../TypeormBlueprint';
import { Product } from '../entities/Product.entity';

export class ProductBlueprint extends TypeormBlueprint<Product> {
    constructor() {
        super();

        this.type(Product);

        this.define(async ({ faker }) => ({
            name: faker.lorem.text(),
        }));
    }
}
