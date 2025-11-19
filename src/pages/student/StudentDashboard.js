import CivicCalendar from '../../components/CivicCalendar';
import { useState } from 'react';
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Typography,
    IconButton,
    Drawer,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import StudentSideBar from './StudentSideBar';
import { Navigate, Route, Routes } from 'react-router-dom';
import StudentHomePage from './StudentHomePage';
import StudentProfile from './StudentProfile';
import StudentSubjects from './StudentSubjects';
import ViewStdAttendance from './ViewStdAttendance';
import StudentComplain from './StudentComplain';
import Logout from '../Logout'
import AccountMenu from '../../components/AccountMenu';
import { AppBar } from '../../components/styles';
import Showpolls from '../../components/showpolls';

const StudentDashboard = () => {
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position='fixed' sx={styles.appBarStyled}>
                    <Toolbar sx={{ pr: '24px' }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
                            <Box sx={styles.navBrandIcon}>
                                <AccountBalanceIcon sx={{ fontSize: '1.5rem' }} />
                            </Box>
                            <Box>
                                <Typography
                                    component="h1"
                                    variant="h6"
                                    color="inherit"
                                    sx={{ 
                                        fontFamily: 'Inter, sans-serif',
                                        fontWeight: 800,
                                        letterSpacing: '0.5px',
                                        lineHeight: 1.2,
                                        fontSize: '1.1rem'
                                    }}
                                >
                                    Civic Connect
                                </Typography>
                                <Typography
                                    variant="caption"
                                    color="inherit"
                                    sx={{ 
                                        fontFamily: 'Inter, sans-serif',
                                        fontWeight: 500,
                                        letterSpacing: '0.8px',
                                        opacity: 0.9,
                                        fontSize: '0.7rem',
                                        textTransform: 'uppercase'
                                    }}
                                >
                                    Citizen Dashboard
                                </Typography>
                            </Box>
                        </Box>
                        <AccountMenu />
                    </Toolbar>
                </AppBar>

                {/* Mini Drawer - Always Visible */}
                <Drawer 
                    variant="permanent"
                    sx={styles.miniDrawerStyled}
                >
                    <List component="nav" sx={{ paddingTop: 0 }}>
                        <StudentSideBar open={false} toggleDrawer={toggleDrawer} miniVersion={true} />
                    </List>
                </Drawer>

                {/* Full Drawer - Slides Out */}
                <Drawer 
                    variant="temporary"
                    anchor="left"
                    open={open}
                    onClose={toggleDrawer}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={styles.drawerStyled}
                >
                    <List component="nav" sx={{ width: 280, paddingTop: 0 }}>
                        <StudentSideBar open={open} toggleDrawer={toggleDrawer} miniVersion={false} />
                    </List>
                </Drawer>
                <Box component="main" sx={styles.boxStyled}>
                    <Routes>
                        <Route path="/" element={<StudentHomePage />} />
                        <Route path='*' element={<Navigate to="/" />} />
                        <Route path="/Citizen/dashboard" element={<StudentHomePage />} />
                        <Route path="/Citizen/profile" element={<StudentProfile />} />

                        <Route path="/Citizen/events" element={<StudentSubjects />} />
                        <Route path="/Citizen/attendance" element={<ViewStdAttendance />} />
                        <Route path="/Citizen/complain" element={<StudentComplain />} />
                        <Route path="/calendar" element={<CivicCalendar />} />
                        <Route path="/showpolls" element={<Showpolls />} />


                        <Route path="/logout" element={<Logout />} />
                    </Routes>
                </Box>
            </Box>
        </>
    );
}

export default StudentDashboard

const styles = {
    appBarStyled: {
        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
        boxShadow: '0 4px 20px rgba(79, 70, 229, 0.3)',
    },
    navBrandIcon: {
        width: 40,
        height: 40,
        background: 'rgba(255,255,255,0.2)',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.3)',
        color: '#ffffff',
    },
    boxStyled: {
        backgroundColor: '#f8fafc',
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        padding: '16px 24px',
        marginTop: '64px',
        marginLeft: '72px',
    },
    miniDrawerStyled: {
        width: 72,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
            width: 72,
            boxSizing: 'border-box',
            marginTop: '64px',
            height: 'calc(100% - 64px)',
            borderRight: '1px solid #e2e8f0',
            background: 'linear-gradient(180deg, #fafafa 0%, #ffffff 100%)',
            overflowX: 'hidden',
        },
    },
    drawerStyled: {
        '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
            marginTop: '64px',
            height: 'calc(100% - 64px)',
            borderRight: '1px solid #e2e8f0',
            boxShadow: '4px 0 20px rgba(0,0,0,0.1)',
            background: 'linear-gradient(180deg, #fafafa 0%, #ffffff 100%)',
        },
    },
}