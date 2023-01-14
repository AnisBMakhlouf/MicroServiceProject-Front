
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import MDButton from "components/MDButton";
import { useState, useEffect } from 'react';
import fileimg from "assets/images/logos/attach-file.png";
import axios from "axios";
import MDSnackbar from "components/MDSnackbar";
import React from 'react';
import { Modal, Input, Button, Form, Spin, Select } from 'antd';
export default function data() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Confirm print request ?');

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText('Deleteing...');
    axios.post("http://localhost:8086/api/Impression/update/"+selectedID,{ status: 'Done'}).then((response)=>{
      axios.get("http://localhost:8086/api/Impression/all",{mode: 'no-cors',}).then((response)=>{
       setPrintReq(response.data);
  }).catch(error=>console.log("api error "))

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
  const [nom_Subject, setnom_Subject] = useState('');
  const [nom_Group, setnom_Group] = useState('');
  const [Req_Date, setReq_Date] = useState('');
  const [Req_title, setReq_title] = useState('');
  useEffect(() => {
     axios.get("http://localhost:8086/api/Impression/getById/"+selectedID,{mode: 'no-cors',}).then((response)=>{
      setSelectedReq(response.data);
      setnom_Ens(response.data.nom_Ens);
      setnom_Subject(response.data.nom_Subject);
      setnom_Group(response.data.nom_Group);
      setReq_Date(response.data.date);
      setReq_title(response.data.file);

   }).catch(error=>console.log("api error "))
     
   });
  const renderSuccessSB = ( 
  <MDSnackbar
  color="success"
  icon="check"
  title={Req_title}
  content={ <MDBox display="flex" alignItems="center" lineHeight={1}>
  <MDBox ml={2} lineHeight={1}>
    <MDTypography display="block" variant="button" fontWeight="medium">
      Teacher: {nom_Ens}
    </MDTypography>
    <MDTypography display="block" variant="button" fontWeight="medium">
      Subject: {nom_Subject}
    </MDTypography>
    <MDTypography display="block" variant="button" fontWeight="medium">
      Group: {nom_Group}
    </MDTypography>
  </MDBox>
</MDBox>}
  dateTime={Req_Date}
  open={successSB}
  onClose={closeSuccessSB}
  close={closeSuccessSB}
  bgWhite
/>
  );
  
  const [PrintReq, setPrintReq] = useState([]);
  useEffect(() => {
   axios.get("http://localhost:8086/api/Impression/all",{mode: 'no-cors',}).then((response)=>{
    setPrintReq(response.data);
  
  
  }).catch(error=>console.log("api error "))
    
  }, []);
  console.log(PrintReq);
  const DoneModal =(
    <>

      <Modal
        title="Update Print Request"
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
  return {
    columns: [
      { Header: "Object", accessor: "Object", width: "20%", align: "left" },
      { Header: "Date", accessor: "Date", align: "center" },
      { Header: "Number", accessor: "Number", align: "center" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "Info", accessor: "Info", align: "center" },
      { Header: "DownloadFile", accessor: "DownloadFile", align: "center" },
      { Header: "Done", accessor: "Done", align: "center" },
    ],

    rows:  PrintReq.filter((i)=> i.status=='Done').map(item => ({
        Object: <Author  name={item.file} email={''} image={fileimg} />,
        Date: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {item.date}
          </MDTypography>
        ),
        Number: <Job title={item.nbrCopie} description="" />,
        status: (
          
          <MDBox ml={-1}>
            <MDBadge badgeContent={item.status} color={item.status == 'Pending' ? "warning" : "success"} variant="gradient" size="sm" />
          </MDBox>
        ),
        Info: (
          <MDButton variant="gradient" color="info" size="small" onClick={function(event){ setselectedID(item.id);setSelectedReq();openSuccessSB();}}  fullWidth>
           info
          {renderSuccessSB}
          </MDButton> 
        ),
        DownloadFile: (
          <MDButton variant="gradient" color="info" size="small" onClick={function(event){ setselectedID(item.id);setSelectedReq();openSuccessSB();}}  fullWidth>
           Download
          {renderSuccessSB}
          </MDButton> 
        ),
        Done: (item.status == 'Pending' ? 
          <MDButton variant="gradient" color='success' size="small"  onClick={function(event){ setselectedID(item.id);setSelectedReq();showModal();}}  fullWidth>
           Done
           {DoneModal}
          </MDButton> 
        :''),
      }),
    )
  };
}
