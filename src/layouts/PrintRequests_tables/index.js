import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useState, useEffect } from 'react';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import breakpoints from "assets/theme/base/breakpoints";
// Data
import PrintRequests_tablesTableData_All from "layouts/PrintRequests_tables/data/PrintRequests_tablesTableData_All";
import PrintRequests_tablesTableData_printed from "layouts/PrintRequests_tables/data/PrintRequests_tablesTableData_printed";
import PrintRequests_tablesTableData_Pending from "layouts/PrintRequests_tables/data/PrintRequests_tablesTableData_Pending";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import MDButton from "components/MDButton";
import { useModalForm } from 'sunflower-antd';
import { Modal, Input, Button, Form, Spin, Select } from 'antd';
import React from 'react';
import axios from "axios";
import { DatePicker, Space } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
function PrintRequests_tables() {
  let { columns, rows } = PrintRequests_tablesTableData_All();
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const [form] = Form.useForm();
  const [SelectedDate, setSelectedDate] = useState([]);
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
    async submit({ Object, Date }) {
      console.log('beforeSubmit');
      axios.post("http://localhost:8086/api/Impression/create",{ file:Object, date:SelectedDate,status:'Pending',id_Ens:26}).then((response)=>{
        window.location.reload(false);
      }
      )
      console.log('afterSubmit', username, email);
      return 'ok';
    },
    form,
  });
  
  const onChange = (date, dateString) => {
    setSelectedDate(dateString);
  };
  const [Groups, setGroups] = useState([]);
  const { Dragger } = Upload;
const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};
async function fetchData(){
  await axios.get("http://localhost:8087/api/group/all",{mode: 'no-cors',}).then((response)=>{
    setGroups(response.data);
    console.log(Groups);
  })
  .catch((error) => {
      console.log(error)
  })
}
  const ModalNewForm = (
    
    <div>
      <Modal {...modalProps} centered title="Add User" okText="submit" width={600}>
        <Spin spinning={formLoading}>
          <>
            <Form layout="inline" {...formProps}>
              <Form.Item
                label="Object"
                name="Object"
                rules={[{ required: true, message: 'Please input Object' }]}
              >
                <Input placeholder="Object" />
              </Form.Item>

              <Form.Item
                label="Date"
                name="Date"
                rules={[
                  { }]}>
                 <Space direction="vertical">
                  <DatePicker onChange={onChange} />
                </Space>
              </Form.Item>
              
              <Form.Item
                label="Group"
                name="Group"
                rules={[{  required: true,message: 'Please select Group'}]}
              >
                <Select
                  defaultValue=""
                  style={{ width: 120 }}
                  allowClear
                  options={Groups.map(item => ({
                    value: item.id,
                    label: item.groupName,
                   }))}
                />
              </Form.Item>
              <Form.Item
                label="File"
                name="File"
                rules={[
                  { required: true,message: 'Please input Date',},]}>
                  <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                      Support for a single or bulk upload. Click or drag file to this area to upload
                    </p>
                  </Dragger>
              </Form.Item>
            </Form>
          </>
        </Spin>
      </Modal>
      
    </div>);

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
                       ({ columns, rows } = PrintRequests_tablesTableData_All());
                      return 'All files'
                    case 1:
                      ({ columns, rows } = PrintRequests_tablesTableData_Pending());
                      return 'Waiting files'
                    case 2:
                      ({ columns, rows } = PrintRequests_tablesTableData_printed());
                      return 'Printed files'
                    
                  }
                })()}
                </MDTypography>
                <MDButton variant="gradient" color="white" size="small" onClick={function(event){fetchData();show()}}  >
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

export default PrintRequests_tables;
