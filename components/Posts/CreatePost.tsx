import React, { SyntheticEvent, useState, useEffect } from "react";
import cx from "classnames";
import styles from "./Posts.module.scss";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useCreatePostMutation } from "state/post";
import { infoAdded, InfoStatus } from "state/info";

const CreatePost: React.FC = () => {
  const dispatch = useAppDispatch();
  const [createPost, { isSuccess, isError }] = useCreatePostMutation();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setAuthor("");
      dispatch(infoAdded({ text: "Post created", status: InfoStatus.Good }));
    } else if (isError) {
      dispatch(
        infoAdded({
          text: "Create post fucked up",
          status: InfoStatus.Bad,
        })
      );
    }
  }, [isSuccess, isError]);

  const onSubmitCreate = (e: SyntheticEvent) => {
    e.preventDefault();
    createPost({ id: -1, title, author });
  };

  return (
    <div className={cx(styles.post, styles["shadow-box"])}>
      <form className={styles.form} onSubmit={onSubmitCreate}>
        <input
          placeholder="Title"
          className={styles.title}
          value={title}
          onChange={(e) => void setTitle(e.target.value)}
        />
        <input
          placeholder="Author"
          className={styles.author}
          value={author}
          onChange={(e) => void setAuthor(e.target.value)}
        />
        <input type="submit" className={styles.submit} value="Create post" />
      </form>
    </div>
  );
};

export default CreatePost;
