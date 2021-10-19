import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchLastUsedEmail } from "@/state/auth";

export default function Middleware({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLastUsedEmail());
  });

  return children;
}
