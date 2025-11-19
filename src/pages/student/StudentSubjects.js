import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import {
    Box,
    Typography,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import CustomBarChart from '../../components/CustomBarChart';
import EventIcon from '@mui/icons-material/Event';

const StudentSubjects = () => {
    const dispatch = useDispatch();
    const { subjectsList } = useSelector((state) => state.sclass);
    const { userDetails, currentUser, loading } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
    }, [dispatch, currentUser._id]);

    const [subjectMarks, setSubjectMarks] = useState([]);
    const [selectedTab, setSelectedTab] = useState('table');

    useEffect(() => {
        if (userDetails) {
            setSubjectMarks(userDetails.examResult || []);
        }
    }, [userDetails]);

    useEffect(() => {
        dispatch(getSubjectList(currentUser.sclassName._id, "ClassSubjects"));
    }, [subjectMarks, dispatch, currentUser.sclassName._id]);

    useEffect(() => {
        // Inject admin-like styles for consistent look
        const styleEl = document.createElement('style');
        styleEl.textContent = `
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
          :root{
            --bg-soft:#f3f6fa; --panel-bg:#ffffff; --border:#e2e8f0;
            --text-dark:#1a202c; --text-mid:#4a5568; --text-light:#718096;
            --primary:#0a78ff; --accent:#07b389; --radius-lg:20px;
            --shadow-sm:0 2px 8px rgba(30,45,60,0.06);
            --shadow-md:0 4px 16px rgba(25,40,60,0.08);
            --shadow-lg:0 8px 28px rgba(25,40,60,0.12);
          }
          * { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important; box-sizing: border-box; }
          .pageWrap { background: linear-gradient(135deg, #f0f7ff 0%, #e8f2ff 50%, #f3f6fa 100%) fixed; min-height:100vh; padding:2.5rem 1.5rem; }
          .mainContainer { max-width:1380px; margin:0 auto; }
          .whiteBox { background:var(--panel-bg); border:1px solid var(--border); border-radius:var(--radius-lg); box-shadow:var(--shadow-lg); overflow:hidden; animation: slideUp .5s cubic-bezier(0.16, 1, 0.3, 1); }
          @keyframes slideUp { from { opacity:0; transform:translateY(40px); } to { opacity:1; transform:translateY(0); } }
          .headerSection { display:flex; align-items:center; justify-content:space-between; gap:1.5rem; padding:2rem 2.5rem; flex-wrap:wrap; background:linear-gradient(135deg,#fafcff 0%, #f5f9ff 100%); border-bottom:1px solid var(--border); position:relative; }
          .headerSection::after { content:''; position:absolute; inset:0; background:radial-gradient(circle at 85% 15%, rgba(10,120,255,.06), transparent 70%); pointer-events:none; }
          .headerLeft { display:flex; align-items:center; gap:1.2rem; position:relative; z-index:1; }
          .headerIcon { width:68px; height:68px; border-radius:18px; display:flex; align-items:center; justify-content:center; background:linear-gradient(135deg,var(--primary) 0%, var(--accent) 100%); color:#fff; box-shadow:0 10px 30px -8px rgba(10,120,255,.45); transition:transform .3s cubic-bezier(0.34, 1.56, 0.64, 1); }
          .headerIcon:hover { transform:scale(1.1) rotate(-5deg); }
          .headerTitleGroup { display:flex; flex-direction:column; gap:.35rem; }
          .headerTitle { margin:0; color:var(--text-dark); letter-spacing:-.8px; font-weight:900; font-size:2rem; line-height:1.1; }
          .headerSubtitle { margin:0; color:var(--text-mid); font-size:.8rem; text-transform:uppercase; letter-spacing:1.1px; font-weight:800; }
          .contentSection { padding:2.5rem; }
          .tableWrapper { background:#fff; border:1px solid #e8eef5; border-radius:18px; overflow:hidden; box-shadow:var(--shadow-sm); }
          .customTable { width:100%; table-layout:fixed; border-collapse:separate; border-spacing:0; }
          .customTableHead { background:linear-gradient(135deg,#f9fbfe 0%, #f3f7fc 100%); }
          .customTableHeadCell { font-size:.88rem !important; font-weight:900 !important; text-transform:uppercase; letter-spacing:.65px; color:var(--text-mid) !important; border-bottom:2px solid #e3edf6 !important; padding:20px 24px !important; text-align:center !important; vertical-align:middle !important; }
          .customTableRow { transition:all .25s cubic-bezier(0.4, 0, 0.2, 1); border-bottom:1px solid #eef4f9; background:#fff; cursor:pointer; }
          .customTableRow:nth-of-type(even) { background:#fafcfe; }
          .customTableRow:hover { background:#f6faff; transform:translateX(4px) scale(1.005); box-shadow:0 6px 24px -6px rgba(10,120,255,.18); }
          .customTableCell { font-size:.95rem !important; font-weight:600 !important; color:var(--text-dark) !important; border-bottom:1px solid #eef4f9 !important; padding:22px 24px !important; text-align:center !important; vertical-align:middle !important; }
          .tabsWrapper { border-bottom: 2px solid var(--border); background: linear-gradient(135deg, #fafcff 0%, #f8fafd 100%); padding: 0 2.5rem; }
          .tabsWrapper .MuiTab-root { font-weight: 700; font-size: .92rem; text-transform: none; letter-spacing: .3px; min-height: 56px; padding: 12px 24px; color: var(--text-mid); transition:all .2s ease; }
          .tabsWrapper .MuiTab-root.Mui-selected { color: var(--primary); }
          .tabsWrapper .MuiTabs-indicator { height: 3px; border-radius: 3px 3px 0 0; background: linear-gradient(90deg, var(--primary), var(--accent)); }
          
          .statsCard { 
            display: flex; 
            align-items: center; 
            gap: 1.2rem; 
            padding: 1.5rem; 
            background: linear-gradient(135deg, #f9fbfe 0%, #f3f7fc 100%); 
            border: 1px solid var(--border); 
            border-radius: 16px; 
            transition: all .25s ease;
            box-shadow: var(--shadow-sm);
          }
          .statsCard:hover { 
            transform: translateY(-4px); 
            box-shadow: var(--shadow-md); 
            border-color: var(--primary);
          }
          .statsIconBox {
            width: 56px;
            height: 56px;
            border-radius: 14px;
            background: linear-gradient(135deg, #e8f2ff, #d6ebff);
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--primary);
            box-shadow: 0 4px 12px rgba(10,120,255,.15);
          }
          .statsContent { flex: 1; }
          .statsLabel { 
            font-size: .75rem; 
            font-weight: 700; 
            letter-spacing: .7px; 
            text-transform: uppercase; 
            color: var(--text-light); 
            margin-bottom: .3rem;
          }
          .statsValue { 
            font-size: 1.8rem; 
            font-weight: 900; 
            letter-spacing: -.5px; 
            color: var(--text-dark); 
          }
          
          .notices-header { display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:1.2rem; padding:2rem 2.2rem; background:linear-gradient(135deg,#fcfdff,#f5f9ff); border-bottom:1px solid var(--border); position:relative; border-radius:var(--radius-lg); margin-bottom:2rem; box-shadow:var(--shadow-md); }
          .notices-header::after { content:''; position:absolute; inset:0; background:radial-gradient(circle at 85% 15%, rgba(10,120,255,.06), transparent 70%); pointer-events:none; }
          .header-left { display:flex; align-items:center; gap:1.2rem; position:relative; z-index:1; }
          .header-icon { width:56px; height:56px; border-radius:14px; background:linear-gradient(135deg, var(--primary), var(--accent)); display:flex; align-items:center; justify-content:center; color:#fff; box-shadow:0 8px 20px -6px rgba(10,120,255,.4); }
          .notices-title { margin:0; font-size:1.75rem; font-weight:900; letter-spacing:-.6px; color:var(--text-dark); }
          .notices-subtitle { margin:.3rem 0 0; font-size:.72rem; font-weight:700; letter-spacing:.6px; text-transform:uppercase; color:var(--text-mid); display:flex; align-items:center; gap:.4rem; }
          
          .notices-table-card { border:1px solid var(--border); border-radius:18px; overflow:hidden; background:#fff; box-shadow:var(--shadow-md); }
          .notices-table { width:100%; border-collapse:separate; border-spacing:0; table-layout:fixed; }
          .notices-table thead th { background:linear-gradient(135deg,#f2f7ff,#edf4fb); font-weight:800; font-size:.88rem; letter-spacing:.65px; color:var(--text-mid); text-transform:uppercase; padding:18px 20px; border-bottom:2px solid #e3edf6; text-align:center; vertical-align:middle; }
          .notices-table tbody tr { transition:.25s; border-bottom:1px solid #eef4f9; }
          .notices-table tbody tr:nth-of-type(even) { background:#fafcfe; }
          .notices-table tbody tr:hover { background:#f6faff; }
          .notices-table tbody td { padding:18px 20px; font-size:.95rem; font-weight:600; color:var(--text-dark); vertical-align:middle; text-align:center; }
          .notices-table tbody td:first-child { text-align:left; }
          
          .notice-title-cell { display:flex; align-items:center; gap:1rem; min-width:0; }
          .notice-icon { width:44px; height:44px; border-radius:11px; background:linear-gradient(135deg,#e8f2ff,#d6ebff); display:flex; align-items:center; justify-content:center; color:var(--primary); flex-shrink:0; box-shadow:0 3px 8px rgba(10,120,255,.15); }
          .notice-icon svg { font-size:1.2rem !important; }
          .notice-title-text { font-weight:700; color:var(--text-dark); line-height:1.4; flex:1; }
          .notice-details-text { display:inline-block; color:var(--text-mid); font-weight:600; line-height:1.5; word-break:break-word; text-align:center; }
          
          .empty-state { padding:5rem 2.5rem; text-align:center; border:2px dashed #d5e0ea; border-radius:18px; background:linear-gradient(135deg,#fafcfe,#f4f8fb); }
          .empty-icon { font-size:4.5rem !important; color:var(--primary); opacity:.7; margin-bottom:1.5rem; }
          .empty-title { font-size:1.6rem; font-weight:800; color:var(--text-dark); margin-bottom:.7rem; letter-spacing:-.5px; }
          .empty-text { font-size:1.05rem; color:var(--text-mid); font-weight:600; line-height:1.6; }
          
          @media (max-width:1024px){ .pageWrap { padding:1.5rem 1rem; } .whiteBox { border-radius:16px; } .headerSection { padding:1.5rem 1.5rem; } .contentSection { padding:1.5rem; } }
          @media (max-width:900px){ .notices-header { flex-direction:column; align-items:flex-start; } }
          @media (max-width:650px){ .pageWrap { padding:1.5rem 1rem; } .headerSection { padding:1.5rem 1.2rem; } .headerTitle { font-size:1.4rem; } .notices-table thead th, .notices-table tbody td { padding:12px 14px; font-size:.8rem; } }
        `;
        document.head.appendChild(styleEl);
        return () => styleEl.remove();
    }, []);

    const handleTabChange = (event, newValue) => setSelectedTab(newValue);

    const renderTableSection = () => {
        return (
            <Box className="tableWrapper" sx={{ animation: 'slideUp .6s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                <TableContainer>
                    <Table className="customTable" stickyHeader>
                        <TableHead className="customTableHead">
                            <TableRow>
                                <TableCell className="customTableHeadCell" sx={{ width: '12%' }}>
                                    Rank
                                </TableCell>
                                <TableCell className="customTableHeadCell" sx={{ width: '58%', textAlign: 'left !important' }}>
                                    Event Name
                                </TableCell>
                                <TableCell className="customTableHeadCell" sx={{ width: '30%' }}>
                                    Score
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {subjectMarks
                                .sort((a, b) => (b.marksObtained || 0) - (a.marksObtained || 0))
                                .map((result, index) => {
                                if (!result.subName || result.marksObtained == null) return null;
                                return (
                                    <TableRow key={index} className="customTableRow">
                                        <TableCell className="customTableCell">
                                            <Box sx={{ 
                                                width: 50, 
                                                height: 50, 
                                                borderRadius: '13px',
                                                background: index === 0 
                                                    ? 'linear-gradient(135deg, #4caf50, #66bb6a)' 
                                                    : index === 1 
                                                    ? 'linear-gradient(135deg, #2196f3, #42a5f5)'
                                                    : index === 2
                                                    ? 'linear-gradient(135deg, #ff9800, #ffa726)'
                                                    : 'linear-gradient(135deg, #e8f2ff, #d6ebff)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: index < 3 ? '#fff' : 'var(--primary)',
                                                fontWeight: 900,
                                                fontSize: '1.2rem',
                                                boxShadow: index < 3 ? '0 4px 12px rgba(0,0,0,.2)' : '0 3px 8px rgba(10,120,255,.15)',
                                                margin: '0 auto'
                                            }}>
                                                {index + 1}
                                            </Box>
                                        </TableCell>
                                        <TableCell className="customTableCell" sx={{ textAlign: 'left !important' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Box sx={{ 
                                                    width: 56, 
                                                    height: 56, 
                                                    borderRadius: '14px', 
                                                    background: 'linear-gradient(135deg,#e8f2ff,#d6ebff)', 
                                                    display: 'flex', 
                                                    alignItems: 'center', 
                                                    justifyContent: 'center',
                                                    color: 'var(--primary)', 
                                                    boxShadow: '0 4px 12px rgba(10,120,255,.15)',
                                                    flexShrink: 0
                                                }}>
                                                    <EventIcon sx={{ fontSize: '1.5rem' }} />
                                                </Box>
                                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                                    <Typography sx={{ 
                                                        fontWeight: 800, 
                                                        fontSize: '1.05rem', 
                                                        color: 'var(--text-dark)',
                                                        letterSpacing: '-.4px',
                                                        lineHeight: 1.3,
                                                        mb: 0.3
                                                    }}>
                                                        {result.subName.subName}
                                                    </Typography>
                                                    <Typography sx={{ 
                                                        fontWeight: 600, 
                                                        fontSize: '.75rem', 
                                                        color: 'var(--text-light)',
                                                        letterSpacing: '.4px',
                                                        textTransform: 'uppercase'
                                                    }}>
                                                        Event Participation
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell className="customTableCell">
                                            <Box sx={{ 
                                                display: 'inline-flex', 
                                                alignItems: 'center',
                                                gap: 1.2,
                                                padding: '.8rem 1.6rem', 
                                                borderRadius: '13px', 
                                                background: result.marksObtained >= 80 
                                                    ? 'linear-gradient(135deg,#e8f5e9,#c8e6c9)'
                                                    : result.marksObtained >= 60
                                                    ? 'linear-gradient(135deg,#e3f2fd,#bbdefb)'
                                                    : result.marksObtained >= 40
                                                    ? 'linear-gradient(135deg,#fff3e0,#ffe0b2)'
                                                    : 'linear-gradient(135deg,#ffebee,#ffcdd2)',
                                                color: result.marksObtained >= 80 
                                                    ? '#2e7d32'
                                                    : result.marksObtained >= 60
                                                    ? '#1565c0'
                                                    : result.marksObtained >= 40
                                                    ? '#e65100'
                                                    : '#c62828',
                                                fontWeight: 800, 
                                                fontSize: '1.1rem',
                                                boxShadow: '0 4px 12px rgba(0,0,0,.1)',
                                                letterSpacing: '-.3px'
                                            }}>
                                                <Box sx={{ 
                                                    width: 36, 
                                                    height: 36, 
                                                    borderRadius: '10px',
                                                    background: result.marksObtained >= 80 
                                                        ? '#2e7d32'
                                                        : result.marksObtained >= 60
                                                        ? '#1565c0'
                                                        : result.marksObtained >= 40
                                                        ? '#e65100'
                                                        : '#c62828',
                                                    color: '#fff',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '.9rem',
                                                    fontWeight: 900
                                                }}>
                                                    {result.marksObtained}
                                                </Box>
                                                Points
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        );
    };

    const renderChartSection = () => {
        return (
            <Box sx={{ animation: 'slideUp .7s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                <Box sx={{ 
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                    gap: 2,
                    mb: 3
                }}>
                    <Box sx={{ 
                        padding: '1.5rem',
                        background: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)',
                        borderRadius: '16px',
                        border: '2px solid #a5d6a7',
                        boxShadow: '0 4px 12px rgba(46,125,50,.12)'
                    }}>
                        <Typography sx={{ 
                            fontSize: '.75rem', 
                            fontWeight: 800, 
                            letterSpacing: '.7px',
                            textTransform: 'uppercase',
                            color: '#1b5e20',
                            mb: 0.8
                        }}>
                            Highest Score
                        </Typography>
                        <Typography sx={{ 
                            fontSize: '2.5rem', 
                            fontWeight: 900, 
                            color: '#2e7d32',
                            letterSpacing: '-1px',
                            lineHeight: 1
                        }}>
                            {Math.max(...subjectMarks.map(s => s.marksObtained || 0))}
                        </Typography>
                        <Typography sx={{ 
                            fontSize: '.8rem', 
                            fontWeight: 600,
                            color: '#388e3c',
                            mt: 0.5
                        }}>
                            Points
                        </Typography>
                    </Box>
                    <Box sx={{ 
                        padding: '1.5rem',
                        background: 'linear-gradient(135deg, #ffebee, #ffcdd2)',
                        borderRadius: '16px',
                        border: '2px solid #ef9a9a',
                        boxShadow: '0 4px 12px rgba(198,40,40,.12)'
                    }}>
                        <Typography sx={{ 
                            fontSize: '.75rem', 
                            fontWeight: 800, 
                            letterSpacing: '.7px',
                            textTransform: 'uppercase',
                            color: '#b71c1c',
                            mb: 0.8
                        }}>
                            Lowest Score
                        </Typography>
                        <Typography sx={{ 
                            fontSize: '2.5rem', 
                            fontWeight: 900, 
                            color: '#c62828',
                            letterSpacing: '-1px',
                            lineHeight: 1
                        }}>
                            {Math.min(...subjectMarks.map(s => s.marksObtained || 0))}
                        </Typography>
                        <Typography sx={{ 
                            fontSize: '.8rem', 
                            fontWeight: 600,
                            color: '#d32f2f',
                            mt: 0.5
                        }}>
                            Points
                        </Typography>
                    </Box>
                </Box>
                <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />
            </Box>
        );
    };

    const renderClassDetailsSection = () => {
        return (
            <Box sx={{ width: '100%' }}>
                <Box className="notices-header" sx={{ animation: 'slideUp .6s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                    <Box className="header-left">
                        <Box className="header-icon">
                            <EventIcon sx={{ fontSize: '1.6rem' }} />
                        </Box>
                        <Box>
                            <Typography className="notices-title" sx={{ fontSize: { xs: '1.3rem', sm: '1.75rem' } }}>Community Events</Typography>
                            <Typography className="notices-subtitle">
                                <EventIcon sx={{ fontSize: 'inherit' }} />
                                Your Event Details
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ px: { xs: 2, sm: 3 }, py: 2 }}>
                    <Box sx={{ 
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        gap: 1, mb: 3, padding: '1rem 1.5rem', 
                        background: 'linear-gradient(135deg, #e8f2ff, #f0f7ff)',
                        borderRadius: '14px', border: '2px solid #d6ebff',
                        boxShadow: '0 4px 12px rgba(10,120,255,.08)'
                    }}>
                        <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-mid)' }}>
                            Community:
                        </Typography>
                        <Typography sx={{ 
                            fontWeight: 900, fontSize: '1.15rem', 
                            color: 'var(--accent)', letterSpacing: '-.3px',
                            textShadow: '0 2px 8px rgba(7,179,137,.12)'
                        }}>
                            {userDetails?.sclassName?.sclassName}
                        </Typography>
                    </Box>
                    
                    {subjectsList && subjectsList.length > 0 ? (
                        <Box>
                            <Typography sx={{ 
                                fontWeight: 800, fontSize: '1.05rem', mb: 2, 
                                color: 'var(--text-dark)', letterSpacing: '-.3px',
                                textAlign: 'center'
                            }}>
                                Available Events
                            </Typography>
                            <TableContainer className="notices-table-card" sx={{ 
                                boxShadow: '0 4px 24px rgba(25,40,60,.10)', 
                                borderRadius: '18px', 
                                animation: 'slideUp .7s cubic-bezier(0.16, 1, 0.3, 1)' 
                            }}>
                                <Table className="notices-table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Event Name</TableCell>
                                            <TableCell>Event Code</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {subjectsList.map((subject, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <Box className="notice-title-cell">
                                                        <Box className="notice-icon">
                                                            <EventIcon sx={{ fontSize: '1.2rem' }} />
                                                        </Box>
                                                        <span className="notice-title-text">{subject.subName}</span>
                                                    </Box>
                                                </TableCell>
                                                <TableCell>
                                                    <span className="notice-details-text">{subject.subCode}</span>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    ) : (
                        <Box className="empty-state" sx={{ animation: 'slideUp .8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                            <EventIcon className="empty-icon" />
                            <Typography className="empty-title">No Events Found</Typography>
                            <Typography className="empty-text">
                                Your community does not have any events yet.<br />Check back later or contact your admin for updates.
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>
        );
    };

    return (
        <Box className="pageWrap">
            <Box className="mainContainer">
                <Box className="whiteBox">
                    {/* Header */}
                    <Box className="headerSection">
                        <Box className="headerLeft">
                            <Box className="headerIcon">
                                <EventIcon style={{ fontSize: '2rem' }} />
                            </Box>
                            <Box className="headerTitleGroup">
                                <Typography className="headerTitle">Events</Typography>
                                <Typography className="headerSubtitle">
                                    <EventIcon sx={{ fontSize: 'inherit', mr: 0.5 }} />
                                    Your Event Overview
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Content */}
                    <Box className="contentSection">
                        {loading ? (
                            <Box>
                                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 2, mb: 3 }}>
                                    <Skeleton variant="rectangular" height={100} sx={{ borderRadius: 2 }} />
                                    <Skeleton variant="rectangular" height={100} sx={{ borderRadius: 2 }} />
                                    <Skeleton variant="rectangular" height={100} sx={{ borderRadius: 2 }} />
                                </Box>
                                <Skeleton variant="text" height={55} sx={{ mb: 2, borderRadius: 2 }} />
                                <Skeleton variant="rectangular" height={75} sx={{ mb: 1.5, borderRadius: 2 }} />
                                <Skeleton variant="rectangular" height={75} sx={{ mb: 1.5, borderRadius: 2 }} />
                                <Skeleton variant="rectangular" height={75} sx={{ borderRadius: 2 }} />
                            </Box>
                        ) : (
                            <>
                                {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0 ? (
                                    <>
                                        {/* Stats Cards */}
                                        <Box sx={{ 
                                            display: 'grid', 
                                            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
                                            gap: 2,
                                            mb: 3,
                                            animation: 'slideUp .5s cubic-bezier(0.16, 1, 0.3, 1)'
                                        }}>
                                            <Box className="statsCard">
                                                <Box className="statsIconBox">
                                                    <EventIcon sx={{ fontSize: '1.5rem' }} />
                                                </Box>
                                                <Box className="statsContent">
                                                    <Typography className="statsLabel">Total Events</Typography>
                                                    <Typography className="statsValue">{subjectMarks.length}</Typography>
                                                </Box>
                                            </Box>
                                            <Box className="statsCard">
                                                <Box className="statsIconBox" sx={{ background: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)!important', color: '#2e7d32!important' }}>
                                                    <EventIcon sx={{ fontSize: '1.5rem' }} />
                                                </Box>
                                                <Box className="statsContent">
                                                    <Typography className="statsLabel">Total Score</Typography>
                                                    <Typography className="statsValue" sx={{ color: '#2e7d32!important' }}>
                                                        {subjectMarks.reduce((acc, curr) => acc + (curr.marksObtained || 0), 0)}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Box className="statsCard" sx={{ gridColumn: { xs: '1', lg: 'span 1' } }}>
                                                <Box className="statsIconBox" sx={{ background: 'linear-gradient(135deg, #fff3e0, #ffe0b2)!important', color: '#e65100!important' }}>
                                                    <EventIcon sx={{ fontSize: '1.5rem' }} />
                                                </Box>
                                                <Box className="statsContent">
                                                    <Typography className="statsLabel">Average Score</Typography>
                                                    <Typography className="statsValue" sx={{ color: '#e65100!important' }}>
                                                        {subjectMarks.length > 0 
                                                            ? Math.round(subjectMarks.reduce((acc, curr) => acc + (curr.marksObtained || 0), 0) / subjectMarks.length)
                                                            : 0}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>

                                        <TabContext value={selectedTab}>
                                            <Box className="tabsWrapper">
                                                <TabList onChange={handleTabChange} variant="fullWidth">
                                                    <Tab 
                                                        label="Table View" 
                                                        value="table"
                                                        icon={<EventIcon />}
                                                        iconPosition="start"
                                                    />
                                                    <Tab 
                                                        label="Chart View" 
                                                        value="chart"
                                                        icon={<EventIcon />}
                                                        iconPosition="start"
                                                    />
                                                </TabList>
                                            </Box>
                                            <TabPanel value="table" sx={{ p: 0, pt: 3 }}>
                                                <Box sx={{ px: 2.5, mb: 2 }}>
                                                    <Box sx={{ 
                                                        display: 'flex', 
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        flexWrap: 'wrap',
                                                        gap: 2,
                                                        padding: '1.2rem 1.5rem',
                                                        background: 'linear-gradient(135deg, #f9fbfe 0%, #f3f7fc 100%)',
                                                        borderRadius: '14px',
                                                        border: '1px solid var(--border)',
                                                        boxShadow: '0 2px 8px rgba(0,0,0,.04)'
                                                    }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                                                            <Box sx={{ 
                                                                width: 44, 
                                                                height: 44, 
                                                                borderRadius: '11px',
                                                                background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                color: '#fff',
                                                                boxShadow: '0 4px 12px rgba(10,120,255,.25)'
                                                            }}>
                                                                <EventIcon sx={{ fontSize: '1.2rem' }} />
                                                            </Box>
                                                            <Box>
                                                                <Typography sx={{ 
                                                                    fontWeight: 900, 
                                                                    fontSize: '1.1rem', 
                                                                    color: 'var(--text-dark)', 
                                                                    letterSpacing: '-.4px',
                                                                    lineHeight: 1.2
                                                                }}>
                                                                    Your Event Performance
                                                                </Typography>
                                                                <Typography sx={{ 
                                                                    fontWeight: 600, 
                                                                    fontSize: '.75rem', 
                                                                    color: 'var(--text-light)',
                                                                    letterSpacing: '.3px',
                                                                    textTransform: 'uppercase',
                                                                    mt: 0.3
                                                                }}>
                                                                    Ranked by Score
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                        <Box sx={{ 
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 0.8,
                                                            padding: '.6rem 1rem',
                                                            background: 'linear-gradient(135deg, #e8f2ff, #d6ebff)',
                                                            borderRadius: '10px',
                                                            border: '1px solid #bbdefb'
                                                        }}>
                                                            <EventIcon sx={{ fontSize: '1rem', color: 'var(--primary)' }} />
                                                            <Typography sx={{ 
                                                                fontWeight: 800, 
                                                                fontSize: '.85rem',
                                                                color: 'var(--primary)',
                                                                letterSpacing: '.2px'
                                                            }}>
                                                                {subjectMarks.length} Events
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                                {renderTableSection()}
                                            </TabPanel>
                                            <TabPanel value="chart" sx={{ p: 0, pt: 3 }}>
                                                <Box sx={{ px: 2.5, mb: 2 }}>
                                                    <Box sx={{ 
                                                        display: 'flex', 
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        flexWrap: 'wrap',
                                                        gap: 2,
                                                        padding: '1.2rem 1.5rem',
                                                        background: 'linear-gradient(135deg, #f9fbfe 0%, #f3f7fc 100%)',
                                                        borderRadius: '14px',
                                                        border: '1px solid var(--border)',
                                                        boxShadow: '0 2px 8px rgba(0,0,0,.04)'
                                                    }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                                                            <Box sx={{ 
                                                                width: 44, 
                                                                height: 44, 
                                                                borderRadius: '11px',
                                                                background: 'linear-gradient(135deg, var(--accent), #058b65)',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                color: '#fff',
                                                                boxShadow: '0 4px 12px rgba(7,179,137,.25)'
                                                            }}>
                                                                <EventIcon sx={{ fontSize: '1.2rem' }} />
                                                            </Box>
                                                            <Box>
                                                                <Typography sx={{ 
                                                                    fontWeight: 900, 
                                                                    fontSize: '1.1rem', 
                                                                    color: 'var(--text-dark)', 
                                                                    letterSpacing: '-.4px',
                                                                    lineHeight: 1.2
                                                                }}>
                                                                    Performance Analytics
                                                                </Typography>
                                                                <Typography sx={{ 
                                                                    fontWeight: 600, 
                                                                    fontSize: '.75rem', 
                                                                    color: 'var(--text-light)',
                                                                    letterSpacing: '.3px',
                                                                    textTransform: 'uppercase',
                                                                    mt: 0.3
                                                                }}>
                                                                    Visual Overview
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                        <Box sx={{ 
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 0.8,
                                                            padding: '.6rem 1rem',
                                                            background: 'linear-gradient(135deg, #e6f8f3, #c8e6d7)',
                                                            borderRadius: '10px',
                                                            border: '1px solid #a5d6a7'
                                                        }}>
                                                            <EventIcon sx={{ fontSize: '1rem', color: 'var(--accent)' }} />
                                                            <Typography sx={{ 
                                                                fontWeight: 800, 
                                                                fontSize: '.85rem',
                                                                color: 'var(--accent)',
                                                                letterSpacing: '.2px'
                                                            }}>
                                                                Data Insights
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                                <Box sx={{ 
                                                    background: '#fff', 
                                                    borderRadius: '18px', 
                                                    padding: '2rem',
                                                    border: '1px solid var(--border)',
                                                    boxShadow: 'var(--shadow-sm)',
                                                    mx: 2.5
                                                }}>
                                                    {renderChartSection()}
                                                </Box>
                                            </TabPanel>
                                        </TabContext>
                                    </>
                                ) : (
                                    renderClassDetailsSection()
                                )}
                            </>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default StudentSubjects;
