
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
import { func } from "prop-types";
import { refType } from "@mui/utils";
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

  const [Users, setUsers] = useState([]);
  const [selectedID, setselectedID] = useState(0);
  function deleteUser(id){
  //   axios.post("http://localhost:8085/api/user/delete/"+id,{mode: 'no-cors',}).then((response)=>{
  //   console.log('deleted');
  //   return false;
  // }).catch(error=>console.log("api error "))
  }
  useEffect(() => {
   axios.get("http://localhost:8085/api/user/all",{mode: 'no-cors',}).then((response)=>{
    setUsers(response.data);
  }).catch(error=>console.log("api error "))
    
  }, []);
  console.log(Users);
  return {
    columns: [
      { Header: "User", accessor: "User", width: "45%", align: "left" },
      { Header: "Role", accessor: "Role", align: "left" },
      { Header: "Edit", accessor: "Edit", align: "center" },
      { Header: "Delete", accessor: "Delete", align: "center" },
    ],

    rows:  Users.filter((i)=> i.role=='AGT').map(item => ({
      User: <Author image={userimg} name={item.fullName} email={item.mail} />,
      Role: <Job title={item.role} description="" />,
      Edit: (
        <MuiLink href='' target="_blank" rel="noreferrer">
          <MDButton color='secondary'>Edit</MDButton>
        </MuiLink>),
      Delete: (
        <MuiLink href='' target="_blank" rel="noreferrer">
          <MDButton onClick={deleteUser(item.id)} color='error'>Delete</MDButton>
        </MuiLink>)
      })
    )
  };
}