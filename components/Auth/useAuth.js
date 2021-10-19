import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useMultipleSelector } from "@/hooks/useMultipleSelector";
import {
  signIn,
  signUp,
  validationErrorChanged,
  selectEmail,
  selectFetchStatus,
  selectError,
  selectValidationError,
  selectIsSignedIn,
} from "@/state/auth";

export const useAuth = (formikRef) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isSignedIn = useSelector(selectIsSignedIn);
  const [email, status, error] = useMultipleSelector(
    selectEmail,
    selectFetchStatus,
    selectError
  );

  useEffect(() => {
    if (isSignedIn) {
      router.push("/products");
    }
  }, [isSignedIn]);

  useEffect(() => {
    formikRef.current.setFieldValue("email", email);
  }, [email]);

  const validationError = useSelector(selectValidationError);

  const onSignInSubmit = (data, { setSubmitting }) => {
    setSubmitting(true);
    (async () => {
      await dispatch(signIn(data));
      setSubmitting(false);
    })();
  };

  const onSignUpSubmit = (data, { setSubmitting }) => {
    setSubmitting(true);
    (async () => {
      if (data.password === data.confPassword) {
        await dispatch(signUp(data));
      } else {
        dispatch(validationErrorChanged("passwords not equal"));
      }
      setSubmitting(false);
    })();
  };

  return {
    email,
    status,
    error,
    validationError,
    onSignInSubmit,
    onSignUpSubmit,
  };
};
