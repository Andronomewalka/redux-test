import { FormikHelpers } from 'formik'

export interface SignInFormValues {
    email: string;
    password: string;
}

export interface SignUpFormValues extends SignInFormValues {
  confPassword: string;
}

export interface SubmitProp<T> {
  data: T
  actions: FormikHelpers<T>
}

export interface SubmitSignInProp extends SubmitProp<SignInFormValues> {}

export interface SubmitSignUpProp extends SubmitProp<SignUpFormValues> {}

export interface UseAuthResult {
    email: string,
    status: string,
    error: string,
    validationError: string,
    onSignInSubmit(data: SignInFormValues, actions: FormikHelpers<SignInFormValues>): void,
    onSignUpSubmit(data: SignUpFormValues, actions: FormikHelpers<SignUpFormValues>): void,
}