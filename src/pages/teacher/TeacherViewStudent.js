import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Collapse, Table, TableBody, TableHead, Typography, Tab, Container, Grid, Fade, Paper } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { KeyboardArrowDown, KeyboardArrowUp, ArrowBack as ArrowBackIcon, Person as PersonIcon, Badge as BadgeIcon, Group as GroupIcon, School as SchoolIcon } from '@mui/icons-material';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';
import { PurpleButton } from '../../components/buttonStyles';
import { StyledTableCell, StyledTableRow } from '../../components/styles';

const TeacherViewStudent = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { currentUser, userDetails, response, loading, error } = useSelector((state) => state.user);

    const address = "Student";
    const studentID = params.id;
    const teachSubject = currentUser.teachSubject?.subName;
    useEffect(() => {
        dispatch(getUserDetails(studentID, address));
    }, [dispatch, studentID]);

    const [sclassName, setSclassName] = useState('');
    const [studentSchool, setStudentSchool] = useState('');
    const [subjectMarks, setSubjectMarks] = useState('');
    const [subjectAttendance, setSubjectAttendance] = useState([]);
    const [openStates, setOpenStates] = useState({});
    const [tabValue, setTabValue] = useState('1');

    useEffect(() => {
        if (userDetails) {
            setSclassName(userDetails.sclassName || '');
            setStudentSchool(userDetails.school || '');
            setSubjectMarks(userDetails.examResult || '');
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    const handleOpen = (subId) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [subId]: !prevState[subId],
        }));
    };

    const getAttendancepercent = (attendanceDetails) => {
        let total = attendanceDetails?.length;
        let present = (attendanceDetails?.filter((attend) => attend.status === 'Present'))?.length;
        return total ? (present * 100) / total : 0;
    };
    const overallAttendancePercentage = getAttendancepercent(userDetails.attendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;
    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    // Details Card
    const DetailsSection = () => (
        <Fade in timeout={500}>
            <Box className="studentDetailsCard">
                <Box className="studentHeader">
                    <Box className="avatarBadge">
                        {userDetails?.name?.charAt(0)?.toUpperCase()}
                    </Box>
                    <h1 className="studentName">{userDetails?.name}</h1>
                    <span className="studentRole">Citizen</span>
                </Box>
                <Grid container spacing={0}>
                    <Grid item xs={12} md={6}>
                        <Box className="infoGrid">
                            <Box className="infoCard">
                                <Box className="infoIcon"><PersonIcon /></Box>
                                <Box className="infoContent">
                                    <p className="infoLabel">Full Name</p>
                                    <p className="infoValue">{userDetails?.name || 'N/A'}</p>
                                </Box>
                            </Box>
                            <Box className="infoCard">
                                <Box className="infoIcon"><BadgeIcon /></Box>
                                <Box className="infoContent">
                                    <p className="infoLabel">Citizen ID</p>
                                    <p className="infoValue">{userDetails?.rollNum || 'N/A'}</p>
                                </Box>
                            </Box>
                            <Box className="infoCard">
                                <Box className="infoIcon"><GroupIcon /></Box>
                                <Box className="infoContent">
                                    <p className="infoLabel">Community</p>
                                    <p className="infoValue">{sclassName?.sclassName || 'N/A'}</p>
                                </Box>
                            </Box>
                            <Box className="infoCard">
                                <Box className="infoIcon"><SchoolIcon /></Box>
                                <Box className="infoContent">
                                    <p className="infoLabel">GEO ID</p>
                                    <p className="infoValue">{studentSchool?.schoolName || 'N/A'}</p>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ? (
                            <Box className="chartWrapper">
                                <Box sx={{ width: 220 }}>
                                    <CustomPieChart data={chartData} />
                                </Box>
                                <Box className="legendBox">
                                    <Box className="legendItem">
                                        <Box className="legendColor" sx={{ bgcolor: '#4caf50' }} />
                                        <Typography variant="caption">Present</Typography>
                                    </Box>
                                    <Box className="legendItem">
                                        <Box className="legendColor" sx={{ bgcolor: '#f44336' }} />
                                        <Typography variant="caption">Absent</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 200 }}>
                                <Typography variant="body2" color="textSecondary">No attendance data</Typography>
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Fade>
    );

    // Attendance Tab
    const AttendanceSection = () => (
        <Box sx={{ mt: 2 }}>
            {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ? (
                Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { present, allData, subId, sessions }], index) => {
                    if (subName === teachSubject) {
                        const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
                        return (
                            <Table key={index}>
                                <TableHead>
                                    <StyledTableRow>
                                        <StyledTableCell>Event</StyledTableCell>
                                        <StyledTableCell>Present</StyledTableCell>
                                        <StyledTableCell>Total Events</StyledTableCell>
                                        <StyledTableCell>Attendance Percentage</StyledTableCell>
                                        <StyledTableCell align="center">Actions</StyledTableCell>
                                    </StyledTableRow>
                                </TableHead>
                                <TableBody>
                                    <StyledTableRow>
                                        <StyledTableCell>{subName}</StyledTableCell>
                                        <StyledTableCell>{present}</StyledTableCell>
                                        <StyledTableCell>{sessions}</StyledTableCell>
                                        <StyledTableCell>{subjectAttendancePercentage}%</StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Button variant="contained" onClick={() => handleOpen(subId)}>
                                                {openStates[subId] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}Details
                                            </Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                            <Collapse in={openStates[subId]} timeout="auto" unmountOnExit>
                                                <Box sx={{ margin: 1 }}>
                                                    <Typography variant="h6" gutterBottom component="div">
                                                        Attendance Details
                                                    </Typography>
                                                    <Table size="small" aria-label="purchases">
                                                        <TableHead>
                                                            <StyledTableRow>
                                                                <StyledTableCell>Date</StyledTableCell>
                                                                <StyledTableCell align="right">Status</StyledTableCell>
                                                            </StyledTableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {allData.map((data, idx) => {
                                                                const date = new Date(data.date);
                                                                const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
                                                                return (
                                                                    <StyledTableRow key={idx}>
                                                                        <StyledTableCell component="th" scope="row">{dateString}</StyledTableCell>
                                                                        <StyledTableCell align="right">{data.status}</StyledTableCell>
                                                                    </StyledTableRow>
                                                                );
                                                            })}
                                                        </TableBody>
                                                    </Table>
                                                </Box>
                                            </Collapse>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                </TableBody>
                            </Table>
                        );
                    }
                    return null;
                })
            ) : (
                <Button
                    variant="contained"
                    onClick={() => navigate(`/Leader/community/citizen/attendance/${studentID}`)}
                >
                    Add Attendance
                </Button>
            )}
            <Box sx={{ mt: 2 }}>
                Overall Attendance Percentage: {overallAttendancePercentage.toFixed(2)}%
            </Box>
        </Box>
    );

    // Score Tab (if needed, can be expanded)
    const ScoreSection = () => (
        <Box sx={{ mt: 2 }}>
            <Typography variant="body2">Score details can be added here.</Typography>
        </Box>
    );

    // Styles injection (from admin ViewStudent)
    useEffect(() => {
        const styleEl = document.createElement('style');
        styleEl.textContent = `
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
          :root{
            --bg-soft:#f3f6fa;
            --panel-bg:#ffffff;
            --border:#e2e8f0;
            --text-dark:#1a202c;
            --text-mid:#4a5568;
            --text-light:#718096;
            --primary:#0a78ff;
            --accent:#07b389;
            --radius-lg:20px;
            --shadow-sm:0 2px 8px rgba(30,45,60,0.06);
            --shadow-md:0 4px 16px rgba(25,40,60,0.08);
            --shadow-lg:0 8px 28px rgba(25,40,60,0.12);
          }
          * { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important; box-sizing: border-box; }
          .studentViewWrap {
            background: linear-gradient(135deg, #f0f7ff 0%, #e8f2ff 50%, #f3f6fa 100%) fixed;
            min-height:100vh;
            padding-top:80px;
          }
          .backButtonFixed {
            position:fixed;
            top:90px;
            left:2rem;
            z-index:1100;
            background:#f9fbfc;
            border:1px solid var(--border);
            width:40px; height:40px;
            border-radius:12px;
            display:flex; align-items:center; justify-content:center;
            cursor:pointer; transition:all .2s ease; color:var(--text-mid);
          }
          .backButtonFixed:hover { background:var(--primary); color:#fff; transform:translateX(-3px); }
          .tabsHeaderFixed {
            position:fixed;
            top:0;
            left:0;
            right:0;
            z-index:1000;
            background:linear-gradient(135deg,#fafcff 0%, #f5f9ff 100%);
            border-bottom:1px solid var(--border);
            box-shadow:var(--shadow-sm);
          }
          .tabsHeaderFixed .MuiTab-root {
            font-weight:700;
            letter-spacing:.4px;
            text-transform:none;
            font-size:.85rem;
            padding:.9rem 1.35rem;
            min-height:48px;
          }
          .tabsHeaderFixed .MuiTab-root.Mui-selected {
            color:var(--primary);
          }
          .studentDetailsCard {
            background:var(--panel-bg);
            border:1px solid var(--border);
            border-radius:18px;
            box-shadow:var(--shadow-md);
            overflow:hidden;
            animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          }
          @keyframes slideUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
          .studentHeader {
            background:linear-gradient(135deg,#fafcff 0%, #f5f9ff 100%);
            padding:2rem;
            text-align:center;
            border-bottom:1px solid var(--border);
          }
          .avatarBadge {
            width:100px; height:100px; border-radius:50%;
            background:linear-gradient(135deg,var(--primary),var(--accent));
            display:flex; align-items:center; justify-content:center;
            margin:0 auto 1rem;
            box-shadow:0 12px 35px -10px rgba(10,120,255,.45);
            color:#fff; font-size:2.5rem; font-weight:900; border:4px solid #fff;
          }
          .studentName {
            font-size:1.75rem; font-weight:900; color:var(--text-dark);
            margin:0 0 .5rem; letter-spacing:-.6px;
          }
          .studentRole {
            font-size:.85rem; color:var(--text-mid); font-weight:700; letter-spacing:.6px;
            text-transform:uppercase; background:linear-gradient(135deg,#e8f2ff,#f0f7ff);
            padding:.4rem 1rem; border-radius:10px; display:inline-block;
          }
          .infoGrid { display:grid; gap:1rem; grid-template-columns:repeat(auto-fit,minmax(250px,1fr)); padding:2rem; }
          .infoCard {
            background:linear-gradient(135deg, #f9fbfe 0%, #f3f7fc 100%);
            border:1px solid var(--border);
            border-radius:14px;
            padding:1.2rem;
            display:flex; align-items:center; gap:.9rem;
            transition:all .25s ease;
          }
          .infoCard:hover { transform:translateY(-3px); box-shadow:var(--shadow-md); border-color:var(--primary); }
          .infoIcon {
            width:48px; height:48px; border-radius:12px;
            background:linear-gradient(135deg,#e8f2ff,#f0f7ff);
            display:flex; align-items:center; justify-content:center;
            color:var(--primary); flex-shrink:0; font-size:1.3rem;
          }
          .infoContent { flex:1; min-width:0; }
          .infoLabel {
            font-size:.7rem; color:var(--text-light); font-weight:800; text-transform:uppercase;
            letter-spacing:.7px; margin-bottom:.2rem;
          }
          .infoValue {
            font-size:.95rem; color:var(--text-dark); font-weight:800; letter-spacing:-.2px;
            overflow:hidden; text-overflow:ellipsis; white-space:nowrap;
          }
          .chartWrapper {
            display:flex; flex-direction:column; align-items:center; gap:.8rem;
            padding:1.5rem;
          }
          .legendBox {
            display:flex; gap:1.5rem;
          }
          .legendItem {
            display:flex; align-items:center; gap:.4rem;
          }
          .legendColor {
            width:12px; height:12px; border-radius:3px;
          }
          @media (max-width:768px){
            .studentViewWrap { padding-top:70px; }
            .backButtonFixed { top:80px; left:1rem; }
            .infoGrid { grid-template-columns:1fr; padding:1.5rem; }
            .studentHeader { padding:1.5rem; }
            .avatarBadge { width:80px; height:80px; font-size:2rem; }
            .studentName { font-size:1.5rem; }
          }
        `;
        document.head.appendChild(styleEl);
        return () => styleEl.remove();
    }, []);

    return (
        <>
            {loading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
                    <Box sx={{ fontSize: '2rem' }}>Loading...</Box>
                </Box>
            ) : (
                <Box className="studentViewWrap">
                    <button 
                        className="backButtonFixed"
                        onClick={() => navigate(-1)}
                        aria-label="Go back"
                    >
                        <ArrowBackIcon />
                    </button>
                    <TabContext value={tabValue}>
                        <Box className="tabsHeaderFixed">
                            <TabList onChange={(_e, nv) => setTabValue(nv)} centered>
                                <Tab label="Details" value="1" />
                                <Tab label="Attendance" value="2" />
                                <Tab label="Score" value="3" />
                            </TabList>
                        </Box>
                        <Container sx={{ pt: 2, pb: 4 }}>
                            <TabPanel value="1">
                                <DetailsSection />
                            </TabPanel>
                            <TabPanel value="2">
                                <AttendanceSection />
                            </TabPanel>
                            <TabPanel value="3">
                                <ScoreSection />
                            </TabPanel>
                        </Container>
                    </TabContext>
                </Box>
            )}
        </>
    );
};

export default TeacherViewStudent;