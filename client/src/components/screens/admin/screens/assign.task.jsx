import { AdminNavbar } from "../extensions/navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useLayoutEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import axios from "axios";
export const AssignTask = () => {
  const props = useLocation();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    localStorage.setItem("userId", props.state.id);
  }, [])

  const config = {
    header: { "Content-Type": "application/json" },
};
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit =async (event) => {
    setLoading(true);
    event.preventDefault();
    const res =await axios.post("http://localhost:8000/api/v1/admin/assignTask", { userId: localStorage.getItem("userId"), name: task, description, deadline },config).then((result) => {
      if(result.data.code==="success"){
        localStorage.removeItem("userId");
        setTimeout(()=>{
          setLoading(false);
        },9000);
        
        navigate("/admin-panel");
      }
    }).catch((error)=>{
      setLoading(false)
      console.log(error)}
      );


  }
  return (
    <>
      <AdminNavbar />
      <div className="container">
{loading?<CircularProgress/>:<>
  <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label htmlFor="exampleInputEmail1" class="form-label">Task Name</label>
            <input onChange={(event) => { setTask(event.target.value) }} type="text" name="taskName" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

          </div>
          <div class="mb-3">
            <label htmlFor="exampleInputPassword1" class="form-label">DeadLine</label>
            <input type="text" name="deadline" onChange={(event) => { setDeadline(event.target.value) }} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div class="form-group">
            <label htmlFor="exampleFormControlTextarea1">Description</label>
            <textarea name="description" class="form-control" onChange={(event) => { setDescription(event.target.value) }} id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
</>}
      </div>
    </>
  );
}