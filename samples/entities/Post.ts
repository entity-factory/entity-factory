import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { Comment } from './Comment';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.posts)
    @JoinColumn()
    author: User;

    @Column()
    title: string;

    @Column()
    body: string;

    @OneToMany(type => Comment, comment => comment.post)
    comments: Comment[];
}
