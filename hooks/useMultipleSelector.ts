import { useSelector } from "react-redux";

export const useMultipleSelector = (
  dataSelector,
  statusSelector,
  errorSelector
) => {
  const data = useSelector(dataSelector);
  const status = useSelector(statusSelector);
  const error = useSelector(errorSelector);
  return [data, status, error];
};
