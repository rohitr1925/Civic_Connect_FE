import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserDetails } from '../../../redux/userRelated/userHandle';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { updateStudentFields } from '../../../redux/studentRelated/studentHandle';

import Popup from '../../../components/Popup';
import { BlueButton } from '../../../components/buttonStyles';
import {
    Box, InputLabel,
    MenuItem, Select,
    Typography, Stack,
    TextField, CircularProgress, FormControl, Paper, Fade, Avatar
} from '@mui/material';
import GradingIcon from '@mui/icons-material/Grading';
import EventIcon from '@mui/icons-material/Event';
import ScoreIcon from '@mui/icons-material/Score';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SchoolIcon from '@mui/icons-material/School';
import BadgeIcon from '@mui/icons-material/Badge';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const StudentExamMarks = ({ situation }) => {
    const dispatch = useDispatch();
    const { currentUser, userDetails, loading } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);
    const { response, error, statestatus } = useSelector((state) => state.student);
    const params = useParams()

    const [studentID, setStudentID] = useState("");
    const [subjectName, setSubjectName] = useState("");
    const [chosenSubName, setChosenSubName] = useState("");
    const [marksObtained, setMarksObtained] = useState("");

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
            
            .exam-marks-container {
                min-height: 100vh;
                background: linear-gradient(135deg, #f0f7ff 0%, #e8f2ff 50%, #eaf4ff 100%);
                padding: 3rem 1.5rem;
                position: relative;
            }
            
            .exam-marks-container::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 400px;
                background: radial-gradient(ellipse at top, rgba(10, 120, 255, 0.08) 0%, transparent 60%);
                pointer-events: none;
            }
            
            .exam-marks-card {
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
            
            .marks-card-header {
                background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #5b21b6 100%);
                padding: 3rem 2.5rem 2.5rem;
                color: white;
                position: relative;
                overflow: hidden;
            }
            
            .marks-card-header::before {
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
            
            .marks-card-header::after {
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
            
            .marks-header-content {
                position: relative;
                z-index: 2;
            }
            
            .marks-citizen-info {
                display: flex;
                align-items: center;
                gap: 1.5rem;
                margin-bottom: 1.5rem;
            }
            
            .marks-citizen-avatar {
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
            
            .marks-citizen-details {
                flex: 1;
            }
            
            .marks-citizen-name {
                font-size: 2rem;
                font-weight: 900;
                letter-spacing: -0.8px;
                margin: 0 0 0.4rem 0;
                text-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
                line-height: 1.2;
            }
            
            .marks-citizen-meta {
                display: flex;
                align-items: center;
                gap: 1rem;
                flex-wrap: wrap;
            }
            
            .marks-citizen-id-badge {
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
            
            .marks-citizen-community-badge {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                background: rgba(124, 58, 237, 0.25);
                padding: 0.5rem 1rem;
                border-radius: 10px;
                font-size: 0.85rem;
                font-weight: 700;
                letter-spacing: 0.3px;
                backdrop-filter: blur(8px);
                border: 1px solid rgba(124, 58, 237, 0.4);
            }
            
            .marks-event-badge {
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
            
            .marks-card-body {
                padding: 3rem 2.5rem;
                background: linear-gradient(to bottom, #ffffff 0%, #fafcfe 100%);
            }
            
            .marks-form-title {
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
            
            .marks-form-title::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 60px;
                height: 4px;
                background: linear-gradient(90deg, #7c3aed, #6d28d9);
                border-radius: 2px;
            }
            
            .marks-form-title-icon {
                width: 48px;
                height: 48px;
                background: linear-gradient(135deg, #ede9fe, #ddd6fe);
                border-radius: 14px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #7c3aed;
                box-shadow: 0 4px 12px rgba(124, 58, 237, 0.15);
            }
            
            .marks-custom-form-control {
                margin-bottom: 2rem !important;
                position: relative;
            }
            
            .marks-custom-form-control .MuiOutlinedInput-root {
                border-radius: 16px !important;
                font-weight: 600 !important;
                font-size: 1rem !important;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                background: #ffffff !important;
                border: 2px solid #e2e8f0 !important;
            }
            
            .marks-custom-form-control .MuiOutlinedInput-root:hover {
                border-color: #cbd5e0 !important;
                background: #fafcfe !important;
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06) !important;
                transform: translateY(-1px);
            }
            
            .marks-custom-form-control .MuiOutlinedInput-root.Mui-focused {
                border-color: #7c3aed !important;
                background: #ffffff !important;
                box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.1), 0 8px 20px rgba(124, 58, 237, 0.15) !important;
                transform: translateY(-2px);
            }
            
            .marks-custom-form-control .MuiInputLabel-root {
                font-weight: 700 !important;
                font-size: 0.95rem !important;
                color: #4a5568 !important;
                letter-spacing: 0.3px !important;
                background: white;
                padding: 0 6px;
            }
            
            .marks-custom-form-control .MuiInputLabel-root.Mui-focused {
                color: #7c3aed !important;
                font-weight: 800 !important;
            }
            
            .marks-menu-item {
                font-weight: 700 !important;
                font-size: 0.95rem !important;
                padding: 1rem 1.4rem !important;
                margin: 0.4rem 0.8rem !important;
                border-radius: 12px !important;
                transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
                display: flex !important;
                align-items: center !important;
            }
            
            .marks-menu-item:hover {
                background: linear-gradient(135deg, #f5f3ff, #ede9fe) !important;
                transform: translateX(6px) !important;
                box-shadow: 0 4px 12px rgba(124, 58, 237, 0.12) !important;
                color: #7c3aed !important;
            }
            
            .marks-submit-button {
                height: 58px !important;
                border-radius: 16px !important;
                font-weight: 900 !important;
                font-size: 1.05rem !important;
                text-transform: none !important;
                letter-spacing: 0.3px !important;
                background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%) !important;
                box-shadow: 0 8px 24px rgba(124, 58, 237, 0.4) !important;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                margin-top: 2.5rem !important;
                position: relative;
                overflow: hidden;
            }
            
            .marks-submit-button::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                transition: left 0.5s;
            }
            
            .marks-submit-button:hover::before {
                left: 100%;
            }
            
            .marks-submit-button:hover {
                transform: translateY(-4px) !important;
                box-shadow: 0 12px 32px rgba(124, 58, 237, 0.5) !important;
                background: linear-gradient(135deg, #6d28d9 0%, #5b21b6 100%) !important;
            }
            
            .marks-submit-button:active {
                transform: translateY(-2px) !important;
            }
            
            .marks-submit-button:disabled {
                background: linear-gradient(135deg, #e2e8f0, #cbd5e0) !important;
                color: #a0aec0 !important;
                box-shadow: none !important;
                transform: none !important;
            }
            
            .marks-loading-overlay {
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                background: linear-gradient(135deg, #f0f7ff 0%, #e8f2ff 50%, #eaf4ff 100%);
            }
            
            .marks-loading-spinner {
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
            
            .marks-loading-text {
                font-size: 1.3rem;
                font-weight: 700;
                color: #4a5568;
                letter-spacing: 0.3px;
            }

            .score-input-wrapper {
                position: relative;
            }

            .score-input-icon {
                position: absolute;
                left: 16px;
                top: 50%;
                transform: translateY(-50%);
                color: #7c3aed;
                z-index: 1;
            }

            .score-input .MuiOutlinedInput-root {
                padding-left: 48px !important;
            }
            
            @media (max-width: 768px) {
                .exam-marks-container {
                    padding: 2rem 1rem;
                }
                .marks-card-header {
                    padding: 2.5rem 1.8rem 2rem;
                }
                .marks-citizen-name {
                    font-size: 1.6rem;
                }
                .marks-citizen-avatar {
                    width: 60px !important;
                    height: 60px !important;
                    font-size: 1.4rem !important;
                }
                .marks-card-body {
                    padding: 2.5rem 1.8rem;
                }
                .marks-form-title {
                    font-size: 1.3rem;
                    margin-bottom: 2rem;
                }
                .marks-citizen-meta {
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
            const { studentID, subjectID } = params
            setStudentID(studentID);
            dispatch(getUserDetails(studentID, "Student"));
            setChosenSubName(subjectID);
        }
    }, [situation]);

    useEffect(() => {
        if (userDetails && userDetails.sclassName && situation === "Student") {
            dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"));
        }
    }, [dispatch, userDetails]);

    const changeHandler = (event) => {
        const selectedSubject = subjectsList.find(
            (subject) => subject.subName === event.target.value
        );
        setSubjectName(selectedSubject.subName);
        setChosenSubName(selectedSubject._id);
    }

    const fields = { subName: chosenSubName, marksObtained }

    const submitHandler = (event) => {
        event.preventDefault()
        setLoader(true)
        dispatch(updateStudentFields(studentID, fields, "UpdateExamResult"))
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
                <Box className="marks-loading-overlay">
                    <Box className="marks-loading-spinner">
                        <CircularProgress size={70} thickness={4} sx={{ color: '#7c3aed' }} />
                        <Typography className="marks-loading-text">Loading Citizen Details...</Typography>
                    </Box>
                </Box>
            ) : (
                <Fade in timeout={700}>
                    <Box className="exam-marks-container">
                        <Paper className="exam-marks-card" elevation={0}>
                            <Box className="marks-card-header">
                                <Box className="marks-header-content">
                                    <Box className="marks-citizen-info">
                                        <Avatar className="marks-citizen-avatar">
                                            {getInitials(userDetails?.name)}
                                        </Avatar>
                                        <Box className="marks-citizen-details">
                                            <Typography className="marks-citizen-name">
                                                {userDetails?.name || 'Unknown Citizen'}
                                            </Typography>
                                            <Box className="marks-citizen-meta">
                                                <Box className="marks-citizen-id-badge">
                                                    <BadgeIcon sx={{ fontSize: '1rem' }} />
                                                    <span>ID: {userDetails?.rollNum || 'N/A'}</span>
                                                </Box>
                                                {userDetails?.sclassName?.sclassName && (
                                                    <Box className="marks-citizen-community-badge">
                                                        <SchoolIcon sx={{ fontSize: '1rem' }} />
                                                        <span>{userDetails.sclassName.sclassName}</span>
                                                    </Box>
                                                )}
                                            </Box>
                                        </Box>
                                    </Box>
                                    {currentUser?.teachSubject && (
                                        <Box className="marks-event-badge">
                                            <EventIcon sx={{ fontSize: '1.2rem' }} />
                                            <span>Event: {currentUser.teachSubject?.subName}</span>
                                        </Box>
                                    )}
                                </Box>
                            </Box>

                            <Box className="marks-card-body">
                                <Box className="marks-form-title">
                                    <Box className="marks-form-title-icon">
                                        <GradingIcon sx={{ fontSize: '1.5rem' }} />
                                    </Box>
                                    <span>Event Score Entry</span>
                                </Box>

                                <form onSubmit={submitHandler}>
                                    <Stack spacing={0}>
                                        {situation === "Student" && (
                                            <FormControl fullWidth className="marks-custom-form-control">
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
                                                                className="marks-menu-item"
                                                            >
                                                                <EventIcon sx={{ fontSize: '1.15rem', mr: 1.2 }} />
                                                                {subject.subName}
                                                            </MenuItem>
                                                        ))
                                                    ) : (
                                                        <MenuItem value="" disabled className="marks-menu-item">
                                                            Add Events For Score
                                                        </MenuItem>
                                                    )}
                                                </Select>
                                            </FormControl>
                                        )}

                                        <FormControl fullWidth className="marks-custom-form-control score-input-wrapper">
                                            <TrendingUpIcon className="score-input-icon" sx={{ fontSize: '1.4rem' }} />
                                            <TextField 
                                                type="number" 
                                                label='Enter Score'
                                                value={marksObtained} 
                                                required
                                                onChange={(e) => setMarksObtained(e.target.value)}
                                                className="score-input"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                inputProps={{
                                                    min: 0,
                                                    max: 100,
                                                    step: 1
                                                }}
                                                placeholder="Enter score (0-100)"
                                            />
                                        </FormControl>
                                    </Stack>

                                    <BlueButton
                                        fullWidth
                                        size="large"
                                        className="marks-submit-button"
                                        variant="contained"
                                        type="submit"
                                        disabled={loader}
                                    >
                                        {loader ? (
                                            <CircularProgress size={26} color="inherit" />
                                        ) : (
                                            <>
                                                <CheckCircleIcon sx={{ mr: 1.2, fontSize: '1.3rem' }} />
                                                Submit Score
                                            </>
                                        )}
                                    </BlueButton>
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

export default StudentExamMarks