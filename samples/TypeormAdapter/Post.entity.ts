import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User.entity';
import { Comment } from './Comment.entity';

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
