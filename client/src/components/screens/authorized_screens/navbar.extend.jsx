import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Avatar } from "@mui/material";
import logo from "../../../assets/logo.jpg"
import { useNavigate } from "react-router-dom";
export const Navbar = ()=>{
    const navigate = useNavigate();
    const logoutHandler = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        navigate("/login");
    }
    return (<>
            
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Avatar src={logo} style={{ marginRight: "5px" }} />
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            AIOEAM
                        </Typography>
                        <Button color="inherit" onClick={()=>{navigate("/dashboard")}} >Dashboard</Button>
                        <Button color="inherit" >Activity Log</Button>
                        <Button color="inherit" onClick={()=>{navigate("/profile")}} >Profile</Button>
                        <Button color="inherit" onClick={() => { logoutHandler() }}>Logout</Button>
                    </Toolbar>
                </AppBar>
            </Box>
    </>)
}