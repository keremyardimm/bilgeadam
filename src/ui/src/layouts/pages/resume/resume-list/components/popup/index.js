/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import Card from "@mui/material/Card";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import Checkbox from "@mui/material/Checkbox";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DataTable from "examples/Tables/DataTable";

import PredictionCell from "../../../candidate/components/PredictionCell";
import PredictionStatusCell from "../../../candidate/components/PredictionStatusCell";
import StatusCell from "../../../candidate/components/StatusCell";

import { useDataContextController } from "../../../../../../context/dataContext";

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function FullScreenDialog(props) {
  const { open, handleClose, totalResumeCount } = props;

  const [controller, dispatch] = useDataContextController();
  const [selectedRows, setSelectedRows] = useState(controller.selectedRows || []);
  const [candidateData, setCandidateData] = useState([]);
  const [tableRows, setTableRows] = useState([
    {
      _id: 1,
      isActive: false,
      picture: "http://placehold.it/32x32",
      age: 22,
      name: "Sandra Carroll",
      gender: "female",
      company: "UPDAT",
      email: "sandracarroll@updat.com",
      phone: "+1 (931) 413-2849",
      address: "440 Aberdeen Street, Hobucken, Wyoming, 9716",
      about: "Do in aliquip ex voluptate ea in. \r\n",
      registered: "2023-02-20T10:02:20 -03:00",
      tpps: 0.2,
      fyps: 1,
      status: true,
    },
    {
      _id: 2,
      isActive: false,
      picture: "http://placehold.it/32x32",
      age: 33,
      name: "Drake Mejia",
      gender: "male",
      company: "EARTHPLEX",
      email: "drakemejia@earthplex.com",
      phone: "+1 (952) 540-2129",
      address: "278 Corbin Place, Groton, New Hampshire, 887",
      about: "Culpa eiusmod irure sit nostrud sunt. \r\n",
      registered: "2015-11-21T04:05:37 -02:00",
      tpps: 1,
      fyps: 0.4,
      status: true,
    },
    {
      _id: 3,
      isActive: false,
      picture: "http://placehold.it/32x32",
      age: 22,
      name: "Minnie Sanford",
      gender: "female",
      company: "MEDIFAX",
      email: "minniesanford@medifax.com",
      phone: "+1 (805) 545-3777",
      address: "357 Brightwater Avenue, Slovan, South Carolina, 1318",
      about:
        "Minim culpa cupidatat elit labore. Anim excepteur id consequat tempor quis aliquip fugiat tempor.\r\n",
      registered: "2016-06-14T04:39:57 -03:00",
      tpps: 0.5,
      fyps: 0.1,
      status: true,
    },
    {
      _id: 4,
      isActive: false,
      picture: "http://placehold.it/32x32",
      age: 36,
      name: "Lois Briggs",
      gender: "female",
      company: "FUTURITY",
      email: "loisbriggs@futurity.com",
      phone: "+1 (937) 530-2531",
      address: "305 Clarendon Road, Topanga, New Jersey, 3210",
      about:
        "Commodo consectetur in laborum aliqua adipisicing ipsum incididunt veniam nostrud. \r\n",
      registered: "2016-01-06T11:03:51 -02:00",
      tpps: 0.6,
      fyps: 0.1,
      status: false,
    },
    {
      _id: 5,
      isActive: false,
      picture: "http://placehold.it/32x32",
      age: 27,
      name: "Kelly Holland",
      gender: "male",
      company: "ADORNICA",
      email: "kellyholland@adornica.com",
      phone: "+1 (877) 528-2175",
      address: "701 Harden Street, Sutton, Pennsylvania, 2064",
      about: "Aliquip officia occaecat ad consectetur adipisicing cupidatat amet.\r\n",
      registered: "2014-01-03T07:36:11 -02:00",
      tpps: 0.3,
      fyps: 0.5,
      status: false,
    },
  ]);

  const updateTableRows = (newRows) => {
    setTableRows(newRows);
  };

  useEffect(() => {
    setCandidateData(controller.ResumeData || []);
  }, [controller.ResumeData]);

  const handleCheckboxChange = (rowId) => {
    const isSelected = selectedRows.includes(rowId);
    const newSelectedRows = isSelected
      ? selectedRows.filter((id) => id !== rowId)
      : [...selectedRows, rowId];

    setSelectedRows(newSelectedRows);

    dispatch({ type: "SET_SELECTED_ROWS", selectedRowIds: newSelectedRows });
  };

  const [showInterviewList, setShowInterviewList] = useState(false);

  const handleArrangeInterviewClick = () => {
    // Seçilen adayların tam verilerini bulun
    // eslint-disable-next-line no-underscore-dangle
    const selectedCandidates = tableRows.filter((row) => selectedRows.includes(row._id));

    // Her aday için company ve position bilgilerini dahil edin
    const candidatesWithCompanyAndPosition = selectedCandidates.map((candidate) => ({
      ...candidate,
      companyName: props.selectedTitle,
      positionName: props.selectedDescription,
    }));

    // localStorage'daki mevcut verileri al
    const storedCandidates = JSON.parse(localStorage.getItem("selectedCandidates")) || [];

    // Yeni seçilen adayları mevcut verilere ekleyin
    const updatedCandidates = [...storedCandidates, ...candidatesWithCompanyAndPosition];

    // Güncellenmiş verileri localStorage'a kaydedin
    localStorage.setItem("selectedCandidates", JSON.stringify(updatedCandidates));

    setShowInterviewList(true);
  };

  const handleCloseDialog = () => {
    handleClose();
    setShowInterviewList(false);
    setSelectedRows([]);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={() => {
          handleCloseDialog();
        }}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton edge="end" color="inherit" onClick={handleCloseDialog} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {showInterviewList ? "Interview List" : "Short List Detail"}
            </Typography>
          </Toolbar>
        </AppBar>
        <MDBox pb={3} hidden={showInterviewList}>
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
                selectedRows={selectedRows}
                updateTableRows={updateTableRows}
                data={candidateData}
                onArrangeInterviewClick={handleArrangeInterviewClick}
                table={{
                  columns: [
                    // eslint-disable-next-line react/no-unstable-nested-components
                    {
                      Header: "id",
                      accessor: "_id",
                      // eslint-disable-next-line react/no-unstable-nested-components
                      Cell: ({ value }) => (
                        <MDBox display="flex" alignItems="center">
                          <Checkbox
                            checked={selectedRows.includes(value)}
                            onChange={() => handleCheckboxChange(value)}
                          />
                          <MDBox ml={1}>
                            <MDTypography variant="caption" fontWeight="medium" color="text">
                              {value}
                            </MDTypography>
                          </MDBox>
                        </MDBox>
                      ),
                    },
                    { Header: "Candidate", accessor: "name", width: "20%" },
                    { Header: "Email", accessor: "email", width: "20%" },
                    { Header: "Phone", accessor: "phone", width: "10%" },
                    { Header: "Gender", accessor: "gender" },
                    { Header: "Age", accessor: "age" },
                    {
                      Header: "TPPS",
                      accessor: "tpps",
                      // eslint-disable-next-line react/no-unstable-nested-components
                      Cell: ({ value }) => <span>{value}</span>,
                    },
                    {
                      Header: "FYPS",
                      accessor: "fyps",
                      // eslint-disable-next-line react/no-unstable-nested-components
                      Cell: ({ value }) => <span>{value}</span>,
                    },
                    {
                      Header: "Status",
                      // eslint-disable-next-line react/no-unstable-nested-components
                      Cell: ({ row }) => <PredictionStatusCell data={row} />,
                    },
                    {
                      Header: "prediction status",
                      accessor: "status",
                      // eslint-disable-next-line react/no-unstable-nested-components
                      Cell: ({ row }) => <StatusCell status={row.original.status} />,
                    },
                    {
                      Header: "prediction",
                      accessor: "prediction",
                      // eslint-disable-next-line react/no-unstable-nested-components
                      Cell: ({ row }) => (
                        <PredictionCell data={row} updateTableRows={updateTableRows} />
                      ),
                    },
                  ],
                  rows: tableRows.slice(0, totalResumeCount),
                }}
                canSearch
                setGlobalFilter={(value) => {}}
              />
            </Card>
          </MDBox>
        </MDBox>

        <MDBox mb={3} hidden={!showInterviewList}>
          <MDBox mb={3}>
            <Card>
              <MDBox p={3} lineHeight={1}>
                <MDTypography variant="h5" fontWeight="medium">
                  Interview List
                </MDTypography>
                <MDTypography variant="button" color="text">
                  You can see the candidates selected for the interview below.
                </MDTypography>
                <DialogContent>
                  <DataTable
                    selectedRows={selectedRows}
                    updateTableRows={updateTableRows}
                    data={candidateData}
                    onArrangeInterviewClick={handleArrangeInterviewClick}
                    isButtonHidden={true}
                    table={{
                      columns: [
                        { Header: "Candidate", accessor: "name", width: "20%" },
                        { Header: "Email", accessor: "email", width: "20%" },
                        { Header: "Phone", accessor: "phone", width: "10%" },
                        { Header: "Gender", accessor: "gender" },
                        { Header: "Age", accessor: "age" },
                        {
                          Header: "TPPS",
                          accessor: "tpps",
                          // eslint-disable-next-line react/no-unstable-nested-components
                          Cell: ({ value }) => <span>{value}</span>,
                        },
                        {
                          Header: "FYPS",
                          accessor: "fyps",
                          // eslint-disable-next-line react/no-unstable-nested-components
                          Cell: ({ value }) => <span>{value}</span>,
                        },
                        {
                          Header: "Status",
                          // eslint-disable-next-line react/no-unstable-nested-components
                          Cell: ({ row }) => <PredictionStatusCell data={row} />,
                        },
                      ],
                      rows: tableRows.slice(0, selectedRows.length),
                    }}
                    canSearch
                    setGlobalFilter={(value) => {}}
                  />
                </DialogContent>
              </MDBox>
            </Card>
          </MDBox>
        </MDBox>
      </Dialog>
    </div>
  );
}
