import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from './Comment.entity';
import { Post } from './Post.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public username: string;

    @Column()
    public email: string;

    @Column()
    public active: boolean;

    @OneToMany((type) => Post, (post) => post.author, {
        nullable: false,
        cascade: true,
    })
    public posts: Post[];

    @OneToMany((type) => Comment, (comment) => comment.user, {
        nullable: false,
        cascade: true,
    })
    public comments: Comment[];
}
