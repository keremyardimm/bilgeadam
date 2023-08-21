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

const dataTableData = {
  columns: [
    { Header: "title", accessor: "name", width: "20%" },
    { Header: "resume description", accessor: "resumeDescription", width: "25%" },
    { Header: "created user", accessor: "createdUser" },
    { Header: "created date", accessor: "createdDate" },
    { Header: "total resume count", accessor: "totalResumeCount" },
  ],
  rows: [
    {
      name: "Toyota",
      resumeDescription: "Business Analyst",
      createdUser: "Kerem Yardım",
      createdDate: "4/11/2023",
      totalResumeCount: "474",
    },
    {
      name: "Toyota 2",
      resumeDescription: "Software Devoloper",
      createdUser: "Kerem Yardım",
      createdDate: "4/11/2023",
      totalResumeCount: "1.300",
    },
    {
      name: "Toyota 3",
      resumeDescription: "Frontend Devoloper",
      createdUser: "Kerem Yardım",
      createdDate: "4/11/2023",
      totalResumeCount: "10",
    },
    {
      name: "Mercedes",
      resumeDescription: "Backand Devoloper",
      createdUser: "Kerem Yardım",
      createdDate: "4/11/2023",
      totalResumeCount: "358",
    },
  ],
};

export default dataTableData;
