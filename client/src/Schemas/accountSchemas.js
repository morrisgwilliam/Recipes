import * as Yup from "yup";

const getLogInSchema = () =>
  Yup.object().shape({
    EmailAddress: Yup.string()
      .required("This field is required.")
      .matches(/^\S*$/, {
        message: "Email address must not contain any spaces.",
        excludeEmptyString: true
      }),
    Password: Yup.string().required("This field is required.")
  });

getLogInSchema.initialValues = {
  EmailAddress: "",
  Password: ""
};

export { getLogInSchema };
