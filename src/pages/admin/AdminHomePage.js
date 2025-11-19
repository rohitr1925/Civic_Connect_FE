import { Container, Grid, Paper, Box, Typography } from '@mui/material'
import SeeNotice from '../../components/SeeNotice';
import PeopleIcon from '@mui/icons-material/People';
import GroupsIcon from '@mui/icons-material/Groups';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';
import { getAllComplains } from '../../redux/complainRelated/complainHandle';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

const AdminHomePage = () => {
    const dispatch = useDispatch();
    const { studentsList } = useSelector((state) => state.student);
    const { sclassesList, subjectsList } = useSelector((state) => state.sclass);
    const { complainsList } = useSelector((state) => state.complain);

    const { currentUser } = useSelector(state => state.user)

    const adminID = currentUser._id

    useEffect(() => {
        dispatch(getAllStudents(adminID));
        dispatch(getAllSclasses(adminID, "Sclass"));
        dispatch(getAllTeachers(adminID));
        dispatch(getAllComplains(adminID, "admin", "Complain"));
    }, [adminID, dispatch]);

    const numberOfStudents = studentsList && studentsList.length;
    const numberOfClasses = sclassesList && sclassesList.length;
    const pendingComplaints = complainsList ? complainsList.filter(c => c.status === 'Pending').length : 0;

    // Calculate Active Events: ongoing/upcoming events from subjectsList
    const now = new Date();
    const activeEventsCount = subjectsList
        ? subjectsList.filter(subject => new Date(subject.endDate) >= now).length
        : 0;

    const statsCards = [
        {
            title: 'Total Citizens',
            value: numberOfStudents,
            icon: PeopleIcon,
            gradient: 'linear-gradient(135deg, #0a78ff 0%, #065dca 100%)',
            lightBg: 'rgba(10, 120, 255, 0.1)',
        },
        {
            title: 'Total Communities',
            value: numberOfClasses,
            icon: GroupsIcon,
            gradient: 'linear-gradient(135deg, #07b389 0%, #0ec6a9 100%)',
            lightBg: 'rgba(7, 179, 137, 0.1)',
        },
        {
            title: 'Pending Complaints',
            value: pendingComplaints,
            icon: PendingActionsIcon,
            gradient: 'linear-gradient(135deg, #ff9800 0%, #ffc107 100%)',
            lightBg: 'rgba(255, 152, 0, 0.12)',
        },
        {
            title: 'Active Events',
            value: activeEventsCount,
            icon: EventAvailableIcon,
            gradient: 'linear-gradient(135deg, #07b389 0%, #0ec6a9 100%)',
            lightBg: 'rgba(7, 179, 137, 0.1)',
        },
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 0, mb: 4 }}>
            {/* Single White Box Container */}
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
                {/* Page Header */}
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
                            <DashboardIcon sx={{ fontSize: '2rem' }} />
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
                                Dashboard Overview
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
                                Real-time Statistics & Insights
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                px: 2,
                                py: 1,
                                background: 'linear-gradient(135deg, #e6f8f3 0%, #d4f4ea 100%)',
                                borderRadius: '12px',
                                border: '1px solid #b8e8d9',
                            }}
                        >
                            <TrendingUpIcon sx={{ fontSize: '1.2rem', color: '#067a5f' }} />
                            <Typography
                                sx={{
                                    fontFamily: 'Inter, sans-serif',
                                    fontWeight: 700,
                                    fontSize: '0.75rem',
                                    color: '#067a5f',
                                    letterSpacing: '0.5px',
                                }}
                            >
                                All Systems Active
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {/* Stats Cards Section */}
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
                                                borderColor: card.gradient.includes('0a78ff') ? '#0a78ff' : '#07b389',
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

                {/* Notices Section */}
                <Box sx={{ p: 4 }}>
                    <SeeNotice />
                </Box>
            </Paper>
        </Container>
    );
};

export default AdminHomePage