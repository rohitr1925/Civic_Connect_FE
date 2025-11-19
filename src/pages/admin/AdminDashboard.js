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
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppBar } from '../../components/styles';
import Logout from '../Logout';
import SideBar from './SideBar';
import AdminProfile from './AdminProfile';
import AdminHomePage from './AdminHomePage';
import CivicCalendar from '../../components/CivicCalendar';
import AddStudent from './studentRelated/AddStudent';
import SeeComplains from './studentRelated/SeeComplains';
import ShowStudents from './studentRelated/ShowStudents';
import StudentAttendance from './studentRelated/StudentAttendance';
import StudentExamMarks from './studentRelated/StudentExamMarks';
import ViewStudent from './studentRelated/ViewStudent';

import AddNotice from './noticeRelated/AddNotice';
import ShowNotices from './noticeRelated/ShowNotices';

import ShowSubjects from './subjectRelated/ShowSubjects';
import SubjectForm from './subjectRelated/SubjectForm';
import ViewSubject from './subjectRelated/ViewSubject';

import AddTeacher from './teacherRelated/AddTeacher';
import ChooseClass from './teacherRelated/ChooseClass';
import ChooseSubject from './teacherRelated/ChooseSubject';
import ShowTeachers from './teacherRelated/ShowTeachers';
import TeacherDetails from './teacherRelated/TeacherDetails';

import AddClass from './classRelated/AddClass';
import ClassDetails from './classRelated/ClassDetails';
import ShowClasses from './classRelated/ShowClasses';
import AccountMenu from '../../components/AccountMenu';
import CreatePoll from '../../components/poll';

const AdminDashboard = () => {
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
                                    Admin Dashboard
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
                        <SideBar open={false} toggleDrawer={toggleDrawer} miniVersion={true} />
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
                        <SideBar open={open} toggleDrawer={toggleDrawer} miniVersion={false} />
                    </List>
                </Drawer>
                <Box component="main" sx={styles.boxStyled}>
                    <Routes>
                        <Route path="/" element={<AdminHomePage />} />
                        <Route path='*' element={<Navigate to="/" />} />
                        <Route path="/Admin/dashboard" element={<AdminHomePage />} />
                        <Route path="/Admin/profile" element={<AdminProfile />} />
                        <Route path="/Admin/complains" element={<SeeComplains />} />

                        {/* Notice */}
                        <Route path="/Admin/addnotice" element={<AddNotice />} />
                        <Route path="/Admin/notices" element={<ShowNotices />} />

                        {/* Subject */}
                        <Route path="/Admin/events" element={<ShowSubjects />} />
                        <Route path="/Admin/events/subject/:classID/:subjectID" element={<ViewSubject />} />
                        <Route path="/Admin/events/choosecommunity" element={<ChooseClass situation="Subject" />} />

                        <Route path="/Admin/addevent/:id" element={<SubjectForm />} />
                        <Route path="/Admin/community/event/:classID/:subjectID" element={<ViewSubject />} />

                        <Route path="/Admin/subject/student/attendance/:studentID/:subjectID" element={<StudentAttendance situation="Subject" />} />
                        <Route path="/Admin/subject/student/marks/:studentID/:subjectID" element={<StudentExamMarks situation="Subject" />} />

                        {/* Class */}
                        <Route path="/Admin/addcommunity" element={<AddClass />} />
                        <Route path="/Admin/communities" element={<ShowClasses />} />
                        <Route path="/Admin/communities/community/:id" element={<ClassDetails />} />
                        <Route path="/Admin/community/addcitizens/:id" element={<AddStudent situation="Class" />} />

                        {/* Student */}
                        <Route path="/Admin/addcitizens" element={<AddStudent situation="Student" />} />
                        <Route path="/Admin/citizens" element={<ShowStudents />} />
                        <Route path="/Admin/citizens/citizen/:id" element={<ViewStudent />} />
                        <Route path="/Admin/citizens/citizen/attendance/:id" element={<StudentAttendance situation="Student" />} />
                        <Route path="/Admin/citizens/citizen/marks/:id" element={<StudentExamMarks situation="Student" />} />

                        {/* Teacher */}
                        <Route path="/Admin/leaders" element={<ShowTeachers />} />
                        <Route path="/Admin/leaders/leader/:id" element={<TeacherDetails />} />
                        <Route path="/Admin/leaders/choosecommunity" element={<ChooseClass situation="Teacher" />} />
                        <Route path="/Admin/leaders/chooseevent/:id" element={<ChooseSubject situation="Norm" />} />
                        <Route path="/Admin/leaders/chooseevent/:classID/:teacherID" element={<ChooseSubject situation="Teacher" />} />
                        <Route path="/Admin/leaders/addleader/:id" element={<AddTeacher />} />
                        <Route path="/Admin/calendar" element={<CivicCalendar />} />
                        <Route path="/Admin/poll" element={<CreatePoll />} />
   
                        <Route path="/logout" element={<Logout />} />
                    </Routes>
                </Box>
            </Box>
        </>
    );
}

export default AdminDashboard

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
        marginLeft: '72px', // Space for mini drawer
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