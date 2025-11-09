import React, { useEffect } from 'react';
import { getTeacherDetails } from '../../../redux/teacherRelated/teacherHandle';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Fade } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import GroupsIcon from '@mui/icons-material/Groups';
import BadgeIcon from '@mui/icons-material/Badge';

const TeacherDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { loading, teacherDetails, error } = useSelector((state) => state.teacher);

    const teacherID = params.id;

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
            --radius-lg:20px;
            --shadow-sm:0 2px 8px rgba(30,45,60,0.06);
            --shadow-md:0 4px 16px rgba(25,40,60,0.08);
            --shadow-lg:0 8px 28px rgba(25,40,60,0.12);
          }
          * { 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
            box-sizing: border-box;
          }
          
          .detailsPageWrap {
            background: linear-gradient(135deg, #f0f7ff 0%, #e8f2ff 50%, #f3f6fa 100%) fixed;
            min-height:100vh;
            padding:2rem 1.5rem;
          }
          .detailsContainer {
            max-width:900px;
            margin:0 auto;
          }
          .detailsPanel {
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
          .detailsHeader {
            position:relative;
            background:linear-gradient(135deg,#fafcff 0%, #f5f9ff 100%);
            padding:2.5rem 2.5rem 1.5rem;
            border-bottom:1px solid var(--border);
          }
          .backButton {
            position:absolute;
            top:1.5rem;
            left:1.5rem;
            background:#f9fbfc;
            border:1px solid var(--border);
            width:40px;
            height:40px;
            border-radius:12px;
            display:flex;
            align-items:center;
            justify-content:center;
            cursor:pointer;
            transition:all .2s ease;
            color:var(--text-mid);
          }
          .backButton:hover {
            background:var(--primary);
            color:#fff;
            transform:translateX(-3px);
          }
          .headerContent {
            text-align:center;
          }
          .detailsAvatarWrapper {
            width:120px;
            height:120px;
            border-radius:50%;
            background:linear-gradient(135deg,var(--primary),var(--accent));
            display:flex;
            align-items:center;
            justify-content:center;
            margin:0 auto 1.5rem;
            box-shadow:0 12px 35px -10px rgba(10,120,255,.45);
            color:#fff;
            font-size:3rem;
            font-weight:900;
            border:5px solid #fff;
          }
          .detailsName {
            font-size:2rem;
            font-weight:900;
            color:var(--text-dark);
            margin:0 0 .6rem;
            letter-spacing:-.7px;
            line-height:1.2;
          }
          .detailsRole {
            font-size:.9rem;
            color:var(--text-mid);
            font-weight:700;
            letter-spacing:.7px;
            text-transform:uppercase;
            background:linear-gradient(135deg,#e8f2ff,#f0f7ff);
            padding:.5rem 1.2rem;
            border-radius:10px;
            display:inline-block;
          }
          .detailsBody {
            padding:2.5rem;
          }
          .detailsGrid {
            display:grid;
            gap:1.5rem;
          }
          .detailsInfoCard {
            background:linear-gradient(135deg, #f9fbfe 0%, #f3f7fc 100%);
            border:1px solid var(--border);
            border-radius:16px;
            padding:1.8rem;
            display:flex;
            align-items:center;
            gap:1.2rem;
            transition:all .3s ease;
          }
          .detailsInfoCard:hover {
            transform:translateY(-4px);
            box-shadow:var(--shadow-md);
            border-color:var(--primary);
          }
          .detailsInfoIcon {
            width:56px;
            height:56px;
            border-radius:14px;
            background:linear-gradient(135deg,#e8f2ff,#f0f7ff);
            display:flex;
            align-items:center;
            justify-content:center;
            color:var(--primary);
            flex-shrink:0;
            font-size:1.5rem;
          }
          .detailsInfoContent {
            flex:1;
            min-width:0;
          }
          .detailsInfoLabel {
            font-size:.75rem;
            color:var(--text-light);
            font-weight:700;
            text-transform:uppercase;
            letter-spacing:.8px;
            margin-bottom:.4rem;
          }
          .detailsInfoValue {
            font-size:1.1rem;
            color:var(--text-dark);
            font-weight:800;
            letter-spacing:-.3px;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
          }
          .loadingContainer {
            display:flex;
            align-items:center;
            justify-content:center;
            min-height:100vh;
          }
          .loadingSpinner {
            width:52px;
            height:52px;
            border:5px solid #e5edf4;
            border-top:5px solid var(--primary);
            border-radius:50%;
            animation:spin .85s linear infinite;
          }
          @keyframes spin { to { transform:rotate(360deg); } }
          
          @media (max-width:768px){
            .detailsPageWrap { padding:1.5rem 1rem; }
            .detailsPanel { border-radius:16px; }
            .detailsHeader { padding:2rem 1.5rem 1.5rem; }
            .detailsBody { padding:2rem 1.5rem; }
            .detailsName { font-size:1.6rem; }
            .detailsAvatarWrapper { width:100px; height:100px; font-size:2.5rem; }
            .backButton { top:1.2rem; left:1.2rem; }
          }
        `;
        document.head.appendChild(styleEl);
        return () => styleEl.remove();
    }, []);

    useEffect(() => {
        dispatch(getTeacherDetails(teacherID));
    }, [dispatch, teacherID]);

    if (error) {
        console.log(error);
    }

    if (loading) {
        return (
            <Box className="loadingContainer">
                <Box className="loadingSpinner" />
            </Box>
        );
    }

    return (
        <Box className="detailsPageWrap">
            <Box className="detailsContainer">
                <Fade in timeout={500}>
                    <Box className="detailsPanel">
                        {/* Header */}
                        <Box className="detailsHeader">
                            <button 
                                className="backButton"
                                onClick={() => navigate(-1)}
                                aria-label="Go back"
                            >
                                <ArrowBackIcon />
                            </button>
                            
                            <Box className="headerContent">
                                <Box className="detailsAvatarWrapper">
                                    {teacherDetails?.name?.charAt(0)?.toUpperCase()}
                                </Box>
                                <h1 className="detailsName">{teacherDetails?.name}</h1>
                                <span className="detailsRole">Community Leader</span>
                            </Box>
                        </Box>

                        {/* Body */}
                        <Box className="detailsBody">
                            <Box className="detailsGrid">
                                <Box className="detailsInfoCard">
                                    <Box className="detailsInfoIcon">
                                        <PersonIcon />
                                    </Box>
                                    <Box className="detailsInfoContent">
                                        <p className="detailsInfoLabel">Full Name</p>
                                        <p className="detailsInfoValue">{teacherDetails?.name}</p>
                                    </Box>
                                </Box>

                                <Box className="detailsInfoCard">
                                    <Box className="detailsInfoIcon">
                                        <EmailIcon />
                                    </Box>
                                    <Box className="detailsInfoContent">
                                        <p className="detailsInfoLabel">Email Address</p>
                                        <p className="detailsInfoValue" title={teacherDetails?.email}>
                                            {teacherDetails?.email}
                                        </p>
                                    </Box>
                                </Box>

                                <Box className="detailsInfoCard">
                                    <Box className="detailsInfoIcon">
                                        <GroupsIcon />
                                    </Box>
                                    <Box className="detailsInfoContent">
                                        <p className="detailsInfoLabel">Community</p>
                                        <p className="detailsInfoValue">{teacherDetails?.community}</p>
                                    </Box>
                                </Box>

                                <Box className="detailsInfoCard">
                                    <Box className="detailsInfoIcon">
                                        <BadgeIcon />
                                    </Box>
                                    <Box className="detailsInfoContent">
                                        <p className="detailsInfoLabel">Leader ID</p>
                                        <p className="detailsInfoValue">{teacherDetails?.cid}</p>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Fade>
            </Box>
        </Box>
    );
};

export default TeacherDetails;
