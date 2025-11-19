import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    Box, 
    Button, 
    Typography, 
    Card, 
    CardContent, 
    CardActions,
    Grid,
    Fade,
    Skeleton,
    Container,
    InputAdornment,
    TextField,
    Chip,
    Avatar
} from '@mui/material';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { useNavigate } from 'react-router-dom';
import { PurpleButton, GreenButton } from '../../../components/buttonStyles';
import GroupsIcon from '@mui/icons-material/Groups';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const ChooseClass = ({ situation }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");

    const { sclassesList, loading, error, getresponse } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector(state => state.user);

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
            max-width:1400px;
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
          .contentSection {
            padding:2.5rem;
          }
          .communityCard {
            background:#fff;
            border:2px solid var(--border);
            border-radius:20px;
            overflow:hidden;
            transition:all .35s cubic-bezier(0.4, 0, 0.2, 1);
            cursor:pointer;
            height:100%;
            display:flex;
            flex-direction:column;
            position:relative;
          }
          .communityCard::before {
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
          .communityCard:hover::before {
            opacity:1;
          }
          .communityCard:hover {
            transform:translateY(-8px) scale(1.02);
            box-shadow:0 16px 40px -10px rgba(10,120,255,.25);
            border-color:var(--primary);
          }
          .cardHeader {
            background:linear-gradient(135deg,#f9fbfe 0%, #f3f7fc 100%);
            padding:2.8rem 2rem;
            text-align:center;
            position:relative;
            flex:1;
          }
          .cardAvatarWrapper {
            width:85px;
            height:85px;
            border-radius:22px;
            background:linear-gradient(135deg,var(--primary),var(--accent));
            display:flex;
            align-items:center;
            justify-content:center;
            margin:0 auto 1.8rem;
            box-shadow:0 12px 35px -10px rgba(10,120,255,.45);
            position:relative;
          }
          .cardTitle {
            font-size:1.4rem;
            font-weight:900;
            color:var(--text-dark);
            margin:0 0 .6rem;
            letter-spacing:-.5px;
            line-height:1.3;
          }
          .cardSubtitle {
            font-size:.82rem;
            color:var(--text-light);
            font-weight:600;
            letter-spacing:.6px;
            text-transform:uppercase;
          }
          .cardFooter {
            padding:2rem 2rem;
            background:linear-gradient(180deg, #fafcfe 0%, #ffffff 100%);
            border-top:1px solid var(--border);
          }
          .emptyState {
            text-align:center;
            padding:5.5rem 3rem;
            background:linear-gradient(135deg,#fbfdff 0%,#f7fbff 100%);
            border-radius:20px;
            margin:1rem 0;
          }
          .emptyStateIcon {
            font-size:6rem !important;
            color:var(--text-light);
            opacity:.28;
            margin-bottom:2rem;
            animation:float 3.5s ease-in-out infinite;
          }
          @keyframes float {
            0%, 100% { transform:translateY(0) rotate(0deg); }
            50% { transform:translateY(-12px) rotate(5deg); }
          }
          .emptyStateTitle {
            font-size:1.7rem;
            font-weight:900;
            color:var(--text-dark);
            margin-bottom:.9rem;
            letter-spacing:-.6px;
          }
          .emptyStateText {
            color:var(--text-light);
            margin-bottom:2.4rem;
            font-size:1.02rem;
            line-height:1.65;
            max-width:480px;
            margin-left:auto;
            margin-right:auto;
          }
          .searchBar {
            margin-bottom:2.2rem;
          }
          .statsGrid {
            display:grid;
            grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));
            gap:1.5rem;
            margin-bottom:2rem;
          }
          .statCard {
            background:linear-gradient(135deg, #f9fbfe 0%, #f3f7fc 100%);
            border:1px solid var(--border);
            border-radius:16px;
            padding:1.5rem;
            display:flex;
            align-items:center;
            gap:1rem;
          }
          .statIconWrapper {
            width:50px;
            height:50px;
            border-radius:14px;
            background:linear-gradient(135deg,#e8f2ff,#f0f7ff);
            display:flex;
            align-items:center;
            justify-content:center;
            color:var(--primary);
          }
          .statContent h3 {
            margin:0;
            font-size:1.6rem;
            font-weight:900;
            color:var(--text-dark);
            letter-spacing:-.4px;
          }
          .statContent p {
            margin:.2rem 0 0;
            font-size:.8rem;
            color:var(--text-light);
            font-weight:600;
            text-transform:uppercase;
            letter-spacing:.6px;
          }
          @media (max-width:1024px){
            .pageWrap { padding:1.5rem 1rem; }
            .whiteBox { border-radius:18px; }
            .headerSection { 
              padding:1.8rem 1.5rem; 
              flex-direction:column; 
              align-items:flex-start; 
            }
            .contentSection { padding:2rem 1.5rem; }
            .headerTitle { font-size:1.7rem; }
            .headerIcon { width:60px; height:60px; }
          }
          @media (max-width:768px){
            .emptyState { padding:4rem 2rem; }
            .headerSection { padding:1.5rem 1.2rem; }
            .contentSection { padding:1.5rem 1.2rem; }
            .cardHeader { padding:2.2rem 1.5rem; }
            .cardFooter { padding:1.6rem 1.5rem; }
            .cardAvatarWrapper { width:75px; height:75px; }
            .cardTitle { font-size:1.25rem; }
          }
        `;
        document.head.appendChild(styleEl);
        return () => styleEl.remove();
    }, []);

    useEffect(() => {
        dispatch(getAllSclasses(currentUser._id, "Sclass"));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error);
    }

    const navigateHandler = (classID) => {
        if (situation === "Teacher") {
            navigate("/Admin/leaders/chooseevent/" + classID);
        } else if (situation === "Subject") {
            navigate("/Admin/addevent/" + classID);
        }
    };

    const filteredClasses = sclassesList?.filter((sclass) =>
        sclass.sclassName.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    const getTitle = () => {
        if (situation === "Teacher") return "Assign Leader";
        if (situation === "Subject") return "Add Event";
        return "Choose Community";
    };

    const getSubtitle = () => {
        if (situation === "Teacher") return "Select Community for Leader Assignment";
        if (situation === "Subject") return "Select Community for Event Creation";
        return "Select a Community to Continue";
    };

    const getIcon = () => {
        if (situation === "Teacher") return <PersonIcon style={{ fontSize: "2.1rem" }} />;
        if (situation === "Subject") return <EventIcon style={{ fontSize: "2.1rem" }} />;
        return <GroupsIcon style={{ fontSize: "2.1rem" }} />;
    };

    return (
        <Box className="pageWrap">
            <Box className="mainContainer">
                <Fade in timeout={500}>
                    <Box className="whiteBox">
                        {/* Header */}
                        <Box className="headerSection">
                            <Box className="headerLeft">
                                <Box className="headerIcon">
                                    {getIcon()}
                                </Box>
                                <Box className="headerTitleGroup">
                                    <Typography className="headerTitle">{getTitle()}</Typography>
                                    <Typography className="headerSubtitle">
                                        {getSubtitle()}
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Search box to the left of Add Community */}
                            {!getresponse && sclassesList && sclassesList.length > 0 && (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1.2,
                                        marginLeft: 'auto',
                                        flexWrap: 'wrap',
                                        minWidth: { xs: '100%', sm: 480 }
                                    }}
                                >
                                    <TextField
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search communities..."
                                        size="small"
                                        fullWidth
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon sx={{ color: '#718096', fontSize: '1.25rem' }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            flex: 1,
                                            minWidth: { xs: '100%', sm: 320 },
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '14px',
                                                background: '#f9fbfc',
                                                fontSize: '.92rem',
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
                                        startIcon={<AddIcon />}
                                        onClick={() => navigate("/Admin/addcommunity")}
                                        sx={{
                                            px: 3.2,
                                            py: 1.25,
                                            fontWeight: 700,
                                            fontSize: '.92rem',
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
                                        Add Community
                                    </GreenButton>
                                </Box>
                            )}
                        </Box>

                        {/* Content Section */}
                        <Box className="contentSection">
                            {loading ? (
                                <Grid container spacing={3}>
                                    {[1, 2, 3, 4].map((item) => (
                                        <Grid item xs={12} sm={6} md={4} lg={3} key={item}>
                                            <Skeleton variant="rectangular" height={280} sx={{ borderRadius: 5 }} />
                                        </Grid>
                                    ))}
                                </Grid>
                            ) : (
                                <>
                                    {getresponse ? (
                                        <Box className="emptyState">
                                            <GroupsIcon className="emptyStateIcon" />
                                            <Typography className="emptyStateTitle">
                                                No Communities Found
                                            </Typography>
                                            <Typography className="emptyStateText">
                                                Create your first community to get started with organizing and managing your members effectively
                                            </Typography>
                                            <GreenButton
                                                variant="contained"
                                                startIcon={<AddIcon />}
                                                onClick={() => navigate("/Admin/addcommunity")}
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
                                                Create First Community
                                            </GreenButton>
                                        </Box>
                                    ) : (
                                        <>
                                            {/* Stats Overview */}
                                            {sclassesList && sclassesList.length > 0 && (
                                                <Box className="statsGrid">
                                                    <Box className="statCard">
                                                        <Box className="statIconWrapper">
                                                            <GroupsIcon style={{ fontSize: '1.4rem' }} />
                                                        </Box>
                                                        <Box className="statContent">
                                                            <h3>{sclassesList.length}</h3>
                                                            <p>Total Communities</p>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            )}

                                            {/* Search Bar moved to header */}

                                            {/* Community Cards Grid */}
                                            {Array.isArray(filteredClasses) && filteredClasses.length > 0 ? (
                                                <Grid container spacing={3}>
                                                    {filteredClasses.map((sclass, index) => (
                                                        <Grid item xs={12} sm={6} md={4} lg={3} key={sclass._id}>
                                                            <Fade in timeout={400 + index * 50}>
                                                                <Card className="communityCard">
                                                                    <Box className="cardHeader">
                                                                        <Box className="cardAvatarWrapper">
                                                                            <GroupsIcon style={{ color: '#fff', fontSize: '2.4rem' }} />
                                                                        </Box>
                                                                        <Typography className="cardTitle">
                                                                            {sclass.sclassName}
                                                                        </Typography>
                                                                        <Typography className="cardSubtitle">
                                                                            Active Community
                                                                        </Typography>
                                                                    </Box>
                                                                    
                                                                    <CardActions className="cardFooter">
                                                                        <PurpleButton
                                                                            variant="contained"
                                                                            fullWidth
                                                                            endIcon={<ArrowForwardIcon />}
                                                                            onClick={() => navigateHandler(sclass._id)}
                                                                            sx={{
                                                                                py: 1.25,
                                                                                fontWeight: 700,
                                                                                fontSize: '.92rem',
                                                                                borderRadius: '13px',
                                                                                textTransform: 'none',
                                                                                letterSpacing: '.3px',
                                                                                boxShadow: '0 4px 16px -4px rgba(124,58,237,.4)',
                                                                                '&:hover': {
                                                                                    boxShadow: '0 6px 24px -4px rgba(124,58,237,.5)',
                                                                                    transform: 'translateY(-2px)',
                                                                                },
                                                                                transition: 'all .2s ease',
                                                                            }}
                                                                        >
                                                                            Select Community
                                                                        </PurpleButton>
                                                                    </CardActions>
                                                                </Card>
                                                            </Fade>
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                            ) : (
                                                <Box className="emptyState">
                                                    <SearchIcon className="emptyStateIcon" />
                                                    <Typography className="emptyStateTitle">
                                                        No Results Found
                                                    </Typography>
                                                    <Typography className="emptyStateText">
                                                        No communities match your search criteria. Try using different keywords or filters.
                                                    </Typography>
                                                </Box>
                                            )}
                                        </>
                                    )}
                                </>
                            )}
                        </Box>
                    </Box>
                </Fade>
            </Box>
        </Box>
    );
};

export default ChooseClass;