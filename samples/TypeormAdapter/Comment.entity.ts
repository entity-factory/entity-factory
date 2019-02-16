import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './Post.entity';
import { User } from './User.entity';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.id)
    @JoinColumn()
    user: User;

    body: string;

    @ManyToOne(type => Post, post => post.comments)
    @JoinColumn()
    post: Post;
}
