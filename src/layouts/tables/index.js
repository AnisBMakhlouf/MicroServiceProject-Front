
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useState, useEffect } from 'react';
// IIT Printing Management components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// IIT Printing Management example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import breakpoints from "assets/theme/base/breakpoints";
// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import EnsTableData from "layouts/tables/data/EnsTableData";
import AgentDeTirageData from "layouts/tables/data/AgentDeTirageData";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
function Tables() {
  let { columns, rows } = authorsTableData();
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <AppBar position="static">
              <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue} onclick={console.log(tabValue)}>
                <Tab
                  label="Admins"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                    </Icon>
                  }
                />
                <Tab
                  label="Enseignants"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }} color="action">
                    </Icon>
                  }
                />
                <Tab
                  label="Agents de Tirage"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                    </Icon>
                  }
                />
              </Tabs>
            </AppBar>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                {(() => {
                  switch (tabValue) {
                    case 0:
                      ({ columns, rows } = authorsTableData());
                      return 'Admins'
                    case 1:
                      ({ columns, rows } = EnsTableData());
                      return 'Enseignants'
                    case 2:
                      ({ columns, rows } = AgentDeTirageData());
                      return 'Agents de Tirage'
                  }
                })()}
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                 table={{ columns, rows }}
                 isSorted={false}
                 entriesPerPage={false}
                 showTotalEntries={false}
                 noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Tables;
