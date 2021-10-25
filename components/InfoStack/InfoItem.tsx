import React, { Ref } from "react";
import cx from "classnames";
import styles from "./InfoStack.module.scss";
import { Info } from "state/info";

const InfoItem = ({ text, status }: Info, ref: Ref<HTMLLIElement>) => {
  return (
    <li
      ref={ref}
      className={cx(styles.info, styles[status], styles["shadow-box"])}
    >
      {text}
    </li>
  );
};

export default React.forwardRef<HTMLLIElement, Info>(InfoItem);
