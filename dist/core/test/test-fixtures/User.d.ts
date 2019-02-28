import { IComment } from './Comment';
import { Post } from './Post';
export interface IUser {
    id: number;
    username: string;
    email: string;
    active: boolean;
    posts: Post[];
    comments: IComment[];
}
