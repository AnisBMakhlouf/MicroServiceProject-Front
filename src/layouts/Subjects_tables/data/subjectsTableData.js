
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
export default function data() {
  
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
 
  useEffect(() => {
     axios.get("http://localhost:8088/api/subject/getById/"+selectedID,{mode: 'no-cors',}).then((response)=>{
     
      setnom_Ens(response.data.nom_Ens);
     
      setnom_Group(response.data.nom_Group);
     
      

   }).catch(error=>console.log("api error "))
     
   });
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
      
    ],

    rows:  sujectReq.map(item => ({
      subjectName: <Author  name={item.subjectName} email={''} />,
        Info: (
          <MDButton variant="gradient" color="info" size="small" onClick={function(event){ setselectedID(item.id);setSelectedReq();openSuccessSB();}}  fullWidth>
           info
          {renderSuccessSB}
          </MDButton>
         
          
        ),
      }),
    )
  };
}
