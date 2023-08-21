/* eslint-disable react/prop-types */

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MDBox from "components/MDBox";
import StatusCell from "../components/StatusCell";

const onEditClick = (row, data) => {
  console.log(row, data);
};

const onDeleteClick = (row, data) => {
  console.log(row, data);
};

const dataTableData = {
  columns: [
    { Header: "title", accessor: "name", width: "20%", enableColumnActions: true },
    { Header: "resume description", accessor: "resumeDescription", width: "25%" },
    { Header: "created user", accessor: "createdUser" },
    { Header: "created date", accessor: "createdDate" },
    { Header: "total resume count", accessor: "totalResumeCount" },
    { Header: "status", accessor: "status", Cell: ({ value }) => <StatusCell status={value} /> },
    {
      Header: "action",
      Cell: (row, data) => (
        <MDBox mt={2} width="100%" display="flex" justifyContent="center">
          <IconButton onClick={() => onEditClick(row, data)}>
            <EditIcon color="info" />
          </IconButton>
          <IconButton onClick={() => onDeleteClick(row, data)}>
            <DeleteIcon color="secondary" />
          </IconButton>
        </MDBox>
      ),
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

export default dataTableData;
