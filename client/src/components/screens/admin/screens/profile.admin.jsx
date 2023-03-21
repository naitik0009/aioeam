import { AdminNavbar } from "../extensions/navbar";
import { useContext,useEffect } from "react";
import { userContext } from "../../../context/userData.context";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
export const AdminProfile = () => {
    const {userData} = useContext(userContext);
    const navigate = useNavigate();
    useEffect(() => {

        if (!secureLocalStorage.getItem("authToken") && !secureLocalStorage.getItem("admin")) {
            navigate("/login");
        };
});
    return (<>
   <AdminNavbar/>
   <div className="container">
            
            <div align="center">
                    <div className="card" style={{width: "18rem"}}>
                        <img src="https://www.blexar.com/avatar.png" className="card-img-top" alt={userData.username}/>
                            <div className="card-body">
                                <span><h5>{userData.username}</h5></span>
                                <h5 className="card-title">{userData.email}</h5>
                                <span>role:<h5>{userData.role}</h5></span>
                                {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                                <a  className="btn btn-primary">Edit Profile</a>
                            </div>
                    </div>
                </div>
    
            </div>
    </>);
};