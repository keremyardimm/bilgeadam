/**
=========================================================
* Material Dashboard 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

import { ErrorMessage } from "formik";

// NewUser page components
import FormField from "../FormField";

function Address({ formData }) {
  const { formField, values, errors, touched, setFieldValue } = formData;
  const { resumeTitle, position, gender, state, militaryStatus } = formField;
  const {
    resumeTitle: resumeTitleValue,
    position: positionValue,
    gender: genderValue,
    state: stateValue,
    militaryStatus: militaryStatusValue,
  } = values;

  return (
    <MDBox>
      <MDTypography variant="h5" fontWeight="bold">
        Title
      </MDTypography>
      <MDBox mt={1.625}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormField
              type={resumeTitle.type}
              label={resumeTitle.label}
              name={resumeTitle.name}
              value={resumeTitleValue}
              placeholder={resumeTitle.placeholder}
              error={errors.resumeTitle && touched.resumeTitle}
              success={resumeTitleValue.length > 0 && !errors.resumeTitle}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6}>
            <Autocomplete
              options={["Mid Backand Dev", "Senior Backand Dev", "Frontend Dev"]}
              name={position.name}
              onChange={(event, newValue) => {
                setFieldValue(position.name, newValue ?? "");
              }}
              inputValue={positionValue}
              renderInput={(params) => (
                <MDInput {...params} variant="standard" label="Open Position" />
              )}
            />
            <MDBox mt={0.75}>
              <MDTypography component="div" variant="caption" color="error" fontWeight="regular">
                <ErrorMessage name={position.name ?? ""} />
              </MDTypography>
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={3}>
            <Autocomplete
              options={["Male", "Female"]}
              name={gender.name}
              onChange={(event, newValue) => {
                setFieldValue(gender.name, newValue ?? "");
              }}
              inputValue={genderValue}
              renderInput={(params) => <MDInput {...params} variant="standard" label="Gender" />}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <Autocomplete
              options={["Istanbul", "Izmır", "Ankara"]}
              name={state.name}
              onChange={(event, newValue) => {
                setFieldValue(state.name, newValue ?? "");
              }}
              inputValue={stateValue}
              renderInput={(params) => <MDInput {...params} variant="standard" label="State" />}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <Autocomplete
              options={["Completed", "Not Completed"]}
              name={militaryStatus.name}
              onChange={(event, newValue) => {
                setFieldValue(militaryStatus.name, newValue ?? "");
              }}
              inputValue={militaryStatusValue}
              renderInput={(params) => (
                <MDInput {...params} variant="standard" label="Military Status" />
              )}
            />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

// typechecking props for Address
Address.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default Address;
