import { Visibility, VisibilityOff, AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Box, Typography, Paper, Checkbox, FormControlLabel, TextField, CssBaseline, IconButton, InputAdornment, CircularProgress, Backdrop } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// ...existing code...
import bgpic from "../assets/designlogin.jpg"
import { LightPurpleButton } from '../components/buttonStyles';
import styled from 'styled-components';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const defaultTheme = createTheme();

const LoginPage = ({ role }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);;

    const [toggle, setToggle] = useState(false)
    const [guestLoader, setGuestLoader] = useState(false)
    const [loader, setLoader] = useState(false)
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [rollNumberError, setRollNumberError] = useState(false);
    const [studentNameError, setStudentNameError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (role === "Student") {
            const rollNum = event.target.rollNumber.value;
            const studentName = event.target.studentName.value;
            const password = event.target.password.value;

            if (!rollNum || !studentName || !password) {
                if (!rollNum) setRollNumberError(true);
                if (!studentName) setStudentNameError(true);
                if (!password) setPasswordError(true);
                return;
            }
            const fields = { rollNum, studentName, password }
            setLoader(true)
            dispatch(loginUser(fields, role))
        }

        else {
            const email = event.target.email.value;
            const password = event.target.password.value;

            if (!email || !password) {
                if (!email) setEmailError(true);
                if (!password) setPasswordError(true);
                return;
            }

            const fields = { email, password }
            setLoader(true)
            dispatch(loginUser(fields, role))
        }
    };

    const handleInputChange = (event) => {
        const { name } = event.target;
        if (name === 'email') setEmailError(false);
        if (name === 'password') setPasswordError(false);
        if (name === 'rollNumber') setRollNumberError(false);
        if (name === 'studentName') setStudentNameError(false);
    };

    const guestModeHandler = () => {
        const password = "zxc"

        if (role === "Admin") {
            const email = "yogendra@12"
            const fields = { email, password }
            setGuestLoader(true)
            dispatch(loginUser(fields, role))
        }
        else if (role === "Student") {
            const rollNum = "1"
            const studentName = "Dipesh Awasthi"
            const fields = { rollNum, studentName, password }
            setGuestLoader(true)
            dispatch(loginUser(fields, role))
        }
        else if (role === "Teacher") {
            const email = "tony@12"
            const fields = { email, password }
            setGuestLoader(true)
            dispatch(loginUser(fields, role))
        }
    }

    useEffect(() => {
        if (status === 'success' || currentUser !== null) {
            if (currentRole === 'Admin') {
                navigate('/Admin/dashboard');
            }
            else if (currentRole === 'Student') {
                navigate('/Citizen/dashboard');
            } else if (currentRole === 'Teacher') {
                navigate('/Leader/dashboard');
            }
        }
        else if (status === 'failed') {
            setMessage(response)
            setShowPopup(true)
            setLoader(false)
        }
        else if (status === 'error') {
            setMessage("Network Error")
            setShowPopup(true)
            setLoader(false)
            setGuestLoader(false)
        }
    }, [status, currentRole, navigate, error, response, currentUser]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0f7ff 0%, #e8f2ff 50%, #f3f6fa 100%)' }}>
                <CssBaseline />
                <Grid item xs={12} sm={8} md={5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <LoginPanel elevation={0}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
                            <Box sx={{ width: 68, height: 68, borderRadius: '18px', background: 'linear-gradient(135deg, #0a78ff 0%, #07b389 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 10px 30px -8px rgba(10,120,255,.45)', mb: 2 }}>
                                {/* Icon based on role */}
                                {role === "Admin" ? <Visibility sx={{ fontSize: '2rem' }} /> : role === "Teacher" ? <VisibilityOff sx={{ fontSize: '2rem' }} /> : <AccountCircleIcon sx={{ fontSize: '2rem' }} />}
                            </Box>
                            <Typography sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 900, fontSize: '2rem', color: '#1a202c', letterSpacing: '-0.8px', lineHeight: 1.1, mb: 0.5 }}>
                                {role === "Student" ? "Citizen" : role === "Teacher" ? "Community Leader" : role} Login
                            </Typography>
                            <Typography sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '0.9rem', color: '#4a5568', letterSpacing: '1.1px', textTransform: 'uppercase', mb: 2 }}>
                                Welcome back! Please enter your details
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2, width: '100%' }}>
                                {role === "Student" ? (
                                    <>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="rollNumber"
                                            label="Enter your Citizen ID"
                                            name="rollNumber"
                                            autoComplete="off"
                                            type="number"
                                            autoFocus
                                            error={rollNumberError}
                                            helperText={rollNumberError && 'Citizen ID is required'}
                                            onChange={handleInputChange}
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="studentName"
                                            label="Enter your name"
                                            name="studentName"
                                            autoComplete="name"
                                            error={studentNameError}
                                            helperText={studentNameError && 'Name is required'}
                                            onChange={handleInputChange}
                                        />
                                    </>
                                ) : (
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Enter your email"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        error={emailError}
                                        helperText={emailError && 'Email is required'}
                                        onChange={handleInputChange}
                                    />
                                )}
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
                                <Grid container sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center', mt: 1 }}>
                                    <FormControlLabel
                                        control={<Checkbox value="remember" color="primary" />}
                                        label={<span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.95rem', color: '#4a5568' }}>Remember me</span>}
                                    />
                                    <StyledLink href="#">
                                        Forgot password?
                                    </StyledLink>
                                </Grid>
                                <LightPurpleButton
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '1.1rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(30,45,60,0.06)' }}
                                >
                                    {loader ?
                                        <CircularProgress size={24} color="inherit" />
                                        : "Login"}
                                </LightPurpleButton>
                                {role === "Admin" &&
                                    <Grid container sx={{ mt: 2, alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '1rem', color: '#4a5568' }}>
                                            Don't have an account?
                                        </Typography>
                                        <StyledLink to="/Adminregister" style={{ marginLeft: '8px', fontWeight: 700 }}>
                                            Sign up
                                        </StyledLink>
                                    </Grid>
                                }
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
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={guestLoader}
            >
                <CircularProgress color="primary" />
                <span style={{ marginLeft: '1rem', fontSize: '1.2rem' }}>Please Wait</span>
            </Backdrop>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </ThemeProvider>
    );
}

export default LoginPage

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
