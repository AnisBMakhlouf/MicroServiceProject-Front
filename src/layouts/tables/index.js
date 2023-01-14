import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useState, useEffect } from 'react';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

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
import MDButton from "components/MDButton";
import { useModalForm } from 'sunflower-antd';
import { Modal, Input, Button, Form, Spin, Select } from 'antd';
import React from 'react';
import axios from "axios";
import { render } from "@testing-library/react";
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
  const [form] = Form.useForm();
  const {
    modalProps,
    formProps,
    show,
    formLoading,
    formValues,
    formResult,
    defaultFormValuesLoading,
  } = useModalForm({
    defaultVisible: false,
    autoSubmitClose: true,
    autoResetForm: true,
    async submit({ username, email, Role }) {
      console.log('beforeSubmit');
      axios.post("http://localhost:8085/api/user/create",{ fullName: username,mail: email,role: Role }).then((response)=>{
        
      }
      )
      console.log('afterSubmit', username, email);
      return 'ok';
    },
    form,
  });
  const ModalNewForm = (
    <div>
      <Modal {...modalProps} centered title="Add User" okText="submit" width={600}>
        <Spin spinning={formLoading}>
          <>

            
            <Form layout="inline" {...formProps}>
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input username' }]}
              >
                <Input placeholder="Username" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input email',
                    type: 'email',
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
              
              <Form.Item
                label="Role"
                name="Role"
                rules={[{  }]}
              >
                <Select
                  defaultValue=""
                  style={{ width: 120 }}
                  allowClear
                  options={[
                    {
                      value: 'Admin',
                      label: 'Admin',
                    },
                    {
                      value: 'Ens',
                      label: 'Ens',
                    },
                    {
                      value: 'AGT',
                      label: 'AGT',
                    },
                  ]}
                />
              </Form.Item>
            </Form>
          </>
        </Spin>
      </Modal>
      
    </div>);
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
                <MDButton variant="gradient" color="white" size="small" onClick={function(event){show()}}  >
           Add
           {ModalNewForm}
          </MDButton>
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
