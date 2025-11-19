import { Container, Grid, Paper, Box, Typography } from '@mui/material'
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import { getClassStudents, getSubjectDetails, getAllCommunityPolls } from '../../redux/sclassRelated/sclassHandle';
import { getAllComplains } from '../../redux/complainRelated/complainHandle';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import PeopleIcon from '@mui/icons-material/People';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import PollIcon from '@mui/icons-material/Poll';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const TeacherHomePage = () => {
    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.user);
    const { subjectDetails, sclassStudents, pollsList } = useSelector((state) => state.sclass);
    const { complainsList } = useSelector((state) => state.complain);

    const classID = currentUser.classDetails?._id

    useEffect(() => {
        if(!classID) return;
        dispatch(getSubjectDetails(classID, "ClassSubjects"));
        dispatch(getClassStudents(classID,"classID"));
        dispatch(getAllComplains(currentUser._id, 'teacher', 'Complain'));
        dispatch(getAllCommunityPolls(currentUser._id, classID, 'Polls'));
    }, [dispatch, classID, currentUser._id]);

    const numberOfStudents = sclassStudents?.length || 0;
    const totalEvents = subjectDetails?.length || 0;
    const pendingComplaints = complainsList ? complainsList.filter(c => c.status === 'Pending').length : 0;
    const communityPolls = pollsList ? pollsList.length : 0;

    const statsCards = [
        {
            title: 'Community Citizens',
            value: numberOfStudents,
            icon: PeopleIcon,
            gradient: 'linear-gradient(135deg, #0a78ff 0%, #07b389 100%)',
            lightBg: 'rgba(10, 120, 255, 0.08)',
        },
        {
            title: 'Total Events',
            value: totalEvents,
            icon: EventAvailableIcon,
            gradient: 'linear-gradient(135deg, #07b389 0%, #0ec6a9 100%)',
            lightBg: 'rgba(7, 179, 137, 0.1)',
        },
        {
            title: 'Pending Complaints',
            value: pendingComplaints,
            icon: PendingActionsIcon,
            gradient: 'linear-gradient(135deg, #ff9800 0%, #ffc107 100%)',
            lightBg: 'rgba(255, 152, 0, 0.15)',
        },
        {
            title: 'Community Polls',
            value: communityPolls,
            icon: PollIcon,
            gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            lightBg: 'rgba(99, 102, 241, 0.15)',
        },
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 0, mb: 4 }}>
            <Paper
                elevation={0}
                sx={{
                    background: '#ffffff',
                    borderRadius: '20px',
                    border: '2px solid #e2e8f0',
                    boxShadow: '0 2px 8px rgba(30,45,60,0.06)',
                    overflow: 'hidden',
                }}
            >
                {/* Header */}
                <Box
                    sx={{
                        p: 3,
                        background: 'linear-gradient(135deg, #fafcff 0%, #f5f9ff 100%)',
                        borderBottom: '2px solid #e2e8f0',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                        <Box
                            sx={{
                                width: 68,
                                height: 68,
                                borderRadius: '18px',
                                background: 'linear-gradient(135deg, #0a78ff 0%, #07b389 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#ffffff',
                                boxShadow: '0 10px 30px -8px rgba(10,120,255,.45)',
                                flexShrink: 0,
                            }}
                        >
                            <TrendingUpIcon sx={{ fontSize: '2rem' }} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Typography
                                sx={{
                                    fontFamily: 'Inter, sans-serif',
                                    fontWeight: 900,
                                    fontSize: '2rem',
                                    color: '#1a202c',
                                    letterSpacing: '-0.8px',
                                    lineHeight: 1.1,
                                    mb: 0.5,
                                }}
                            >
                                Community Leader Overview
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: 'Inter, sans-serif',
                                    fontWeight: 700,
                                    fontSize: '0.8rem',
                                    color: '#4a5568',
                                    letterSpacing: '1.1px',
                                    textTransform: 'uppercase',
                                }}
                            >
                                Your stats & insights
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {/* Stats Cards */}
                <Box sx={{ p: 4 }}>
                    <Grid container spacing={3}>
                        {statsCards.map((card, index) => {
                            const Icon = card.icon;
                            return (
                                <Grid item xs={12} sm={6} md={3} key={index}>
                                    <Box
                                        sx={{
                                            p: 3,
                                            background: '#f8fafc',
                                            borderRadius: '16px',
                                            border: '2px solid #e2e8f0',
                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                            height: '100%',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            '&:hover': {
                                                transform: 'translateY(-4px)',
                                                borderColor: card.gradient.includes('#0a78ff') ? '#0a78ff' : '#07b389',
                                                boxShadow: '0 12px 32px -8px rgba(0,0,0,0.15)',
                                            },
                                            '&::before': {
                                                content: '""',
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                height: '4px',
                                                background: card.gradient,
                                            }
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Box>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        fontFamily: 'Inter, sans-serif',
                                                        fontWeight: 700,
                                                        fontSize: '0.8rem',
                                                        color: '#718096',
                                                        mb: 1.5,
                                                        letterSpacing: '0.6px',
                                                        textTransform: 'uppercase',
                                                    }}
                                                >
                                                    {card.title}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontFamily: 'Inter, sans-serif',
                                                        fontWeight: 900,
                                                        fontSize: '2.5rem',
                                                        color: '#1a202c',
                                                        lineHeight: 1,
                                                        letterSpacing: '-1px',
                                                    }}
                                                >
                                                    <CountUp start={0} end={card.value || 0} duration={2.5} />
                                                </Typography>
                                            </Box>
                                            <Box
                                                sx={{
                                                    width: 60,
                                                    height: 60,
                                                    borderRadius: '14px',
                                                    background: card.lightBg,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexShrink: 0,
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: 48,
                                                        height: 48,
                                                        borderRadius: '12px',
                                                        background: card.gradient,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        color: '#ffffff',
                                                    }}
                                                >
                                                    <Icon sx={{ fontSize: '1.5rem' }} />
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Box>

                {/* Divider */}
                <Box sx={{ px: 4 }}>
                    <Box sx={{ borderTop: '2px solid #e2e8f0' }} />
                </Box>

                {/* Notices */}
                <Box sx={{ p: 4 }}>
                    <SeeNotice />
                </Box>
            </Paper>
        </Container>
    );
}

export default TeacherHomePage