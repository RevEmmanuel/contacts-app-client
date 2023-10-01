import React from 'react';
import {Field, FieldProps, Form, Formik, FormikHelpers} from "formik";
import * as yup from "yup";
import validator from "validator";
import TextInput from "../Input";
import Button from "../Button";
import {IContact} from "../../types/contact";
import contactService from "../../services/contact.service";
import utils from "../../utils/utils";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {useQueryClient} from "react-query";

interface IProps {
  type?: "CREATE" | "EDIT",
  value?: IContact,
}

function ContactForm({type = "CREATE", value}: IProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const validationSchema = yup.object().shape({
    firstname: yup.string().required("Required *"),
    lastname: yup.string().required("Required *"),
    phoneNumber: yup.string()
      .test("validNGNumber",
        "Invalid NG phone number",
        (value) => validator.isMobilePhone(value ?? "", "en-NG")
      )
      .required("Required *"),
  });

  const initialValues: IContact = value ?? {
    firstname: "",
    lastname: "",
    phoneNumber: ""
  }

  const onSubmit = (values: IContact, helpers: FormikHelpers<IContact>) => {
    const action = type === "CREATE" ? contactService.createContact : contactService.updateContact;

    action(values)
      .then(async res => {
        toast.success("Saved");
        await queryClient.invalidateQueries("contacts");
        helpers.setSubmitting(false);
        navigate(`/contact/${res.id}`, {replace: true});
      })
      .catch(err => utils.handleRequestError(err, helpers));
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {({isSubmitting, isValid}) => (
        <Form className="grid gap-4 my-6">

          <div className="grid grid-cols-2 gap-4">
            <Field name="firstname">
              {({field, meta}: FieldProps) => (
                <TextInput
                  label="First Name"
                  placeholder="First Name"
                  error={meta.touched && meta.error ? meta.error : ""}
                  {...field}
                />
              )}
            </Field>

            <Field name="lastname">
              {({field, meta}: FieldProps) => (
                <TextInput
                  label="Last Name"
                  placeholder="Last Name"
                  error={meta.touched && meta.error ? meta.error : ""}
                  {...field}
                />
              )}
            </Field>
          </div>

          <Field name="phoneNumber">
            {({field, meta}: FieldProps) => (
              <TextInput
                label="Phone Number"
                placeholder="Phone Number"
                error={meta.touched && meta.error ? meta.error : ""}
                {...field}
              />
            )}
          </Field>

          <div>
            <Button variant="PRIMARY" className="w-full" disabled={!isValid}
                    loading={isSubmitting}>
              Save
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default ContactForm;
