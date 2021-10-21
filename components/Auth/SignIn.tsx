import React, { useRef } from "react";
import { Formik, Form, Field } from "formik";
import cx from "classnames";
import Loader from "react-loader-spinner";
import { RequestStatus } from "utils/requestStatus";
import { ClassNameProp } from "utils/basePropTypes";
import { useAuth } from "./useAuth";
import { SignInFormValues } from "./types";
import styles from "./Auth.module.scss";

const SignIn: React.FC<ClassNameProp> = ({ className }) => {
  const formikRef = useRef(null);
  const { email, status, error, validationError, onSignInSubmit } =
    useAuth<SignInFormValues>(formikRef);

  return (
    <div className={className}>
      <Formik
        innerRef={formikRef}
        initialValues={{
          email: email === null ? "" : email,
          password: "",
        }}
        onSubmit={onSignInSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={cx(styles.container, styles["shadow-box"])}>
            <label className={styles.label}>
              Email Address
              <Field
                name="email"
                type="input"
                placeholder="Email"
                className={styles.input}
              />
            </label>
            <label className={styles.label}>
              Your password
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className={styles.input}
              />
            </label>
            <input
              type="submit"
              disabled={isSubmitting}
              className={cx(styles.submit, {
                [styles["is-disabled"]]: status === RequestStatus.Requesting,
              })}
              value="Sign In"
            />

            <div className={styles.requestInfoContainer}>
              <div
                className={cx(styles.requesting, {
                  [styles["is-visible"]]: status === RequestStatus.Requesting,
                })}
              >
                <Loader type="Bars" color="#00BFFF" height={40} />
              </div>
              <div
                className={cx(styles.error, {
                  [styles["is-visible"]]:
                    status !== RequestStatus.Requesting &&
                    (validationError || error),
                })}
              >
                {validationError || error}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignIn;
