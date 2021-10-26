import React, { useState, useEffect, useRef, ReactNode } from "react";
import ReactDom from "react-dom";
import { CSSTransition } from "react-transition-group";
import { InternalState, ModalProp } from "./types";
import styles from "./Modal.module.scss";

const CloseIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="16" r="16" fill="#EFF1F3" />
    <path
      d="M19.9993 20L12 12.0008"
      stroke="#818FA4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 12L12.0007 19.9992"
      stroke="#818FA4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function Modal(
  {
    isOpen,
    onClose,
    children,
    padding = "1rem 1rem 1.5rem",
    title = "",
    background = "white",
    hideCloseButton = false,
  }: ModalProp,
  ref: any
) {
  const [internalState, setInternalState] = useState(InternalState.Dispose); // can't use CSSTransition before it renders or after wrapper is removed
  const overlayRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (internalState === InternalState.Dispose && isOpen)
      setInternalState(InternalState.Init);
    else if (internalState === InternalState.Init)
      setInternalState(InternalState.Open);
    else if (internalState === InternalState.Open && !isOpen)
      setInternalState(InternalState.Close);
  }, [internalState, isOpen]);

  useEffect(() => {
    if (modalRef?.current && ref) {
      ref.current = modalRef.current;
    }
  }, [modalRef, ref]);

  if (typeof document !== "object") {
    return null; // ssr
  }

  const preventEventHandler = (event: any) => {
    event.stopPropagation();
  };

  const onCloseTransitionExited = () => {
    setInternalState(InternalState.Dispose);
  };

  return ReactDom.createPortal(
    <>
      {internalState !== InternalState.Dispose && (
        <div
          className={styles.container}
          onTouchMove={preventEventHandler}
          onMouseMove={preventEventHandler}
        >
          <CSSTransition
            in={internalState === InternalState.Open}
            timeout={500}
            unmountOnExit
            onExited={onCloseTransitionExited}
            nodeRef={overlayRef}
            classNames="overlay-transition"
          >
            <div
              ref={overlayRef}
              className={styles.overlay}
              style={{
                zIndex:
                  999 + document.getElementById("portal")!.children.length,
              }}
            />
          </CSSTransition>
          <CSSTransition
            in={internalState === InternalState.Open}
            timeout={500}
            unmountOnExit
            nodeRef={modalRef}
            classNames="modal-transition"
          >
            <div
              ref={modalRef}
              className={styles.modal}
              style={{
                background,
                padding,
                zIndex:
                  999 + document.getElementById("portal")!.children.length,
              }}
            >
              <div className={styles.titleWrapper}>
                <div className={styles.title}>{title}</div>
              </div>
              {!hideCloseButton && (
                <button
                  className={styles.close}
                  type="button"
                  onClick={onClose}
                >
                  <CloseIcon />
                </button>
              )}
              {children}
            </div>
          </CSSTransition>
        </div>
      )}
    </>,
    document.getElementById("portal")!
  );
}

export default React.forwardRef(Modal);
