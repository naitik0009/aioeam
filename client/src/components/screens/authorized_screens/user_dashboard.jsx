import { useState,useContext ,useEffect } from "react";
import { Navbar } from "./navbar.extend";
import { useNavigate,useLocation } from "react-router-dom";
import axios from "axios";


export const DashBoard = () => {
  const {state} = useLocation();

  let newFile=null;

  const [file, setFile] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [status,setStatus] = useState(false);
  const [authorizedData, setAuthorizedData] = useState({
    id: "",
    username: "",
    email: "",
  });
  const config = {
    headers: { "Content-Type": "application/json","id":localStorage.getItem("userId") },
  };
const [task,setTasks] = useState([]);


  useEffect(() => {
//checking if user is logged in or not
    if (!localStorage.getItem("authToken")) {
      navigate("/login");
    };

  

    //retrieving users data
    async function getData() {
      const response = await fetch("http://127.0.0.1:8000/api/v1/profile", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          authorization: `bearer ${localStorage.getItem("authToken")}`,
        }
      });

      const result = await response.json().then((res) => {
        console.log(res.data.message);
        if (res.code !== "success") {
          console.log("nahi huwa login vai")
          localStorage.removeItem("authToken");
        } else if (res.code === "ErrorResponse") {
          alert(res.mesage, "cannot login");
        }
        setAuthorizedData({
          id: res.data._id,
          username: res.data.username,
          email: res.data.email,
        });
      }).catch((error) => {
        localStorage.removeItem("authToken");
        setError(error);
      })
    };
    getData();

    //let's retrieve users tasks

    async function getTask(){
      console.log(localStorage.getItem("userId"))
      const tasks = await axios.get("http://127.0.0.1:8000/api/v1/getAllTasks",config);
      if(tasks.data.code==="success"){
        setTasks(tasks.data.task);
        console.log("setting task");
      }
      console.log(tasks.data.task);
    }

getTask();
  }, [navigate]);





  const handleSubmit = async (event) => {
    event.preventDefault();

    //let'd check if the uploaded file is pdf or not
    if (file[0].name.split(".")[1] !== "pdf") {
      console.log("only pdf files allowed for upload");
    }
    //let's customize the file according to our needs
    else {
      newFile = new File(file, `${authorizedData.username}.pdf`, { type: file[0].type });
      console.log(newFile);
    }
    //let's create a form data
    const formData = new FormData();
    formData.append(
      "task", newFile,
    );
    // now let's upload the file:::::::::::::::::
    const upload = await axios.post("http://127.0.0.1:8000/api/v1/upload", formData);
    if(upload){
      setStatus(true);
    }else{
      setStatus(false)
    }
  }

  return (<div>
    <Navbar />
    <h1 align="center">Welcome to the dashboard</h1>
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Task Name</th>
            <th scope="col">Task Description</th>
            <th scope="col">Task Deadline</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
         
            {Array.isArray(task)? task.map((value,index)=>{
              return (
                <tr>
                 <th scope="row">{index+1}</th>
            <td>{value.name}</td>
            <td>{value.description}</td>
            <td>{value.deadline}</td>
            <td>{value.status?"complete":"incomplete"}</td>
            <td>

              <input type="file" accept="pdf" onChange={(event) => { setFile([...file, event.target.files[0]]) }} id="myFile" name="task" />
              <button onClick={(event => { handleSubmit(event) })} type="submit">upload</button>


            </td>
            </tr>
              );
            }):<>
            <h1>No task for you right now</h1></>}
        </tbody>
      </table>
    </div>
  </div>);
}