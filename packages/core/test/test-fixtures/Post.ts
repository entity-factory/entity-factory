import { IComment } from './Comment';
import { IUser } from './User';

export class Post {
    public id: number;
    public author: IUser;
    public title: string;
    public body: string;
    public comments: IComment[];
}
