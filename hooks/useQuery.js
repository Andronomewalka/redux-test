import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import requestStatus from "@/utils/requestStatus";
import { useMultipleSelector } from "./useMultipleSelector";

//some
export const useQuery = (
  dataSelector,
  statusSelector,
  errorSelector,
  queryThunk,
  queryThunkArg
) => {
  const dispatch = useDispatch();
  const [data, status, error] = useMultipleSelector(
    dataSelector,
    statusSelector,
    errorSelector
  );

  useEffect(() => {
    if (status === requestStatus.idle && typeof queryThunk === "function") {
      dispatch(queryThunk(queryThunkArg));
    }
  }, [status, dispatch]);

  return [data, status, error];
};
