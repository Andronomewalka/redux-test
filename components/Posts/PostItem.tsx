import React, { useState, useEffect, SyntheticEvent } from "react";
import Loader from "react-loader-spinner";
import cx from "classnames";
import styles from "./Posts.module.scss";
import { Post, useDeletePostMutation, useUpdatePostMutation } from "state/post";
import { useAppDispatch } from "hooks/useAppDispatch";
import { infoAdded, InfoStatus } from "state/info";

const PostItem: React.FC<Post> = (prop) => {
  const dispatch = useAppDispatch();
  const [updatePost, { isLoading: isUpdating, isError: updatingError }] =
    useUpdatePostMutation();
  const [deletePost, { isLoading: isDeleting, isError: deletingError }] =
    useDeletePostMutation();
  const [title, setTitle] = useState(prop.title);
  const [author, setAuthor] = useState(prop.author);

  useEffect(() => {
    if (isUpdating) {
      dispatch(infoAdded({ text: "Post updated", status: InfoStatus.Good }));
    } else if (updatingError) {
      dispatch(
        infoAdded({
          text: "Update post fucked up",
          status: InfoStatus.Bad,
        })
      );
    } else if (isDeleting) {
      dispatch(infoAdded({ text: "Post deleted", status: InfoStatus.Good }));
    } else if (deletingError) {
      dispatch(
        infoAdded({
          text: "Deleting post fucked up",
          status: InfoStatus.Bad,
        })
      );
    }
  }, [isUpdating, updatingError, isDeleting, deletingError]);

  const onPostUpdate = (e: SyntheticEvent) => {
    e.preventDefault();
    updatePost({ ...prop, title, author });
  };
  const onPostDelete = (e: SyntheticEvent) => {
    e.preventDefault();
    deletePost(prop);
  };

  return (
    <li className={cx(styles.post, styles["shadow-box"])}>
      <form
        className={cx(styles.form, {
          [styles["is-requesting"]]: isUpdating || isDeleting,
        })}
        onSubmit={onPostUpdate}
      >
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
          <button
            className={styles.delete}
            disabled={isUpdating || isDeleting}
            onClick={onPostDelete}
          >
            Delete
          </button>
          <input
            type="submit"
            className={styles.submit}
            disabled={isUpdating || isDeleting}
            value="Save"
          />
        </div>
      </form>

      <div
        className={cx(styles.requesting, {
          [styles["is-requesting"]]: isUpdating || isDeleting,
        })}
      >
        <Loader type="Bars" color="#00BFFF" height={40} />
      </div>
    </li>
  );
};

export default PostItem;
