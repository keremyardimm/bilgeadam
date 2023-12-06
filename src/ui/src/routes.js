import Analytics from "layouts/dashboards/analytics";

import NewResume from "layouts/pages/resume/new-resume";
import ResumeList from "layouts/pages/resume/resume-list";
// import CandidateTrialPeriod from "layouts/pages/resume/candidate-trial-period";

import Settings from "layouts/pages/account/settings";
import SignInCover from "layouts/authentication/sign-in/cover";

// Material Dashboard 2 PRO React components
import MDAvatar from "components/MDAvatar";

// @mui icons
import Icon from "@mui/material/Icon";

// Images
import profilePicture from "assets/images/drake.jpg";

const routes = [
  {
    type: "collapse",
    name: "Demo User",
    key: "brooklyn-alice",
    icon: <MDAvatar src={profilePicture} alt="Demo User" size="sm" />,
    collapse: [
      {
        name: "Logout",
        key: "logout",
        route: "/authentication/sign-in/cover",
        component: <SignInCover />,
      },
    ],
  },
  { type: "divider", key: "divider-0" },
  {
    type: "collapse",
    name: "Dashboards",
    key: "dashboards",
    icon: <Icon fontSize="medium">dashboard</Icon>,
    collapse: [
      {
        name: "Analytics",
        key: "analytics",
        route: "/dashboards/analytics",
        component: <Analytics />,
      },
    ],
  },
  { type: "title", title: "Pages", key: "title-pages" },
  {
    type: "collapse",
    name: "Pages",
    key: "pages",
    icon: <Icon fontSize="medium">image</Icon>,
    collapse: [
      {
        name: "Resume",
        key: "resume",
        collapse: [
          {
            name: "New Short List",
            key: "new-short-list",
            route: "/pages/resume/new-short-list",
            component: <NewResume />,
          },
          {
            name: "Position List",
            key: "position-list",
            route: "/pages/resume/position-list",
            component: <ResumeList />,
          },
          // {
          //   name: "Candidate Trial Period",
          //   key: "candidate-trial-period",
          //   route: "/pages/resume/candidate-trial-period",
          //   component: <CandidateTrialPeriod />,
          // },
        ],
      },
      {
        name: "Account",
        key: "account",
        collapse: [
          {
            name: "Settings",
            key: "settings",
            route: "/pages/account/settings",
            component: <Settings />,
          },
        ],
      },
    ],
  },
];

export default routes;
