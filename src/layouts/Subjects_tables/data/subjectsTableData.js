
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import MDButton from "components/MDButton";
import { useState, useEffect } from 'react';
import MuiLink from "@mui/material/Link";
import { Link } from "react-router-dom";
import fileimg from "assets/images/logos/attach-file.png";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import axios from "axios";
import MDSnackbar from "components/MDSnackbar";
import Grid from "@mui/material/Grid";
import { useModalForm } from 'sunflower-antd';
import { Modal, Input, Button, Form, Spin, Select } from 'antd';
import Icon from "@mui/material/Icon";
export default function data() {
  const [ShowForm, setShowUpdateForm] = useState(false);
  const ShowUpdateForm = () => setShowUpdateForm(true);
  const closeUpdateForm = () => setShowUpdateForm(false);
 
  useEffect(() => {
    axios.get("http://localhost:8088/api/subject/getById/"+selectedID,{mode: 'no-cors',}).then((response)=>{
    
     setnom_Ens(response.data.nom_Ens);
    
     setnom_Group(response.data.nom_Group);
    
     

  }).catch(error=>console.log("api error "))
    
  });

  
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Are you sure you want to delete the subject' );
  const [form] = Form.useForm();
  const {
    modalProps,
    formProps,
    show,
    formLoading,
    formValues,
    formResult,
  } = useModalForm({
    defaultVisible: false,
    autoSubmitClose: true,
    autoResetForm: true,
    async submit({ username, email, Role }) {
      console.log('beforeSubmit');
      axios.post("http://localhost:8088/api/subject/update/"+selectedID,{ subject_name: subjectName,id_Ens: id_Ens,id_Group: id_Group }).then((response)=>{
        axios.get("http://localhost:8088/api/subject/all",{mode: 'no-cors',}).then((response)=>{
          setSubjectReq(response.data);
        }).catch(error=>console.log("api error "))
      })
      console.log('afterSubmit', username, email);
      return 'ok';
    },
    form,
  });
  const ModalForm = (
    <div>
      <Modal {...modalProps} title="Edit Subject" okText="submit" width={600}>
        <Spin spinning={formLoading}>
          <>
            <p>
              submit: subjectname {formValues.subject_name} email {formValues.nom_Ens} Role {formValues.nom_Group}
            </p>
            
            <Form layout="inline" {...formProps}>
              <Form.Item
                label="subjectname"
                name="subjectname"
                rules={[{ required: true, message: 'Please input subjectname' }]}
              >
                <Input placeholder="subjectname" />
              </Form.Item>

              <Form.Item
                label="nom_Ens"
                name="nom_Ens"
                rules={[
                  {
                    required: true,
                    message: 'Please input nom_Ens',
                    type: 'nom_Ens',
                  },
                ]}
              >
                <Input placeholder="nom_Ens" />
              </Form.Item>
              
              <Form.Item
                label="nom_Group"
                name="nom_Group"
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
  const [successSB, setSuccessSB] = useState(false);
  const [selectedID, setselectedID] = useState(0);


  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);

  const [SelectedReq, setSelectedReq] = useState(null);
  const [nom_Ens, setnom_Ens] = useState('');

  const [nom_Group, setnom_Group] = useState('');
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText('Deleteing...');
    axios.post("http://localhost:8088/api/subject/delete/"+selectedID,{mode: 'no-cors',}).then((response)=>{
      axios.get("http://localhost:8088/api/subject/all",{mode: 'no-cors',}).then((response)=>{
        setSubjectReq(response.data);
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
        title="Delete Subject ?"
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
  const renderSuccessSB = ( 
  <MDSnackbar
  color="success"
  icon="check"
  title="Subject Details "
  content={ <MDBox display="flex" alignItems="center" lineHeight={1}>
  <MDBox ml={2} lineHeight={1}>
    <MDTypography display="block" variant="button" fontWeight="medium">
      Teacher: {nom_Ens}
    </MDTypography>
    <MDTypography display="block" variant="button" fontWeight="medium">
      Group: {nom_Group}
    </MDTypography>
  </MDBox>
</MDBox>}
  dateTime=""
  open={successSB}
  onClose={closeSuccessSB}
  close={closeSuccessSB}
  bgWhite
/>
  );
  
  const [sujectReq, setSubjectReq] = useState([]);
  useEffect(() => {
   axios.get("http://localhost:8088/api/subject/all",{mode: 'no-cors',}).then((response)=>{
    setSubjectReq(response.data);
  
  
  }).catch(error=>console.log("api error "))
    
  }, []);
  console.log(sujectReq);
  return {
    columns: [
      { Header: "subjectName", accessor: "subjectName", width: "20%", align: "left" },
      { Header: "Info", accessor: "Info", align: "center" },
      { Header: "Edit", accessor: "Edit", align: "center" },
      { Header: "Delete", accessor: "Delete", align: "center" },
    ],

    rows:  sujectReq.map(item => ({
      subjectName: <Author  name={item.subjectName} email={''} />,
        Info: (
          <MDButton variant="gradient" color="info" size="small" onClick={function(event){ setselectedID(item.id);setSelectedReq();openSuccessSB();}}  fullWidth>
           info
          {renderSuccessSB}
          </MDButton>
         
          
        ),
        Edit: (
          <MDButton variant="text" color="info" size="small" onClick={function(event){setselectedID(item.id);ShowUpdateForm()}}  fullWidth>
             <Icon>edit</Icon>&nbsp;Edit
            </MDButton>
          ),
          Delete: (
            <MDButton variant="text" onClick={function(event){setselectedID(item.id);showModal()}} color='error'>
              <Icon>delete</Icon>&nbsp;Delete
              {DeleteModal}</MDButton>)
        
      }),
    )
  };
}
