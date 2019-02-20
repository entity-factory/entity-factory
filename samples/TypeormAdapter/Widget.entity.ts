import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Widget {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    active: boolean;
}
