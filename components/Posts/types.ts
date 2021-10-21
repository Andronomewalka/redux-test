import { Post } from "state/post";

export interface PostProp extends Post {
    onUpdate: (post: Post) => void;
    onDelete: (post: Post) => void;
}

export interface CreatePostProp {
    onCreate: (post: Post) => void;
}
