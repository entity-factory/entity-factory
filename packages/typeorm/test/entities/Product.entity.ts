import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Store } from './Store.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @ManyToOne(() => Store, (store) => store.products, { nullable: false })
    @JoinColumn()
    public store: Store;
}
