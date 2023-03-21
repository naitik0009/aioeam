import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Alert,AlertTitle } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import { userContext } from '../context/userData.context';
import  secureLocalStorage from  "react-secure-storage";


const theme = createTheme();

export const  Login=()=> {
  const {userData,setuserData} = React.useContext(userContext);  
  const navigate = useNavigate();

    const [login,setLogin]=React.useState(true);
    const [isLoading,setLoading] = React.useState(false);
    const [email,setEmail] = React.useState("");
    const [password,setPassword] = React.useState("");

    React.useEffect(()=>{

      if(secureLocalStorage.getItem("authToken") && secureLocalStorage.getItem("admin")==="Admin"){
        navigate("/admin-panel")
      }else if(secureLocalStorage.getItem("authToken") && !secureLocalStorage.getItem("admin")){
        navigate("/profile")
      }else{
        navigate("/login")
      }
       
    },[navigate]);

  const handleSubmit =async (event) => {
    setLoading(true);
    event.preventDefault();
    const config = {
        header: { "Content-Type": "application/json" },
    };

    try {
      setLoading(true);
        const result = await axios.post("http://127.0.0.1:8000/api/v1/login",{email,password},config);
        
        if(result.data.code === "success"){
            setuserData({
              id:result.data.user._id,
              email:result.data.user.email,
              role:result.data.user.role,
              username:result.data.user.username,
            });
            setTimeout(()=>{
              setLoading(false);
            },20000);
            if(!isLoading){
              secureLocalStorage.setItem("authToken",result.data.token);
              secureLocalStorage.setItem("userId",result.data.user._id);
             if(result.data.user.role === "Admin"){
              secureLocalStorage.setItem("admin",result.data.user.role);
             }
              navigate("/profile",{state:{user:result.data.user}});
            }
           
        }else if(result.data.code === "ErrorResponse"){
          setLoading(false);
          console.log("i'm inside this tab")
          setLogin(false)

        }
       
    } catch (error) {
      setLoading(false);
      setLogin(false)
        console.log(error) 
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {!login?<Alert severity="error">
  <AlertTitle>Error</AlertTitle>
  Cannot Login — <strong>check it out!</strong>
</Alert>:<></>}
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
        {isLoading?<CircularProgress size={"50"}/>:  <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={(event)=>{
                setEmail(event.target.value)
              }}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              onChange={(event)=>{
                setPassword(event.target.value)
              }}
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgot-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>}
        </Box>
  
      </Container>
    </ThemeProvider>
  );
}