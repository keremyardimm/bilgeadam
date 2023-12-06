/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
import { useState, useEffect } from "react";

// formik components
import { Formik, Form } from "formik";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// NewUser page components
import SearchInfo from "./components/SearchInfo";
import Summary from "./components/Summary";
import CircularStatic from "./components/Loader";

// NewUser layout schemas for form and form feilds
import form from "./schemas/form";
import initialValues from "./schemas/initialValues";
import validations from "./schemas/validations";

import {
  useDataContextController,
  setAddResume,
  setUpdateResume,
} from "../../../../context/dataContext";

function getSteps() {
  return ["Resume Info", "Summary"];
}

function getStepContent(stepIndex, formData) {
  switch (stepIndex) {
    case 0:
      return <SearchInfo formData={formData} />;
    case 1:
      return <Summary formData={formData} />;
    default:
      return null;
  }
}

function NewUser() {
  const [activeStep, setActiveStep] = useState(0);
  const [showLoader, setShowLoader] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [controller, dispatch] = useDataContextController();

  useEffect(() => {
    if (isCompleted) {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
    }
  }, [isCompleted]);

  const steps = getSteps();
  const { formId, formField } = form;
  const currentValidation = validations[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  const sleep = (ms) =>
    new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  const handleBack = () => setActiveStep(activeStep - 1);

  const submitForm = async (values, actions) => {
    await sleep(1000);

    // actions.setSubmitting(false);
    // actions.resetForm();

    // setActiveStep(0);
  };

  function calculateTotalResumeCount(ResumeData) {
    return ResumeData.length + 1;
  }

  const handleSubmit = (values, actions) => {
    setIsCompleted(false);

    const resumeId = values.resumeTitle + values.position;
    const existingResumeIndex = controller.ResumeData.findIndex((resume) => resume.id === resumeId);

    if (isLastStep) {
      if (
        existingResumeIndex !== -1 &&
        controller.ResumeData[existingResumeIndex].totalResumeCount ===
          calculateTotalResumeCount(controller.ResumeData)
      ) {
        setUpdateResume(dispatch, resumeId, {
          ...controller.ResumeData[existingResumeIndex],
          ...values,
          status: "in progress",
        });
      } else {
        setAddResume(
          dispatch,
          {
            ...values,
            name: values.resumeTitle,
            resumeDescription: values.position,
            createdUser: "admin",
            status: "in progress",
            createdDate: new Date().toLocaleDateString(),
            totalResumeCount: controller.ResumeData.length + 1,
            id: resumeId,
          },
          setUpdateResume(dispatch, resumeId, {
            ...controller.ResumeData[existingResumeIndex],
            ...values,
            status: "in progress",
          })
        );
      }

      // Status'u 1 dakika sonra "done" olarak güncelle
      setTimeout(() => {
        setUpdateResume(dispatch, resumeId, "done");
      }, 60000);

      setShowLoader(true);
      submitForm(values, actions);
    } else {
      setShowLoader(false);
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  };

  const handleComplated = async (values, setSubmitting, resetForm) => {
    setIsCompleted(true);
    setSubmitting(false);
    resetForm();
    setActiveStep(0);
    setShowLoader(false);
    await sleep(1000);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3} mb={20} height="65vh">
        <Grid container justifyContent="center" alignItems="center" sx={{ height: "100%", mt: 8 }}>
          <Grid item xs={12} lg={8}>
            <Formik
              initialValues={initialValues}
              validationSchema={currentValidation}
              onSubmit={handleSubmit}
            >
              {({
                values,
                errors,
                touched,
                isSubmitting,
                setSubmitting,
                resetForm,
                setFieldValue,
              }) => (
                <Form id={formId} autoComplete="off">
                  <Card sx={{ height: "100%" }}>
                    <MDBox mx={2} mt={-3}>
                      <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                          <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                    </MDBox>
                    <MDBox p={3}>
                      {showMessage ? (
                        <MDBox p={2}>
                          <Typography variant="h6" color="success.main">
                            Kayıt işlemi başarıyla tamamlandı!
                          </Typography>
                        </MDBox>
                      ) : (
                        <>
                          <MDBox>
                            {!showLoader &&
                              getStepContent(activeStep, {
                                values,
                                touched,
                                formField,
                                errors,
                                setFieldValue,
                              })}
                            {showLoader && (
                              <MDBox>
                                <MDBox mt={2} width="100%" display="flex" justifyContent="center">
                                  <CircularStatic
                                    handleComplated={() =>
                                      handleComplated(values, setSubmitting, resetForm)
                                    }
                                  />
                                </MDBox>
                                <MDBox mt={2} width="100%" display="flex" justifyContent="center">
                                  <Typography
                                    variant="caption"
                                    component="div"
                                    color="text.secondary"
                                  >
                                    In Progress
                                  </Typography>
                                </MDBox>
                              </MDBox>
                            )}
                          </MDBox>
                          <MDBox mt={2} width="100%" display="flex" justifyContent="space-between">
                            {activeStep === 0 ? (
                              <MDBox />
                            ) : (
                              <MDButton variant="gradient" color="light" onClick={handleBack}>
                                back
                              </MDButton>
                            )}
                            <MDButton
                              disabled={isSubmitting}
                              type="submit"
                              variant="gradient"
                              color="dark"
                            >
                              {isLastStep ? "create" : "next"}
                            </MDButton>
                          </MDBox>
                        </>
                      )}
                    </MDBox>
                  </Card>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default NewUser;
