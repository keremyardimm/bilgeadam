/* eslint-disable react/forbid-prop-types */
import { useEffect, useState } from "react";
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Material Dashboard 2 PRO React components
import MDTypography from "components/MDTypography";
import OnlinePredictionIcon from "@mui/icons-material/Announcement";

function PredictionStatusCell({ data }) {
  const [icon, setIcon] = useState("");

  useEffect(() => {
    const { original } = data;
    const { tpps } = original;
    console.log(tpps);

    if (tpps <= 0.5) {
      setIcon("error");
    } else if (tpps > 0.5 && tpps < 0.7) {
      setIcon("warning");
    } else {
      setIcon("success");
    }
  }, [data]);

  return (
    <MDTypography variant="caption" fontWeight="bold" color={icon} fontSize={25}>
      {data.original.tpps !== "-" && (
        <OnlinePredictionIcon sx={{ fontWeight: "bold", fontSize: 40 }} />
      )}
    </MDTypography>
  );
}

// Setting default values for the props of DefaultCell
PredictionStatusCell.defaultProps = {};

// Typechecking props for the DefaultCell
PredictionStatusCell.propTypes = {
  data: PropTypes.any.isRequired,
};

export default PredictionStatusCell;
