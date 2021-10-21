import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchLastUsedEmail } from "state/auth";
import { ChildrenProp } from "utils/basePropTypes";

export default function Middleware({ children }: ChildrenProp) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLastUsedEmail());
  });

  return <>{children}</>;
}
