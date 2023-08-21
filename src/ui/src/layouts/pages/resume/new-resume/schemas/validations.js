import * as Yup from "yup";
import checkout from "./form";

const {
  formField: { resumeTitle, position },
} = checkout;

const validations = [
  Yup.object().shape({
    [resumeTitle.name]: Yup.string().required(resumeTitle.errorMsg),
    [position.name]: Yup.string().required(position.errorMsg),
  }),
];

export default validations;
