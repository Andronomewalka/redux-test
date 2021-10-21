import { RootState } from "state/store";
import { useAppSelector } from "hooks/useAppSelector";
import { RequestStatus } from "utils/requestStatus";

export const useMultipleSelector = <TData, TError>(
  dataSelector: (state: RootState) => TData,
  statusSelector: (state: RootState) => RequestStatus,
  errorSelector: (state: RootState) => TError,
): [TData, RequestStatus, TError] => {
  const data = useAppSelector(dataSelector) as TData;
  const status = useAppSelector(statusSelector) as RequestStatus;
  const error = useAppSelector(errorSelector) as TError;
  return [data, status, error];
};
