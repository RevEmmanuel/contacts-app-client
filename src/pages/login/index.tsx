import React from 'react';
import Container from "../../components/Container";
import {Field, FieldProps, Form, Formik, FormikHelpers} from "formik";
import * as yup from "yup";
import TextInput from "../../components/Input";
import Button from "../../components/Button";
import {Link} from "react-router-dom";
import {ILogin} from "../../types/auth";
import authService from "../../services/auth.service";
import utils from "../../utils/utils";

interface IProps {
}

function LoginPage(props: IProps) {
  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Required *"),
    password: yup.string().required("Required *")
  })

  const initialValues: ILogin = {
    email: "",
    password: "",
  }

  const onSubmit = (values: ILogin, helpers: FormikHelpers<ILogin>) => {
    authService.login(values)
      .then(res => {
        helpers.setSubmitting(false);
      })
      .catch(err => utils.handleRequestError(err, helpers));
  }

  return (
    <Container>
      <div
        className="w-full max-w-lg border border-slate-200 shadow-2xl px-6 py-8 rounded-xl mx-auto mt-20">
        <h1 className="text-blue-600 mb-2">Login</h1>
        <p className="text-muted">Login to manage your contacts on the go.</p>

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          enableReinitialize>
          {({isSubmitting, isValid}) => (
            <Form className="grid gap-4 my-6">
              <Field name="email">
                {({field, meta}: FieldProps) => (
                  <TextInput
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
                  Login
                </Button>
              </div>
            </Form>
          )}
        </Formik>

        <div>
          <p>Don't have account? <Link to="/register" className="text-blue-600 hover:underline">Sign
            up</Link></p>
        </div>
      </div>
    </Container>
  );
}

export default LoginPage;
