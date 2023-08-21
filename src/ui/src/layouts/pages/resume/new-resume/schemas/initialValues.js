import checkout from "./form";

const {
  formField: { resumeTitle, position, gender, state, militaryStatus },
} = checkout;

const initialValues = {
  [resumeTitle.name]: "",
  [position.name]: "",
  [gender.name]: "",
  [state.name]: "",
  [militaryStatus.name]: "",
};

export default initialValues;
