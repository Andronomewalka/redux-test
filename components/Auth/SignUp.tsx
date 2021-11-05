import React, { useState, useRef } from "react";
import { Formik, Form, Field, FormikProps } from "formik";
import cx from "classnames";
import Loader from "react-loader-spinner";
import zxcvbn from "zxcvbn";
import { RequestStatus } from "utils/requestStatus";
import styles from "./Auth.module.scss";
import { useAuth } from "./useAuth";
import { ClassNameProp } from "utils/basePropTypes";
import { SignUpFormValues, ValidationRule } from "./types";
import SignUpPasswordValidation from "./SignUpPasswordValidation";

let rawPasswordScore = 0;

const initialValidationRules: ValidationRule[] = [
  {
    id: 0,
    text: "At least 8 characters",
    isValid: false,
    validate: (input) => input?.length >= 8,
  },
  {
    id: 1,
    text: "Not commonly used",
    isValid: false,
    validate: (input) => {
      rawPasswordScore = input.length > 20 ? 3 : zxcvbn(input).score;
      return rawPasswordScore > 1;
    },
  },
  {
    id: 2,
    text: "Upper & lowercase",
    isValid: false,
    validate: (input) => /[a-z]/.test(input) && /[A-Z]/.test(input),
  },
  {
    id: 3,
    text: "Numbers and symbols",
    isValid: false,
    validate: (input) => /[0-9]/.test(input) && /[-+_=!@#$%^&*.,?]/.test(input),
  },
];

const SignUp: React.FC<ClassNameProp> = ({ className }) => {
  const formikRef = useRef<FormikProps<SignUpFormValues>>(null);
  const { email, status, error, onSignUpSubmit } =
    useAuth<SignUpFormValues>(formikRef);

  const [validationRules, setValidationRules] = useState(
    initialValidationRules
  );
  const [passwordScore, setPasswordScore] = useState(0);

  const validateEmail = (email: string) => {
    let error;
    if (!email) {
      error = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      error = "Invalid email";
    }
    return error;
  };

  const validatePassword = (password: string) => {
    validationRules.forEach((rule) => {
      rule.isValid = rule.validate(password);
    });

    setPasswordScore(rawPasswordScore);
    setValidationRules([...validationRules]);
    setTimeout(() => {
      formikRef.current?.validateField("confPassword");
    }, 50);

    const allValid = validationRules.every((rule) => rule.isValid);
    if (!allValid) return "error";
  };

  const validatePassConfirmation = (pass: string, confPass: string) => {
    let error = undefined;
    if (pass && confPass) {
      if (pass !== confPass) {
        error = "Password not matched";
      }
    } else if (!confPass) error = "Required";
    return error;
  };

  return (
    <div className={className}>
      <Formik
        innerRef={formikRef}
        initialValues={{
          email: email === null ? "" : email,
          password: "",
          confPassword: "",
        }}
        validateOnChange={true}
        validateOnBlur={false}
        onSubmit={onSignUpSubmit}
      >
        {({ values, errors, touched, isSubmitting, isValid }) => (
          <Form className={cx(styles.container, styles["shadow-box"])}>
            <label className={styles.label}>
              Email Address
              <Field
                name="email"
                type="input"
                placeholder="Email"
                className={styles.input}
                validate={validateEmail}
              />
              {errors.email && touched.email ? (
                <div className={styles.fieldValidationError}>
                  {errors.email}
                </div>
              ) : null}
            </label>
            <label className={styles.label}>
              Create password
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className={cx(styles.input, styles.password)}
                validate={validatePassword}
              />
              <div className={styles.passValidationContainer}>
                <SignUpPasswordValidation
                  rules={validationRules}
                  score={passwordScore}
                  isPasswordEmpty={values.password.length === 0}
                />
              </div>
            </label>
            <label className={styles.label}>
              Confirm password
              <Field
                name="confPassword"
                type="password"
                placeholder="Confirm password"
                className={styles.input}
                validate={(value: string) =>
                  validatePassConfirmation(values.password, value)
                }
              />
              {errors.confPassword && touched.confPassword ? (
                <div className={styles.fieldValidationError}>
                  {errors.confPassword}
                </div>
              ) : null}
            </label>
            <input
              type="submit"
              disabled={isSubmitting || !isValid}
              className={cx(styles.submit, {
                [styles["is-disabled"]]: status === RequestStatus.Requesting,
              })}
              value="Sign Up"
            />

            <div className={styles.requestInfoContainer}>
              <div
                className={cx(styles.requesting, {
                  [styles["is-visible"]]: true,
                  [styles["is-visible"]]: status === RequestStatus.Requesting,
                })}
              >
                <Loader type="Bars" color="#00BFFF" height={40} />
              </div>
              <div
                className={cx(styles.error, {
                  [styles["is-visible"]]:
                    status !== RequestStatus.Requesting && error,
                })}
              >
                {error}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
