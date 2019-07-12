import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './Product.entity';

@Entity()
export class Store {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @OneToMany(() => Product, (product) => product.store)
    public products: Product[];
}
