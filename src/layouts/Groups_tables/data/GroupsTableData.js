import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import MDButton from "components/MDButton";
import { useState, useEffect } from 'react';
import MuiLink from "@mui/material/Link";
import { Link } from "react-router-dom";
import userimg from "assets/images/logos/user.png";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import axios from "axios";
import ReactDOM from 'react-dom'
import { Group } from "@mui/icons-material";


import { useModalForm } from 'sunflower-antd';
import { Modal, Input, Button, Form, Spin, Select } from 'antd';

import { Margin } from "@mui/icons-material";
import { height, width } from "@mui/system";
import MDSnackbar from "components/MDSnackbar";
export default function data() {
  const [Groups, setGroups] = useState([]);
  const [selectedID, setselectedID] = useState(0);

  useEffect(() => {
   axios.get("http://localhost:8087/api/group/all",{mode: 'no-cors',}).then((response)=>{
    setGroups(response.data);
  }).catch(error=>console.log("api error "))
    
  }, []);
  console.log(Groups);


  const [selectedgroupName, setselectedgroupName] = useState('');
  const [selectedstudentNB, setselectedstudentNB] = useState('');

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Are you sure you want to delete the user' );

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText('Deleteing...');
    axios.post("http://localhost:8087/api/group/delete/"+selectedID,{mode: 'no-cors',}).then((response)=>{
      axios.get("http://localhost:8087/api/group/all",{mode: 'no-cors',}).then((response)=>{
    setGroups(response.data);
  }).catch(error=>console.log("api error "))
     return false;
    }).catch(error=>console.log("api error "))
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };
  const clearState = () => {
    setselectedID(0)
    setselectedgroupName('')
    setselectedstudentNB('')
  
  }
  const DeleteModal =(
    <>

      <Modal
        title="Delete group ?"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        centered
      >
        <p>{modalText}</p>
      </Modal>
    </>
  ) 
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
      axios.post("http://localhost:8087/api/group/update/"+selectedID,{ groupName: groupName,studentNB: studentNB }).then((response)=>{
        axios.get("http://localhost:8087/api/group/all",{mode: 'no-cors',}).then((response)=>{
          setUsers(response.data);
          
        }).catch(error=>console.log("api error "))
      })
      console.log('afterSubmit', groupName, studentNB);
      return 'ok';
    },
    form,
  });
  const ModalForm = (
    <div>
      <Modal {...modalProps} centered title="Edit Group" okText="submit" width={600}>
        <Spin spinning={formLoading}>
          <>

            
            <Form layout="inline" {...formProps}>
              <Form.Item
                label="groupName"
                name="groupName"
                rules={[{ required: true, message: 'Please input groupName' }]}
              >
                <Input placeholder={selectedgroupName
}/>
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
                <Input placeholder={selectedstudentNB}/>
              </Form.Item>
             
            </Form>
          </>
        </Spin>
      </Modal>
      
    </div>);


 
const Author = ({ image, groupName }) => (
  <MDBox display="flex" alignItems="center" lineHeight={1}>
    <MDAvatar src={image} name={groupName} size="sm" />
    <MDBox ml={2} lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium">
        {groupName}
      </MDTypography>
     
    </MDBox>
  </MDBox>
);


const Job = ({studentNB}) => (
  <MDBox lineHeight={1} textAlign="left">
    <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
      {studentNB}
    </MDTypography>
  </MDBox>
);


  return {
    columns: [
      { Header: "Group", accessor: "groupName", width: "45%", align: "left" },
      { Header: "Students Number", accessor: "studentNB", align: "left" },
      { Header: "Edit", accessor: "Edit", align: "center" },
      { Header: "Delete", accessor: "Delete", align: "center" },
    ],

    rows:  Groups.map(item => ({
      groupName: <Author image={userimg} groupName={item.groupName} />,
      studentNB: <Job  studentNB={item.studentNB} />,
      Edit: (
        <MDButton variant="gradient" color="info" size="small" onClick={function(event){clearState();setselectedID(item.id);setselectedgroupName(item.groupName);setselectedstudentNB(item.studentNB);show()}}  fullWidth>
           Edit
          {ModalForm}
          </MDButton>),
      Delete: (

          <MDButton onClick={function(event){setselectedID(item.id);setselectedgroupName(item.groupName);showModal()}} color='error'>Delete
          {DeleteModal}
          </MDButton>)
      })
    )
  };
}
