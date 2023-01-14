
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useState, useEffect } from 'react';
// IIT Printing Management components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// IIT Printing Management example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import breakpoints from "assets/theme/base/breakpoints";
// Data
import GroupsTableData from "layouts/Groups_tables/data/GroupsTableData";
import AppBar from "@mui/material/AppBar";
import MDButton from "components/MDButton";
import { useModalForm } from 'sunflower-antd';
import { Modal, Input, Button, Form, Spin, Select } from 'antd';
import React from 'react';
import axios from "axios";
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';

function GroupTables() {
  const { columns, rows } = GroupsTableData();
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
    async submit({ groupName, studentNB }) {
      console.log('beforeSubmit');
      axios.post("http://localhost:8087/api/group/create",{ groupName: groupName,studentNB: studentNB }).then((response)=>{
        window.location.reload(false);
      }
      )
      console.log('afterSubmit',groupName, studentNB );
      return 'ok';
    },
    form,
  });
  const ModalNewForm = (
    <div>
      <Modal {...modalProps} centered title="Add group" okText="submit" width={600}>
        <Spin spinning={formLoading}>
          <>

            
            <Form layout="inline" {...formProps}>
              <Form.Item
                label="groupName"
                name="groupName"
                rules={[{ required: true, message: 'Please input username' }]}
              >
                <Input placeholder="groupName" />
              </Form.Item>

              <Form.Item
                label="studentNB"
                name="studentNB"
                rules={[
                  {
                    required: true,
                    message: 'Please input studentNB',
                   
                  },
                ]}
              >
                <Input placeholder="studentNB" />
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
               Groups
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

export default GroupTables;
