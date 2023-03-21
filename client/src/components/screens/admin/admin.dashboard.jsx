import { AdminNavbar } from "./extensions/navbar";
import { useLayoutEffect, useState } from "react";
import { Alert } from "@mui/material";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
export const AdminDashboard = () => {

  const [notification,setNotification] = useState({
    code:"",
  });
  const [isLoading,setLoading] = useState(false);
  const [alert,setAlert] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const config = {
    header: { "Content-Type": "application/json" },
  };

  useLayoutEffect(() => {

    try {
      fetch("http://127.0.0.1:8000/api/v1/admin/getAllUsers").then((response) => { return response.json() }).then((data) => {
        setUsers(data.user);
      });
    } catch (error) {
      console.log(error);
    }


  }, []);

  async function verifyUser(id) {

    setLoading(true);
    const response = await axios.post("http://127.0.0.1:8000/api/v1/admin/verifyUser",{id},config);
    if(response.data.code==="success"){
      setTimeout(()=>{
        setLoading(false);
        setNotification({code:"success"});
        setAlert("user verified successfully");
      },4000);
if(!isLoading){
  setTimeout(()=>{
    window.location.reload();
  },7000);
}
    }else{
      setTimeout(()=>{
        setNotification({code:"error"});
        setAlert("user verification failed try again later");
        setLoading(false);
      },6000);
    }
  }

  return (<>
    <AdminNavbar />
    <div className="container my-4">
    {notification.code === "success"?<Alert severity="success">{alert}</Alert>:notification.code==="error"?<Alert severity="error">{alert}</Alert>:""}
      {isLoading?<> <Box sx={{ display: 'flex',justifyContent:"center",alignItems:"center",marginTop:"200px" }}><CircularProgress size={50}/></Box></>:<>
        <table className="table">
        <thead>
          <tr>
            <th scope="col">S.No.</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Status</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>



          {users.map((element, index) => {

            return (
              <tr key={index++}>
                <th key={index++} scope="row">{index + 1}</th>
                <td key={index++}>{element.username}</td>
                <td key={index++}>{element.email}</td>
                <td key={index++}>{element.verified ? "verified" : "not verified"}</td>
                <td key={index++}>{element.role}</td>
                <td key={index++}>{element.verified ? "" : <button onClick={()=>{
                  verifyUser(element._id);
                }} >verify</button>} {element.role === "Admin" ? <button onClick={() => { navigate("/admin-profile") }}>Profile</button> : <button>Profile</button>} <button onClick={() => { navigate("/assign-task", { state: { id: element._id } }) }}>Assign Task</button></td>
              </tr>
            );
          })}


        </tbody>
      </table>
      </>}
    </div>
  </>);
};