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
  chasisNumber: yup.string().required("Chasis number is required"),
  mfgCompany: yup.string().required("Manufacture company is required"),
  mfgYear: yup.string().required("Manufacture year is required"),
  price: yup.string().required("Price is required"),
  plateNumber: yup.string(),
  model: yup.string().required("Model is required"),
  owner: yup.string().min(16).max(16).required("Owner is required"),
});
export const ownerSchema = yup.object().shape({
  firstName: yup.string().required("Firstname is required"),
  lastName: yup.string().required("Last name is required"),  
  phone: yup.string(),  
  address: yup.string(),  
  nationalId: yup.string().min(16).max(16).required("National id is required"),  
});

