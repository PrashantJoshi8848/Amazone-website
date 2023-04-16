import * as Yup from "yup";
export const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "Must be at least 3 characters.")
    .max(30, "Must be less than 30 characters.")
    .required("A fullname is required."),

  email: Yup.string()
    .email("Invalid email format.")
    .required("An email is required."),

  password: Yup.string()
    .min(8, "Must be min 8 characters.")
    .required("A password is required."),

  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Both passwords do not match."
  ),
});
export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format.")
    .required("An email is required."),

  password: Yup.string().required("A password is required."),
});
