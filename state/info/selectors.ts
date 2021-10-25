import { RootState } from "state/store";

export const selectInfos = (state: RootState) => state.infos.infos;
export const selectLastInfo = (state: RootState) => 
    state.infos.infos[state.infos.infos.length - 1];