import PropTypes from "prop-types";
import Checkbox from "@mui/material/Checkbox";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function IdCell({ id, checked }) {
  return (
    <MDBox display="flex" alignItems="center">
      <Checkbox defaultChecked={checked} />
      <MDBox ml={1}>
        <MDTypography variant="caption" fontWeight="medium" color="text">
          {id}
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}

IdCell.defaultProps = {
  checked: false,
};

IdCell.propTypes = {
  id: PropTypes.number.isRequired,
  checked: PropTypes.bool,
};

export default IdCell;
