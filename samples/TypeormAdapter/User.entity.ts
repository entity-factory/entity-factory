import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './Post.entity';
import { Comment } from './Comment.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    active: boolean;

    @OneToMany(type => Post, post => post.author)
    posts: Post[];

    @OneToMany(type => Comment, comment => comment.user)
    comments: Comment[];
}
