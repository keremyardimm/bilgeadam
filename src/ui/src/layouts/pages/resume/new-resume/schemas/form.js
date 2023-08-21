const form = {
  formId: "new-resume-form",
  formField: {
    resumeTitle: {
      name: "resumeTitle",
      label: "Short List Title",
      type: "text",
      errorMsg: "Short sist title is required.",
    },
    position: {
      name: "position",
      label: "Position",
      type: "text",
      errorMsg: "Position is required.",
    },
    gender: {
      name: "gender",
      label: "Gender",
      type: "text",
      errorMsg: "Gender is required.",
    },
    state: {
      name: "state",
      label: "State",
      type: "text",
      errorMsg: "state is required.",
    },
    militaryStatus: {
      name: "militaryStatus",
      label: "Military Status",
      type: "text",
      errorMsg: "Military Status is required.",
    },
  },
};

export default form;
