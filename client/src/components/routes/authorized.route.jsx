import {Outlet,Navigate} from "react-router-dom";

export const AuthorizedRoutes = ()=>{
    let auth = localStorage.getItem("authToken");
    let admin = localStorage.getItem("admin");
    let result = admin && auth;
    return (
     !result?<Outlet/>:<Navigate to={"/login"}/>
    );
}

// export const PublicRoutes = ()=>{
//     let auth = localStorage.getItem("authToken");
//     let admin = localStorage.getItem("admin");
//     let result = !admin && !auth;
//     return result?<Outlet/>:<Navigate to={"/"}/>;
// }

export const AdminRoutes = ()=>{
    let auth = localStorage.getItem("authToken");
    let admin = localStorage.getItem("admin");
    let result = admin && auth;
    return (
        
        result ? <Outlet/> : <Navigate to={"/login"} />
    );
}