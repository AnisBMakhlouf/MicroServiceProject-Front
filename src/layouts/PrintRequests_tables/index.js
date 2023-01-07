
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
import PrintRequests_tablesTableData_Pending from "layouts/PrintRequests_tables/data/PrintRequests_tablesTableData_Pending";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
function PrintRequests_tables() {
  const { columns, rows } = PrintRequests_tablesTableData_Pending();
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
                  label="All files"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                    </Icon>
                  }
                />
                <Tab
                  label="Waiting files"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                    </Icon>
                  }
                />
                <Tab
                  label="Printed files"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }} color="action">
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
                      return 'All files'
                    case 1:
                      return 'Waiting files'
                    case 2:
                      return 'Printed files'
                    
                  }
                })()}
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
              {(() => {
                  switch (tabValue) {
                    case 0:
                      return <DataTable
                      table={{ columns, rows }}
                      isSorted={false}
                      entriesPerPage={false}
                      showTotalEntries={false}
                      noEndBorder
                    />
                    case 1:
                      return ''
                    case 2:
                      return ''
                  }
                })()}
                
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default PrintRequests_tables;
