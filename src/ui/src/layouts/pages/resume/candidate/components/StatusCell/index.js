import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

function StatusCell({ status }) {
  return (
    <MDBox display="flex" alignItems="center">
      <MDBox mr={1}>
        <MDButton
          variant="outlined"
          color={status ? "dark" : "success"}
          size="small"
          iconOnly
          circular
        >
          <Icon sx={{ fontWeight: "bold" }}>{status ? "done" : "sync"}</Icon>
        </MDButton>
      </MDBox>
      <MDTypography variant="caption" fontWeight="medium" color="text" sx={{ lineHeight: 0 }}>
        {status ? "Done" : "In Progress"}
      </MDTypography>
    </MDBox>
  );
}

StatusCell.propTypes = {
  status: PropTypes.bool.isRequired,
};

export default StatusCell;
