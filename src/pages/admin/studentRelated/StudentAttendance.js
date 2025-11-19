import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserDetails } from '../../../redux/userRelated/userHandle';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { updateStudentFields } from '../../../redux/studentRelated/studentHandle';

import {
    Box, InputLabel,
    MenuItem, Select,
    Typography, Stack,
    TextField, CircularProgress, FormControl, Paper, Fade, Avatar, Chip
} from '@mui/material';
import { PurpleButton } from '../../../components/buttonStyles';
import Popup from '../../../components/Popup';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SchoolIcon from '@mui/icons-material/School';
import BadgeIcon from '@mui/icons-material/Badge';

const StudentAttendance = ({ situation }) => {
    const dispatch = useDispatch();
    const { currentUser, userDetails, loading } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);
    const { response, error, statestatus } = useSelector((state) => state.student);
    const params = useParams()

    const [studentID, setStudentID] = useState("");
    const [subjectName, setSubjectName] = useState("");
    const [chosenSubName, setChosenSubName] = useState("");
    const [status, setStatus] = useState('');
    const [date, setDate] = useState('');

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        const styleEl = document.createElement('style');
        styleEl.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
            
            * {
                font-family: 'Inter', system-ui, -apple-system, sans-serif;
            }
            
            .attendance-container {
                min-height: 100vh;
                background: linear-gradient(135deg, #f0f7ff 0%, #e8f2ff 50%, #eaf4ff 100%);
                padding: 3rem 1.5rem;
                position: relative;
            }
            
            .attendance-container::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 400px;
                background: radial-gradient(ellipse at top, rgba(10, 120, 255, 0.08) 0%, transparent 60%);
                pointer-events: none;
            }
            
            .attendance-card {
                max-width: 720px;
                margin: 0 auto;
                background: #ffffff;
                border-radius: 28px;
                box-shadow: 0 20px 60px rgba(25, 40, 60, 0.15), 0 0 1px rgba(0, 0, 0, 0.05);
                border: 1px solid rgba(226, 232, 240, 0.8);
                overflow: hidden;
                position: relative;
                backdrop-filter: blur(10px);
            }
            
            .card-header {
                background: linear-gradient(135deg, #0a78ff 0%, #0662db 50%, #065dca 100%);
                padding: 3rem 2.5rem 2.5rem;
                color: white;
                position: relative;
                overflow: hidden;
            }
            
            .card-header::before {
                content: '';
                position: absolute;
                top: -60%;
                right: -15%;
                width: 450px;
                height: 450px;
                background: radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 40%, transparent 70%);
                border-radius: 50%;
                animation: pulse 8s ease-in-out infinite;
            }
            
            .card-header::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 4px;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            }
            
            @keyframes pulse {
                0%, 100% { transform: scale(1); opacity: 0.8; }
                50% { transform: scale(1.1); opacity: 1; }
            }
            
            .header-content {
                position: relative;
                z-index: 2;
            }
            
            .citizen-info {
                display: flex;
                align-items: center;
                gap: 1.5rem;
                margin-bottom: 1.5rem;
            }
            
            .citizen-avatar {
                width: 72px !important;
                height: 72px !important;
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.15)) !important;
                border: 3px solid rgba(255, 255, 255, 0.4) !important;
                font-size: 1.65rem !important;
                font-weight: 900 !important;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.3) !important;
                backdrop-filter: blur(10px);
                letter-spacing: -1px;
            }
            
            .citizen-details {
                flex: 1;
            }
            
            .citizen-name {
                font-size: 2rem;
                font-weight: 900;
                letter-spacing: -0.8px;
                margin: 0 0 0.4rem 0;
                text-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
                line-height: 1.2;
            }
            
            .citizen-meta {
                display: flex;
                align-items: center;
                gap: 1rem;
                flex-wrap: wrap;
            }
            
            .citizen-id-badge {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                background: rgba(255, 255, 255, 0.2);
                padding: 0.5rem 1rem;
                border-radius: 10px;
                font-size: 0.85rem;
                font-weight: 700;
                letter-spacing: 0.3px;
                backdrop-filter: blur(8px);
                border: 1px solid rgba(255, 255, 255, 0.3);
            }
            
            .citizen-community-badge {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                background: rgba(7, 179, 137, 0.25);
                padding: 0.5rem 1rem;
                border-radius: 10px;
                font-size: 0.85rem;
                font-weight: 700;
                letter-spacing: 0.3px;
                backdrop-filter: blur(8px);
                border: 1px solid rgba(7, 179, 137, 0.4);
            }
            
            .event-badge {
                display: inline-flex;
                align-items: center;
                gap: 0.6rem;
                background: rgba(255, 255, 255, 0.18);
                padding: 0.75rem 1.4rem;
                border-radius: 14px;
                font-size: 1rem;
                font-weight: 700;
                backdrop-filter: blur(12px);
                border: 1px solid rgba(255, 255, 255, 0.3);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }
            
            .card-body {
                padding: 3rem 2.5rem;
                background: linear-gradient(to bottom, #ffffff 0%, #fafcfe 100%);
            }
            
            .form-title {
                font-size: 1.5rem;
                font-weight: 900;
                color: #1a202c;
                margin-bottom: 2.5rem;
                display: flex;
                align-items: center;
                gap: 0.9rem;
                letter-spacing: -0.5px;
                position: relative;
                padding-bottom: 1rem;
            }
            
            .form-title::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 60px;
                height: 4px;
                background: linear-gradient(90deg, #0a78ff, #07b389);
                border-radius: 2px;
            }
            
            .form-title-icon {
                width: 48px;
                height: 48px;
                background: linear-gradient(135deg, #e8f2ff, #d7ecff);
                border-radius: 14px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #0a78ff;
                box-shadow: 0 4px 12px rgba(10, 120, 255, 0.15);
            }
            
            .custom-form-control {
                margin-bottom: 2rem !important;
                position: relative;
            }
            
            .custom-form-control .MuiOutlinedInput-root {
                border-radius: 16px !important;
                font-weight: 600 !important;
                font-size: 1rem !important;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                background: #ffffff !important;
                border: 2px solid #e2e8f0 !important;
            }
            
            .custom-form-control .MuiOutlinedInput-root:hover {
                border-color: #cbd5e0 !important;
                background: #fafcfe !important;
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06) !important;
                transform: translateY(-1px);
            }
            
            .custom-form-control .MuiOutlinedInput-root.Mui-focused {
                border-color: #0a78ff !important;
                background: #ffffff !important;
                box-shadow: 0 0 0 4px rgba(10, 120, 255, 0.1), 0 8px 20px rgba(10, 120, 255, 0.15) !important;
                transform: translateY(-2px);
            }
            
            .custom-form-control .MuiInputLabel-root {
                font-weight: 700 !important;
                font-size: 0.95rem !important;
                color: #4a5568 !important;
                letter-spacing: 0.3px !important;
                background: white;
                padding: 0 6px;
            }
            
            .custom-form-control .MuiInputLabel-root.Mui-focused {
                color: #0a78ff !important;
                font-weight: 800 !important;
            }
            
            .status-menu-item {
                font-weight: 700 !important;
                font-size: 0.95rem !important;
                padding: 1rem 1.4rem !important;
                margin: 0.4rem 0.8rem !important;
                border-radius: 12px !important;
                transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
                display: flex !important;
                align-items: center !important;
            }
            
            .status-menu-item:hover {
                background: linear-gradient(135deg, #f0f7ff, #e8f2ff) !important;
                transform: translateX(6px) !important;
                box-shadow: 0 4px 12px rgba(10, 120, 255, 0.12) !important;
            }
            
            .status-present {
                color: #07b389 !important;
            }
            
            .status-present:hover {
                background: linear-gradient(135deg, #d4f4e8, #c0ecd9) !important;
            }
            
            .status-absent {
                color: #f44336 !important;
            }
            
            .status-absent:hover {
                background: linear-gradient(135deg, #ffebee, #ffcdd2) !important;
            }
            
            .submit-button {
                height: 58px !important;
                border-radius: 16px !important;
                font-weight: 900 !important;
                font-size: 1.05rem !important;
                text-transform: none !important;
                letter-spacing: 0.3px !important;
                background: linear-gradient(135deg, #07b389 0%, #058b65 100%) !important;
                box-shadow: 0 8px 24px rgba(7, 179, 137, 0.4) !important;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                margin-top: 2.5rem !important;
                position: relative;
                overflow: hidden;
            }
            
            .submit-button::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                transition: left 0.5s;
            }
            
            .submit-button:hover::before {
                left: 100%;
            }
            
            .submit-button:hover {
                transform: translateY(-4px) !important;
                box-shadow: 0 12px 32px rgba(7, 179, 137, 0.5) !important;
                background: linear-gradient(135deg, #058b65 0%, #046d50 100%) !important;
            }
            
            .submit-button:active {
                transform: translateY(-2px) !important;
            }
            
            .submit-button:disabled {
                background: linear-gradient(135deg, #e2e8f0, #cbd5e0) !important;
                color: #a0aec0 !important;
                box-shadow: none !important;
                transform: none !important;
            }
            
            .loading-overlay {
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                background: linear-gradient(135deg, #f0f7ff 0%, #e8f2ff 50%, #eaf4ff 100%);
            }
            
            .loading-spinner {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 2rem;
                background: white;
                padding: 3rem 4rem;
                border-radius: 24px;
                box-shadow: 0 20px 60px rgba(25, 40, 60, 0.15);
                border: 1px solid #e2e8f0;
            }
            
            .loading-text {
                font-size: 1.3rem;
                font-weight: 700;
                color: #4a5568;
                letter-spacing: 0.3px;
            }
            
            @media (max-width: 768px) {
                .attendance-container {
                    padding: 2rem 1rem;
                }
                .card-header {
                    padding: 2.5rem 1.8rem 2rem;
                }
                .citizen-name {
                    font-size: 1.6rem;
                }
                .citizen-avatar {
                    width: 60px !important;
                    height: 60px !important;
                    font-size: 1.4rem !important;
                }
                .card-body {
                    padding: 2.5rem 1.8rem;
                }
                .form-title {
                    font-size: 1.3rem;
                    margin-bottom: 2rem;
                }
                .citizen-meta {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 0.6rem;
                }
            }
        `;
        document.head.appendChild(styleEl);
        return () => styleEl.remove();
    }, []);

    useEffect(() => {
        if (situation === "Student") {
            setStudentID(params.id);
            const stdID = params.id
            dispatch(getUserDetails(stdID, "Student"));
        }
        else if (situation === "Subject") {
            const { studentID} = params
            setStudentID(studentID);
            dispatch(getUserDetails(studentID, "Student"));
        }
    }, [situation]);

    useEffect(() => {
        if (userDetails && userDetails.sclassName && situation === "Student") {
            dispatch(getSubjectList(userDetails.sclassName._id, null, "ClassSubjects"));
        }
    }, [dispatch, userDetails]);

     useEffect(() => {
        if (userDetails && userDetails.sclassName && situation === "Subject") {
            dispatch(getSubjectList(userDetails.sclassName._id, null, "ClassSubjects"));
        }
    }, [dispatch, userDetails]);


    const changeHandler = (event) => {
        const selectedSubject = subjectsList.find(
            (subject) => subject.subName === event.target.value
        );
        setSubjectName(selectedSubject.subName);
        setChosenSubName(selectedSubject._id);
    }

    const fields = { subName: chosenSubName, status, date }

    const submitHandler = (event) => {
        event.preventDefault()
        setLoader(true)
        dispatch(updateStudentFields(studentID, fields, "StudentAttendance"))
    }

    useEffect(() => {
        if (response) {
            setLoader(false)
            setShowPopup(true)
            setMessage(response)
        }
        else if (error) {
            setLoader(false)
            setShowPopup(true)
            setMessage("error")
        }
        else if (statestatus === "added") {
            setLoader(false)
            setShowPopup(true)
            setMessage("Done Successfully")
        }
    }, [response, statestatus, error])

    const getInitials = (name) => {
        if (!name) return '?';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }

    return (
        <>
            {loading ? (
                <Box className="loading-overlay">
                    <Box className="loading-spinner">
                        <CircularProgress size={70} thickness={4} sx={{ color: '#0a78ff' }} />
                        <Typography className="loading-text">Loading Citizen Details...</Typography>
                    </Box>
                </Box>
            ) : (
                <Fade in timeout={700}>
                    <Box className="attendance-container">
                        <Paper className="attendance-card" elevation={0}>
                            <Box className="card-header">
                                <Box className="header-content">
                                    <Box className="citizen-info">
                                        <Avatar className="citizen-avatar">
                                            {getInitials(userDetails?.name)}
                                        </Avatar>
                                        <Box className="citizen-details">
                                            <Typography className="citizen-name">
                                                {userDetails?.name || 'Unknown Citizen'}
                                            </Typography>
                                            <Box className="citizen-meta">
                                                <Box className="citizen-id-badge">
                                                    <BadgeIcon sx={{ fontSize: '1rem' }} />
                                                    <span>ID: {userDetails?.rollNum || 'N/A'}</span>
                                                </Box>
                                                {userDetails?.sclassName?.sclassName && (
                                                    <Box className="citizen-community-badge">
                                                        <SchoolIcon sx={{ fontSize: '1rem' }} />
                                                        <span>{userDetails.sclassName.sclassName}</span>
                                                    </Box>
                                                )}
                                            </Box>
                                        </Box>
                                    </Box>
                                    {currentUser?.teachSubject && (
                                        <Box className="event-badge">
                                            <EventIcon sx={{ fontSize: '1.2rem' }} />
                                            <span>Event: {currentUser.teachSubject?.subName}</span>
                                        </Box>
                                    )}
                                </Box>
                            </Box>

                            <Box className="card-body">
                                <Box className="form-title">
                                    <Box className="form-title-icon">
                                        <AssignmentIcon sx={{ fontSize: '1.5rem' }} />
                                    </Box>
                                    <span>Record Attendance</span>
                                </Box>

                                <form onSubmit={submitHandler}>
                                    <Stack spacing={0}>
                                        {(situation === "Student" || situation === "Subject") && (
                                            <FormControl fullWidth className="custom-form-control">
                                                <InputLabel id="event-select-label">Select Event</InputLabel>
                                                <Select
                                                    labelId="event-select-label"
                                                    id="event-select"
                                                    value={subjectName}
                                                    label="Select Event"
                                                    onChange={changeHandler}
                                                    required
                                                    MenuProps={{
                                                        PaperProps: {
                                                            sx: {
                                                                borderRadius: '18px',
                                                                marginTop: '12px',
                                                                boxShadow: '0 12px 36px rgba(0,0,0,0.15)',
                                                                border: '1px solid #e2e8f0',
                                                                maxHeight: '320px'
                                                            }
                                                        }
                                                    }}
                                                >
                                                    {subjectsList && subjectsList.length > 0 ? (
                                                        subjectsList.map((subject, index) => (
                                                            <MenuItem 
                                                                key={index} 
                                                                value={subject.subName}
                                                                className="status-menu-item"
                                                            >
                                                                <EventIcon sx={{ fontSize: '1.15rem', mr: 1.2, color: '#0a78ff' }} />
                                                                {subject.subName}
                                                            </MenuItem>
                                                        ))
                                                    ) : (
                                                        <MenuItem value="" disabled className="status-menu-item">
                                                            No Events Available
                                                        </MenuItem>
                                                    )}
                                                </Select>
                                            </FormControl>
                                        )}

                                        <FormControl fullWidth className="custom-form-control">
                                            <InputLabel id="status-select-label">Attendance Status</InputLabel>
                                            <Select
                                                labelId="status-select-label"
                                                id="status-select"
                                                value={status}
                                                label="Attendance Status"
                                                onChange={(event) => setStatus(event.target.value)}
                                                required
                                                MenuProps={{
                                                    PaperProps: {
                                                        sx: {
                                                            borderRadius: '18px',
                                                            marginTop: '12px',
                                                            boxShadow: '0 12px 36px rgba(0,0,0,0.15)',
                                                            border: '1px solid #e2e8f0',
                                                        }
                                                    }
                                                }}
                                            >
                                                <MenuItem value="Present" className="status-menu-item status-present">
                                                    <CheckCircleIcon sx={{ fontSize: '1.25rem', mr: 1.2 }} />
                                                    Present
                                                </MenuItem>
                                                <MenuItem value="Absent" className="status-menu-item status-absent">
                                                    <CancelIcon sx={{ fontSize: '1.25rem', mr: 1.2 }} />
                                                    Absent
                                                </MenuItem>
                                            </Select>
                                        </FormControl>

                                        <FormControl fullWidth className="custom-form-control">
                                            <TextField
                                                label="Select Date"
                                                type="date"
                                                value={date}
                                                onChange={(event) => setDate(event.target.value)}
                                                required
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                InputProps={{
                                                    startAdornment: (
                                                        <CalendarTodayIcon sx={{ 
                                                            color: '#718096', 
                                                            fontSize: '1.15rem', 
                                                            mr: 1.2 
                                                        }} />
                                                    ),
                                                }}
                                            />
                                        </FormControl>
                                    </Stack>

                                    <PurpleButton
                                        fullWidth
                                        size="large"
                                        className="submit-button"
                                        variant="contained"
                                        type="submit"
                                        disabled={loader}
                                    >
                                        {loader ? (
                                            <CircularProgress size={26} color="inherit" />
                                        ) : (
                                            <>
                                                <CheckCircleIcon sx={{ mr: 1.2, fontSize: '1.3rem' }} />
                                                Submit Attendance
                                            </>
                                        )}
                                    </PurpleButton>
                                </form>
                            </Box>
                        </Paper>
                    </Box>
                </Fade>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    )
}

export default StudentAttendance