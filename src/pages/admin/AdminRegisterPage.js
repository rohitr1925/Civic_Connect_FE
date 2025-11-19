import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box, Typography, Paper, Checkbox, FormControlLabel, TextField, CssBaseline, IconButton, InputAdornment, CircularProgress} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import bgpic from "../../assets/designlogin.jpg"
import { LightPurpleButton } from '../../components/buttonStyles';
import { registerUser } from '../../redux/userRelated/userHandle';
import styled from 'styled-components';
import Popup from '../../components/Popup';

const defaultTheme = createTheme();

const AdminRegisterPage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);;

    const [toggle, setToggle] = useState(false)
    const [loader, setLoader] = useState(false)
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [adminNameError, setAdminNameError] = useState(false);
    const [schoolNameError, setSchoolNameError] = useState(false);
    const role = "Admin"

    const handleSubmit = (event) => {
        event.preventDefault();

        const name = event.target.adminName.value;
        const schoolName = event.target.schoolName.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        if (!name || !schoolName || !email || !password) {
            if (!name) setAdminNameError(true);
            if (!schoolName) setSchoolNameError(true);
            if (!email) setEmailError(true);
            if (!password) setPasswordError(true);
            return;
        }

        const fields = { name, email, password, role, schoolName }
        setLoader(true)
        dispatch(registerUser(fields, role))
    };

    const handleInputChange = (event) => {
        const { name } = event.target;
        if (name === 'email') setEmailError(false);
        if (name === 'password') setPasswordError(false);
        if (name === 'adminName') setAdminNameError(false);
        if (name === 'schoolName') setSchoolNameError(false);
    };

    useEffect(() => {
        if (status === 'success' || (currentUser !== null && currentRole === 'Admin')) {
            navigate('/Admin/dashboard');
        }
        else if (status === 'failed') {
            setMessage(response)
            setShowPopup(true)
            setLoader(false)
        }
        else if (status === 'error') {
            console.log(error)
        }
    }, [status, currentUser, currentRole, navigate, error, response]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0f7ff 0%, #e8f2ff 50%, #f3f6fa 100%)' }}>
                <CssBaseline />
                <Grid item xs={12} sm={8} md={5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
                    <LoginPanel elevation={0}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: { xs: 2, sm: 3 }, width: '100%' }}>
                            <Box sx={{ width: 68, height: 68, borderRadius: '18px', background: 'linear-gradient(135deg, #0a78ff 0%, #07b389 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 10px 30px -8px rgba(10,120,255,.45)', mb: 2 }}>
                                <Visibility sx={{ fontSize: '2rem' }} />
                            </Box>
                            <Typography sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 900, fontSize: { xs: '1.5rem', sm: '2rem' }, color: '#1a202c', letterSpacing: '-0.8px', lineHeight: 1.1, mb: 0.5, textAlign: 'center' }}>
                                Admin Register
                            </Typography>
                            <Typography sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: '#4a5568', letterSpacing: '1.1px', textTransform: 'uppercase', mb: 2, textAlign: 'center' }}>
                                Create your own platform by registering as an Admin.<br />You will be able to add citizens and community leaders and manage the system.
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2, width: '100%', maxWidth: 360, mx: 'auto' }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="adminName"
                                    label="Enter your name"
                                    name="adminName"
                                    autoComplete="name"
                                    autoFocus
                                    error={adminNameError}
                                    helperText={adminNameError && 'Name is required'}
                                    onChange={handleInputChange}
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="schoolName"
                                    label="Create your GEO ID"
                                    name="schoolName"
                                    autoComplete="off"
                                    error={schoolNameError}
                                    helperText={schoolNameError && 'School name is required'}
                                    onChange={handleInputChange}
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Enter your email"
                                    name="email"
                                    autoComplete="email"
                                    error={emailError}
                                    helperText={emailError && 'Email is required'}
                                    onChange={handleInputChange}
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type={toggle ? 'text' : 'password'}
                                    id="password"
                                    autoComplete="current-password"
                                    error={passwordError}
                                    helperText={passwordError && 'Password is required'}
                                    onChange={handleInputChange}
                                    sx={{ mb: 2 }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setToggle(!toggle)}>
                                                    {toggle ? (
                                                        <Visibility />
                                                    ) : (
                                                        <VisibilityOff />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Grid container sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center', mt: 1, mb: 2 }}>
                                    <FormControlLabel
                                        control={<Checkbox value="remember" color="primary" />}
                                        label={<span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.95rem', color: '#4a5568' }}>Remember me</span>}
                                    />
                                </Grid>
                                <LightPurpleButton
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 1.5, fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '1.1rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(30,45,60,0.06)' }}
                                >
                                    {loader ? <CircularProgress size={24} color="inherit" /> : "Register"}
                                </LightPurpleButton>
                                <Grid container sx={{ mt: 2, alignItems: 'center', justifyContent: 'center' }}>
                                    <Typography sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '1rem', color: '#4a5568', textAlign: 'center' }}>
                                        Already have an account?
                                    </Typography>
                                    <StyledLink to="/Adminlogin" style={{ marginLeft: '8px', fontWeight: 700 }}>
                                        Log in
                                    </StyledLink>
                                </Grid>
                            </Box>
                        </Box>
                    </LoginPanel>
                </Grid>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${bgpic})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            </Grid>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </ThemeProvider>
    );
}

export default AdminRegisterPage

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #0a78ff;
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    transition: color 0.2s;
    &:hover {
        color: #065dca;
        text-decoration: underline;
    }
`;

const LoginPanel = styled(Paper)`
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 4px 16px rgba(25,40,60,0.08);
    border: 2px solid #e2e8f0;
    max-width: 420px;
    width: 100%;
    margin: 2rem auto;
    padding: 0;
    animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    @keyframes slideUp {
        from { opacity: 0; transform: translateY(40px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
