import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotices } from '../redux/noticeRelated/noticeHandle';
import { Paper, Typography, Box, Chip, CircularProgress, Tooltip } from '@mui/material';
import TableViewTemplate from './TableViewTemplate';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import EventNoteIcon from '@mui/icons-material/EventNote';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const SeeNotice = () => {
    const dispatch = useDispatch();

    const { currentUser, currentRole } = useSelector(state => state.user);
    const { noticesList, loading, error, response } = useSelector((state) => state.notice);

    useEffect(() => {
        if (currentRole === "Admin") {
            dispatch(getAllNotices(currentUser._id, "Notice"));
        }
        else {
            dispatch(getAllNotices(currentUser.school._id, "Notice"));
        }
    }, [dispatch, currentRole, currentUser]);

    if (error) {
        console.log(error);
    }

    const formatDate = (d) => {
        const date = new Date(d);
        if (isNaN(date)) return '—';
        return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    };

    const noticeColumns = [
        {
            id: 'title', label: 'Title', minWidth: 170,
            render: (row) => (
                <Typography sx={{ fontWeight: 800, color: '#1a202c', letterSpacing: '-0.2px', fontFamily: 'Inter, sans-serif' }}>
                    {row.title}
                </Typography>
            )
        },
        {
            id: 'details', label: 'Details', minWidth: 200,
            render: (row) => (
                <Tooltip title={row.details || ''} placement="top" arrow>
                    <Typography sx={{
                        color: '#475569',
                        fontFamily: 'Inter, sans-serif',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}>
                        {row.details}
                    </Typography>
                </Tooltip>
            )
        },
        {
            id: 'date', label: 'Date', minWidth: 150,
            render: (row) => (
                <Chip
                    label={formatDate(row.date)}
                    size="small"
                    sx={{
                        background: 'rgba(10, 120, 255, 0.08)',
                        color: '#0a78ff',
                        fontWeight: 700,
                        fontFamily: 'Inter, sans-serif',
                    }}
                />
            )
        },
    ];

    const noticeRows = noticesList.map((notice) => {
        const rawDate = notice.date || notice.createdAt || notice.updatedAt;
        return {
            title: notice.title,
            details: notice.details,
            date: rawDate,
            id: notice._id,
        };
    });
    
    return (
        <Box>
            {/* Header */}
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                    sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #0a78ff 0%, #07b389 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                    }}
                >
                    <AnnouncementIcon sx={{ fontSize: '1.5rem' }} />
                </Box>
                <Box>
                    <Typography
                        sx={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            color: '#1e293b',
                            lineHeight: 1.2,
                        }}
                    >
                        Notices
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '0.875rem',
                            color: '#64748b',
                            mt: 0.5,
                        }}
                    >
                        Latest updates and important information
                    </Typography>
                </Box>
            </Box>

            {/* Content */}
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
                    <CircularProgress sx={{ color: '#0a78ff' }} />
                </Box>
            ) : response ? (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        py: 8,
                        gap: 2,
                    }}
                >
                    <Box
                        sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            background: 'rgba(10, 120, 255, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <InfoOutlinedIcon sx={{ fontSize: '2.5rem', color: '#0a78ff' }} />
                    </Box>
                    <Typography
                        sx={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '1.125rem',
                            fontWeight: 600,
                            color: '#64748b',
                        }}
                    >
                        No Notices Available
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '0.875rem',
                            color: '#94a3b8',
                        }}
                    >
                        Check back later for updates
                    </Typography>
                </Box>
            ) : (
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <EventNoteIcon sx={{ fontSize: '1.25rem', color: '#0a78ff' }} />
                        <Chip 
                            label={`${noticesList.length} Total`} 
                            size="small"
                            sx={{
                                background: 'rgba(10, 120, 255, 0.1)',
                                color: '#0a78ff',
                                fontWeight: 600,
                                fontFamily: 'Inter, sans-serif',
                            }}
                        />
                    </Box>
                    <Paper 
                        elevation={0}
                        sx={{ 
                            width: '100%', 
                            overflow: 'hidden',
                            border: '1px solid #e2e8f0',
                            borderRadius: '12px',
                        }}
                    >
                        {Array.isArray(noticesList) && noticesList.length > 0 &&
                            <TableViewTemplate columns={noticeColumns} rows={noticeRows} />
                        }
                    </Paper>
                </Box>
            )}
        </Box>
    )
}

export default SeeNotice