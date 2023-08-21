/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
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
import { useState, useEffect } from "react";
// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Axios
import axios from "axios";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import dataTableData from "layouts/pages/resume/resume-list/data/dataTableData";

import requestData from "./data/requestData.json";

const systemToken = "";

function DataTables() {
  const [dataList, setDataList] = useState([]);

  const getTrialPeriodList = () => {
    const baseURL = `https://localhost:7168`;

    const token = `${systemToken}`;

    const instance = axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, GET, DELETE, HEAD, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, privatekey",
      },
    });

    instance.post("/api/test", { ...requestData }).then((res) => {
      const tableData = {
        columns: [
          { Header: "Company", accessor: "Company", width: "20%" },
          { Header: "Position", accessor: "Position", width: "25%" },
          { Header: "LastTitle", accessor: "LastTitle" },
          { Header: "Scored Probabilities", accessor: "Scored Probabilities" },
        ],
        rows: res.data.Results.WebServiceOutput0,
      };

      setDataList(tableData);
    });
  };

  useEffect(() => {
    getTrialPeriodList();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <MDBox mb={3}>
          <Card>
            <MDBox p={3} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                Resume Search History
              </MDTypography>
              <MDTypography variant="button" color="text">
                You can see your resume searches below. You can recheck your old call details
              </MDTypography>
            </MDBox>
            {dataList.columns && <DataTable table={dataList} />}
          </Card>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default DataTables;
