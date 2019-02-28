import { Post } from './Post';
import { IUser } from './User';
export interface IComment {
    id: number;
    user: IUser;
    body: string;
    post: Post;
}
