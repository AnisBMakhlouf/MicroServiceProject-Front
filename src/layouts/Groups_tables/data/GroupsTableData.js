
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
import Form, {
  FormThemeProvider,
  Input,
  SubmitButton
} from 'react-form-component';

import { useForm } from "react-cool-form";
import { Margin } from "@mui/icons-material";
import { height, width } from "@mui/system";
import MDSnackbar from "components/MDSnackbar";
export default function data() {

  const [ShowForm, setShowUpdateForm] = useState(false);
  const ShowUpdateForm = () => setShowUpdateForm(true);
  const closeUpdateForm = () => setShowUpdateForm(false);
  const [selectedID, setselectedID] = useState(0);
  const handleSubmit = async (fields) => {
    setLoading(true);
    try {
      // API login call.
      const resp = await axios.get(
        'https://reqres.in/api/login?delay=1',
        fields
      );
      console.log(resp);
      alert("Successfuly logged in!")
    } catch (err) {
      alert("There was an error during login")
    }
    setLoading(false)
  };
  const { form, use } = useForm({
    defaultValues: {},
    onSubmit: (values) => 
    axios.post("http://localhost:8087/api/group/update/"+values.groupID,{ groupName: values.groupName,studentNB: values.studentNB}).then((response)=>{

        axios.get("http://localhost:8087/api/group/all",{mode: 'no-cors',}).then((response)=>{
         setGroups(response.data);
         closeUpdateForm();
       }).catch(error=>console.log("api error ")) 
    
  }).catch(error=>console.log("api error "))

  });

  const errors = use("errors");
  const renderUpdateForm = ( 
    <MDSnackbar
    color=""
    icon=""
    title="Edit Group"
    content={    
      <form style={{ margin:'5rem auto 0', width:'30rem', height:400}} ref={form} noValidate>
      <div style={{ marginBottom:'1.5rem', width:'inherit'}}>
      <input name="groupID" hidden value={selectedID}/>
      <label>Group Name:</label>
        <input style={{ marginBottom:'1.5rem', width:'inherit', padding:'0 0.5rem', height:'2rem', borderRadius:'4px',  boxSizing:'border-box'}} name="groupName" placeholder="group Name" required />
        {errors.groupName && <p>{errors.groupName}</p>}
      </div>
      <label>Students Number:</label>
      <div style={{ marginBottom:'1.5rem', width:'inherit'}}>
        <input style={{ marginBottom:'1.5rem', width:'inherit', padding:'0 0.5rem', height:'2rem', borderRadius:'4px',  boxSizing:'border-box'}} name="studentNB" placeholder="students NB" required />
        {errors.studentNB && <p>{errors.studentNB}</p>}
      </div>
    
      <input style={{ marginBottom:'1.5rem', width:'inherit', padding:'0 0.5rem', height:'2rem', borderRadius:'4px',  boxSizing:'border-box'}} type="submit" />
    </form>
    }
    dateTime=""
    open={ShowForm}
    onClose={closeUpdateForm}
    close={closeUpdateForm}
    bgWhite
  />
  );

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
   axios.get("http://localhost:8087/api/group/all",{mode: 'no-cors',}).then((response)=>{
    setGroups(response.data);
  
  
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
        <MDButton variant="gradient" color="info" size="small" onClick={function(event){setselectedID(item.id);ShowUpdateForm()}}  fullWidth>
        Edit
       {renderUpdateForm}
       </MDButton>),
      Delete: (
        <MuiLink href='' target="_blank" rel="noreferrer">
          <MDButton color='error'>Delete</MDButton>
        </MuiLink>)
      })
    )
  };
}
