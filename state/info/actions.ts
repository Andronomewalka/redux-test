import { ActionCreatorWithPreparedPayload, CaseReducer, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { Info, InfoState } from "./types";

export const infoAddedCase : {
  reducer: (state: InfoState, action: PayloadAction<Info>) => void;
  prepare: (info: Info) => {
      payload: Info;
  };
} = {
  reducer: (state: InfoState, action: PayloadAction<Info>) => {
    try {
      const newInfo = action.payload;
      state.infos.unshift(newInfo);
    } catch (err: any) {
      console.log("infoAdded reducer err", err);
    }
  },
  prepare: (info: Info) => {
    try {
      info.id = nanoid();
    } catch (err) {
      console.log("InfoAdded prepare err", err);
    }
    return { payload: info };
  },
};

export const infoRemovedCase: CaseReducer<InfoState, PayloadAction<number | string>> = (state, action) => {
  try {
    const infoId = action.payload;
    state.infos = state.infos.filter((cur) => cur.id !== infoId);
  } catch (err) {
    console.log("infoRemoved err", err);
  }
};