import { useEffect, useState } from "react";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GroupsIcon from '@mui/icons-material/Groups';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getClassDetails, getClassStudents, getSubjectList, getTeacherDetail } from "../../../redux/sclassRelated/sclassHandle";
import {
  Box, Container, Typography, Tab, IconButton, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, Chip
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { BlueButton, GreenButton, PurpleButton } from "../../../components/buttonStyles";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import Popup from "../../../components/Popup";
import DeleteIcon from "@mui/icons-material/Delete";
import PostAddIcon from '@mui/icons-material/PostAdd';

const pageStyles = `
:root {
  --bg-soft:#f3f6fa;
  --panel-bg:#ffffff;
  --border:#dfe5ec;
  --border-strong:#cfd7e0;
  --text-dark:#13293b;
  --text-mid:#536678;
  --primary:#0a78ff;
  --primary-dark:#065dca;
  --accent:#07b389;
  --danger:#c53030;
  --radius-sm:10px;
  --radius-md:14px;
  --radius-lg:18px;
  --radius-xl:24px;
  --shadow-sm:0 2px 6px rgba(30,45,60,0.08);
  --shadow-md:0 6px 18px -6px rgba(25,40,60,0.12);
  --shadow-lg:0 14px 38px -10px rgba(25,40,60,0.18);
  --focus-ring:0 0 0 3px rgba(10,120,255,0.25);
  font-family:Inter,system-ui,sans-serif;
}
.detailsPage {
  background:var(--bg-soft);
  min-height:100vh;
  padding:2rem clamp(1rem,2vw,2.2rem);
  box-sizing:border-box;
}
.panel {
  max-width:1400px;
  margin:0 auto;
  background:var(--panel-bg);
  border:1px solid var(--border);
  border-radius:var(--radius-xl);
  box-shadow:var(--shadow-md);
  padding:2.2rem 2.4rem 2.6rem;
}
.headerBlock {
  display:flex;
  flex-wrap:wrap;
  align-items:center;
  gap:1.4rem;
  margin-bottom:1.6rem;
}
.headerAvatar {
  width:72px;
  height:72px;
  border-radius:var(--radius-lg);
  background:linear-gradient(135deg,var(--primary),var(--accent));
  display:flex;
  align-items:center;
  justify-content:center;
  color:#fff;
  font-size:2rem;
  font-weight:700;
  box-shadow:0 10px 28px -10px rgba(10,120,255,0.35);
  flex-shrink:0;
}
.headerTitle {
  margin:0;
  font-size:2rem;
  font-weight:700;
  letter-spacing:-.5px;
  color:var(--text-dark);
}

/* Details tab layout */
.detailsTabContent {
  display:grid;
  gap:1.5rem;
  max-width:1200px;
  margin:0 auto;
}

/* Stats section */
.statsSection {
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(240px,1fr));
  gap:1.1rem;
}
.statCard {
  display:flex;
  align-items:center;
  gap:1.3rem;
  background: linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%);
  border: 1px solid rgba(79,70,229,0.08);
  border-radius:16px;
  padding:1.8rem 1.6rem;
  min-height:80px;
  transition:all .25s ease;
  position:relative;
  overflow:hidden;
  box-shadow: 0 3px 12px rgba(0,0,0,0.06);
}
.statCard::before {
  content:'';
  position:absolute;
  top:0;
  right:0;
  width:80px;
  height:80px;
  background: radial-gradient(circle, rgba(79,70,229,0.05) 0%, transparent 70%);
  border-radius:50%;
  transform:translate(30%,-30%);
}
.statCard:hover {
  background:#f3f8ff;
  border-color:rgba(79,70,229,0.15);
  box-shadow: 0 6px 20px rgba(0,0,0,0.11);
  transform:translateY(-3px);
}
.statIcon {
  width:56px;
  height:56px;
  border-radius:14px;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color:#fff;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-shrink:0;
  box-shadow: 0 4px 12px rgba(79,70,229,0.25);
  position:relative;
  z-index:1;
}
.statIcon.citizens {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  box-shadow: 0 4px 12px rgba(59,130,246,0.25);
}
.statIcon.events {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  box-shadow: 0 4px 12px rgba(16,185,129,0.25);
}
.statIcon.new {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  box-shadow: 0 4px 12px rgba(245,158,11,0.25);
}
.statMeta { 
  display:flex; 
  flex-direction:column;
  flex:1;
  position:relative;
  z-index:1;
}
.statLabel {
  font-size:.88rem;
  font-weight:500;
  color:var(--text-secondary);
  margin-bottom:.5rem;
}
.statValue {
  font-size:2rem;
  font-weight:700;
  color:var(--text-primary);
  letter-spacing:-.5px;
  line-height:1;
}

/* Leader details card */
.leaderDetailsCard {
  border:1px solid rgba(79,70,229,0.12);
  border-radius:18px;
  background:linear-gradient(135deg, #ffffff 0%, #f8fbff 100%);
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  padding:2.2rem 2.4rem;
  transition:box-shadow .3s ease, transform .3s ease;
}
.leaderDetailsCard:hover {
  box-shadow: 0 8px 28px rgba(0,0,0,0.12);
  transform:translateY(-2px);
}
.leaderHeader {
  display:flex;
  align-items:center;
  gap:1.4rem;
  margin-bottom:1.8rem;
  padding-bottom:1.4rem;
  border-bottom:2px solid rgba(79,70,229,0.08);
}
.leaderAvatarLarge {
  width:70px;
  height:70px;
  border-radius:16px;
  background:linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  display:flex;
  align-items:center;
  justify-content:center;
  color:#fff;
  font-size:2rem;
  box-shadow:0 6px 20px rgba(79,70,229,0.35);
  flex-shrink:0;
}
.leaderTitleBlock {
  flex:1;
}
.leaderTitleBlock h3 {
  margin:0 0 .4rem;
  font-size:1.5rem;
  font-weight:700;
  color:var(--text-dark);
  letter-spacing:-.4px;
}
.leaderTitleBlock p {
  margin:0;
  font-size:.92rem;
  color:var(--text-secondary);
  font-weight:500;
}
.leaderInfoGrid {
  display:grid;
  gap:1rem;
}
.leaderInfoRow {
  display:flex;
  align-items:center;
  gap:1.2rem;
  background: linear-gradient(135deg, #f9fcff 0%, #ffffff 100%);
  border:1px solid rgba(79,70,229,0.08);
  border-radius:12px;
  padding:1.1rem 1.3rem;
  transition:all .25s ease;
}
.leaderInfoRow:hover {
  background: linear-gradient(135deg, #f3f8ff 0%, #ffffff 100%);
  border-color:rgba(79,70,229,0.15);
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  transform:translateX(4px);
}
.leaderInfoIcon {
  width:42px;
  height:42px;
  border-radius:10px;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color:#fff;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-shrink:0;
  box-shadow: 0 3px 10px rgba(79,70,229,0.2);
}
.leaderInfoContent {
  display:flex;
  flex-direction:column;
  flex:1;
}
.leaderInfoLabel {
  font-size:.78rem;
  color:var(--text-secondary);
  font-weight:600;
  text-transform:uppercase;
  letter-spacing:.8px;
  margin-bottom:.35rem;
}
.leaderInfoValue {
  font-size:1rem;
  color:var(--text-dark);
  font-weight:600;
  letter-spacing:-.2px;
}

/* Tab wrapper */
.tabWrapper {
  margin-top:1.5rem;
}

/* Enhanced Events & Citizens tabs styling */
.tabContentWrapper {
  max-width:1200px;
  margin:0 auto;
}
.tabHeader {
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:1.5rem;
  margin-bottom:2rem;
  padding:1.8rem 2rem;
  background:linear-gradient(135deg, #f8fbff 0%, #f0f7ff 100%);
  border:1px solid rgba(79,70,229,0.08);
  border-radius:16px;
  box-shadow: 0 3px 12px rgba(0,0,0,0.06);
  transition:box-shadow .3s ease;
}
.tabHeader:hover {
  box-shadow: 0 5px 18px rgba(0,0,0,0.09);
}
.tabTitleBlock {
  display:flex;
  align-items:center;
  gap:1.2rem;
  flex:1;
}
.tabIconCircle {
  width:58px;
  height:58px;
  border-radius:16px;
  background:linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color:#fff;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-shrink:0;
  box-shadow: 0 4px 14px rgba(79,70,229,0.3);
}
.tabTitleContent {
  display:flex;
  flex-direction:column;
  gap:.3rem;
}
.tabTitle {
  margin:0;
  font-size:1.5rem;
  font-weight:700;
  color:var(--text-dark);
  letter-spacing:-.4px;
}
.tabSubtitle {
  margin:0;
  font-size:.9rem;
  color:var(--text-secondary);
  font-weight:500;
}
.tabStats {
  display:flex;
  align-items:center;
  gap:.6rem;
  padding:.6rem 1.2rem;
  background: linear-gradient(135deg, #ffffff 0%, #f9fbff 100%);
  border-radius:10px;
  border:1px solid rgba(79,70,229,0.12);
}
.tabStatsLabel {
  font-size:.8rem;
  font-weight:600;
  color:var(--text-secondary);
  text-transform:uppercase;
  letter-spacing:.5px;
}
.tabStatsValue {
  font-size:1.3rem;
  font-weight:700;
  color:var(--text-dark);
  letter-spacing:-.3px;
}

/* Empty state styling */
.emptyState {
  text-align:center;
  padding:4.5rem 3rem;
  background:linear-gradient(135deg, #fafcff 0%, #f3f8ff 100%);
  border:2px dashed rgba(79,70,229,0.15);
  border-radius:18px;
  margin:2rem 0;
}
.emptyStateIcon {
  width:110px;
  height:110px;
  margin:0 auto 1.8rem;
  border-radius:50%;
  background:linear-gradient(135deg, #e8f2ff 0%, #dce8ff 100%);
  color:#4f46e5;
  display:flex;
  align-items:center;
  justify-content:center;
  box-shadow: 0 8px 24px rgba(79,70,229,0.2);
}
.emptyStateTitle {
  font-size:1.7rem;
  font-weight:700;
  color:var(--text-dark);
  margin:0 0 .8rem;
  letter-spacing:-.5px;
}
.emptyStateText {
  font-size:1.05rem;
  color:var(--text-secondary);
  margin:0 0 2.2rem;
  line-height:1.65;
  max-width:440px;
  margin-left:auto;
  margin-right:auto;
  font-weight:400;
}

/* Custom Table Styling */
.customTableContainer {
  background:var(--panel-bg);
  border:1px solid rgba(79,70,229,0.08);
  border-radius:16px;
  box-shadow: 0 3px 12px rgba(0,0,0,0.06);
  overflow:auto;
}
.customTable { width:100%; min-width:760px; }
.customTableHead {
  background:linear-gradient(135deg, #f8fbff 0%, #f0f7ff 100%);
}
.customTableHeadCell {
  font-size:.82rem !important;
  font-weight:700 !important;
  text-transform:uppercase;
  letter-spacing:.8px;
  color:var(--text-secondary) !important;
  border-bottom:2px solid rgba(79,70,229,0.1) !important;
  padding:1.1rem 1.2rem !important;
  position:sticky; top:0; z-index:2;
}
.customTableBodyRow {
  transition:background .2s ease, box-shadow .2s ease;
  border-bottom:1px solid rgba(79,70,229,0.05);
}
.customTableBodyRow:hover {
  background:linear-gradient(135deg, #fafcff 0%, #f8fbff 100%);
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.customTableCell {
  font-size:.95rem !important;
  color:var(--text-primary) !important;
  padding:1rem 1.2rem !important;
  border-bottom:none !important;
}
.rowClickable {
  cursor:pointer;
  font-weight:600;
  transition:color .2s ease;
}
.rowClickable:hover {
  color:#4f46e5 !important;
}
.truncate {
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
  max-width:280px;
  display:inline-block;
  vertical-align:middle;
}
.codeChip, .idChip {
  font-weight:600 !important;
  border-width:1.5px !important;
  background: linear-gradient(135deg, #f0f7ff 0%, #e8f2ff 100%) !important;
  color:#4f46e5 !important;
  border-color:rgba(79,70,229,0.25) !important;
}
.actionButtons {
  display:flex;
  align-items:center;
  justify-content:center;
  gap:.6rem;
  flex-wrap:wrap;
}

.colName,
.colCode,
.colId,
.colActions {
  width:33.333%;
  text-align:center !important;
}

.rowClickable {
  cursor:pointer;
  font-weight:600;
  transition:color .2s ease;
}@media (max-width:900px){
  .panel { padding:1.8rem 1.6rem 2.2rem; }
  .headerTitle { font-size:1.7rem; }
  .headerAvatar { width:64px; height:64px; font-size:1.7rem; }
  .statsSection { grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); }
  .tabHeader { 
    flex-direction:column; 
    align-items:flex-start; 
    gap:1.2rem;
    padding:1.2rem 1.4rem;
  }
  .tabTitle { font-size:1.4rem; }
  .tabIconCircle { width:50px; height:50px; }
  .colName,
  .colCode,
  .colId,
  .colActions { width:33.333%; }
}

@media (max-width:640px){
  .panel { padding:1.4rem 1.2rem 1.8rem; }
  .headerTitle { font-size:1.5rem; }
  .headerAvatar { width:56px; height:56px; font-size:1.5rem; }
  .statsSection { grid-template-columns:1fr; }
  .leaderDetailsCard { padding:1.5rem 1.4rem; }
  .leaderAvatarLarge { width:58px; height:58px; font-size:1.6rem; }
  .leaderTitleBlock h3 { font-size:1.2rem; }
  .leaderInfoRow { padding:.85rem 1rem; }
  .tabTitle { font-size:1.25rem; }
  .tabIconCircle { width:46px; height:46px; }
  .tabHeader { padding:1rem 1.2rem; }
  .emptyState { padding:3rem 1.8rem; }
  .emptyStateIcon { width:85px; height:85px; }
  .customTableHeadCell { padding:.9rem 1rem !important; font-size:.75rem !important; }
  .customTableCell { padding:.85rem 1rem !important; font-size:.88rem !important; }
  .colName,
  .colCode,
  .colId,
  .colActions { width:33.333%; }
}
`;

const ClassDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { subjectsList = [], sclassStudents = [], teacherDetails = {}, sclassDetails = {}, loading, error, response, getresponse } = useSelector((state) => state.sclass);

  const classID = params.id;

  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = pageStyles;
    document.head.appendChild(styleEl);
    return () => styleEl.remove();
  }, []);

  useEffect(() => {
    dispatch(getClassDetails(classID, "Sclass"));
    dispatch(getSubjectList(classID, null, "ClassSubjects"));
    dispatch(getClassStudents(classID, "classID"));
    dispatch(getTeacherDetail(classID, 'Teacher'));
  }, [dispatch, classID]);

  if (error) console.log(error);

  const [value, setValue] = useState('1');
  const handleChange = (_e, nv) => setValue(nv);

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const deleteHandler = () => {
    setMessage("Done.");
    setShowPopup(true);
  };

  // Stats
  const totalEvents = subjectsList.length;
  const totalCitizens = sclassStudents.length;
  const newEventsThisMonth = subjectsList.filter((s) => {
    const d = s?.createdAt ? new Date(s.createdAt) : null;
    const now = new Date();
    return d && d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  }).length;

  return (
    <>
      {loading ? (
        <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>
      ) : (
        <div className="detailsPage">
          <div className="panel">
            <div className="headerBlock">
              <div className="headerAvatar">
                <GroupsIcon style={{ fontSize: '2rem' }} />
              </div>
              <h1 className="headerTitle">
                {sclassDetails?.sclassName || 'Community'}
              </h1>
            </div>

            <Box className="tabWrapper">
              <TabContext value={value}>
                <Box className="fixedTabs">
                  <TabList onChange={handleChange} variant="scrollable" allowScrollButtonsMobile>
                    <Tab label="Details" value="1" />
                    <Tab label="Events" value="2" />
                    <Tab label="Citizens" value="3" />
                  </TabList>
                </Box>
                <Container sx={{ mt: 0, mb: 4, px: { xs: 1, sm: 2 } }}>
                  <TabPanel value="1" sx={{ px: 0 }}>
                    <div className="detailsTabContent">
                      <div className="statsSection">
                        <div className="statCard">
                          <div className="statIcon citizens"><PeopleIcon style={{ fontSize: '1.6rem' }} /></div>
                          <div className="statMeta">
                            <span className="statLabel">Total Citizens</span>
                            <span className="statValue">{totalCitizens}</span>
                          </div>
                        </div>
                        <div className="statCard">
                          <div className="statIcon events"><EventIcon style={{ fontSize: '1.6rem' }} /></div>
                          <div className="statMeta">
                            <span className="statLabel">Total Events</span>
                            <span className="statValue">{totalEvents}</span>
                          </div>
                        </div>
                        <div className="statCard">
                          <div className="statIcon new"><CalendarMonthIcon style={{ fontSize: '1.6rem' }} /></div>
                          <div className="statMeta">
                            <span className="statLabel">New This Month</span>
                            <span className="statValue">{newEventsThisMonth}</span>
                          </div>
                        </div>
                      </div>

                      <div className="leaderDetailsCard">
                        <div className="leaderHeader">
                          <div className="leaderAvatarLarge">
                            <AdminPanelSettingsIcon style={{ fontSize: '1.9rem' }} />
                          </div>
                          <div className="leaderTitleBlock">
                            <h3>Community Leader Details</h3>
                            <p>Administrator Information</p>
                          </div>
                        </div>
                        
                        <div className="leaderInfoGrid">
                          <div className="leaderInfoRow">
                            <div className="leaderInfoIcon">
                              <PersonIcon style={{ fontSize: '1.3rem' }} />
                            </div>
                            <div className="leaderInfoContent">
                              <span className="leaderInfoLabel">Leader Name</span>
                              <span className="leaderInfoValue">{teacherDetails?.name || '—'}</span>
                            </div>
                          </div>
                          
                          <div className="leaderInfoRow">
                            <div className="leaderInfoIcon">
                              <EmailOutlinedIcon style={{ fontSize: '1.3rem' }} />
                            </div>
                            <div className="leaderInfoContent">
                              <span className="leaderInfoLabel">Leader Email</span>
                              <span className="leaderInfoValue">{teacherDetails?.email || '—'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabPanel>

                  <TabPanel value="2" sx={{ px: 0 }}>
                    <div className="tabContentWrapper">
                      {response ? (
                        <div className="emptyState">
                          <div className="emptyStateIcon">
                            <EventIcon style={{ fontSize: '3rem' }} />
                          </div>
                          <h3 className="emptyStateTitle">No Events Found</h3>
                          <p className="emptyStateText">Get started by creating your first community event to engage with citizens</p>
                          <GreenButton 
                            variant="contained" 
                            onClick={() => navigate("/Admin/addevent/" + classID)}
                            sx={{ px: 3.5, py: 1.3, fontSize: '1rem', fontWeight: 600, borderRadius: '12px' }}
                          >
                            <PostAddIcon style={{ marginRight: '.6rem', fontSize: '1.3rem' }} /> 
                            Create First Event
                          </GreenButton>
                        </div>
                      ) : (
                        <>
                          <div className="tabHeader">
                            <div className="tabTitleBlock">
                              <div className="tabIconCircle">
                                <EventIcon style={{ fontSize: '1.7rem' }} />
                              </div>
                              <div className="tabTitleContent">
                                <h2 className="tabTitle">Community Events</h2>
                                <p className="tabSubtitle">Manage & Track All Events</p>
                              </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                              <div className="tabStats">
                                <span className="tabStatsLabel">Total</span>
                                <span className="tabStatsValue">{totalEvents}</span>
                              </div>
                              <GreenButton 
                                variant="contained" 
                                onClick={() => navigate("/Admin/addevent/" + classID)}
                                sx={{ px: 2.8, py: 1.1, fontSize: '.92rem', fontWeight: 600, borderRadius: '12px' }}
                              >
                                <PostAddIcon style={{ marginRight: '.5rem', fontSize: '1.15rem' }} /> 
                                Add Event
                              </GreenButton>
                            </div>
                          </div>
                          
                          {/* Events Table */}
                          <TableContainer component={Paper} className="customTableContainer" sx={{ maxHeight: 520 }}>
                            <Table className="customTable" stickyHeader size="small">
                              <TableHead className="customTableHead">
                                <TableRow>
                                  <TableCell className="customTableHeadCell colName" align="center">Event Name</TableCell>
                                  <TableCell className="customTableHeadCell colCode" align="center">Event Code</TableCell>
                                  <TableCell className="customTableHeadCell colActions" align="center">Actions</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {subjectsList.map(subject => (
                                  <TableRow key={subject._id} className="customTableBodyRow">
                                    <TableCell
                                      className="customTableCell colName rowClickable"
                                      align="center"
                                      onClick={() => navigate(`/Admin/community/event/${classID}/${subject._id}`)}
                                    >
                                      <span className="truncate">{subject.subName}</span>
                                    </TableCell>
                                    <TableCell className="customTableCell colCode" align="center">
                                      <Chip
                                        className="codeChip"
                                        label={subject.subCode || '-'}
                                        size="small"
                                        variant="outlined"
                                        color="primary"
                                      />
                                    </TableCell>
                                    <TableCell className="customTableCell colActions" align="center">
                                      <div className="actionButtons">
                                        <IconButton onClick={() => deleteHandler(subject._id, "Event")} size="small">
                                          <DeleteIcon color="error" fontSize="small" />
                                        </IconButton>
                                        <BlueButton
                                          variant="contained"
                                          size="small"
                                          onClick={() => navigate(`/Admin/community/event/${classID}/${subject._id}`)}
                                          sx={{ fontSize: '.8rem', px: 1.3 }}
                                        >
                                          <VisibilityIcon style={{ marginRight: '.3rem', fontSize: '.9rem' }} />
                                          View
                                        </BlueButton>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>

                          <SpeedDialTemplate actions={[
                            { icon: <PostAddIcon color="primary" />, name: 'Add New Event', action: () => navigate("/Admin/addevent/" + classID) },
                            { icon: <DeleteIcon color="error" />, name: 'Delete All Events', action: () => deleteHandler(classID, "SubjectsClass") }
                          ]} />
                        </>
                      )}
                    </div>
                  </TabPanel>

                  <TabPanel value="3" sx={{ px: 0 }}>
                    <div className="tabContentWrapper">
                      {getresponse ? (
                        <div className="emptyState">
                          <div className="emptyStateIcon">
                            <PeopleIcon style={{ fontSize: '3rem' }} />
                          </div>
                          <h3 className="emptyStateTitle">No Citizens Found</h3>
                          <p className="emptyStateText">Begin building your community by adding the first citizen member</p>
                          <GreenButton 
                            variant="contained" 
                            onClick={() => navigate("/Admin/community/addcitizens/" + classID)}
                            sx={{ px: 3.5, py: 1.3, fontSize: '1rem', fontWeight: 600, borderRadius: '12px' }}
                          >
                            <PersonAddAlt1Icon style={{ marginRight: '.6rem', fontSize: '1.3rem' }} /> 
                            Add First Citizen
                          </GreenButton>
                        </div>
                      ) : (
                        <>
                          <div className="tabHeader">
                            <div className="tabTitleBlock">
                              <div className="tabIconCircle">
                                <PeopleIcon style={{ fontSize: '1.7rem' }} />
                              </div>
                              <div className="tabTitleContent">
                                <h2 className="tabTitle">Community Citizens</h2>
                                <p className="tabSubtitle">View & Manage Members</p>
                              </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                              <div className="tabStats">
                                <span className="tabStatsLabel">Total</span>
                                <span className="tabStatsValue">{totalCitizens}</span>
                              </div>
                              <GreenButton 
                                variant="contained" 
                                onClick={() => navigate("/Admin/community/addcitizens/" + classID)}
                                sx={{ px: 2.8, py: 1.1, fontSize: '.92rem', fontWeight: 600, borderRadius: '12px' }}
                              >
                                <PersonAddAlt1Icon style={{ marginRight: '.5rem', fontSize: '1.15rem' }} /> 
                                Add Citizen
                              </GreenButton>
                            </div>
                          </div>
                          
                          {/* Citizens Table */}
                          <TableContainer component={Paper} className="customTableContainer" sx={{ maxHeight: 520 }}>
                            <Table className="customTable" stickyHeader size="small">
                              <TableHead className="customTableHead">
                                <TableRow>
                                  <TableCell className="customTableHeadCell colName" align="center">Name</TableCell>
                                  <TableCell className="customTableHeadCell colId" align="center">Citizen ID</TableCell>
                                  <TableCell className="customTableHeadCell colActions" align="center">Actions</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {sclassStudents.map(student => (
                                  <TableRow key={student._id} className="customTableBodyRow">
                                    <TableCell
                                      className="customTableCell colName rowClickable"
                                      align="center"
                                      onClick={() => navigate("/Admin/citizens/citizen/" + student._id)}
                                    >
                                      <span className="truncate">{student.name}</span>
                                    </TableCell>
                                    <TableCell className="customTableCell colId" align="center">
                                      <Chip
                                        className="idChip"
                                        label={student.rollNum || '-'}
                                        size="small"
                                        variant="outlined"
                                        color="primary"
                                      />
                                    </TableCell>
                                    <TableCell className="customTableCell colActions" align="center">
                                      <div className="actionButtons">
                                        <IconButton onClick={() => deleteHandler(student._id, "Citizen")} size="small">
                                          <PersonRemoveIcon color="error" fontSize="small" />
                                        </IconButton>
                                        <BlueButton
                                          variant="contained"
                                          size="small"
                                          onClick={() => navigate("/Admin/citizens/citizen/" + student._id)}
                                          sx={{ fontSize: '.8rem', px: 1.3 }}
                                        >
                                          <VisibilityIcon style={{ marginRight: '.3rem', fontSize: '.9rem' }} />
                                          View
                                        </BlueButton>
                                        <PurpleButton
                                          variant="contained"
                                          size="small"
                                          onClick={() => navigate("/Admin/citizens/citizen/attendance/" + student._id)}
                                          sx={{ fontSize: '.8rem', px: 1.3 }}
                                        >
                                          Attendance
                                        </PurpleButton>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>

                          <SpeedDialTemplate actions={[
                            { icon: <PersonAddAlt1Icon color="primary" />, name: 'Add New Citizen', action: () => navigate("/Admin/community/addcitizens/" + classID) },
                            { icon: <PersonRemoveIcon color="error" />, name: 'Delete All Citizens', action: () => deleteHandler(classID, "StudentsClass") }
                          ]} />
                        </>
                      )}
                    </div>
                  </TabPanel>
                </Container>
              </TabContext>
            </Box>
          </div>
        </div>
      )}
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  );
};

export default ClassDetails;