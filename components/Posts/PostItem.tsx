import React, { useState, SyntheticEvent } from "react";
import cx from "classnames";
import styles from "./Posts.module.scss";
import { PostProp } from "./types";

const PostItem: React.FC<PostProp> = (prop) => {
  const [title, setTitle] = useState(prop.title);
  const [author, setAuthor] = useState(prop.author);

  const onSubmitSave = (e: SyntheticEvent) => {
    e.preventDefault();
    prop.onUpdate({ ...prop, title, author });
  };

  const onDeletePost = (e: SyntheticEvent) => {
    e.preventDefault();
    prop.onDelete(prop);
  };

  return (
    <li className={cx(styles.post, styles["shadow-box"])}>
      <form className={styles.form} onSubmit={onSubmitSave}>
        <div>
          <label className={styles.label}>
            Title
            <input
              className={styles.title}
              value={title}
              onChange={(e) => void setTitle(e.target.value)}
            />
          </label>
          <label className={styles.label}>
            Author
            <input
              className={styles.author}
              value={author}
              onChange={(e) => void setAuthor(e.target.value)}
            />
          </label>
        </div>
        <div className={styles.buttonsContainer}>
          <button className={styles.delete} onClick={onDeletePost}>
            Delete
          </button>
          <input type="submit" className={styles.submit} value="Save" />
        </div>
      </form>
    </li>
  );
};

export default PostItem;
