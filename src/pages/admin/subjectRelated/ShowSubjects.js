import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import PostAddIcon from '@mui/icons-material/PostAdd';
import {
    Paper, Box, IconButton, Typography, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Fade, Skeleton,
    TablePagination, TextField, InputAdornment, Tab
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EventIcon from '@mui/icons-material/Event';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GroupsIcon from '@mui/icons-material/Groups';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';
import { format } from 'date-fns';

const ShowSubjects = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { subjectsList, loading, error, response } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector(state => state.user);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [tabValue, setTabValue] = useState('1');

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
        setPage(0); // Reset to first page when switching tabs
    };

    useEffect(() => {
        const styleEl = document.createElement("style");
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
            --danger:#c53030;
            --radius-lg:20px;
            --shadow-sm:0 2px 8px rgba(30,45,60,0.06);
            --shadow-md:0 4px 16px rgba(25,40,60,0.08);
            --shadow-lg:0 8px 28px rgba(25,40,60,0.12);
          }
          * { 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
            box-sizing: border-box;
          }
          
          .pageWrap {
            background: linear-gradient(135deg, #f0f7ff 0%, #e8f2ff 50%, #f3f6fa 100%) fixed;
            min-height:100vh;
            padding:2rem 1.5rem;
          }
          .mainContainer {
            max-width:1380px;
            margin:0 auto;
          }
          .whiteBox {
            background:var(--panel-bg);
            border:1px solid var(--border);
            border-radius:var(--radius-lg);
            box-shadow:var(--shadow-lg);
            overflow:hidden;
            animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          }
          @keyframes slideUp {
            from { opacity:0; transform:translateY(40px); }
            to { opacity:1; transform:translateY(0); }
          }
          .headerSection {
            display:flex;
            align-items:center;
            justify-content:space-between;
            gap:1.5rem;
            padding:2rem 2.5rem;
            flex-wrap:wrap;
            background:linear-gradient(135deg,#fafcff 0%, #f5f9ff 100%);
            border-bottom:1px solid var(--border);
          }
          .headerLeft {
            display:flex;
            align-items:center;
            gap:1.2rem;
          }
          .headerIcon {
            width:68px;
            height:68px;
            border-radius:18px;
            display:flex;
            align-items:center;
            justify-content:center;
            background:linear-gradient(135deg,var(--primary) 0%, var(--accent) 100%);
            color:#fff; 
            box-shadow:0 10px 30px -8px rgba(10,120,255,.45);
            transition:transform .3s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          .headerIcon:hover { transform:scale(1.1) rotate(-5deg); }
          .headerTitleGroup {
            display:flex;
            flex-direction:column;
            gap:.35rem;
          }
          .headerTitle {
            margin:0; 
            color:var(--text-dark); 
            letter-spacing:-.8px;
            font-weight:900; 
            font-size:2rem; 
            line-height:1.1;
          }
          .headerSubtitle {
            margin:0;
            color:var(--text-mid); 
            font-size:.8rem;
            text-transform:uppercase; 
            letter-spacing:1.1px; 
            font-weight:800;
          }
          .topActions {
            display:flex;
            gap:1rem;
            align-items:center;
          }
          .searchBar {
            flex:1;
            min-width:320px;
          }
          .contentSection {
            padding:2.5rem;
          }
          .tableWrapper {
            background:#fff;
            border:1px solid #e8eef5;
            border-radius:18px;
            overflow:hidden;
            box-shadow:var(--shadow-sm);
          }
          .customTable { 
            width:100%; 
            table-layout:fixed;
          }
          .customTableHead {
            background:linear-gradient(135deg,#f9fbfe 0%, #f3f7fc 100%);
          }
          .customTableHeadCell {
            font-size:.82rem !important;
            font-weight:900 !important;
            text-transform:uppercase;
            letter-spacing:1.1px;
            color:var(--text-mid) !important;
            border-bottom:2px solid var(--border) !important;
            padding:1.3rem 1.5rem !important;
            white-space:nowrap;
            line-height:1.3;
            text-align:center !important;
            background:transparent !important;
          }
          .customTableRow {
            transition:all .25s cubic-bezier(0.4, 0, 0.2, 1);
            border-bottom:1px solid #f5f8fb;
            background:#fff;
          }
          .customTableRow:hover {
            background:linear-gradient(90deg,#fbfdff 0%,#f7fbff 100%);
            transform:translateX(6px);
            box-shadow:0 4px 20px -6px rgba(10,120,255,.15);
          }
          .customTableCell {
            font-size:.9rem !important;
            font-weight:500 !important;
            color:var(--text-dark) !important;
            border-bottom:1px solid #f5f8fb !important;
            padding:1.2rem 1.5rem !important;
            vertical-align:middle !important;
            line-height:1.5;
            text-align:center !important;
          }
          .eventNameCell {
            font-weight:700 !important;
            color:var(--primary) !important;
            text-align:center !important;
            font-size:.92rem !important;
            letter-spacing:-.3px;
          }
          .dateChip {
            background:#e8f2ff !important;
            color:#0960d9 !important;
            font-weight:700 !important;
            border-radius:11px !important;
            font-size:.76rem !important;
            padding:.35rem .6rem !important;
            height:auto !important;
            letter-spacing:.2px;
            box-shadow:0 2px 10px -3px rgba(9,96,217,.25);
            transition:all .2s ease;
          }
          .dateChip:hover {
            transform:translateY(-2px);
            box-shadow:0 4px 14px -3px rgba(9,96,217,.35);
          }
          .communityChip {
            background:#e6f8f3 !important;
            color:#067a5f !important;
            font-weight:700 !important;
            border-radius:11px !important;
            font-size:.76rem !important;
            letter-spacing:.2px;
            box-shadow:0 2px 10px -3px rgba(6,122,95,.25);
            transition:all .2s ease;
          }
          .communityChip:hover {
            transform:translateY(-2px);
            box-shadow:0 4px 14px -3px rgba(6,122,95,.35);
          }
          .actionCell {
            display:flex;
            gap:.6rem;
            align-items:center;
            justify-content:center;
          }
          .emptyState {
            text-align:center;
            padding:5rem 3rem;
            background:linear-gradient(135deg,#fbfdff 0%,#f7fbff 100%);
            border-radius:18px;
            margin:1rem 0;
          }
          .emptyStateIcon {
            font-size:5.5rem !important;
            color:var(--text-light);
            opacity:.3;
            margin-bottom:1.8rem;
            animation:float 3.5s ease-in-out infinite;
          }
          @keyframes float {
            0%, 100% { transform:translateY(0) rotate(0deg); }
            50% { transform:translateY(-12px) rotate(5deg); }
          }
          .emptyStateTitle {
            font-size:1.6rem;
            font-weight:900;
            color:var(--text-dark);
            margin-bottom:.8rem;
            letter-spacing:-.5px;
          }
          .emptyStateText {
            color:var(--text-light);
            margin-bottom:2.2rem;
            font-size:1rem;
            line-height:1.6;
            max-width:460px;
            margin-left:auto;
            margin-right:auto;
          }
          .paginationContainer {
            border-top:1px solid var(--border);
            background:linear-gradient(135deg,#fafcff 0%, #f8fafd 100%);
          }
          .tabsWrapper {
            border-bottom: 2px solid var(--border);
            background: linear-gradient(135deg, #fafcff 0%, #f8fafd 100%);
            padding: 0 2.5rem;
          }
          .tabsWrapper .MuiTabs-root {
            min-height: 56px;
          }
          .tabsWrapper .MuiTab-root {
            font-weight: 700;
            font-size: .92rem;
            text-transform: none;
            letter-spacing: .3px;
            min-height: 56px;
            padding: 12px 24px;
            color: var(--text-mid);
            transition: all .2s ease;
          }
          .tabsWrapper .MuiTab-root.Mui-selected {
            color: var(--primary);
          }
          .tabsWrapper .MuiTabs-indicator {
            height: 3px;
            border-radius: 3px 3px 0 0;
            background: linear-gradient(90deg, var(--primary), var(--accent));
          }
          .tabPanelContent {
            padding: 0;
          }
          .tabBadge {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 24px;
            height: 22px;
            padding: 0 8px;
            border-radius: 11px;
            background: linear-gradient(135deg, #e8f2ff, #dce8ff);
            color: var(--primary);
            font-size: .75rem;
            font-weight: 800;
            margin-left: 8px;
          }
          .Mui-selected .tabBadge {
            background: linear-gradient(135deg, var(--primary), var(--accent));
            color: #fff;
          }
          @media (max-width:1024px){
            .pageWrap { padding:1.5rem 1rem; }
            .whiteBox { border-radius:16px; }
            .headerSection { 
              padding:1.8rem 1.5rem; 
              flex-direction:column; 
              align-items:flex-start; 
            }
            .topActions { 
              width:100%; 
              flex-direction:column; 
            }
            .searchBar { 
              max-width:100%; 
              min-width:100%;
            }
            .contentSection { padding:1.8rem 1.5rem; }
            .headerTitle { font-size:1.7rem; }
            .headerIcon { width:58px; height:58px; }
            .tabsWrapper { padding: 0 1.5rem; }
          }
          @media (max-width:768px){
            .customTableHeadCell { 
              font-size:.72rem !important; 
              padding:1rem 1rem !important; 
            }
            .customTableCell { 
              font-size:.84rem !important; 
              padding:.9rem 1rem !important; 
            }
            .emptyState { padding:4rem 2rem; }
            .headerSection { padding:1.5rem 1.2rem; }
            .contentSection { padding:1.5rem 1.2rem; }
            .tabsWrapper { padding: 0 1.2rem; }
          }
        `;
        document.head.appendChild(styleEl);
        return () => styleEl.remove();
    }, []);

    useEffect(() => {
        dispatch(getSubjectList(currentUser._id, "Admin", "AllSubjects"));
    }, [currentUser._id, dispatch]);

    const deleteHandler = (deleteID, address) => {
        setMessage("Sorry, the delete function has been disabled for now.");
        setShowPopup(true);
    };

    const subjectRows = subjectsList?.map((subject) => ({
        subName: subject.subName,
        startDate: format(new Date(subject.startDate), 'dd-MM-yyyy HH:mm'),
        endDate: format(new Date(subject.endDate), 'dd-MM-yyyy HH:mm'),
        startDateRaw: new Date(subject.startDate),
        endDateRaw: new Date(subject.endDate),
        sclassName: subject.sclassName.sclassName,
        sclassID: subject.sclassName._id,
        id: subject._id,
    })) || [];

    // Get current date for comparison
    const now = new Date();

    // Separate ongoing/upcoming and completed events
    const ongoingUpcomingEvents = subjectRows
        .filter(row => row.endDateRaw >= now)
        .sort((a, b) => b.startDateRaw - a.startDateRaw); // Latest first

    const completedEvents = subjectRows
        .filter(row => row.endDateRaw < now)
        .sort((a, b) => b.endDateRaw - a.endDateRaw); // Latest completed first

    // Search filter based on current tab
    const currentEvents = tabValue === '1' ? ongoingUpcomingEvents : completedEvents;
    
    const filteredRows = currentEvents.filter((row) =>
        row.subName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.sclassName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedRows = filteredRows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    const actions = [
        {
            icon: <PostAddIcon color="primary" />,
            name: 'Add New Event',
            action: () => navigate("/Admin/events/chooseclass")
        },
        {
            icon: <DeleteIcon color="error" />,
            name: 'Delete All Events',
            action: () => deleteHandler(currentUser._id, "Subjects")
        }
    ];

    return (
        <Box className="pageWrap">
            <Box className="mainContainer">
                <Fade in timeout={500}>
                    <Box className="whiteBox">
                        {/* Header */}
                        <Box className="headerSection">
                            <Box className="headerLeft">
                                <Box className="headerIcon">
                                    <EventIcon style={{ fontSize: "2.1rem" }} />
                                </Box>
                                <Box className="headerTitleGroup">
                                    <Typography className="headerTitle">Events</Typography>
                                    <Typography className="headerSubtitle">
                                        Manage Community Events
                                    </Typography>
                                </Box>
                            </Box>

                            {!response && subjectRows.length > 0 && (
                                <Box className="topActions">
                                    <TextField
                                        className="searchBar"
                                        placeholder="Search events or communities..."
                                        variant="outlined"
                                        size="medium"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon style={{ color: '#718096', fontSize: '1.3rem' }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '14px',
                                                background: '#f9fbfc',
                                                fontSize: '.9rem',
                                                fontWeight: 500,
                                                border: '1.5px solid #e8eef5',
                                                transition: 'all .2s ease',
                                                '&:hover': {
                                                    borderColor: '#d4dde6',
                                                    background: '#fff',
                                                },
                                                '&.Mui-focused': {
                                                    background: '#fff',
                                                    borderColor: '#0a78ff',
                                                    boxShadow: '0 0 0 4px rgba(10,120,255,.08)',
                                                }
                                            }
                                        }}
                                    />

                                    <GreenButton
                                        variant="contained"
                                        startIcon={<PostAddIcon />}
                                        onClick={() => navigate("/Admin/events/choosecommunity")}
                                        sx={{
                                            px: 3,
                                            py: 1.2,
                                            fontWeight: 700,
                                            fontSize: '.9rem',
                                            borderRadius: '14px',
                                            boxShadow: '0 6px 20px -6px rgba(7,179,137,.4)',
                                            textTransform: 'none',
                                            letterSpacing: '.3px',
                                            '&:hover': {
                                                boxShadow: '0 8px 28px -6px rgba(7,179,137,.5)',
                                                transform: 'translateY(-3px)',
                                            },
                                            transition: 'all .25s cubic-bezier(0.4, 0, 0.2, 1)',
                                        }}
                                    >
                                        Add Event
                                    </GreenButton>
                                </Box>
                            )}
                        </Box>

                        {/* Content Section */}
                        <Box className="contentSection">
                            {/* Loading State */}
                            {loading ? (
                                <Box>
                                    <Skeleton variant="text" height={55} sx={{ mb: 2, borderRadius: 2 }} />
                                    <Skeleton variant="rectangular" height={75} sx={{ mb: 1.5, borderRadius: 2 }} />
                                    <Skeleton variant="rectangular" height={75} sx={{ mb: 1.5, borderRadius: 2 }} />
                                    <Skeleton variant="rectangular" height={75} sx={{ borderRadius: 2 }} />
                                </Box>
                            ) : (
                                <>
                                    {/* Empty State */}
                                    {response || subjectRows.length === 0 ? (
                                        <Box className="emptyState">
                                            <EventIcon className="emptyStateIcon" />
                                            <Typography className="emptyStateTitle">
                                                No Events Found
                                            </Typography>
                                            <Typography className="emptyStateText">
                                                Create your first event to get started managing community activities and engagements
                                            </Typography>
                                            <GreenButton
                                                variant="contained"
                                                startIcon={<PostAddIcon />}
                                                onClick={() => navigate("/Admin/events/chooseclass")}
                                                sx={{
                                                    px: 3.8,
                                                    py: 1.5,
                                                    fontWeight: 700,
                                                    fontSize: '.92rem',
                                                    borderRadius: '14px',
                                                    textTransform: 'none',
                                                    boxShadow: '0 6px 20px -6px rgba(7,179,137,.4)',
                                                }}
                                            >
                                                Create First Event
                                            </GreenButton>
                                        </Box>
                                    ) : (
                                        /* Events Table with Tabs */
                                        <TabContext value={tabValue}>
                                            <Box className="tabsWrapper">
                                                <TabList onChange={handleTabChange} variant="fullWidth">
                                                    <Tab 
                                                        label={
                                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                Ongoing / Upcoming
                                                                <span className="tabBadge">{ongoingUpcomingEvents.length}</span>
                                                            </Box>
                                                        } 
                                                        value="1" 
                                                    />
                                                    <Tab 
                                                        label={
                                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                <CheckCircleIcon sx={{ fontSize: '1.1rem', mr: 0.8 }} />
                                                                Completed
                                                                <span className="tabBadge">{completedEvents.length}</span>
                                                            </Box>
                                                        } 
                                                        value="2" 
                                                    />
                                                </TabList>
                                            </Box>

                                            <TabPanel value="1" className="tabPanelContent">
                                                <Box className="tableWrapper">
                                            <TableContainer>
                                                <Table className="customTable" stickyHeader>
                                                    <TableHead className="customTableHead">
                                                        <TableRow>
                                                            <TableCell className="customTableHeadCell" sx={{ width: '27%' }}>
                                                                Event Name
                                                            </TableCell>
                                                            <TableCell className="customTableHeadCell" sx={{ width: '23%' }}>
                                                                Start Date & Time
                                                            </TableCell>
                                                            <TableCell className="customTableHeadCell" sx={{ width: '23%' }}>
                                                                End Date & Time
                                                            </TableCell>
                                                            <TableCell className="customTableHeadCell" sx={{ width: '17%' }}>
                                                                Community
                                                            </TableCell>
                                                            <TableCell className="customTableHeadCell" sx={{ width: '10%' }}>
                                                                Actions
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {paginatedRows.map((row) => (
                                                            <TableRow key={row.id} className="customTableRow">
                                                                <TableCell className="customTableCell">
                                                                    <Box sx={{ 
                                                                        display: 'flex', 
                                                                        alignItems: 'center', 
                                                                        gap: 1.2 
                                                                    }}>
                                                                        <Box sx={{
                                                                            width: '42px',
                                                                            height: '42px',
                                                                            borderRadius: '12px',
                                                                            background: 'linear-gradient(135deg, #0a78ff, #07b389)',
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            justifyContent: 'center',
                                                                            color: '#fff',
                                                                            fontWeight: 800,
                                                                            fontSize: '1rem',
                                                                            flexShrink: 0,
                                                                            boxShadow: '0 4px 12px rgba(10,120,255,0.2)'
                                                                        }}>
                                                                            <EventIcon sx={{ fontSize: '1.2rem' }} />
                                                                        </Box>
                                                                        <Box sx={{ textAlign: 'left' }}>
                                                                            <Typography sx={{
                                                                                fontWeight: 700,
                                                                                fontSize: '.95rem',
                                                                                color: '#1a202c',
                                                                                lineHeight: 1.3,
                                                                                textAlign: 'left',
                                                                                whiteSpace: 'normal',
                                                                                wordBreak: 'break-word',
                                                                                overflowWrap: 'break-word'
                                                                            }}>
                                                                                {row.subName}
                                                                            </Typography>
                                                                        </Box>
                                                                    </Box>
                                                                </TableCell>
                                                                <TableCell className="customTableCell">
                                                                    <Box sx={{
                                                                        display: 'inline-flex',
                                                                        alignItems: 'center',
                                                                        gap: 0.8,
                                                                        padding: '6px 12px',
                                                                        borderRadius: '10px',
                                                                        background: 'linear-gradient(135deg, #e6f7ff, #f0f9ff)',
                                                                        border: '1.5px solid #bae7ff',
                                                                        width: 'fit-content'
                                                                    }}>
                                                                        <CalendarTodayIcon sx={{ 
                                                                            fontSize: '.9rem', 
                                                                            color: '#0a78ff' 
                                                                        }} />
                                                                        <Typography sx={{
                                                                            fontSize: '.85rem',
                                                                            fontWeight: 700,
                                                                            color: '#1a202c',
                                                                            lineHeight: 1
                                                                        }}>
                                                                            {row.startDate}
                                                                        </Typography>
                                                                    </Box>
                                                                </TableCell>
                                                                <TableCell className="customTableCell">
                                                                    <Box sx={{
                                                                        display: 'inline-flex',
                                                                        alignItems: 'center',
                                                                        gap: 0.8,
                                                                        padding: '6px 12px',
                                                                        borderRadius: '10px',
                                                                        background: 'linear-gradient(135deg, #e8f5e9, #f1f8f4)',
                                                                        border: '1.5px solid #b9e4c9',
                                                                        width: 'fit-content'
                                                                    }}>
                                                                        <CalendarTodayIcon sx={{ 
                                                                            fontSize: '.9rem', 
                                                                            color: '#07b389' 
                                                                        }} />
                                                                        <Typography sx={{
                                                                            fontSize: '.85rem',
                                                                            fontWeight: 700,
                                                                            color: '#1a202c',
                                                                            lineHeight: 1
                                                                        }}>
                                                                            {row.endDate}
                                                                        </Typography>
                                                                    </Box>
                                                                </TableCell>
                                                                <TableCell className="customTableCell">
                                                                    <Box sx={{
                                                                        display: 'inline-flex',
                                                                        alignItems: 'center',
                                                                        gap: 0.8,
                                                                        padding: '8px 14px',
                                                                        borderRadius: '12px',
                                                                        background: 'linear-gradient(135deg, #fff3e0, #fff8e8)',
                                                                        border: '1.5px solid #ffe0b2',
                                                                        boxShadow: '0 2px 6px rgba(255,152,0,0.08)'
                                                                    }}>
                                                                        <GroupsIcon sx={{ 
                                                                            fontSize: '1.1rem', 
                                                                            color: '#f57c00' 
                                                                        }} />
                                                                        <Typography sx={{
                                                                            fontSize: '.88rem',
                                                                            fontWeight: 700,
                                                                            color: '#1a202c'
                                                                        }}>
                                                                            {row.sclassName}
                                                                        </Typography>
                                                                    </Box>
                                                                </TableCell>
                                                                <TableCell className="customTableCell">
                                                                    <Box className="actionCell">
                                                                        <BlueButton
                                                                            variant="contained"
                                                                            size="small"
                                                                            onClick={() => navigate(`/Admin/events/subject/${row.sclassID}/${row.id}`)}
                                                                            sx={{
                                                                                fontSize: '.82rem',
                                                                                px: 1.7,
                                                                                py: .7,
                                                                                fontWeight: 700,
                                                                                borderRadius: '11px',
                                                                                textTransform: 'none',
                                                                                boxShadow: '0 3px 10px -3px rgba(10,120,255,.3)',
                                                                                '&:hover': {
                                                                                    boxShadow: '0 5px 16px -3px rgba(10,120,255,.4)',
                                                                                    transform: 'translateY(-2px)',
                                                                                },
                                                                                transition: 'all .2s ease',
                                                                            }}
                                                                        >
                                                                            <VisibilityIcon style={{ marginRight: '.45rem', fontSize: '.92rem' }} />
                                                                            View
                                                                        </BlueButton>
                                                                    </Box>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>

                                            {/* Pagination */}
                                            <TablePagination
                                                className="paginationContainer"
                                                component="div"
                                                count={filteredRows.length}
                                                page={page}
                                                onPageChange={handleChangePage}
                                                rowsPerPage={rowsPerPage}
                                                onRowsPerPageChange={handleChangeRowsPerPage}
                                                rowsPerPageOptions={[5, 10, 25, 50]}
                                                sx={{
                                                    '.MuiTablePagination-toolbar': {
                                                        fontSize: '.88rem',
                                                        fontWeight: 600,
                                                        padding: '1.2rem 1.8rem',
                                                    },
                                                    '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
                                                        fontWeight: 600,
                                                        fontSize: '.88rem',
                                                        color: 'var(--text-mid)',
                                                    }
                                                }}
                                            />

                                            <SpeedDialTemplate actions={actions} />
                                        </Box>
                                            </TabPanel>

                                            <TabPanel value="2" className="tabPanelContent">
                                                {completedEvents.filter((row) =>
                                                    row.subName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                    row.sclassName.toLowerCase().includes(searchQuery.toLowerCase())
                                                ).length === 0 ? (
                                                    <Box className="emptyState">
                                                        <CheckCircleIcon className="emptyStateIcon" />
                                                        <Typography className="emptyStateTitle">
                                                            No Completed Events
                                                        </Typography>
                                                        <Typography className="emptyStateText">
                                                            Completed events will appear here once they pass their end date
                                                        </Typography>
                                                    </Box>
                                                ) : (
                                                    <Box className="tableWrapper">
                                                        <TableContainer>
                                                            <Table className="customTable" stickyHeader>
                                                                <TableHead className="customTableHead">
                                                                    <TableRow>
                                                                        <TableCell className="customTableHeadCell" sx={{ width: '27%' }}>
                                                                            Event Name
                                                                        </TableCell>
                                                                        <TableCell className="customTableHeadCell" sx={{ width: '23%' }}>
                                                                            Start Date & Time
                                                                        </TableCell>
                                                                        <TableCell className="customTableHeadCell" sx={{ width: '23%' }}>
                                                                            End Date & Time
                                                                        </TableCell>
                                                                        <TableCell className="customTableHeadCell" sx={{ width: '17%' }}>
                                                                            Community
                                                                        </TableCell>
                                                                        <TableCell className="customTableHeadCell" sx={{ width: '10%' }}>
                                                                            Actions
                                                                        </TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {filteredRows.slice(
                                                                        page * rowsPerPage,
                                                                        page * rowsPerPage + rowsPerPage
                                                                    ).map((row) => (
                                                                        <TableRow key={row.id} className="customTableRow">
                                                                            <TableCell className="customTableCell">
                                                                                <Box sx={{ 
                                                                                    display: 'flex', 
                                                                                    alignItems: 'center', 
                                                                                    gap: 1.2 
                                                                                }}>
                                                                                    <Box sx={{
                                                                                        width: '42px',
                                                                                        height: '42px',
                                                                                        borderRadius: '12px',
                                                                                        background: 'linear-gradient(135deg, #9ca3af, #6b7280)',
                                                                                        display: 'flex',
                                                                                        alignItems: 'center',
                                                                                        justifyContent: 'center',
                                                                                        color: '#fff',
                                                                                        fontWeight: 800,
                                                                                        fontSize: '1rem',
                                                                                        flexShrink: 0,
                                                                                        boxShadow: '0 4px 12px rgba(107,114,128,0.2)'
                                                                                    }}>
                                                                                        <CheckCircleIcon sx={{ fontSize: '1.2rem' }} />
                                                                                    </Box>
                                                                                    <Box sx={{ textAlign: 'left' }}>
                                                                                        <Typography sx={{
                                                                                            fontWeight: 700,
                                                                                            fontSize: '.95rem',
                                                                                            color: '#1a202c',
                                                                                            lineHeight: 1.3,
                                                                                            textAlign: 'left',
                                                                                            whiteSpace: 'normal',
                                                                                            wordBreak: 'break-word',
                                                                                            overflowWrap: 'break-word'
                                                                                        }}>
                                                                                            {row.subName}
                                                                                        </Typography>
                                                                                    </Box>
                                                                                </Box>
                                                                            </TableCell>
                                                                            <TableCell className="customTableCell">
                                                                                <Box sx={{
                                                                                    display: 'inline-flex',
                                                                                    alignItems: 'center',
                                                                                    gap: 0.8,
                                                                                    padding: '6px 12px',
                                                                                    borderRadius: '10px',
                                                                                    background: 'linear-gradient(135deg, #e6f7ff, #f0f9ff)',
                                                                                    border: '1.5px solid #bae7ff',
                                                                                    width: 'fit-content'
                                                                                }}>
                                                                                    <CalendarTodayIcon sx={{ 
                                                                                        fontSize: '.9rem', 
                                                                                        color: '#0a78ff' 
                                                                                    }} />
                                                                                    <Typography sx={{
                                                                                        fontSize: '.85rem',
                                                                                        fontWeight: 700,
                                                                                        color: '#1a202c',
                                                                                        lineHeight: 1
                                                                                    }}>
                                                                                        {row.startDate}
                                                                                    </Typography>
                                                                                </Box>
                                                                            </TableCell>
                                                                            <TableCell className="customTableCell">
                                                                                <Box sx={{
                                                                                    display: 'inline-flex',
                                                                                    alignItems: 'center',
                                                                                    gap: 0.8,
                                                                                    padding: '6px 12px',
                                                                                    borderRadius: '10px',
                                                                                    background: 'linear-gradient(135deg, #e8f5e9, #f1f8f4)',
                                                                                    border: '1.5px solid #b9e4c9',
                                                                                    width: 'fit-content'
                                                                                }}>
                                                                                    <CalendarTodayIcon sx={{ 
                                                                                        fontSize: '.9rem', 
                                                                                        color: '#07b389' 
                                                                                    }} />
                                                                                    <Typography sx={{
                                                                                        fontSize: '.85rem',
                                                                                        fontWeight: 700,
                                                                                        color: '#1a202c',
                                                                                        lineHeight: 1
                                                                                    }}>
                                                                                        {row.endDate}
                                                                                    </Typography>
                                                                                </Box>
                                                                            </TableCell>
                                                                            <TableCell className="customTableCell">
                                                                                <Box sx={{
                                                                                    display: 'inline-flex',
                                                                                    alignItems: 'center',
                                                                                    gap: 0.8,
                                                                                    padding: '8px 14px',
                                                                                    borderRadius: '12px',
                                                                                    background: 'linear-gradient(135deg, #fff3e0, #fff8e8)',
                                                                                    border: '1.5px solid #ffe0b2',
                                                                                    boxShadow: '0 2px 6px rgba(255,152,0,0.08)'
                                                                                }}>
                                                                                    <GroupsIcon sx={{ 
                                                                                        fontSize: '1.1rem', 
                                                                                        color: '#f57c00' 
                                                                                    }} />
                                                                                    <Typography sx={{
                                                                                        fontSize: '.88rem',
                                                                                        fontWeight: 700,
                                                                                        color: '#1a202c'
                                                                                    }}>
                                                                                        {row.sclassName}
                                                                                    </Typography>
                                                                                </Box>
                                                                            </TableCell>
                                                                            <TableCell className="customTableCell">
                                                                                <Box className="actionCell">
                                                                                    <BlueButton
                                                                                        variant="contained"
                                                                                        size="small"
                                                                                        onClick={() => navigate(`/Admin/events/subject/${row.sclassID}/${row.id}`)}
                                                                                        sx={{
                                                                                            fontSize: '.82rem',
                                                                                            px: 1.7,
                                                                                            py: .7,
                                                                                            fontWeight: 700,
                                                                                            borderRadius: '11px',
                                                                                            textTransform: 'none',
                                                                                            boxShadow: '0 3px 10px -3px rgba(10,120,255,.3)',
                                                                                            '&:hover': {
                                                                                                boxShadow: '0 5px 16px -3px rgba(10,120,255,.4)',
                                                                                                transform: 'translateY(-2px)',
                                                                                            },
                                                                                            transition: 'all .2s ease',
                                                                                        }}
                                                                                    >
                                                                                        <VisibilityIcon style={{ marginRight: '.45rem', fontSize: '.92rem' }} />
                                                                                        View
                                                                                    </BlueButton>
                                                                                </Box>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>

                                                        <TablePagination
                                                            className="paginationContainer"
                                                            component="div"
                                                            count={filteredRows.length}
                                                            page={page}
                                                            onPageChange={handleChangePage}
                                                            rowsPerPage={rowsPerPage}
                                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                                            rowsPerPageOptions={[5, 10, 25, 50]}
                                                            sx={{
                                                                '.MuiTablePagination-toolbar': {
                                                                    fontSize: '.88rem',
                                                                    fontWeight: 600,
                                                                    padding: '1.2rem 1.8rem',
                                                                },
                                                                '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
                                                                    fontWeight: 600,
                                                                    fontSize: '.88rem',
                                                                    color: 'var(--text-mid)',
                                                                }
                                                            }}
                                                        />

                                                        <SpeedDialTemplate actions={actions} />
                                                    </Box>
                                                )}
                                            </TabPanel>
                                        </TabContext>
                                    )}
                                </>
                            )}
                        </Box>
                    </Box>
                </Fade>
            </Box>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Box>
    );
};

export default ShowSubjects;