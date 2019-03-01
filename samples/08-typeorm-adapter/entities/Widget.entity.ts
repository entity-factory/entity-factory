import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Widget {
    @PrimaryGeneratedColumn()
    public widgetId: number;

    @Column()
    public name: string;

    @Column()
    public active: boolean;
}
