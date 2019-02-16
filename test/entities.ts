export class User {
    id: number;
    name: string;
    username: string;
    email: string;
    active: boolean;
    posts: Post[];
}

export class Post {
    id: number;
    title: string;
    body: string;
    author: User;
}
