/* eslint-disable no-unused-vars */
// @mui material components
/* eslint-disable no-debugger */
import { useState } from "react";
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import LoupeIcon from "@mui/icons-material/Loupe";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import DetailPopul from "./components/popup";
import StatusCell from "./components/StatusCell";

// Data
// import dataTableData from "layouts/pages/resume/resume-list/data/dataTableData";

function DataTables() {
  const [open, setOpen] = useState(false);

  const onEditClick = (data) => {
    console.log(data);
    setOpen(true);
  };

  const onDeleteClick = (row, data) => {
    console.log(data);
    // setOpen(true);
  };

  const actionRow = (data) => {
    const { index, values } = data.row;
    const { status } = values;
    return (
      <MDBox mt={2} width="100%" display="flex" justifyContent="center">
        <IconButton onClick={() => onEditClick(data)} disabled={!status}>
          <LoupeIcon color="secondary" />
        </IconButton>
        <IconButton onClick={() => onDeleteClick(data)} disabled={!status}>
          <DeleteIcon color="secondary" />
        </IconButton>
      </MDBox>
    );
  };

  const statusRow = (value) => <StatusCell status={value} />;

  const dataTableData = {
    columns: [
      { Header: "title", accessor: "name", width: "20%", enableColumnActions: true },
      { Header: "resume description", accessor: "resumeDescription", width: "15%" },
      { Header: "created user", accessor: "createdUser" },
      { Header: "created date", accessor: "createdDate" },
      { Header: "total resume count", accessor: "totalResumeCount" },
      { Header: "status", accessor: "status", Cell: ({ value }) => statusRow(value) },
      {
        Header: "action",
        Cell: (data) => actionRow(data),
      },
    ],
    rows: [
      {
        name: "Toyota",
        resumeDescription: "Business Analyst",
        createdUser: "Kerem Yardım",
        createdDate: "4/11/2023",
        totalResumeCount: "474",
        status: false,
      },
      {
        name: "Toyota 2",
        resumeDescription: "Software Devoloper",
        createdUser: "Kerem Yardım",
        createdDate: "4/11/2023",
        totalResumeCount: "1.300",
        status: true,
      },
      {
        name: "Toyota 3",
        resumeDescription: "Frontend Devoloper",
        createdUser: "Kerem Yardım",
        createdDate: "4/11/2023",
        totalResumeCount: "10",
        status: true,
      },
      {
        name: "Mercedes",
        resumeDescription: "Backand Devoloper",
        createdUser: "Kerem Yardım",
        createdDate: "4/11/2023",
        totalResumeCount: "358",
        status: true,
      },
    ],
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <MDBox mb={3}>
          <Card>
            <MDBox p={3} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                Position List
              </MDTypography>
              <MDTypography variant="button" color="text">
                You can see your position list below. You can recheck your old call details
              </MDTypography>
            </MDBox>
            <DataTable table={dataTableData} />
          </Card>
        </MDBox>
      </MDBox>
      <Footer />
      <DetailPopul
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
      />
    </DashboardLayout>
  );
}

export default DataTables;
