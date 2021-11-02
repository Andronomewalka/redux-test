import { useEffect, RefObject } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { FormikHelpers, FormikProps } from 'formik'
import { UseAuthResult, SubmitProp, SignInFormValues, SignUpFormValues } from "./types";
import { useMultipleSelector } from "hooks/useMultipleSelector";
import { useAppSelector } from "hooks/useAppSelector";
import {
  signIn,
  signUp,
  validationErrorChanged,
  selectEmail,
  selectFetchStatus,
  selectError,
  selectValidationError,
  selectIsSignedIn,
} from "state/auth";
import { RequestStatus } from "utils/requestStatus";

export const useAuth = <T>(formikRef: RefObject<FormikProps<SubmitProp<T>>>): UseAuthResult  => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isSignedIn = useAppSelector(selectIsSignedIn);
  const [email, status, error] = useMultipleSelector<string, string>(
    selectEmail,
    selectFetchStatus,
    selectError
  );

  useEffect(() => {
    if (isSignedIn) {
      router.push("/chatik");
    }
  }, [isSignedIn]);

  useEffect(() => {
    formikRef.current?.setFieldValue("email", email);
  }, [email]);

  const validationError = useSelector(selectValidationError);

  const onSignInSubmit = (data: SignInFormValues, {setSubmitting}: FormikHelpers<SignInFormValues>) => {
    setSubmitting(true);
    (async () => {
      await dispatch(signIn(data));
      setSubmitting(false);
    })();
  };

  const onSignUpSubmit = (data: SignUpFormValues, {setSubmitting}: FormikHelpers<SignUpFormValues>) => {
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
