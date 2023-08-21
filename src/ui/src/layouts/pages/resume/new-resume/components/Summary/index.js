// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// NewUser page components
// import FormField from "../FormField";

function Summary({ formData }) {
  return (
    <Card sx={{ height: "100%", boxShadow: "none" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Search Summary
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <MDBox mb={2} lineHeight={1}>
          <MDTypography variant="button" color="text" fontWeight="light">
            A new search pool will be created with the criteria you entered.
          </MDTypography>
        </MDBox>
        <MDBox opacity={0.3}>
          <Divider />
        </MDBox>
        <MDBox>
          <MDBox display="flex" py={1} pr={2}>
            <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
              Title &nbsp; :
            </MDTypography>
            <MDTypography variant="button" fontWeight="regular" color="text">
              &nbsp;{formData.values.resumeTitle}
            </MDTypography>
          </MDBox>
          <MDBox display="flex" py={1} pr={2}>
            <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
              Position &nbsp; :
            </MDTypography>
            <MDTypography variant="button" fontWeight="regular" color="text">
              &nbsp;{formData.values.position}
            </MDTypography>
          </MDBox>
          <MDBox display="flex" py={1} pr={2}>
            <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
              Gender &nbsp; :
            </MDTypography>
            <MDTypography variant="button" fontWeight="regular" color="text">
              &nbsp;{formData.values.gender.length <= 0 ? "Not Specified" : formData.values.gender}
            </MDTypography>
          </MDBox>
          <MDBox display="flex" py={1} pr={2}>
            <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
              State &nbsp; :
            </MDTypography>
            <MDTypography variant="button" fontWeight="regular" color="text">
              &nbsp;{formData.values.state.length <= 0 ? "Not Specified" : formData.values.state}
            </MDTypography>
          </MDBox>
          <MDBox display="flex" py={1} pr={2}>
            <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
              Military Status &nbsp; :
            </MDTypography>
            <MDTypography variant="button" fontWeight="regular" color="text">
              &nbsp;
              {formData.values.militaryStatus.length <= 0
                ? "Not Specified"
                : formData.values.militaryStatus}
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// typechecking props for Socials
Summary.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default Summary;
