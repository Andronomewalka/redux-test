import React, { SyntheticEvent, useState } from "react";
import cx from "classnames";
import styles from "./Posts.module.scss";
import { CreatePostProp } from "./types";

const CreatePost: React.FC<CreatePostProp> = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const onSubmitCreate = (e: SyntheticEvent) => {
    e.preventDefault();
    onCreate({ id: -1, title, author });
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
