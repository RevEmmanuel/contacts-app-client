import React from 'react';
import * as yup from "yup";
import Container from "../../components/Container";
import {Field, FieldProps, Form, Formik, FormikHelpers} from "formik";
import TextInput from "../../components/Input";
import Button from "../../components/Button";
import {Link} from "react-router-dom";
import {ISignup} from "../../types/auth";
import authService from "../../services/auth.service";
import utils from "../../utils/utils";

interface IProps {
}

function RegisterPage(props: IProps) {
  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Required *"),
    username: yup.string().required("Required *"),
    password: yup.string().required("Required *")
  })

  const initialValues: ISignup = {
    email: "",
    username: "",
    password: "",
  }

  const onSubmit = (values: ISignup, helpers: FormikHelpers<ISignup>) => {
    authService.signup(values)
      .then(res => {
        helpers.setSubmitting(false);
      })
      .catch(err => utils.handleRequestError(err, helpers));
  }

  return (
    <Container>
      <div
        className="w-full max-w-lg border border-slate-200 shadow-2xl px-6 py-8 rounded-xl mx-auto mt-20">
        <h1 className="text-blue-600 mb-2">Register</h1>
        <p className="text-muted">Sign up to manage your contacts on the go.</p>

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          enableReinitialize>
          {({isSubmitting, isValid}) => (
            <Form className="grid gap-4 my-6">
              <Field name="username">
                {({field, meta}: FieldProps) => (
                  <TextInput
                    label="Username"
                    placeholder="Username"
                    error={meta.touched && meta.error ? meta.error : ""}
                    {...field}
                  />
                )}
              </Field>

              <Field name="email">
                {({field, meta}: FieldProps) => (
                  <TextInput
                    type="email"
                    label="Email address"
                    placeholder="Email address"
                    error={meta.touched && meta.error ? meta.error : ""}
                    {...field}
                  />
                )}
              </Field>

              <Field name="password">
                {({field, meta}: FieldProps) => (
                  <TextInput
                    type="password"
                    label="Password"
                    placeholder="Password"
                    error={meta.touched && meta.error ? meta.error : ""}
                    {...field}
                  />
                )}
              </Field>

              <div>
                <Button variant="PRIMARY" className="w-full" disabled={!isValid}
                        loading={isSubmitting}>
                  Register
                </Button>
              </div>
            </Form>
          )}
        </Formik>

        <div>
          <p>Already have an account? <Link to="/login"
                                            className="text-blue-600 hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </Container>
  );
}

export default RegisterPage;
