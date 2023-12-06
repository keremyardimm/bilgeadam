/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Card from "@mui/material/Card";
import AnnouncementIcon from "@mui/icons-material/Announcement";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import dataTableData from "layouts/pages/resume/candidate/data/dataTableData";

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function FullScreenDialog(props) {
  const { open, handleClose, totalResumeCount } = props;

  const limitedDataTableData = {
    ...dataTableData, // dataTableData'nın diğer ayarlarını koruyun
    rows: dataTableData.rows.slice(0, totalResumeCount), // rows dizisini totalResumeCount'a göre sınırlayın
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={() => {
          handleClose();
        }}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Short List Detail
            </Typography>
          </Toolbar>
        </AppBar>
        <MDBox pb={3}>
          <MDBox mb={3}>
            <Card>
              <MDBox p={3} lineHeight={1}>
                <MDTypography variant="h5" fontWeight="medium">
                  Short List Detail
                </MDTypography>
                <MDTypography variant="button" color="text">
                  You can see your candidate below. You can recheck your old call details
                </MDTypography>
                <DialogContent>
                  <MDBox display="flex" alignItems="center" ml={-1.5}>
                    <MDBox>Company Name:</MDBox>
                    <MDBox width="80%" ml={0.5}>
                      <MDTypography variant="body2" fontWeight="regular" color="text">
                        {props.selectedTitle}
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                  <MDBox display="flex" alignItems="center" ml={-1.5}>
                    <MDBox>Total Resume Count:</MDBox>
                    <MDBox width="80%" ml={0.5}>
                      <MDTypography variant="body2" fontWeight="regular" color="text">
                        {props.totalResumeCount}
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                  <MDBox display="flex" alignItems="center" ml={-1.5}>
                    <MDBox>Position Name:</MDBox>
                    <MDBox width="80%" ml={0.5}>
                      <MDTypography variant="body2" fontWeight="regular" color="text">
                        {props.selectedDescription}
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                </DialogContent>
              </MDBox>

              <MDBox mt={2} mb={2} display="flex" justifyContent="flex-end" mr={3}>
                <MDBox display="flex" alignItems="center">
                  <MDTypography
                    variant="body2"
                    mr={3}
                    display="flex"
                    alignItems="center"
                    color="success"
                  >
                    <AnnouncementIcon sx={{ mr: 1 }} />
                    High performance indicator (tpps {">"} 0.7)
                  </MDTypography>
                  <MDTypography
                    variant="body2"
                    mr={3}
                    display="flex"
                    alignItems="center"
                    color="warning"
                  >
                    <AnnouncementIcon sx={{ mr: 1 }} />
                    Mid-level performance indicator (0.5 {"<"} tpps {"<"} 0.7)
                  </MDTypography>
                  <MDTypography variant="body2" display="flex" alignItems="center" color="error">
                    <AnnouncementIcon sx={{ mr: 1 }} />
                    Low performance indicator (tpps {"<="} 0.5)
                  </MDTypography>
                </MDBox>
              </MDBox>

              <DataTable
                table={limitedDataTableData}
                canSearch
                setGlobalFilter={(value) => {
                  console.log(value);
                }}
              />
            </Card>
          </MDBox>
        </MDBox>
      </Dialog>
    </div>
  );
}
