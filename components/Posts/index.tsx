import React from "react";
import Loader from "react-loader-spinner";
import PostItem from "./PostItem";
import { useGetPostsQuery } from "state/post";
import styles from "./Posts.module.scss";
import CreatePost from "./CreatePost";

const Posts: React.FC = () => {
  const { data: posts, error, isLoading } = useGetPostsQuery(100);

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
          <CreatePost />
          <ul className={styles.posts}>
            {posts.map((post) => (
              <PostItem key={post.id} {...post} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Posts;
