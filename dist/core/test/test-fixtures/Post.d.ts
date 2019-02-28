import { IComment } from './Comment';
import { IUser } from './User';
export declare class Post {
    id: number;
    author: IUser;
    title: string;
    body: string;
    comments: IComment[];
}
