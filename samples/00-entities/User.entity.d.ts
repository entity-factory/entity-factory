import { Comment } from './Comment.entity';
import { Post } from './Post.entity';
export declare class User {
    id: number;
    username: string;
    email: string;
    active: boolean;
    posts: Post[];
    comments: Comment[];
}
