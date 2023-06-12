import * as yup from "yup";
export const userSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});
export const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
});

export const vehicleSchema = yup.object().shape({
  make: yup.string().required("Make is required"),
  model: yup.string().required("Model is required"),
  year: yup
    .number()
    .required("Year is required")
    .positive("Year must be a positive number"),
});

