import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";
import { useState, useEffect } from 'react';
import MuiLink from "@mui/material/Link";
import userimg from "assets/images/logos/user.png";
import axios from "axios";
import ReactDOM from 'react-dom'
import MDSnackbar from "components/MDSnackbar";
import React from 'react';

import { useModalForm } from 'sunflower-antd';
import { Modal, Input, Button, Form, Spin, Select } from 'antd';

export default function data() {
  const [Users, setUsers] = useState([]);
  
  function deleteUser(id){
  //   axios.post("http://localhost:8085/api/user/delete/"+id,{mode: 'no-cors',}).then((response)=>{
  //    console.log('deleted');
  //   return false;
  //  }).catch(error=>console.log("api error "))
  };
  useEffect(() => {
   axios.get("http://localhost:8085/api/user/all",{mode: 'no-cors',}).then((response)=>{
    setUsers(response.data);
  }).catch(error=>console.log("api error "))
    
  }, []);
  console.log(Users);

  const [selectedID, setselectedID] = useState(0);
  const [selectedFullName, setselectedFullName] = useState('');
  const [selectedEmail, setselectedEmail] = useState('');
  const [selectedRole, setselectedRole] = useState('');
  const clearState = () => {
    setselectedID(0)
    setselectedFullName('')
    setselectedEmail('')
    setselectedRole('')
  }
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
      axios.post("http://localhost:8085/api/user/update/"+selectedID,{ fullName: username,mail: email,role: Role }).then((response)=>{
        axios.get("http://localhost:8085/api/user/all",{mode: 'no-cors',}).then((response)=>{
          setUsers(response.data);
          
        }).catch(error=>console.log("api error "))
      })
      console.log('afterSubmit', username, email);
      return 'ok';
    },
    form,
  });
  const ModalForm = (
    <div>
      <Modal {...modalProps} centered title="Edit User" okText="submit" width={600}>
        <Spin spinning={formLoading}>
          <>
            
            <Form layout="inline" {...formProps}>
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input username' }]}
              >
                <Input placeholder={selectedFullName}/>
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
                <Input placeholder={selectedEmail}/>
              </Form.Item>
              
              <Form.Item
                label="Role"
                name="Role"
                
                rules={[{  }]}
              >
                <Select
                  placeholder={selectedRole}
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


  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );


  return {
    columns: [
      { Header: "User", accessor: "User", width: "45%", align: "left" },
      { Header: "Role", accessor: "Role", align: "left" },
      { Header: "Edit", accessor: "Edit", align: "center" },
      { Header: "Delete", accessor: "Delete", align: "center" },
    ],

    rows:  Users.filter((i)=> i.role=='ENS').map(item => ({
      User: <Author image={userimg} name={item.fullName} email={item.mail} />,
      Role: <Job title={item.role} description="" />,
      Edit: (
        <MDButton variant="gradient" color="info" size="small" onClick={function(event){clearState();setselectedID(item.id);setselectedFullName(item.fullName);setselectedEmail(item.mail);setselectedRole(item.role);show()}}  fullWidth>
           Edit
          {ModalForm}
          </MDButton>),
      Delete: (
        <MuiLink href='' target="_self" rel="noreferrer">
          <MDButton onclick={deleteUser(item.id)} color='error'>Delete</MDButton>
        </MuiLink>)
      })
    )
  };
}
