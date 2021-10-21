import { AsyncThunk } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "state/store";
import { RequestStatus } from "utils/requestStatus";
import { useMultipleSelector } from "./useMultipleSelector";

export const useQuery = <TData, TError>(
  dataSelector: (state: RootState) => TData,
  statusSelector: (state: RootState) => RequestStatus,
  errorSelector: (state: RootState) => TError,
  queryThunk: Function,
  queryThunkArg?: any
): [TData, RequestStatus, TError] => {
  const dispatch = useDispatch();
  const [data, status, error] = useMultipleSelector<TData, TError>(
    dataSelector,
    statusSelector,
    errorSelector
  );

  useEffect(() => {
    if (status === RequestStatus.Idle && typeof queryThunk === "function") {
      dispatch(queryThunk(queryThunkArg));
    }
  }, [status, dispatch]);

  return [data, status, error];
};
