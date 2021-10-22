import React, { useCallback } from "react";
import Loader from "react-loader-spinner";
import PostItem from "./PostItem";
import {
  Post,
  useCreatePostMutation,
  useDeletePostMutation,
  useGetPostsQuery,
  useUpdatePostMutation,
} from "state/post";
import styles from "./Posts.module.scss";
import CreatePost from "./CreatePost";

const Posts: React.FC = () => {
  const { data: posts, error, isLoading } = useGetPostsQuery(100);
  const [createPost] = useCreatePostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  const onPostCreate = useCallback(
    (post: Post) => {
      createPost(post);
    },
    [createPost]
  );

  const onPostUpdate = useCallback(
    (post: Post) => {
      updatePost(post);
    },
    [updatePost]
  );

  const onPostDelete = useCallback(
    (post: Post) => {
      deletePost(post);
    },
    [deletePost]
  );

  return (
    <div className={styles.container}>
      {isLoading && (
        <div className={styles.loader}>
          <Loader type="Bars" color="#00BFFF" height={40} />
        </div>
      )}
      {error && `Error - ${error}`}
      {posts && (
        <>
          <CreatePost onCreate={onPostCreate} />
          <ul className={styles.posts}>
            {posts.map((post) => (
              <PostItem
                key={post.id}
                {...post}
                onUpdate={onPostUpdate}
                onDelete={onPostDelete}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Posts;
