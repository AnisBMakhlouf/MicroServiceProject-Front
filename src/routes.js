
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import GroupTables from "layouts/Groups_tables";
import SubjectsTables from "layouts/Subjects_tables";
import PrintRequests_tables from "layouts/PrintRequests_tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Users",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Printing Requests",
    key: "Printing Requests",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/PrintRequests_tables",
    component: <PrintRequests_tables />,
  },
  {
    type: "collapse",
    name: "Groups",
    key: "Groups",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/Groups_tables",
    component: <GroupTables />,
  },
  {
    type: "collapse",
    name: "Subjects",
    key: "Subjects",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/Subjects_tables",
    component: <SubjectsTables />,
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
];

export default routes;
