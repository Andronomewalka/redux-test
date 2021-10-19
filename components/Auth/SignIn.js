import React, { useRef } from "react";
import { Formik, Form, Field } from "formik";
import cx from "classnames";
import Loader from "react-loader-spinner";
import requestStatus from "@/utils/requestStatus";
import styles from "./Auth.module.scss";
import { useAuth } from "./useAuth.js";

export default function SignIn({ className }) {
  const formikRef = useRef();
  const { email, status, error, validationError, onSignInSubmit } =
    useAuth(formikRef);

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
          <Form className={styles.container}>
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
                [styles["is-disabled"]]: status === requestStatus.requesting,
              })}
              value="Sign In"
            />

            <div className={styles.requestInfoContainer}>
              <div
                className={cx(styles.requesting, {
                  [styles["is-visible"]]: status === requestStatus.requesting,
                })}
              >
                <Loader type="Bars" color="#00BFFF" height={40} />
              </div>
              <div
                className={cx(styles.error, {
                  [styles["is-visible"]]:
                    status !== requestStatus.requesting &&
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
}
