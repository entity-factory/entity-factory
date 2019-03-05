import { Post } from './Post.entity';
import { User } from './User.entity';
export declare class Comment {
    id: number;
    user: User;
    body: string;
    post: Post;
}
