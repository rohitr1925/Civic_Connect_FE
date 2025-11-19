import React, { useEffect, useState } from 'react'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Box, Button, Collapse, Table, TableBody, TableHead, Typography, TableCell, TableRow, Fade, CircularProgress, Paper, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { groupAttendanceBySubject } from '../../components/attendanceCalculator';

// Chart components removed
import TableChartIcon from '@mui/icons-material/TableChart';
import EventIcon from '@mui/icons-material/Event';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
const ViewStdAttendance = () => {
    const dispatch = useDispatch();
    const [openStates, setOpenStates] = useState({});

    const handleOpen = (subId) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [subId]: !prevState[subId],
        }));
    };

    const { userDetails, currentUser, loading /*, response, error */ } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
    }, [dispatch, currentUser._id]);

    // Optionally handle response/error states (removed console logs for production cleanliness)
    // if (response) { /* handle success */ }
    // else if (error) { /* handle error */ }

    const [subjectAttendance, setSubjectAttendance] = useState([]);
    // Removed chart/tab selection state

    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails])

    const attendanceBySubject = groupAttendanceBySubject(subjectAttendance)


    // Chart data calculation removed (no longer used)

    // handleSectionChange removed
    const getAttendancepercent = (attendanceDetails)=>{
        let total = attendanceDetails?.length
        let present = (attendanceDetails?.filter((attend)=>{
            if(attend.status==='Present')return true
            return false
        }))?.length
        return present*100/total;
    }
    const overallAttendancePercentage = getAttendancepercent(userDetails.attendance);

    const getSubjectattendance = (attendanceDetails, subject)=>{
        const subjectAttendanceList = attendanceDetails.filter((attendance)=>{
            if (attendance.subName.subName === subject) return true;
            return false;
        })
        if (subjectAttendanceList.length===0) return 0;
        return getAttendancepercent(subjectAttendanceList);
    }
    const getTotalSubjects = (attendanceDetails, subject)=>{
        let subjectAttendanceList = attendanceDetails.filter((attendance)=>{
            if (attendance.subName.subName === subject)return true;
            return false
        })
        return subjectAttendanceList.length
    }
    const renderTableSection = () => {
        return (
            <>
                <Grid container spacing={2} sx={{ mb:3 }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper elevation={0} sx={{
                            p:2,
                            background:'#fff',
                            borderRadius:'16px',
                            border:'2px solid #e2e8f0',
                            position:'relative',
                            overflow:'hidden',
                            transition:'all .3s',
                            display:'flex',
                            alignItems:'center',
                            gap:2,
                            '&::before': {
                                content:'""',
                                position:'absolute',
                                top:0,
                                left:0,
                                right:0,
                                height:'4px',
                                background:'linear-gradient(90deg,#0a78ff,#4a9eff)'
                            },
                            '&:hover': {
                                transform:'translateY(-4px)',
                                borderColor:'#0a78ff',
                                boxShadow:'0 12px 28px -8px rgba(0,0,0,0.15)'
                            }
                        }}>
                            <Box sx={{
                                width:54,
                                height:54,
                                borderRadius:'14px',
                                background:'#f1f5f9',
                                display:'flex',
                                alignItems:'center',
                                justifyContent:'center'
                            }}>
                                <EventIcon sx={{ fontSize:'1.6rem', color:'#0a78ff' }} />
                            </Box>
                            <Box>
                                <Typography sx={{ fontFamily:'Inter,sans-serif', fontSize:'.65rem', fontWeight:700, letterSpacing:'.7px', textTransform:'uppercase', color:'#64748b' }}>
                                    Total Events
                                </Typography>
                                <Typography sx={{ fontFamily:'Inter,sans-serif', fontSize:'1.85rem', fontWeight:800, letterSpacing:'-0.6px', color:'#1a202c', mt:.25 }}>
                                    {Object.keys(attendanceBySubject).length}
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper elevation={0} sx={{
                            p:2,
                            background:'#fff',
                            borderRadius:'16px',
                            border:'2px solid #e2e8f0',
                            position:'relative',
                            overflow:'hidden',
                            transition:'all .3s',
                            display:'flex',
                            alignItems:'center',
                            gap:2,
                            '&::before': {
                                content:'""',
                                position:'absolute',
                                top:0,
                                left:0,
                                right:0,
                                height:'4px',
                                background:'linear-gradient(90deg,#07b389,#3fcf9d)'
                            },
                            '&:hover': {
                                transform:'translateY(-4px)',
                                borderColor:'#07b389',
                                boxShadow:'0 12px 28px -8px rgba(0,0,0,0.15)'
                            }
                        }}>
                            <Box sx={{
                                width:54,
                                height:54,
                                borderRadius:'14px',
                                background:'#f1f5f9',
                                display:'flex',
                                alignItems:'center',
                                justifyContent:'center'
                            }}>
                                <CheckCircleIcon sx={{ fontSize:'1.6rem', color:'#07b389' }} />
                            </Box>
                            <Box>
                                <Typography sx={{ fontFamily:'Inter,sans-serif', fontSize:'.65rem', fontWeight:700, letterSpacing:'.7px', textTransform:'uppercase', color:'#64748b' }}>
                                    Total Present
                                </Typography>
                                <Typography sx={{ fontFamily:'Inter,sans-serif', fontSize:'1.85rem', fontWeight:800, letterSpacing:'-0.6px', color:'#1a202c', mt:.25 }}>
                                    {subjectAttendance.filter(a => a.status === 'Present').length}
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper elevation={0} sx={{
                            p:2,
                            background:'#fff',
                            borderRadius:'16px',
                            border:'2px solid #e2e8f0',
                            position:'relative',
                            overflow:'hidden',
                            transition:'all .3s',
                            display:'flex',
                            alignItems:'center',
                            gap:2,
                            '&::before': {
                                content:'""',
                                position:'absolute',
                                top:0,
                                left:0,
                                right:0,
                                height:'4px',
                                background:'linear-gradient(90deg,#ef4444,#f87171)'
                            },
                            '&:hover': {
                                transform:'translateY(-4px)',
                                borderColor:'#ef4444',
                                boxShadow:'0 12px 28px -8px rgba(0,0,0,0.15)'
                            }
                        }}>
                            <Box sx={{
                                width:54,
                                height:54,
                                borderRadius:'14px',
                                background:'#f1f5f9',
                                display:'flex',
                                alignItems:'center',
                                justifyContent:'center'
                            }}>
                                <CancelIcon sx={{ fontSize:'1.6rem', color:'#ef4444' }} />
                            </Box>
                            <Box>
                                <Typography sx={{ fontFamily:'Inter,sans-serif', fontSize:'.65rem', fontWeight:700, letterSpacing:'.7px', textTransform:'uppercase', color:'#64748b' }}>
                                    Total Absent
                                </Typography>
                                <Typography sx={{ fontFamily:'Inter,sans-serif', fontSize:'1.85rem', fontWeight:800, letterSpacing:'-0.6px', color:'#1a202c', mt:.25 }}>
                                    {subjectAttendance.filter(a => a.status === 'Absent').length}
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper elevation={0} sx={{
                            p:2,
                            background:'#fff',
                            borderRadius:'16px',
                            border:'2px solid #e2e8f0',
                            position:'relative',
                            overflow:'hidden',
                            transition:'all .3s',
                            display:'flex',
                            alignItems:'center',
                            gap:2,
                            '&::before': {
                                content:'""',
                                position:'absolute',
                                top:0,
                                left:0,
                                right:0,
                                height:'4px',
                                background: overallAttendancePercentage >= 75 ? 'linear-gradient(90deg,#07b389,#3fcf9d)' : overallAttendancePercentage >= 50 ? 'linear-gradient(90deg,#f59e0b,#fbbf24)' : 'linear-gradient(90deg,#ef4444,#f87171)'
                            },
                            '&:hover': {
                                transform:'translateY(-4px)',
                                borderColor: overallAttendancePercentage >= 75 ? '#07b389' : overallAttendancePercentage >= 50 ? '#f59e0b' : '#ef4444',
                                boxShadow:'0 12px 28px -8px rgba(0,0,0,0.15)'
                            }
                        }}>
                            <Box sx={{
                                width:54,
                                height:54,
                                borderRadius:'14px',
                                background:'#f1f5f9',
                                display:'flex',
                                alignItems:'center',
                                justifyContent:'center'
                            }}>
                                <TrendingUpIcon sx={{ fontSize:'1.6rem', color: overallAttendancePercentage >= 75 ? '#07b389' : overallAttendancePercentage >= 50 ? '#f59e0b' : '#ef4444' }} />
                            </Box>
                            <Box>
                                <Typography sx={{ fontFamily:'Inter,sans-serif', fontSize:'.65rem', fontWeight:700, letterSpacing:'.7px', textTransform:'uppercase', color:'#64748b' }}>
                                    Overall %
                                </Typography>
                                <Typography sx={{ fontFamily:'Inter,sans-serif', fontSize:'1.85rem', fontWeight:800, letterSpacing:'-0.6px', color:'#1a202c', mt:.25 }}>
                                    {overallAttendancePercentage.toFixed(1)}%
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>

                <Box sx={{ 
                    height:'2px', 
                    background:'linear-gradient(90deg, #e2e8f0 0%, #cbd5e1 50%, #e2e8f0 100%)',
                    my:4,
                    borderRadius:'2px'
                }} />

                <Box sx={{ display:'flex', alignItems:'center', gap:2, mb:3, mt:1, flexWrap:'wrap' }}>
                    <Box sx={{
                        width:56,
                        height:56,
                        borderRadius:'16px',
                        background:'linear-gradient(135deg,#0a78ff 0%, #07b389 100%)',
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center',
                        color:'#fff',
                        boxShadow:'0 10px 24px -6px rgba(10,120,255,.45)'
                    }}>
                        <TableChartIcon sx={{ fontSize:'1.8rem' }} />
                    </Box>
                    <Box sx={{ flex:1, minWidth:'220px' }}>
                        <Typography sx={{ fontFamily:'Inter,sans-serif', fontWeight:900, fontSize:'1.6rem', letterSpacing:'-0.7px', lineHeight:1.1, color:'#1a202c', m:0 }}>Event-wise Attendance</Typography>
                        <Typography sx={{ fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:'0.7rem', textTransform:'uppercase', letterSpacing:'1px', color:'#4a5568' }}>Detailed Participation Breakdown</Typography>
                    </Box>
                </Box>

                <Paper elevation={0} sx={{
                    width:'100%',
                    overflow:'hidden',
                    borderRadius:'16px',
                    border:'2px solid #e2e8f0',
                    '& .MuiTable-root': {
                        borderCollapse:'separate',
                        borderSpacing:'0 6px'
                    },
                    '& .MuiTableHead-root .MuiTableRow-root': {
                        background:'linear-gradient(135deg, #f8fafc 0%, #eef2f7 100%)'
                    },
                    '& .MuiTableCell-head': {
                        fontFamily:'Inter,sans-serif',
                        fontWeight:800,
                        fontSize:'.7rem',
                        color:'#475569',
                        letterSpacing:'.8px',
                        textTransform:'uppercase',
                        border:'none',
                        py:2,
                        px:2.5,
                        borderBottom:'2px solid #e2e8f0'
                    },
                    '& .MuiTableCell-body': {
                        fontFamily:'Inter,sans-serif',
                        fontWeight:600,
                        fontSize:'.9rem',
                        color:'#334155',
                        border:'none',
                        py:2,
                        px:2.5,
                        background:'#fff',
                        borderBottom:'1px solid #f1f5f9'
                    },
                    '& .MuiTableBody-root .MuiTableRow-root:hover .MuiTableCell-body': {
                        background:'#fafcff'
                    }
                }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Event</TableCell>
                                <TableCell>Present</TableCell>
                                <TableCell>Total Sessions</TableCell>
                                <TableCell>Attendance %</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.entries(attendanceBySubject).map(([subName, { present, allData, subId, sessions }], index) => {
                                const subjectAttendancePercentage = getSubjectattendance(userDetails.attendance, subName);
                                const totalSubjects = getTotalSubjects(userDetails.attendance, subName);

                                return (
                                    <React.Fragment key={index}>
                                        <TableRow>
                                            <TableCell>
                                                <Box sx={{ display:'flex', alignItems:'center', gap:1.2 }}>
                                                    <Box sx={{
                                                        width:46,
                                                        height:46,
                                                        borderRadius:'12px',
                                                        background:'#f1f5f9',
                                                        display:'flex',
                                                        alignItems:'center',
                                                        justifyContent:'center'
                                                    }}>
                                                        <EventIcon sx={{ fontSize: '1.4rem' }} />
                                                    </Box>
                                                    <Typography sx={{ fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:'.9rem' }}>
                                                        {subName}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{
                                                    display:'inline-flex',
                                                    alignItems:'center',
                                                    gap:.5,
                                                    padding:'.55rem 1rem',
                                                    borderRadius:'10px',
                                                    background:'#d4f4e8',
                                                    color:'#067a5f',
                                                    fontSize:'.75rem',
                                                    fontWeight:700,
                                                    fontFamily:'Inter,sans-serif',
                                                    letterSpacing:'.4px'
                                                }}>
                                                    <CheckCircleIcon sx={{ fontSize: '1.05rem' }} />
                                                    {present}
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{
                                                    display:'inline-flex',
                                                    alignItems:'center',
                                                    gap:.5,
                                                    padding:'.55rem 1rem',
                                                    borderRadius:'10px',
                                                    background:'#e0f1ff',
                                                    color:'#085da8',
                                                    fontSize:'.75rem',
                                                    fontWeight:700,
                                                    fontFamily:'Inter,sans-serif',
                                                    letterSpacing:'.4px'
                                                }}>
                                                    <CalendarMonthIcon sx={{ fontSize: '1.05rem' }} />
                                                    {totalSubjects}
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{
                                                    display:'inline-flex',
                                                    alignItems:'center',
                                                    gap:.5,
                                                    padding:'.6rem 1.1rem',
                                                    borderRadius:'12px',
                                                    fontWeight:800,
                                                    fontSize:'.85rem',
                                                    fontFamily:'Inter,sans-serif',
                                                    background: subjectAttendancePercentage >= 75 ? '#d4f4e8' : subjectAttendancePercentage >= 50 ? '#fff3cd' : '#fee2e2',
                                                    color: subjectAttendancePercentage >= 75 ? '#067a5f' : subjectAttendancePercentage >= 50 ? '#b45309' : '#b91c1c'
                                                }}>
                                                    <TrendingUpIcon sx={{ fontSize: '1.2rem' }} />
                                                    {subjectAttendancePercentage.toFixed(1)}%
                                                </Box>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button 
                                                    sx={{
                                                        background:'#0a78ff',
                                                        color:'#fff',
                                                        borderRadius:'10px',
                                                        textTransform:'none',
                                                        fontWeight:700,
                                                        fontSize:'.75rem',
                                                        fontFamily:'Inter,sans-serif',
                                                        py:.7,
                                                        px:1.4,
                                                        '&:hover': {
                                                            background:'#0662db'
                                                        }
                                                    }}
                                                    aria-label={`Toggle details for ${subName}`}
                                                    onClick={() => handleOpen(subId)}
                                                    startIcon={openStates[subId] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                                >
                                                    Details
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ paddingBottom: 0, paddingTop: 0, border: 'none' }} colSpan={6}>
                                                <Collapse in={openStates[subId]} timeout="auto" unmountOnExit>
                                                    <Box sx={{
                                                        background:'#fff',
                                                        border:'2px solid #e2e8f0',
                                                        borderRadius:'16px',
                                                        p:3,
                                                        my:1.5
                                                    }}>
                                                        <Typography sx={{
                                                            fontFamily:'Inter,sans-serif',
                                                            fontSize:'1.2rem',
                                                            fontWeight:800,
                                                            letterSpacing:'-0.5px',
                                                            display:'flex',
                                                            gap:1,
                                                            alignItems:'center',
                                                            mb:2
                                                        }}>
                                                            <CalendarMonthIcon sx={{ fontSize: '1.6rem', color: '#0a78ff' }} />
                                                            Attendance Details
                                                        </Typography>
                                                        <Paper elevation={0} sx={{
                                                            border:'2px solid #e2e8f0',
                                                            borderRadius:'12px',
                                                            overflow:'hidden'
                                                        }}>
                                                            <Table>
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell sx={{
                                                                            background:'#1e293b',
                                                                            color:'#fff',
                                                                            py:1.2,
                                                                            px:2,
                                                                            fontFamily:'Inter,sans-serif',
                                                                            fontSize:'.65rem',
                                                                            fontWeight:800,
                                                                            letterSpacing:'.8px',
                                                                            textTransform:'uppercase'
                                                                        }}>Date</TableCell>
                                                                        <TableCell align="right" sx={{
                                                                            background:'#1e293b',
                                                                            color:'#fff',
                                                                            py:1.2,
                                                                            px:2,
                                                                            fontFamily:'Inter,sans-serif',
                                                                            fontSize:'.65rem',
                                                                            fontWeight:800,
                                                                            letterSpacing:'.8px',
                                                                            textTransform:'uppercase'
                                                                        }}>Status</TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {allData.map((data, idx) => {
                                                                        const date = new Date(data.date);
                                                                        const dateString = date.toString() !== "Invalid Date" ? 
                                                                            date.toISOString().substring(0, 10) : "Invalid Date";
                                                                        return (
                                                                            <TableRow key={idx}>
                                                                                <TableCell sx={{
                                                                                    py:1.2,
                                                                                    px:2,
                                                                                    fontFamily:'Inter,sans-serif',
                                                                                    fontSize:'.8rem',
                                                                                    fontWeight:600,
                                                                                    borderBottom: idx === allData.length - 1 ? 'none' : '1px solid #e2e8f0'
                                                                                }}>
                                                                                    {dateString}
                                                                                </TableCell>
                                                                                <TableCell align="right" sx={{
                                                                                    py:1.2,
                                                                                    px:2,
                                                                                    borderBottom: idx === allData.length - 1 ? 'none' : '1px solid #e2e8f0'
                                                                                }}>
                                                                                    <Box sx={{
                                                                                        display:'flex',
                                                                                        alignItems:'center',
                                                                                        gap:.5,
                                                                                        justifyContent:'flex-end',
                                                                                        fontFamily:'Inter,sans-serif',
                                                                                        fontWeight:700,
                                                                                        color: data.status === 'Present' ? '#067a5f' : '#b91c1c'
                                                                                    }}>
                                                                                        {data.status === 'Present' ? (
                                                                                            <>
                                                                                                <CheckCircleIcon sx={{ fontSize: '1.1rem' }} />
                                                                                                Present
                                                                                            </>
                                                                                        ) : (
                                                                                            <>
                                                                                                <CancelIcon sx={{ fontSize: '1.1rem' }} />
                                                                                                Absent
                                                                                            </>
                                                                                        )}
                                                                                    </Box>
                                                                                </TableCell>
                                                                            </TableRow>
                                                                        );
                                                                    })}
                                                                </TableBody>
                                                            </Table>
                                                        </Paper>
                                                    </Box>
                                                </Collapse>
                                            </TableCell>
                                        </TableRow>
                                    </React.Fragment>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>

            </>
        )
    }

    // renderChartSection removed

    return (
        <Box sx={{ minHeight:'100vh', background:'#f8fafc', py:3, px:2 }}>
            <Paper elevation={0} sx={{ 
                maxWidth:'1400px', 
                width:'100%', 
                mx:'auto', 
                background:'#ffffff', 
                borderRadius:'20px', 
                border:'2px solid #e2e8f0', 
                boxShadow:'0 2px 8px rgba(30,45,60,0.06)', 
                overflow:'hidden' 
            }}>        
                {loading ? (
                    <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'60vh', flexDirection:'column', gap:2 }}>
                        <CircularProgress size={60} thickness={4} sx={{ color: '#0a78ff' }} />
                        <Typography sx={{ fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:'0.9rem', color:'#64748b' }}>Loading attendance details...</Typography>
                    </Box>
                ) : (
                    <Fade in timeout={500}>
                        <Box>
                            <Box sx={{ p:3, background:'linear-gradient(135deg, #fafcff 0%, #f5f9ff 100%)', borderBottom:'2px solid #e2e8f0' }}>
                                <Box sx={{ display:'flex', alignItems:'center', gap:2, flexWrap:'wrap' }}>
                                    <Box
                                        sx={{
                                            width:68,
                                            height:68,
                                            borderRadius:'18px',
                                            background:'linear-gradient(135deg, #0a78ff 0%, #07b389 100%)',
                                            display:'flex',
                                            alignItems:'center',
                                            justifyContent:'center',
                                            color:'#ffffff',
                                            boxShadow:'0 10px 30px -8px rgba(10,120,255,.45)',
                                            flexShrink:0
                                        }}
                                    >
                                        <AssessmentIcon sx={{ fontSize:'2rem' }} />
                                    </Box>
                                    <Box sx={{flex:1,minWidth:'220px'}}>
                                        <Typography sx={{ 
                                            fontFamily:'Inter,sans-serif', 
                                            fontWeight:900, 
                                            fontSize:'2rem', 
                                            color:'#1a202c', 
                                            letterSpacing:'-0.8px', 
                                            lineHeight:1.1, 
                                            mb:0.5 
                                        }}>Attendance Overview</Typography>
                                        <Typography sx={{ 
                                            fontFamily:'Inter,sans-serif', 
                                            fontWeight:700, 
                                            fontSize:'.8rem', 
                                            color:'#4a5568', 
                                            letterSpacing:'1.1px', 
                                            textTransform:'uppercase' 
                                        }}>Real-time Participation Metrics</Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display:'flex',
                                            alignItems:'center',
                                            gap:1,
                                            px:2,
                                            py:1,
                                            background:'linear-gradient(135deg, #e6f8f3 0%, #d4f4ea 100%)',
                                            borderRadius:'12px',
                                            border:'1px solid #b8e8d9'
                                        }}
                                    >
                                        <TrendingUpIcon sx={{ fontSize:'1.2rem', color:'#067a5f' }} />
                                        <Typography sx={{ fontFamily:'Inter, sans-serif', fontWeight:700, fontSize:'0.75rem', color:'#067a5f', letterSpacing:'0.5px' }}>Tracking Attendance Health</Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ p:4, background:'#ffffff' }}>
                                {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ? (
                                    renderTableSection()
                                ) : (
                                    <Fade in timeout={500}>
                                        <Box sx={{
                                            textAlign:'center',
                                            py:8,
                                            px:3,
                                            background:'#f8fafc',
                                            borderRadius:'20px',
                                            border:'2px solid #e2e8f0',
                                            maxWidth:'560px',
                                            mx:'auto'
                                        }}>
                                            <Box sx={{
                                                width:80,
                                                height:80,
                                                borderRadius:'50%',
                                                background:'linear-gradient(135deg, #0a78ff 0%, #07b389 100%)',
                                                display:'flex',
                                                alignItems:'center',
                                                justifyContent:'center',
                                                mx:'auto',
                                                mb:3,
                                                color:'#fff',
                                                boxShadow:'0 10px 30px -8px rgba(10,120,255,.3)'
                                            }}>
                                                <EventIcon sx={{ fontSize: '2.5rem' }} />
                                            </Box>
                                            <Typography sx={{
                                                fontFamily:'Inter,sans-serif',
                                                fontSize:'1.7rem',
                                                fontWeight:900,
                                                letterSpacing:'-0.7px',
                                                mb:1,
                                                color:'#1a202c'
                                            }}>No Attendance Records</Typography>
                                            <Typography sx={{
                                                fontFamily:'Inter,sans-serif',
                                                fontSize:'.95rem',
                                                fontWeight:600,
                                                color:'#64748b',
                                                lineHeight:1.6
                                            }}>You currently have no attendance details to display.</Typography>
                                        </Box>
                                    </Fade>
                                )}
                                {/* Chart tab and switch options removed */}
                            </Box>
                        </Box>
                    </Fade>
                )}
            </Paper>
        </Box>
    )
}

export default ViewStdAttendance