import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from './Comment.entity';
import { User } from './User.entity';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne((type) => User, (user) => user.posts)
    @JoinColumn()
    public author: User;

    @Column()
    public title: string;

    @Column()
    public body: string;

    @OneToMany((type) => Comment, (comment) => comment.post)
    public comments: Comment[];
}
