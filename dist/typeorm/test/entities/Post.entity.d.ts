import { Comment } from './Comment.entity';
import { User } from './User.entity';
export declare class Post {
    id: number;
    author: User;
    title: string;
    body: string;
    comments: Comment[];
}
