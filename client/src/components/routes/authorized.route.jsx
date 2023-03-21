import {Outlet,Navigate} from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

export const AuthorizedRoutes = ()=>{
    let auth = secureLocalStorage.getItem("authToken");
    let admin = secureLocalStorage.getItem("admin");
    let result = admin && auth;
    return (
     !result?<Outlet/>:<Navigate to={"/login"}/>
    );
}

// export const PublicRoutes = ()=>{
//     let auth = secureLocalStorage.getItem("authToken");
//     let admin = secureLocalStorage.getItem("admin");
//     let result = !admin && !auth;
//     return result?<Outlet/>:<Navigate to={"/"}/>;
// }

export const AdminRoutes = ()=>{
    let auth = secureLocalStorage.getItem("authToken");
    let admin = secureLocalStorage.getItem("admin");
    let result = admin && auth;
    return (
        
        result ? <Outlet/> : <Navigate to={"/login"} />
    );
}