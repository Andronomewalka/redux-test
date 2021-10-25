import React, { createRef, Ref, RefObject, useEffect, useRef } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import cx from "classnames";
import { useAppSelector } from "hooks/useAppSelector";
import styles from "./InfoStack.module.scss";
import InfoItem from "./InfoItem";
import { infoRemoved, selectInfos } from "state/info";
import { useAppDispatch } from "hooks/useAppDispatch";

const InfoStack: React.FC = () => {
  const dispatch = useAppDispatch();
  const infos = useAppSelector(selectInfos);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (infos?.length) {
        const lastItem = infos[infos.length - 1];
        if (lastItem.id !== undefined) {
          dispatch(infoRemoved(lastItem.id));
        }
      }
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [infos]);

  return (
    <TransitionGroup component="ul" className={styles.container}>
      {infos.map((info, i) => {
        const itemRef = createRef<HTMLLIElement>();
        return (
          <CSSTransition
            key={info.id}
            nodeRef={itemRef}
            timeout={500}
            classNames="info-transition"
          >
            <InfoItem ref={itemRef} {...info} />
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
};

export default InfoStack;
