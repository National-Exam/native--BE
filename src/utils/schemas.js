import * as yup from "yup";
export const tokenSchema = yup.object().shape({
  meter_number: yup.string().required("Meter number is required"),
  amount: yup.number().required("Amount is required"),  
});


