/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import Switch from "@mui/material/Switch";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";

// @mui material components
// import Icon from "@mui/material/Icon";
import OnlinePredictionIcon from "@mui/icons-material/OnlinePrediction";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function PredictioncCell({ data, updateTableRows }) {
  const [open, setOpen] = React.useState(false);
  const [trailPeriod, setTrailPeriod] = React.useState(true);
  const [trailPeriod2, setTrailPeriod2] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const [buttonStatus, setButtonStatus] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (isAgree) => {
    setOpen(false); // İlk olarak dialog penceresini kapat

    if (isAgree) {
      // Eğer "Agree" butonuna basılırsa işlem yapılır
      if (!trailPeriod && !trailPeriod2) {
        alert("Please select one");
        return;
      }

      // İşleme alındığında status ve diğer değerleri güncelle
      const updatedDataInProgress = {
        ...data.original,
        status: false,
        tpps: trailPeriod ? "-" : data.original.tpps,
        fyps: trailPeriod2 ? "-" : data.original.fyps,
      };

      // İlk olarak satırı işlemde olarak güncelle
      updateTableRows((prevRows) =>
        // eslint-disable-next-line no-underscore-dangle
        prevRows.map((row) => (row._id === updatedDataInProgress._id ? updatedDataInProgress : row))
      );

      // 10 saniye sonra gerçek değerlerle güncelle
      setTimeout(() => {
        const updatedDataDone = {
          ...data.original,
          status: "Done",
          tpps: trailPeriod ? Math.random().toFixed(2) : data.original.tpps,
          fyps: trailPeriod2 ? Math.random().toFixed(2) : data.original.fyps,
        };

        updateTableRows((prevRows) =>
          // eslint-disable-next-line no-underscore-dangle
          prevRows.map((row) => (row._id === updatedDataDone._id ? updatedDataDone : row))
        );
      }, 10000);
    }
  };

  useEffect(() => {
    const { original } = data;
    const { status } = original;

    setButtonStatus(status);
  }, [data]);

  return (
    <MDBox display="flex" alignItems="center">
      <MDBox mr={1}>
        <MDButton
          variant="outlined"
          color={buttonStatus ? "success" : "dark"}
          size="small"
          disabled={!buttonStatus}
          iconOnly
          circular
        >
          <OnlinePredictionIcon sx={{ fontWeight: "bold" }} onClick={handleClickOpen} />
        </MDButton>
      </MDBox>
      <MDTypography variant="caption" fontWeight="medium" color="text" sx={{ lineHeight: 0 }}>
        Predictions
      </MDTypography>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Prediction</DialogTitle>
        <DialogContent>
          <DialogContentText>Select the features you want to create below</DialogContentText>
          <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
            <MDBox mt={0.5}>
              <Switch checked={trailPeriod} onChange={() => setTrailPeriod(!trailPeriod)} />
            </MDBox>
            <MDBox width="80%" ml={0.5}>
              <MDTypography variant="button" fontWeight="regular" color="text">
                Trial Period prediction Score
              </MDTypography>
            </MDBox>
          </MDBox>
          <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
            <MDBox mt={0.5}>
              <Switch checked={trailPeriod2} onChange={() => setTrailPeriod2(!trailPeriod2)} />
            </MDBox>
            <MDBox width="80%" ml={0.5}>
              <MDTypography variant="button" fontWeight="regular" color="text">
                First year prediction Score
              </MDTypography>
            </MDBox>
          </MDBox>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => handleClose(false)}>
            Disagree
          </Button>
          <Button onClick={() => handleClose(true)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </MDBox>
  );
}

// Typechecking props for the StatusCell
PredictioncCell.propTypes = {
  data: PropTypes.any.isRequired,
  updateTableRows: PropTypes.func.isRequired,
};

export default PredictioncCell;
