import * as yup from "yup";

export const signUpValidation = {
  initialState: {
    name: "",
    email: "",
    password: "",
    country: "",
    city: "",
    state: "",
    phone: "",
  },
  schema: yup.object().shape({
    name: yup
      .string()
      .min(4, "Name must be at least 4 characters")
      .trim()
      .required("Name is must be required"),
    email: yup.string().email().required("Email field is required !"),
    password: yup
      .string()
      .min(4)
      .trim()
      .required("Password is must be required"),
    country: yup.string().required("Country field is required !"),
    city: yup.string().required("City field is required !"),
    state: yup.string().required("State field is required !"),
  }),
};

export const forgotPasswordValidation = {
  initialState: {
    email: "",
  },
  schema: yup.object().shape({
    email: yup.string().email().required("Email field is required !"),
  }),
};

export const newsLatterValidation = {
  initialState: {
    email: "",
  },
  schema: yup.object().shape({
    email: yup.string().email().required("Email field is required !"),
  }),
};

export const contactValidation = {
  initialState: {
    name: "",
    email: "",
    phone: "",
    message: "",
    // captcha: "",
  },
  schema: yup.object().shape({
    name: yup
      .string()
      .min(4, "Name must be at least 4 characters")
      .trim()
      .required("Name is must be required"),
    email: yup.string().email().required("Email field is required !"),
    phone: yup.string().trim().required("Phone number is must be required"),
    message: yup.string().trim().required("Message is must be required"),
    // captcha: yup.string().required("Check the captcha."),
  }),
};

export const submitApplicationValidation = {
  schema: yup.object().shape({
    name: yup
      .string()
      .min(4, "Name must be at least 4 characters")
      .trim()
      .required("Name is must be required"),
    email: yup.string().email().required("Email field is required !"),
    phone: yup.string().trim().required("Phone number is must be required"),
    resume: yup.string().required("field is required !"),
  }),
};

export const changePasswordSchema = yup.object({
  oldPassword: yup.string().required("old password is required").trim(),
  newPassword: yup.string().required("new password is required"),
  // .matches(
  //   /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
  //   "Minimum 8 characters, at least one special character, at least one digit"
  // )
  confirmPassword: yup
    .string()
    .required("confirm password is required")
    .oneOf([yup.ref("newPassword"), null], "password not match"),
});

export const resetPasswordSchema = yup.object({
  password: yup.string().required("new password is required"),
  // .matches(
  //   /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
  //   "Minimum 8 characters, at least one special character, at least one digit"
  // )
  confirmPassword: yup
    .string()
    .required("confirm password is required")
    .oneOf([yup.ref("password"), null], "password not match"),
});

export const profileSchema = yup.object({
  name: yup
    .string()
    .min(4, "Name must be at least 4 characters")
    .trim()
    .required("Name is must be required"),
  // email: yup.string().email().required("Email field is required !"),
  country: yup.string().required("Country field is required !"),
  city: yup.string().required("City field is required !"),
  state: yup.string().required("State field is required !"),
  phone: yup.string().trim().required("Phone number is must be required"),
});
