import Grid from "@mui/material/Grid";

// IIT Printing Management components
import MDBox from "components/MDBox";

// IIT Printing Management example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import React from 'react';
import axios from "axios";
import { useState, useEffect } from 'react';
function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [Users, setUsers] = useState(0);
  const [SelectedReq, setSelectedReq] = useState(0);
  const [sujectReq, setSubjectReq] = useState(0);
  const [Groups, setGroups] = useState(0);
  useEffect(() => {
    axios.get("http://localhost:8085/api/user/all",{mode: 'no-cors',}).then((response)=>{
     setUsers(response.data);
   }).catch(error=>console.log("api error "));
   axios.get("http://localhost:8086/api/Impression/all",{mode: 'no-cors',}).then((response)=>{
    setSelectedReq(response.data);
    }).catch(error=>console.log("api error "));
    axios.get("http://localhost:8088/api/subject/all",{mode: 'no-cors',}).then((response)=>{
    setSubjectReq(response.data);
  }).catch(error=>console.log("api error "));
  axios.get("http://localhost:8087/api/group/all",{mode: 'no-cors',}).then((response)=>{
    setGroups(response.data);
  }).catch(error=>console.log("api error "))
   }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3} >
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Users"
                count={Users.length}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Printing Requests"
                count={SelectedReq.length}
                percentage={{
                  
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Groups"
                count={Groups.length}
                percentage={{
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Subjects"
                count={sujectReq.length}
                percentage={{
                 
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
