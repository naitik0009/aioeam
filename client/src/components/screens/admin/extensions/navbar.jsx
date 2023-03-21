import { Link,useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
export const AdminNavbar = ()=>{
    const navigate = useNavigate();
    const logoutHandler = () => {
        secureLocalStorage.clear();
        navigate("/login");
    }
    return (
        <>
          <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href={<Link to={"admin-panel"}/>}>AIOEAM</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <li class="nav-link active" aria-current="page"><Link style={{textDecoration: "none",color:"black"}} to={'/admin-panel'}>Dashboard</Link></li>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link active dropdown-toggle" href={<Link  to={"#"}/>} role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Account
          </a>
          <ul class="dropdown-menu">
            <li class="dropdown-item" ><Link style={{textDecoration: "none",color:"black"}} to={"/admin-profile"}>Profile</Link></li>
         <li class="dropdown-item"> <Link style={{textDecoration: "none",color:"black"}} to={"#"}>Events</Link></li> 
            <li><hr class="dropdown-divider"/></li>
            <li><button className="btn" onClick={()=>{logoutHandler()}}>Logout</button></li> 
          </ul>
        </li>
   
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
        </>
    );
}