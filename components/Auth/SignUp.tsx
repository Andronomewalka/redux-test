import React, { useRef } from "react";
import { Formik, Form, Field } from "formik";
import cx from "classnames";
import Loader from "react-loader-spinner";
import { RequestStatus } from "utils/requestStatus";
import styles from "./Auth.module.scss";
import { useAuth } from "./useAuth";
import * as Yup from "yup";
import { ClassNameProp } from "utils/basePropTypes";
import { SignUpFormValues } from "./types";

const SignUp: React.FC<ClassNameProp> = ({ className }) => {
  const formikRef = useRef(null);
  const { email, status, error, validationError, onSignUpSubmit } =
    useAuth<SignUpFormValues>(formikRef);

  const SignUpSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(4, "At least 4 characters").required("Required"),
  });

  return (
    <div className={className}>
      <Formik
        innerRef={formikRef}
        initialValues={{
          email: email === null ? "" : email,
          password: "",
          confPassword: "",
        }}
        validationSchema={SignUpSchema}
        validateOnChange
        onSubmit={onSignUpSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className={cx(styles.container, styles["shadow-box"])}>
            <label className={styles.label}>
              Email Address
              <Field
                name="email"
                type="input"
                placeholder="Email"
                className={styles.input}
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
                className={styles.input}
              />
              {errors.password && touched.password ? (
                <div className={styles.fieldValidationError}>
                  {errors.password}
                </div>
              ) : null}
            </label>
            <label className={styles.label}>
              Confirm password
              <Field
                name="confPassword"
                type="password"
                placeholder="Confirm password"
                className={styles.input}
              />
            </label>
            <input
              type="submit"
              disabled={isSubmitting}
              className={cx(styles.submit, {
                [styles["is-disabled"]]: status === RequestStatus.Requesting,
              })}
              value="Sign Up"
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

export default SignUp;
