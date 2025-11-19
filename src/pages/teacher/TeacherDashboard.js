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
import TeacherSideBar from './TeacherSideBar';
import { Navigate, Route, Routes } from 'react-router-dom';
import Logout from '../Logout'
import AccountMenu from '../../components/AccountMenu';
import { AppBar } from '../../components/styles';
import StudentAttendance from '../admin/studentRelated/StudentAttendance';

import TeacherClassDetails from './TeacherClassDetails';
import CreatePoll from '../../components/poll';
import AddStudent from '../admin/studentRelated/AddStudent';
import TeacherComplain from './TeacherComplain';
import TeacherHomePage from './TeacherHomePage';
import TeacherProfile from './TeacherProfile';
import TeacherViewStudent from './TeacherViewStudent';
import StudentExamMarks from '../admin/studentRelated/StudentExamMarks';

const TeacherDashboard = () => {
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => setOpen(!open);

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
                            sx={{ marginRight: '36px' }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
                            <Box sx={styles.navBrandIcon}>
                                <AccountBalanceIcon sx={{ fontSize: '1.5rem' }} />
                            </Box>
                            <Box>
                                <Typography component='h1' variant='h6' color='inherit' sx={{
                                    fontFamily: 'Inter, sans-serif',
                                    fontWeight: 800,
                                    letterSpacing: '0.5px',
                                    lineHeight: 1.2,
                                    fontSize: '1.1rem'
                                }}>Civic Connect</Typography>
                                <Typography variant='caption' color='inherit' sx={{
                                    fontFamily: 'Inter, sans-serif',
                                    fontWeight: 500,
                                    letterSpacing: '0.8px',
                                    opacity: 0.9,
                                    fontSize: '0.7rem',
                                    textTransform: 'uppercase'
                                }}>Leader Dashboard</Typography>
                            </Box>
                        </Box>
                        <AccountMenu />
                    </Toolbar>
                </AppBar>

                {/* Mini Drawer */}
                <Drawer variant="permanent" sx={styles.miniDrawerStyled}>
                    <List component="nav" sx={{ paddingTop: 0 }}>
                        <TeacherSideBar open={false} toggleDrawer={toggleDrawer} miniVersion={true} />
                    </List>
                </Drawer>

                {/* Full Drawer */}
                <Drawer
                    variant="temporary"
                    anchor="left"
                    open={open}
                    onClose={toggleDrawer}
                    ModalProps={{ keepMounted: true }}
                    sx={styles.drawerStyled}
                >
                    <List component="nav" sx={{ width: 280, paddingTop: 0 }}>
                        <TeacherSideBar open={open} toggleDrawer={toggleDrawer} miniVersion={false} />
                    </List>
                </Drawer>

                <Box component="main" sx={styles.boxStyled}>
                    <Routes>
                        <Route path="/" element={<TeacherHomePage />} />
                        <Route path='*' element={<Navigate to="/" />} />
                        <Route path="/Leader/dashboard" element={<TeacherHomePage />} />
                        <Route path="/Leader/profile" element={<TeacherProfile />} />

                        <Route path="/Leader/complain" element={<TeacherComplain />} />

                        <Route path="/Leader/community" element={<TeacherClassDetails />} />
                        <Route path="/Leader/poll" element={<CreatePoll mode="teacher" />} />
                        <Route path="/Leader/addcitizens/:id" element={<AddStudent situation="Class" />} />
                        <Route path="/Leader/community/citizen/:id" element={<TeacherViewStudent />} />

                        <Route path="/Leader/community/citizen/attendance/:studentID" element={<StudentAttendance situation="Subject" />} />
                        <Route path="/Leader/community/citizen/marks/:studentID" element={<StudentExamMarks situation="Subject" />} />
                        <Route path="/calendar" element={<CivicCalendar />} />

                        <Route path="/logout" element={<Logout />} />
                    </Routes>
                </Box>
            </Box>
        </>
    );
}

export default TeacherDashboard

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