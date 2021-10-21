import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './Post.entity';
import { User } from './User.entity';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne((type) => User, (user) => user.id)
    @JoinColumn()
    public user: User;

    @Column()
    public body: string;

    @ManyToOne((type) => Post, (post) => post.comments, { nullable: false })
    @JoinColumn()
    public post: Post;
}
