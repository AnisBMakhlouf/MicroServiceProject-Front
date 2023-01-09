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
import Form, {
  FormThemeProvider,
  Input,
  SubmitButton
} from 'react-form-component';
import { useForm } from "react-cool-form";
import { Margin } from "@mui/icons-material";
import { height, width } from "@mui/system";
export default function data() {
  const [ShowForm, setShowUpdateForm] = useState(false);
  const ShowUpdateForm = () => setShowUpdateForm(true);
  const closeUpdateForm = () => setShowUpdateForm(false);

    
  
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
      defaultValues: { firstName: "", lastName: "", framework: "" },
      onSubmit: (values) => alert(JSON.stringify(values, undefined, 2))
    });
    const errors = use("errors");
  const renderUpdateForm = ( 
    <MDSnackbar
    color="success"
    icon="check"
    title="test"
    content={    
      <form style={{ margin:40, width:300, height:300}} ref={form} noValidate>
      <div className="count">Edit User</div>
      <div>
        <input style={{ padding:8, width:300, height:32,borderRadius: 4}} name="firstName" placeholder="First name" required />
        {errors.firstName && <p>{errors.firstName}</p>}
      </div>
      <div>
        <input style={{ padding:8, width:300, height:32,borderRadius: 4}} name="lastName" placeholder="Last name" required />
        {errors.lastName && <p>{errors.lastName}</p>}
      </div>
      <div>
      <select style={{ padding:8, width:300, height:32,borderRadius: 4}} name="Role">
        <option value="Admin">Admin</option>
        <option value="ENS">Enseignant</option>
        <option value="AGT">Agents de Tirage</option>
      </select>
      </div>
      <input style={{ padding:8, width:300, height:32,borderRadius: 4}} type="submit" />
    </form>
    }
    dateTime=""
    open={ShowForm}
    onClose={closeUpdateForm}
    close={closeUpdateForm}
    bgWhite
  />
  );
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
  return {
    columns: [
      { Header: "User", accessor: "User", width: "45%", align: "left" },
      { Header: "Role", accessor: "Role", align: "left" },
      { Header: "Edit", accessor: "Edit", align: "center" },
      { Header: "Delete", accessor: "Delete", align: "center" },
    ],

    rows:  Users.filter((i)=> i.role=='Admin').map(item => ({
      User: <Author image={userimg} name={item.fullName} email={item.mail} />,
      Role: <Job title={item.role} description="" />,
      Edit: (
        <MDButton variant="gradient" color="info" size="small" onClick={()=>ShowUpdateForm()}  fullWidth>
           Edit
          {renderUpdateForm}
          </MDButton>),
      Delete: (
        <MuiLink href='' target="_self" rel="noreferrer">
          <MDButton onclick={deleteUser(item.id)} color='error'>Delete</MDButton>
        </MuiLink>)
      })
    )
  };
}
