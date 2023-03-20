import {Route,Routes} from "react-router-dom";
import { Login } from './components/screens/login';
import  Register  from './components/screens/register';
import { ForgotPassword } from './components/screens/forgot_password';
import { ResetPassword } from './components/screens/reset_password';
import { AuthorizedRoutes} from "./components/routes/authorized.route";
import { Profile } from "./components/screens/authorized_screens/user.profile";
import { NotFound } from "./components/screens/not_found";
import Home from "./components/screens/home";
import { DashBoard } from "./components/screens/authorized_screens/user_dashboard";
import { AdminRoutes } from "./components/routes/authorized.route";
import { AdminDashboard } from "./components/screens/admin/admin.dashboard";
import { AdminProfile } from "./components/screens/admin/screens/profile.admin";
import { AssignTask } from "./components/screens/admin/screens/assign.task";
function App() {
  return (
    <Routes>
      <Route element={<AuthorizedRoutes/>} >
        <Route name="dashboard" path={"/dashboard"} element={<DashBoard/>}/>
        <Route path="/profile" name="profile" element={<Profile/>}/>
      </Route>
      <Route element={<AdminRoutes/>}>
        <Route path={"/admin-panel"}  element={<AdminDashboard/>}/>
        <Route path={"/admin-profile"}  element={<AdminProfile/>}/>
        <Route path={"/assign-task"} element={<AssignTask/>}/>
      </Route>
    {/* <Route element={<PublicRoutes/>}> */}
    <Route path="/" name="home" element={<Home/>} />
      <Route path="/login" name="login" element={<Login/>} />
      <Route path="/register" name="register" element={<Register/>}/>
      <Route path="forgot-password" name="forgetPassword" element={<ForgotPassword/>}/>
      <Route path="/resetPassword/:resetId" name="resetPassword" element={<ResetPassword/>}/>
      <Route path="*" element={<NotFound/>}/>
    {/* </Route> */}
    </Routes>
  );
}

export default App;
