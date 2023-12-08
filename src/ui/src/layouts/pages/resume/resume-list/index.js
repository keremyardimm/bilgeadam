/* eslint-disable no-unused-vars */
// @mui material components
/* eslint-disable no-debugger */
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import LoupeIcon from "@mui/icons-material/Loupe";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { useDataContextController, setRemoveResume } from "../../../../context/dataContext";

import DetailPopul from "./components/popup";
import StatusCell from "./components/StatusCell";

function DataTables() {
  const [open, setOpen] = useState(false);
  const [controller, dispatch] = useDataContextController();
  const { ResumeData = [] } = controller;

  const statusRow = (value) => <StatusCell status={value} />;

  const [selectedTitle, setSelectedTitle] = useState("");
  const [totalResumeCount, setTotalResumeCount] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");

  const resumeSummary = ResumeData.reduce((acc, resume) => {
    const key = `${resume.name}_${resume.resumeDescription}`;
    if (!acc[key]) {
      acc[key] = { ...resume, resumes: [resume], totalResumeCount: 1 };
    } else {
      acc[key].resumes.push(resume);
      acc[key].totalResumeCount += 1;
    }
    return acc;
  }, {});

  const summarizedData = Object.values(resumeSummary);

  const onEditClick = (data) => {
    setOpen(true);
  };

  const onDeleteClick = (data) => {
    const resumeId = data.row.original.id;
    setRemoveResume(dispatch, resumeId);
  };

  const onLoupeClick = (data) => {
    setSelectedTitle(data.row.original.name);
    setTotalResumeCount(data.row.original.totalResumeCount);
    setSelectedDescription(data.row.original.resumeDescription);
    setOpen(true);
  };

  const actionRow = (data) => {
    const { index, values } = data.row;
    const { status } = values;
    return (
      <MDBox width="100%" display="flex" justifyContent="center">
        <IconButton onClick={() => onLoupeClick(data)} disabled={status === "in progress"}>
          <LoupeIcon color="secondary" />
        </IconButton>

        <IconButton onClick={() => onDeleteClick(data)} disabled={status === "in progress"}>
          <DeleteIcon color="secondary" />
        </IconButton>
      </MDBox>
    );
  };

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
    rows: summarizedData,
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={2} pb={3}>
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
        handleClose={() => setOpen(false)}
        selectedTitle={selectedTitle}
        totalResumeCount={totalResumeCount}
        selectedDescription={selectedDescription}
      />
    </DashboardLayout>
  );
}

export default DataTables;
