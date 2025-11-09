import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllTeachers } from '../../../redux/teacherRelated/teacherHandle';
import {
    Box, IconButton, Card, Avatar, Chip, Fade, TextField, InputAdornment, Grid
} from '@mui/material';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { GreenButton, BlueButton } from '../../../components/buttonStyles';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';
import GroupsIcon from '@mui/icons-material/Groups';
import EmailIcon from '@mui/icons-material/Email';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';

const ShowTeachers = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { teachersList, loading, error, response } = useSelector((state) => state.teacher);
    const { currentUser } = useSelector((state) => state.user);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

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
            --purple:#7c3aed;
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
          
          .teachersPageWrap {
            background: linear-gradient(135deg, #f0f7ff 0%, #e8f2ff 50%, #f3f6fa 100%) fixed;
            min-height:100vh;
            padding:2rem 1.5rem;
          }
          .teachersContainer {
            max-width:1380px;
            margin:0 auto;
          }
          .teachersPanel {
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
          .teachersHeader {
            display:flex;
            align-items:center;
            justify-content:space-between;
            gap:1.5rem;
            padding:2rem 2.5rem;
            flex-wrap:wrap;
            background:linear-gradient(135deg,#fafcff 0%, #f5f9ff 100%);
            border-bottom:1px solid var(--border);
          }
          .teachersHeaderLeft {
            display:flex;
            align-items:center;
            gap:1.2rem;
          }
          .teachersHeaderIcon {
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
          .teachersHeaderIcon:hover { transform:scale(1.1) rotate(-5deg); }
          .teachersHeaderTitleGroup {
            display:flex;
            flex-direction:column;
            gap:.35rem;
          }
          .teachersHeaderTitle {
            margin:0; 
            color:var(--text-dark); 
            letter-spacing:-.8px;
            font-weight:900; 
            font-size:2rem; 
            line-height:1.1;
          }
          .teachersHeaderSubtitle {
            margin:0;
            color:var(--text-mid); 
            font-size:.8rem;
            text-transform:uppercase; 
            letter-spacing:1.1px; 
            font-weight:800;
          }
          .teachersHeaderRight {
            display:flex;
            align-items:center;
            gap:1rem;
          }
          .teachersContentSection {
            padding:2.5rem;
          }
          .teachersStatsBar {
            display:grid;
            grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));
            gap:1.5rem;
            margin-bottom:2.5rem;
          }
          .teachersStatCard {
            background:linear-gradient(135deg, #f9fbfe 0%, #f3f7fc 100%);
            border:1px solid var(--border);
            border-radius:16px;
            padding:1.5rem;
            display:flex;
            align-items:center;
            gap:1rem;
            transition:all .2s ease;
          }
          .teachersStatCard:hover {
            transform:translateY(-2px);
            box-shadow:var(--shadow-md);
          }
          .teachersStatIconBox {
            width:50px;
            height:50px;
            border-radius:14px;
            background:linear-gradient(135deg,#e8f2ff,#f0f7ff);
            display:flex;
            align-items:center;
            justify-content:center;
            color:var(--primary);
          }
          .teachersStatNumbers {
            display:flex;
            flex-direction:column;
            gap:.2rem;
          }
          .teachersStatLabel {
            font-size:.8rem;
            font-weight:700;
            letter-spacing:.6px;
            text-transform:uppercase;
            color:var(--text-light);
          }
          .teachersStatValue {
            font-size:1.6rem;
            font-weight:900;
            letter-spacing:-.4px;
            color:var(--text-dark);
          }
          .teachersSearchBar {
            margin-bottom:2rem;
          }
          .leaderCard {
            background:#fff;
            border:2px solid var(--border);
            border-radius:18px;
            overflow:hidden;
            transition:all .35s cubic-bezier(0.4, 0, 0.2, 1);
            cursor:pointer;
            position:relative;
          }
          .leaderCard::before {
            content:'';
            position:absolute;
            top:0;
            left:0;
            right:0;
            height:4px;
            background:linear-gradient(90deg,var(--primary),var(--accent));
            opacity:0;
            transition:opacity .3s ease;
          }
          .leaderCard:hover::before {
            opacity:1;
          }
          .leaderCard:hover {
            transform:translateY(-6px);
            box-shadow:0 16px 40px -10px rgba(10,120,255,.25);
            border-color:var(--primary);
          }
          .leaderCardHeader {
            background:linear-gradient(135deg,#f9fbfe 0%, #f3f7fc 100%);
            padding:2rem;
            text-align:center;
            border-bottom:1px solid var(--border);
          }
          .leaderAvatarWrapper {
            width:80px;
            height:80px;
            border-radius:50%;
            background:linear-gradient(135deg,var(--primary),var(--accent));
            display:flex;
            align-items:center;
            justify-content:center;
            margin:0 auto 1rem;
            box-shadow:0 10px 30px -8px rgba(10,120,255,.4);
            color:#fff;
            font-size:2rem;
            font-weight:900;
          }
          .leaderName {
            font-size:1.3rem;
            font-weight:900;
            color:var(--text-dark);
            margin:0 0 .5rem;
            letter-spacing:-.4px;
          }
          .leaderRole {
            font-size:.8rem;
            color:var(--text-light);
            font-weight:700;
            letter-spacing:.6px;
            text-transform:uppercase;
          }
          .leaderCardBody {
            padding:1.8rem;
          }
          .leaderInfoRow {
            display:flex;
            align-items:center;
            gap:.8rem;
            padding:.8rem 1rem;
            background:#f9fbfc;
            border-radius:12px;
            margin-bottom:.8rem;
            border:1px solid #f0f4f8;
          }
          .leaderInfoIcon {
            width:36px;
            height:36px;
            border-radius:10px;
            background:linear-gradient(135deg,#e8f2ff,#f0f7ff);
            display:flex;
            align-items:center;
            justify-content:center;
            color:var(--primary);
            flex-shrink:0;
          }
          .leaderInfoContent {
            flex:1;
            min-width:0;
          }
          .leaderInfoLabel {
            font-size:.7rem;
            color:var(--text-light);
            font-weight:700;
            text-transform:uppercase;
            letter-spacing:.6px;
            margin-bottom:.2rem;
          }
          .leaderInfoValue {
            font-size:.9rem;
            color:var(--text-dark);
            font-weight:700;
            letter-spacing:-.2px;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
          }
          .leaderCardFooter {
            padding:1.5rem 1.8rem;
            background:#fafcfe;
            border-top:1px solid var(--border);
            display:flex;
            gap:.8rem;
          }
          .leaderViewButton {
            flex:1;
            background:var(--primary);
            color:#fff;
            border:none;
            padding:11px 16px;
            font-size:.88rem;
            font-weight:700;
            letter-spacing:.3px;
            border-radius:12px;
            display:flex;
            align-items:center;
            justify-content:center;
            gap:6px;
            cursor:pointer;
            transition:all .2s ease;
            text-transform:none;
            box-shadow:0 4px 12px -4px rgba(10,120,255,.35);
          }
          .leaderViewButton:hover {
            background:#065dca;
            transform:translateY(-2px);
            box-shadow:0 6px 18px -4px rgba(10,120,255,.45);
          }
          .leaderDeleteButton {
            padding:11px;
            background:#ffe9e9;
            border:1px solid #f3d4d4;
            color:var(--danger);
            border-radius:12px;
            cursor:pointer;
            display:flex;
            align-items:center;
            justify-content:center;
            transition:all .2s ease;
          }
          .leaderDeleteButton:hover {
            background:#ffd9d9;
            transform:translateY(-2px);
          }
          .emptyTeachersState {
            text-align:center;
            padding:5rem 3rem;
            background:linear-gradient(135deg,#fbfdff 0%,#f7fbff 100%);
            border-radius:18px;
          }
          .emptyTeachersIcon {
            width:80px;
            height:80px;
            border-radius:20px;
            background:linear-gradient(135deg,var(--primary),var(--accent));
            display:flex;
            align-items:center;
            justify-content:center;
            color:#fff;
            font-size:2.2rem;
            margin:0 auto 1.5rem;
            box-shadow:0 10px 30px -8px rgba(10,120,255,.4);
            animation:float 3.5s ease-in-out infinite;
          }
          @keyframes float {
            0%, 100% { transform:translateY(0) rotate(0deg); }
            50% { transform:translateY(-12px) rotate(5deg); }
          }
          .emptyTeachersTitle {
            font-size:1.7rem;
            font-weight:900;
            color:var(--text-dark);
            margin-bottom:.8rem;
            letter-spacing:-.6px;
          }
          .emptyTeachersText {
            color:var(--text-light);
            margin-bottom:2.2rem;
            font-size:1rem;
            line-height:1.6;
            max-width:460px;
            margin-left:auto;
            margin-right:auto;
          }
          @media (max-width:1024px){
            .teachersPageWrap { padding:1.5rem 1rem; }
            .teachersPanel { border-radius:16px; }
            .teachersHeader { 
              padding:1.8rem 1.5rem; 
              flex-direction:column; 
              align-items:flex-start; 
            }
            .teachersHeaderRight { width:100%; flex-wrap:wrap; }
            .teachersContentSection { padding:1.8rem 1.5rem; }
            .teachersHeaderTitle { font-size:1.7rem; }
            .teachersHeaderIcon { width:58px; height:58px; }
          }
          @media (max-width:768px){
            .teachersHeader { padding:1.5rem 1.2rem; }
            .teachersContentSection { padding:1.5rem 1.2rem; }
            .emptyTeachersState { padding:4rem 2rem; }
            .leaderCardHeader { padding:1.8rem 1.5rem; }
            .leaderCardBody { padding:1.5rem; }
            .leaderCardFooter { padding:1.2rem 1.5rem; }
          }
        `;
        document.head.appendChild(styleEl);
        return () => styleEl.remove();
    }, []);

    useEffect(() => {
        dispatch(getAllTeachers(currentUser._id));
    }, [currentUser._id, dispatch]);

    const deleteHandler = (deleteID, address) => {
        setMessage("Deleted Successfully");
        setShowPopup(true);
        dispatch(deleteUser(deleteID, address)).then(() => {
            dispatch(getAllTeachers(currentUser._id));
        });
    };

    const filteredTeachers = (teachersList || []).filter((teacher) =>
        (teacher.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (teacher.email || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (teacher.community || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    const actions = [
        {
            icon: <PersonAddAlt1Icon color="primary" />, 
            name: 'Add New Community Leader',
            action: () => navigate("/Admin/teachers/chooseclass")
        },
        {
            icon: <PersonRemoveIcon color="error" />, 
            name: 'Delete All Community Leaders',
            action: () => deleteHandler(currentUser._id, "Teachers")
        },
    ];

    if (loading) {
        return (
            <Box className="teachersPageWrap">
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                    <Box sx={{ 
                        width: '52px', 
                        height: '52px', 
                        border: '5px solid #e5edf4', 
                        borderTop: '5px solid var(--primary)', 
                        borderRadius: '50%', 
                        animation: 'spin .85s linear infinite' 
                    }} />
                </Box>
            </Box>
        );
    }

    if (response) {
        return (
            <Box className="teachersPageWrap">
                <Box className="teachersContainer">
                    <Fade in timeout={500}>
                        <Box className="teachersPanel">
                            <Box className="emptyTeachersState">
                                <Box className="emptyTeachersIcon">
                                    <PersonIcon />
                                </Box>
                                <h2 className="emptyTeachersTitle">No Community Leaders Found</h2>
                                <p className="emptyTeachersText">
                                    Add your first community leader to get started with managing your communities
                                </p>
                                <GreenButton
                                    variant="contained"
                                    startIcon={<PersonAddAlt1Icon />}
                                    onClick={() => navigate("/Admin/teachers/chooseclass")}
                                    sx={{
                                        px: 4,
                                        py: 1.5,
                                        fontWeight: 700,
                                        fontSize: '.94rem',
                                        borderRadius: '14px',
                                        textTransform: 'none',
                                        boxShadow: '0 6px 20px -6px rgba(7,179,137,.4)',
                                    }}
                                >
                                    Add Community Leader
                                </GreenButton>
                            </Box>
                        </Box>
                    </Fade>
                </Box>
            </Box>
        );
    }

    if (error) {
        console.log(error);
    }

    return (
        <Box className="teachersPageWrap">
            <Box className="teachersContainer">
                <Fade in timeout={500}>
                    <Box className="teachersPanel">
                        {/* Header */}
                        <Box className="teachersHeader">
                            <Box className="teachersHeaderLeft">
                                <Box className="teachersHeaderIcon">
                                    <PersonIcon style={{ fontSize: '2rem' }} />
                                </Box>
                                <Box className="teachersHeaderTitleGroup">
                                    <h1 className="teachersHeaderTitle">Community Leaders</h1>
                                    <p className="teachersHeaderSubtitle">Manage All Leaders</p>
                                </Box>
                            </Box>

                            <Box className="teachersHeaderRight">
                                <TextField
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search leaders..."
                                    size="small"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon sx={{ color: '#718096' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        minWidth: '240px',
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '14px',
                                            background: '#f9fbfc',
                                            fontSize: '.85rem',
                                            fontWeight: 500,
                                            border: '1.5px solid #e2e8f0',
                                            transition: 'all .2s',
                                            '&:hover': { background: '#fff' },
                                            '&.Mui-focused': {
                                                background: '#fff',
                                                borderColor: '#0a78ff',
                                                boxShadow: '0 0 0 3px rgba(10,120,255,.12)'
                                            }
                                        }
                                    }}
                                />
                                <GreenButton
                                    variant="contained"
                                    startIcon={<PersonAddAlt1Icon />}
                                    onClick={() => navigate("/Admin/teachers/chooseclass")}
                                    sx={{
                                        height: 40,
                                        fontWeight: 800,
                                        borderRadius: '12px',
                                        textTransform: 'none',
                                        boxShadow: '0 6px 18px -6px rgba(7,179,137,.4)'
                                    }}
                                >
                                    Add Leader
                                </GreenButton>
                            </Box>
                        </Box>

                        {/* Content */}
                        <Box className="teachersContentSection">
                            {/* Stats */}
                            <Box className="teachersStatsBar">
                                <Box className="teachersStatCard">
                                    <Box className="teachersStatIconBox">
                                        <PersonIcon />
                                    </Box>
                                    <Box className="teachersStatNumbers">
                                        <span className="teachersStatLabel">Total Leaders</span>
                                        <span className="teachersStatValue">{teachersList?.length || 0}</span>
                                    </Box>
                                </Box>
                            </Box>

                            {/* Leaders Grid */}
                            {filteredTeachers.length > 0 ? (
                                <Grid container spacing={3}>
                                    {filteredTeachers.map((teacher, index) => (
                                        <Grid item xs={12} sm={6} md={4} lg={3} key={teacher._id}>
                                            <Fade in timeout={400 + index * 50}>
                                                <Card className="leaderCard">
                                                    <Box className="leaderCardHeader">
                                                        <Box className="leaderAvatarWrapper">
                                                            {teacher.name?.charAt(0)?.toUpperCase()}
                                                        </Box>
                                                        <h3 className="leaderName">{teacher.name}</h3>
                                                        <p className="leaderRole">Community Leader</p>
                                                    </Box>

                                                    <Box className="leaderCardBody">
                                                        <Box className="leaderInfoRow">
                                                            <Box className="leaderInfoIcon">
                                                                <EmailIcon style={{ fontSize: '1.1rem' }} />
                                                            </Box>
                                                            <Box className="leaderInfoContent">
                                                                <p className="leaderInfoLabel">Email</p>
                                                                <p className="leaderInfoValue" title={teacher.email}>
                                                                    {teacher.email}
                                                                </p>
                                                            </Box>
                                                        </Box>

                                                        <Box className="leaderInfoRow">
                                                            <Box className="leaderInfoIcon">
                                                                <GroupsIcon style={{ fontSize: '1.1rem' }} />
                                                            </Box>
                                                            <Box className="leaderInfoContent">
                                                                <p className="leaderInfoLabel">Community</p>
                                                                <p className="leaderInfoValue">{teacher.community}</p>
                                                            </Box>
                                                        </Box>
                                                    </Box>

                                                    <Box className="leaderCardFooter">
                                                        <button
                                                            className="leaderViewButton"
                                                            onClick={() => navigate("/Admin/teachers/teacher/" + teacher.cid)}
                                                        >
                                                            <VisibilityIcon style={{ fontSize: '.9rem' }} /> View Details
                                                        </button>
                                                        <button
                                                            className="leaderDeleteButton"
                                                            onClick={() => deleteHandler(teacher._id, "Teacher")}
                                                        >
                                                            <DeleteIcon fontSize="small" />
                                                        </button>
                                                    </Box>
                                                </Card>
                                            </Fade>
                                        </Grid>
                                    ))}
                                </Grid>
                            ) : (
                                <Box className="emptyTeachersState" style={{ margin: '1.5rem 0' }}>
                                    <Box className="emptyTeachersIcon">
                                        <SearchIcon />
                                    </Box>
                                    <h2 className="emptyTeachersTitle">No Results Found</h2>
                                    <p className="emptyTeachersText">
                                        No leaders match your search criteria. Try different keywords.
                                    </p>
                                </Box>
                            )}

                            <SpeedDialTemplate actions={actions} />
                        </Box>
                    </Box>
                </Fade>
            </Box>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Box>
    );
};

export default ShowTeachers;