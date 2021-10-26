import { ReactNode } from "react";

export interface ModalProp {
    isOpen: boolean,
    onClose?(): void,
    children: ReactNode,
    padding?: string,
    title?: string,
    background?: string,
    hideCloseButton?: boolean,
    isFullOpen?: boolean,
    stickToBottom?: boolean
}

export enum InternalState {
    Init,
    Open,
    Close,
    Dispose,
  }