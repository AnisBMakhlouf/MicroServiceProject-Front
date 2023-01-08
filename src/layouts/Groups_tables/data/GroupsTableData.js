
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
import { Group } from "@mui/icons-material";
export default function data() {
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


  const [Groups, setGroups] = useState([]);
  useEffect(() => {
<<<<<<< HEAD:src/layouts/Groups_tables/data/GroupsTableData.js
   axios.get("http://localhost:8087/api/group/all",{mode: 'no-cors',}).then((response)=>{
    setGroups(response.data);
  
  
=======
   axios.get("http://localhost:8085/api/user/all",{mode: 'no-cors',}).then((response)=>{
    setUsers(response.data);
>>>>>>> fe689a3b2c3e17488713f1296c3e4eb61e08cbb8:src/layouts/Groups_tables/data/authorsTableData.js
  }).catch(error=>console.log("api error "))
  }, []);
  console.log(Groups);
  return {
    columns: [
      { Header: "Group", accessor: "groupName", width: "45%", align: "left" },
      { Header: "Students Number", accessor: "studentNB", align: "left" },
      { Header: "Edit", accessor: "Edit", align: "center" },
      { Header: "Delete", accessor: "Delete", align: "center" },
    ],

    rows:  Groups.map(item => ({
      groupName: <Author image={userimg} groupName={item.groupName} />,
      studentNB: <Job studentNB={item.studentNB}  />,
      Edit: (
        <MuiLink href='' target="_blank" rel="noreferrer">
          <MDButton color='secondary'>Edit</MDButton>
        </MuiLink>),
      Delete: (
        <MuiLink href='' target="_blank" rel="noreferrer">
          <MDButton color='error'>Delete</MDButton>
        </MuiLink>)
      })
    )
  };
}
