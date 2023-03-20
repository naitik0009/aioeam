import { AdminNavbar } from "./extensions/navbar";
import { useLayoutEffect, useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";
export const AdminDashboard = () => {


    const [users,setUsers]=useState([]);
    const navigate = useNavigate();

    useLayoutEffect(()=>{
      
        try {
          fetch("http://127.0.0.1:8000/api/v1/admin/getAllUsers").then((response)=>{return response.json()}).then((data)=>{
            setUsers(data.user);
          });
        } catch (error) {
          console.log(error);
        }
            

    },[]);
    

    return (<>
   <AdminNavbar/>
        <div className="container my-4">
        <table class="table">
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
   

     
      {users.map((element,index) => {
        
        return (
        <tr>
        <th scope="row">{index+1}</th>
        <td>{element.username}</td>
        <td>{element.email}</td>
        <td>{element.verified?"verified":"not verified"}</td>
        <td>{element.role}</td>
        <td>{element.verified?"":<button>verify</button>} {element.role==="Admin"?<button onClick={()=>{navigate("/admin-profile")}}>Profile</button>:<button>Profile</button>} <button onClick={()=>{navigate("/assign-task",{state:{id:element._id}})}}>Assign Task</button></td>
       </tr>
        );
})}
     
    
  </tbody>
</table>
        </div>
    </>);
};