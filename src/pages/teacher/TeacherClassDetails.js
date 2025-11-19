import { useEffect } from 'react';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getClassStudents, getAllCommunityPolls } from '../../redux/sclassRelated/sclassHandle';
import { getAllComplains } from '../../redux/complainRelated/complainHandle';
import { Container, Grid, Paper, Box, Typography, Button, Tooltip, CircularProgress, TextField, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Fade } from '@mui/material';
// Removed TableTemplate to custom-build table matching admin citizens UI
import GroupsIcon from '@mui/icons-material/Groups';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import GradeIcon from '@mui/icons-material/Grade';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PeopleIcon from '@mui/icons-material/People';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import PollIcon from '@mui/icons-material/Poll';
import CountUp from 'react-countup';
import SearchIcon from '@mui/icons-material/Search';

const TeacherClassDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { sclassStudents, loading, error, getresponse, pollsList } = useSelector((state) => state.sclass);
    const { complainsList } = useSelector((state) => state.complain);
    const { currentUser } = useSelector((state) => state.user);

    const subjectID = currentUser.teachSubject?._id;
    // Support both legacy teachSclass and classDetails shapes
    const communityID = currentUser.teachSclass?._id || currentUser.classDetails?._id;

    useEffect(() => {
        dispatch(getClassStudents(currentUser._id, null));
        dispatch(getAllComplains(currentUser._id, 'teacher', 'Complain'));
        if (communityID) {
            dispatch(getAllCommunityPolls(currentUser._id, communityID, 'Polls'));
        }
    }, [dispatch, currentUser._id, communityID]);

    // Table state & helpers (admin citizens table parity)
    const [searchTerm, setSearchTerm] = React.useState('');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    // Removed three-dots menu (simplified actions inline)

    const handleAttendance = (id) => navigate(`/Leader/community/citizen/attendance/${id}`);
    const handleMarks = (id) => navigate(`/Leader/community/citizen/marks/${id}`);
    const handleView = (id) => navigate(`/Leader/community/citizen/${id}`);

    const getInitials = (name) => {
        if (!name) return '?';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const highlight = (text) => {
        const base = String(text ?? '');
        if (!searchTerm.trim()) return base;
        const term = searchTerm.trim();
        const safe = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${safe})`, 'ig');
        return base.split(regex).map((part, i) => regex.test(part) ? <span key={i} className="highlightMark" style={{ background:'#ffe58f', borderRadius:4, padding:'0 2px' }}>{part}</span> : part);
    };

    const filtered = React.useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) return Array.isArray(sclassStudents) ? sclassStudents : [];
        return (sclassStudents || []).filter(stu => {
            const name = (stu.name || '').toLowerCase();
            const roll = String(stu.rollNum || '').toLowerCase();
            return name.includes(term) || roll.includes(term);
        });
    }, [searchTerm, sclassStudents]);

    const paginated = React.useMemo(() => {
        const start = page * rowsPerPage;
        return filtered.slice(start, start + rowsPerPage);
    }, [filtered, page, rowsPerPage]);

    const totalCitizens = filtered.length;

    const actionsForRow = (id) => (
        <Box className="cellActions" sx={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:0.8 }}>
            <Tooltip title="View" arrow>
                <Button className="actionBtn viewBtn" onClick={() => handleView(id)} variant="contained" sx={actionBtnBase}>
                    <VisibilityIcon sx={{ fontSize: '1rem' }} /> View
                </Button>
            </Tooltip>
            <Tooltip title="Attendance" arrow>
                <Button className="actionBtn viewBtn" onClick={() => handleAttendance(id)} variant="contained" sx={{ ...actionBtnBase, background:'linear-gradient(135deg,#6366f1,#4f46e5)' }}>
                    <EventAvailableIcon sx={{ fontSize: '1rem' }} /> Attendance
                </Button>
            </Tooltip>
            <Tooltip title="Marks" arrow>
                <Button className="actionBtn viewBtn" onClick={() => handleMarks(id)} variant="contained" sx={{ ...actionBtnBase, background:'linear-gradient(135deg,#ff9800,#e08900)' }}>
                    <GradeIcon sx={{ fontSize: '1rem' }} /> Marks
                </Button>
            </Tooltip>
        </Box>
    );
    const pendingComplaints = complainsList ? complainsList.filter(c => c.status === 'Pending').length : 0;
    const totalPolls = pollsList ? pollsList.length : 0;
    const activeEvents = Math.max(totalCitizens * 0 + (totalPolls || 1), 1); // placeholder similar style

    const statsCards = [
        {
            title: 'Total Citizens',
            value: totalCitizens,
            icon: PeopleIcon,
            gradient: 'linear-gradient(135deg, #0a78ff 0%, #065dca 100%)',
            lightBg: 'rgba(10, 120, 255, 0.1)',
        },
        {
            title: 'Pending Complaints',
            value: pendingComplaints,
            icon: PendingActionsIcon,
            gradient: 'linear-gradient(135deg, #ff9800 0%, #ffc107 100%)',
            lightBg: 'rgba(255, 152, 0, 0.12)',
        },
        {
            title: 'Total Polls',
            value: totalPolls,
            icon: PollIcon,
            gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            lightBg: 'rgba(99, 102, 241, 0.12)',
        },
        {
            title: 'Active Events',
            value: activeEvents,
            icon: EventAvailableIcon,
            gradient: 'linear-gradient(135deg, #07b389 0%, #0ec6a9 100%)',
            lightBg: 'rgba(7, 179, 137, 0.1)',
        },
    ];

    const handleAddCitizen = () => {
        if (communityID) {
            navigate(`/Leader/addcitizens/${communityID}`);
        }
    };

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
                <Box sx={{
                    p: 3,
                    background: 'linear-gradient(135deg, #fafcff 0%, #f5f9ff 100%)',
                    borderBottom: '2px solid #e2e8f0',
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                        <Box sx={{
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
                        }}>
                            <GroupsIcon sx={{ fontSize: '2rem' }} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Typography sx={{
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 900,
                                fontSize: '2rem',
                                color: '#1a202c',
                                letterSpacing: '-0.8px',
                                lineHeight: 1.1,
                                mb: 0.5,
                            }}>Community Details</Typography>
                            <Typography sx={{
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 700,
                                fontSize: '0.8rem',
                                color: '#4a5568',
                                letterSpacing: '1.1px',
                                textTransform: 'uppercase',
                            }}>Citizens & Performance</Typography>
                        </Box>
                        <Tooltip title={communityID ? "Add Citizen" : "Assign a community first"} arrow>
                            <Button onClick={handleAddCitizen} disabled={!communityID} variant='contained' startIcon={<AddCircleOutlineIcon />} sx={{
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 700,
                                textTransform: 'none',
                                borderRadius: '14px',
                                background: 'linear-gradient(135deg,#0a78ff 0%, #07b389 100%)',
                                boxShadow: '0 8px 24px -8px rgba(10,120,255,.4)',
                                '&:hover': { boxShadow: '0 14px 32px -10px rgba(10,120,255,.55)' }
                            }}>Add Citizen</Button>
                        </Tooltip>
                    </Box>
                </Box>

                {/* Stats Cards Grid */}
                <Box sx={{ p: 4 }}>
                    <Grid container spacing={3}>
                        {statsCards.map((card, index) => {
                            const Icon = card.icon;
                            return (
                                <Grid item xs={12} sm={6} md={3} key={index}>
                                    <Box sx={{
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
                                    }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Box>
                                                <Typography variant="body2" sx={{
                                                    fontFamily: 'Inter, sans-serif',
                                                    fontWeight: 700,
                                                    fontSize: '0.8rem',
                                                    color: '#718096',
                                                    mb: 1.5,
                                                    letterSpacing: '0.6px',
                                                    textTransform: 'uppercase',
                                                }}>{card.title}</Typography>
                                                <Typography sx={{
                                                    fontFamily: 'Inter, sans-serif',
                                                    fontWeight: 900,
                                                    fontSize: '2.5rem',
                                                    color: '#1a202c',
                                                    lineHeight: 1,
                                                    letterSpacing: '-1px',
                                                }}>
                                                    <CountUp start={0} end={card.value || 0} duration={2.5} />
                                                </Typography>
                                            </Box>
                                            <Box sx={{
                                                width: 60,
                                                height: 60,
                                                borderRadius: '14px',
                                                background: card.lightBg,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0,
                                            }}>
                                                <Box sx={{
                                                    width: 48,
                                                    height: 48,
                                                    borderRadius: '12px',
                                                    background: card.gradient,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: '#ffffff',
                                                }}>
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

                {/* Table Section (Admin citizens style) */}
                <Box sx={{ p: 4 }}>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
                            <CircularProgress size={54} thickness={4} sx={{ color: '#0a78ff' }} />
                        </Box>
                    ) : (
                        <Fade in timeout={400}>
                            <Box>
                                {/* Search & meta */}
                                <Box sx={{ display:'flex', flexWrap:'wrap', gap:2, mb:3, justifyContent:'space-between' }}>
                                    <TextField
                                        placeholder="Search by name or ID..."
                                        size="small"
                                        value={searchTerm}
                                        onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
                                        sx={{ minWidth:320, flexGrow:1, background:'#fff', borderRadius:'14px', '& .MuiOutlinedInput-root':{ fontWeight:600, borderRadius:'14px' } }}
                                        InputProps={{ startAdornment:(<InputAdornment position="start"><SearchIcon sx={{ color:'#718096', fontSize:'1.1rem' }}/></InputAdornment>) }}
                                    />
                                    <Typography sx={{ fontFamily:'Inter, sans-serif', fontWeight:700, fontSize:'.75rem', letterSpacing:'.6px', color:'#64748b', textTransform:'uppercase' }}>{filtered.length} Results</Typography>
                                </Box>
                                {filtered.length === 0 ? (
                                    <Box sx={{ textAlign:'center', p:'60px 20px', border:'2px dashed #d5e0ea', borderRadius:'18px', background:'linear-gradient(135deg,#fafcfe,#f4f8fb)' }}>
                                        <SearchIcon sx={{ fontSize:'4rem', color:'#0a78ff', opacity:.7, mb:2 }} />
                                        <Typography sx={{ fontFamily:'Inter, sans-serif', fontWeight:800, fontSize:'1.6rem', color:'#1a202c', mb:1 }}>{searchTerm ? 'No citizens match your search' : 'No citizens found'}</Typography>
                                        <Typography sx={{ fontFamily:'Inter, sans-serif', fontWeight:600, fontSize:'.95rem', color:'#4a5568' }}>{searchTerm ? 'Adjust keywords or clear search.' : 'Start by adding a new citizen.'}</Typography>
                                    </Box>
                                ) : (
                                    <TableContainer sx={{ border:'1px solid #e2e8f0', borderRadius:'18px', boxShadow:'0 4px 16px rgba(25,40,60,0.08)', background:'#fff' }}>
                                        <Table sx={{ width:'100%', tableLayout:'fixed' }}>
                                            <colgroup>
                                                <col style={{ width:'40%' }} />
                                                <col style={{ width:'20%' }} />
                                                <col style={{ width:'40%' }} />
                                            </colgroup>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell sx={headCellStyle}>Name</TableCell>
                                                    <TableCell sx={headCellStyle}>Citizen ID</TableCell>
                                                    <TableCell sx={{ ...headCellStyle, textAlign:'center' }}>Actions</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {paginated.map(stu => (
                                                    <TableRow key={stu._id} hover sx={bodyRowStyle}>
                                                        <TableCell sx={bodyCellStyle}>
                                                            <Box sx={{ display:'flex', alignItems:'center', gap:2, minWidth:0 }}>
                                                                <Box sx={avatarStyle}>{getInitials(stu.name)}</Box>
                                                                <Typography sx={{ fontWeight:700, fontSize:'.95rem', color:'#1a202c', flex:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{highlight(stu.name || 'N/A')}</Typography>
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell sx={bodyCellStyle}>{highlight(String(stu.rollNum || 'N/A'))}</TableCell>
                                                        <TableCell sx={{ ...bodyCellStyle, textAlign:'center' }}>
                                                            {actionsForRow(stu._id)}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                        <Box sx={{ display:'flex', justifyContent:'flex-end', p:2 }}>
                                            <TablePagination
                                                component="div"
                                                count={filtered.length}
                                                page={page}
                                                onPageChange={(_, newPage) => setPage(newPage)}
                                                rowsPerPage={rowsPerPage}
                                                onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value,10)); setPage(0); }}
                                                rowsPerPageOptions={[5,10,25,50]}
                                                labelRowsPerPage="Rows:"
                                            />
                                        </Box>
                                    </TableContainer>
                                )}
                            </Box>
                        </Fade>
                    )}
                </Box>
            </Paper>
        </Container>
    );
};

export default TeacherClassDetails;

// Removed unused buttonStyles object (legacy)

// Style objects used for table (keep near bottom for clarity)
const headCellStyle = {
    background: 'linear-gradient(135deg,#f2f7ff,#edf4fb)',
    fontWeight: 800,
    fontSize: '.82rem',
    letterSpacing: '.6px',
    color: '#4a5568',
    textTransform: 'uppercase',
    padding: '16px 18px',
    borderBottom: '2px solid #e3edf6'
};

const bodyRowStyle = {
    transition: '.25s',
    borderBottom: '1px solid #eef4f9',
    '&:nth-of-type(even)': { background: '#fafcfe' },
    '&:hover': { background: '#f6faff' }
};

const bodyCellStyle = {
    padding: '16px 18px',
    fontSize: '.9rem',
    fontWeight: 600,
    color: '#1a202c',
    verticalAlign: 'middle'
};

const avatarStyle = {
    width: 44,
    height: 44,
    borderRadius: '11px',
    background: 'linear-gradient(135deg,#e8f2ff,#d6ebff)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '.85rem',
    fontWeight: 800,
    color: '#0a78ff',
    boxShadow: '0 3px 8px rgba(10,120,255,.2)',
    flexShrink: 0
};

const actionBtnBase = {
    height: 38,
    padding: '.55rem .95rem',
    fontSize: '.72rem',
    fontWeight: 800,
    textTransform: 'none',
    borderRadius: '10px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '.45rem',
    boxShadow: '0 2px 8px rgba(0,0,0,.08)',
    transition: '.25s',
    background: 'linear-gradient(135deg,#0a78ff,#065dca)',
    '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 6px 14px rgba(0,0,0,.15)' }
};

// (Removed moreBtnStyle as three-dots menu removed)