/* eslint-disable no-unused-vars */
// @mui material components
/* eslint-disable no-debugger */
import React, { useState, useEffect, useMemo } from "react";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import DataTable from "examples/Tables/DataTable";
import PredictionStatusCell from "../candidate/components/PredictionStatusCell";

import { useDataContextController } from "../../../../context/dataContext";

import MDInput from "../../../../components/MDInput";

function DataTables() {
  const [open, setOpen] = useState(false);
  const [controller, dispatch] = useDataContextController();

  const [searchInput, setSearchInput] = useState("");

  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    // localStorage'dan veriyi al
    const storedCandidates = localStorage.getItem("selectedCandidates");
    if (storedCandidates) {
      setCandidates(JSON.parse(storedCandidates));
    }
  }, []);

  const columns = React.useMemo(
    () => [
      { Header: "Company Name", accessor: "companyName", width: "10%" },
      { Header: "Position Name", accessor: "positionName", width: "10%" },
      { Header: "Candidate", accessor: "name", width: "20%" },
      { Header: "Email", accessor: "email", width: "20%" },
      { Header: "Phone", accessor: "phone", width: "10%" },
      { Header: "Gender", accessor: "gender" },
      { Header: "Age", accessor: "age" },
      {
        Header: "TPPS",
        accessor: "tpps",
        // eslint-disable-next-line react/no-unstable-nested-components, react/prop-types
        Cell: ({ value }) => <span>{value}</span>,
      },
      {
        Header: "FYPS",
        accessor: "fyps",
        // eslint-disable-next-line react/no-unstable-nested-components, react/prop-types
        Cell: ({ value }) => <span>{value}</span>,
      },
      {
        Header: "Status",
        // eslint-disable-next-line react/no-unstable-nested-components, react/prop-types
        Cell: ({ row }) => <PredictionStatusCell data={row} />,
      },
    ],
    []
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={2} pb={3}>
        <MDBox mb={3}>
          <Card>
            <MDBox style={{ display: "flex", justifyContent: "space-between" }}>
              <MDBox p={3} lineHeight={1}>
                <MDTypography variant="h5" fontWeight="medium">
                  Interview List
                </MDTypography>
              </MDBox>
              <MDBox p={3}>
                <MDInput
                  placeholder="Search..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </MDBox>
            </MDBox>

            <div>
              <DataTable
                data={candidates}
                table={{ columns, rows: candidates }}
                canSearch={false}
              />
            </div>
          </Card>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default DataTables;
