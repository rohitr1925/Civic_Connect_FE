import { useEffect, useState } from 'react';
import { Menu, MenuItem, ListItemIcon, TextField, InputAdornment } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AddCardIcon from '@mui/icons-material/AddCard';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import GroupsIcon from '@mui/icons-material/Groups';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';

const pageStyles = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

:root {
  --bg-soft:#f3f6fa;
  --panel-bg:#ffffff;
  --border:#e2e8f0;
  --text-dark:#1a202c;
  --text-mid:#4a5568;
  --text-light:#718096;
  --primary:#0a78ff;
  --primary-dark:#065dca;
  --accent:#07b389;
  --danger:#c53030;
  --radius-lg:20px;
  --shadow-sm:0 2px 8px rgba(30,45,60,0.06);
  --shadow-md:0 4px 16px rgba(25,40,60,0.08);
  --shadow-lg:0 8px 28px rgba(25,40,60,0.12);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

* {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  box-sizing: border-box;
}

.showClassesContainer {
  padding:2rem 1.5rem;
  min-height:100vh;
  background: linear-gradient(135deg, #f0f7ff 0%, #e8f2ff 50%, #f3f6fa 100%) fixed;
}

.pagePanel {
  max-width:1380px;
  margin:0 auto;
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

.pageHeader {
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

.titleAvatar {
  width:68px;
  height:68px;
  border-radius:18px;
  background:linear-gradient(135deg,var(--primary) 0%, var(--accent) 100%);
  color:#fff;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:2rem;
  font-weight:700;
  flex-shrink:0;
  box-shadow:0 10px 30px -8px rgba(10,120,255,.45);
  transition:transform .3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.titleAvatar:hover {
  transform:scale(1.1) rotate(-5deg);
}

.headerTitleGroup {
  display:flex;
  flex-direction:column;
  gap:.35rem;
}

.pageTitle {
  margin:0;
  font-size:2rem;
  font-weight:900;
  letter-spacing:-.8px;
  color:var(--text-dark);
  line-height:1.1;
}

.pageSubtitle {
  margin:0;
  color:var(--text-mid);
  font-size:.8rem;
  text-transform:uppercase;
  letter-spacing:1.1px;
  font-weight:800;
}

.addButton {
  background:var(--accent);
  color:#fff;
  border:none;
  padding:1.2rem 3rem;
  border-radius:14px;
  font-weight:700;
  display:flex;
  align-items:center;
  gap:8px;
  cursor:pointer;
  font-size:.9rem;
  box-shadow:0 6px 20px -6px rgba(7,179,137,.4);
  transition:all .25s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform:none;
  letter-spacing:.3px;
}
.addButton:hover { 
  background:#06a07a;
  box-shadow:0 8px 28px -6px rgba(7,179,137,.5);
  transform:translateY(-3px);
}

.contentSection {
  padding:2.5rem;
}

.statsBar {
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
  gap:1.5rem;
  margin-bottom:2.5rem;
}

.statCard {
  background:linear-gradient(135deg, #f9fbfe 0%, #f3f7fc 100%);
  border:1px solid var(--border);
  border-radius:16px;
  padding:1.5rem;
  display:flex;
  align-items:center;
  gap:1rem;
  transition:all .2s ease;
}

.statCard:hover {
  transform:translateY(-2px);
  box-shadow:var(--shadow-md);
}

.statIconBox {
  width:50px;
  height:50px;
  border-radius:14px;
  background:linear-gradient(135deg,#e8f2ff,#f0f7ff);
  color:var(--primary);
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:1.4rem;
  flex-shrink:0;
}

.statNumbers { 
  display:flex; 
  flex-direction:column;
  gap:.2rem;
}
.statLabel {
  font-size:.8rem;
  font-weight:700;
  letter-spacing:.6px;
  text-transform:uppercase;
  color:var(--text-light);
}
.statValue {
  font-size:1.6rem;
  font-weight:900;
  letter-spacing:-.4px;
  color:var(--text-dark);
}

.classesGrid {
  display:grid;
  grid-template-columns:repeat(3, 1fr);
  gap:1.5rem;
}

@media (max-width: 1200px) {
  .classesGrid { grid-template-columns:repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .classesGrid { grid-template-columns:1fr; }
}

.classCard {
  background:var(--panel-bg);
  border:2px solid var(--border);
  border-radius:18px;
  padding:1.5rem;
  display:flex;
  flex-direction:column;
  gap:1rem;
  box-shadow:var(--shadow-sm);
  transition:all .3s cubic-bezier(0.4, 0, 0.2, 1);
  position:relative;
  overflow:hidden;
}

.classCard::before {
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

.classCard:hover::before {
  opacity:1;
}

.classCard:hover {
  border-color:var(--primary);
  box-shadow:0 12px 32px -8px rgba(10,120,255,.2);
  transform:translateY(-4px);
}

.classTopRow {
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:.75rem;
}

.classLeft {
  display:flex;
  align-items:center;
  gap:1rem;
  flex:1;
  min-width:0;
}

.classIcon {
  width:56px;
  height:56px;
  border-radius:14px;
  background:linear-gradient(135deg,var(--primary) 0%, var(--accent) 95%);
  display:flex;
  align-items:center;
  justify-content:center;
  color:#fff;
  font-size:1.5rem;
  font-weight:800;
  flex-shrink:0;
  box-shadow:0 6px 16px -4px rgba(10,120,255,.35);
}

.className {
  margin:0;
  font-size:1.15rem;
  font-weight:800;
  color:var(--text-dark);
  line-height:1.3;
  letter-spacing:-.3px;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}

.classMenu {
  background:transparent;
  border:none;
  padding:8px;
  border-radius:10px;
  cursor:pointer;
  color:var(--text-mid);
  flex-shrink:0;
  transition:background .15s;
}
.classMenu:hover { background:#f0f4f8; }

.metaLine {
  font-size:.72rem;
  font-weight:700;
  letter-spacing:.8px;
  text-transform:uppercase;
  color:var(--text-light);
  background:#f9fbfc;
  border:1px solid #e8eef5;
  padding:6px 10px;
  border-radius:10px;
  width:max-content;
}

.classStats {
  display:flex;
  gap:.7rem;
}

.statBadge {
  flex:1;
  background:#f9fbfc;
  border:1px solid #e8eef5;
  padding:10px 12px;
  border-radius:12px;
  font-size:.78rem;
  font-weight:700;
  color:var(--text-dark);
  display:flex;
  align-items:center;
  justify-content:center;
  gap:6px;
  min-height:38px;
  letter-spacing:.2px;
  transition:all .2s ease;
}
.statBadge:hover {
  background:#f0f5fa;
  transform:translateY(-1px);
}
.statBadge svg { 
  font-size:1.1rem; 
  color:var(--primary);
}

.classActions {
  display:flex;
  gap:.8rem;
  margin-top:auto;
  padding-top:.5rem;
}

.viewButton {
  flex:1;
  background:var(--primary);
  color:#fff;
  border:none;
  padding:11px 16px;
  font-size:.85rem;
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
.viewButton:hover { 
  background:var(--primary-dark);
  transform:translateY(-2px);
  box-shadow:0 6px 18px -4px rgba(10,120,255,.45);
}

.deleteButton {
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
.deleteButton:hover { 
  background:#ffd9d9;
  transform:translateY(-2px);
}

.emptyState {
  text-align:center;
  padding:5rem 3rem;
  background:linear-gradient(135deg,#fbfdff 0%,#f7fbff 100%);
  border-radius:18px;
  margin:2.5rem;
}
.emptyState h2 {
  margin:1.5rem 0 .8rem;
  font-size:1.6rem;
  font-weight:900;
  color:var(--text-dark);
  letter-spacing:-.5px;
}
.emptyState p {
  margin:0 0 2rem;
  font-size:1rem;
  color:var(--text-light);
  font-weight:500;
  line-height:1.6;
  max-width:460px;
  margin-left:auto;
  margin-right:auto;
}
.emptyStateIcon {
  width:80px;
  height:80px;
  border-radius:20px;
  background:linear-gradient(135deg,var(--primary),var(--accent));
  display:flex;
  align-items:center;
  justify-content:center;
  color:#fff;
  font-size:2.2rem;
  margin:0 auto;
  box-shadow:0 10px 30px -8px rgba(10,120,255,.4);
  animation:float 3.5s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform:translateY(0) rotate(0deg); }
  50% { transform:translateY(-12px) rotate(5deg); }
}

.loadingContainer {
  display:flex;
  align-items:center;
  justify-content:center;
  min-height:60vh;
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

@media (max-width:1024px){
  .pagePanel { border-radius:16px; }
  .pageHeader { 
    padding:1.8rem 1.5rem;
    flex-direction:column;
    align-items:flex-start;
  }
  .contentSection { padding:1.8rem 1.5rem; }
  .pageTitle { font-size:1.7rem; }
  .titleAvatar { width:58px; height:58px; font-size:1.7rem; }
  .addButton { width:100%; justify-content:center; }
}

@media (max-width:768px){
  .showClassesContainer { padding:1.5rem 1rem; }
  .pageHeader { padding:1.5rem 1.2rem; }
  .contentSection { padding:1.5rem 1.2rem; }
  .emptyState { padding:4rem 2rem; margin:1.5rem; }
  .statsBar { grid-template-columns:1fr; }
  .classIcon { width:52px; height:52px; font-size:1.3rem; }
  .className { font-size:1.05rem; }
}
`;

const ShowClasses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sclassesList, loading, error, getresponse } = useSelector((state) => state.sclass);
  const { currentUser } = useSelector(state => state.user);
  const adminID = currentUser._id;
  const [anchorEls, setAnchorEls] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // added

  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = pageStyles;
    document.head.appendChild(styleEl);
    return () => styleEl.remove();
  }, []);

  useEffect(() => {
    dispatch(getAllSclasses(adminID, "Sclass"));
  }, [adminID, dispatch]);

  if (error) console.log(error);

  const deleteHandler = (deleteID, address) => {
    setMessage("Deleted Successfully");
    setShowPopup(true);
    dispatch(deleteUser(deleteID, address)).then(() => {
      dispatch(getAllSclasses(adminID, "Sclass"));
    });
  };

  const handleMenuClick = (e, id) =>
    setAnchorEls(prev => ({ ...prev, [id]: e.currentTarget }));
  const handleMenuClose = (id) =>
    setAnchorEls(prev => ({ ...prev, [id]: null }));

  const actions = [
    { icon: <AddCardIcon color="primary" />, name: 'Add New Community', action: () => navigate("/Admin/addcommunity") },
    { icon: <DeleteIcon color="error" />, name: 'Delete All Communities', action: () => deleteHandler(adminID, "Sclasses") },
  ];

  const totalCommunities = sclassesList?.length || 0;
  const newThisMonth = (sclassesList || []).filter((s) => {
    const d = s?.createdAt ? new Date(s.createdAt) : null;
    if (!d) return false;
    const now = new Date();
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  }).length;

  const displayedClasses = searchQuery
    ? (sclassesList || []).filter(c =>
        (c.sclassName || "").toLowerCase().includes(searchQuery.toLowerCase().trim())
      )
    : (sclassesList || []);

  return (
    <>
      {loading ? (
        <div className="loadingContainer"><div className="loadingSpinner" /></div>
      ) : getresponse ? (
        <div className="showClassesContainer">
          <div className="pagePanel">
            <div className="emptyState">
              <div className="emptyStateIcon">
                <GroupsIcon />
              </div>
              <h2>No Communities Found</h2>
              <p>Create your first community to get started with organizing and managing your members effectively</p>
              <button className="addButton" onClick={() => navigate("/Admin/addcommunity")}>
                <AddCardIcon /> Create First Community
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="showClassesContainer">
          <div className="pagePanel">
            <div className="pageHeader">
              <div className="headerLeft">
                <div className="titleAvatar">
                  <GroupsIcon />
                </div>
                <div className="headerTitleGroup">
                  <h1 className="pageTitle">Communities</h1>
                  <p className="pageSubtitle">Manage All Communities</p>
                </div>
              </div>
              {/* Enlarged search box */}
              <div style={{ display:'flex', gap:'1rem', alignItems:'center', flexWrap:'wrap' }}>
                <TextField
                  value={searchQuery}
                  onChange={(e)=>setSearchQuery(e.target.value)}
                  placeholder="Search communities..."
                  size="medium"
                  InputProps={{
                    startAdornment:(
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color:'#718096', fontSize:'1.3rem' }} />
                      </InputAdornment>
                    )
                  }}
                  sx={{
                    flexGrow:1,
                    minWidth:'380px',
                    width:'480px',
                    maxWidth:'100%',
                    '& .MuiOutlinedInput-root':{
                      height:'54px',
                      borderRadius:'16px',
                      background:'#f9fbfc',
                      fontSize:'0.95rem',
                      fontWeight:500,
                      border:'1.5px solid #e2e8f0',
                      paddingRight:'8px',
                      transition:'all .25s',
                      '& input':{
                        padding:'0 0 0 0',
                      },
                      '&:hover':{ background:'#fff' },
                      '&.Mui-focused':{
                        background:'#fff',
                        borderColor:'#0a78ff',
                        boxShadow:'0 0 0 4px rgba(10,120,255,.10)'
                      }
                    }
                  }}
                />
                <button className="addButton" onClick={() => navigate("/Admin/addcommunity")}>
                  <AddCardIcon /> Add Community
                </button>
              </div>
            </div>

            <div className="contentSection">
              <div className="statsBar" style={{gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', maxWidth:'600px', margin:'0 0 2.5rem 0', justifyContent:'flex-start'}}>
                <div className="statCard">
                  <div className="statIconBox">
                    <GroupsIcon />
                  </div>
                  <div className="statNumbers">
                    <span className="statLabel">Total Communities</span>
                    <span className="statValue">{totalCommunities}</span>
                  </div>
                </div>
                <div className="statCard">
                  <div className="statIconBox">
                    <CalendarMonthIcon />
                  </div>
                  <div className="statNumbers">
                    <span className="statLabel">New This Month</span>
                    <span className="statValue">{newThisMonth}</span>
                  </div>
                </div>
              </div>

              {Array.isArray(displayedClasses) && displayedClasses.length > 0 && (
                <div className="classesGrid">
                  {displayedClasses.map((sclass, index) => (
                    <div key={sclass._id} className="classCard">
                      <div className="classTopRow">
                        <div className="classLeft">
                          <div className="classIcon">
                            {sclass.sclassName?.charAt(0)?.toUpperCase()}
                          </div>
                          <h3 className="className" title={sclass.sclassName}>
                            {sclass.sclassName}
                          </h3>
                        </div>
                        <button
                          className="classMenu"
                          onClick={(e) => handleMenuClick(e, sclass._id)}
                          aria-label="More actions"
                        >
                          <MoreVertIcon />
                        </button>
                        <Menu
                          anchorEl={anchorEls[sclass._id]}
                          open={Boolean(anchorEls[sclass._id])}
                          onClose={() => handleMenuClose(sclass._id)}
                          PaperProps={{
                            elevation: 0,
                            sx: styles.styledPaper
                          }}
                        >
                          <MenuItem onClick={() => {
                            navigate("/Admin/addevent/" + sclass._id);
                            handleMenuClose(sclass._id);
                          }}>
                            <ListItemIcon>
                              <PostAddIcon fontSize="small" />
                            </ListItemIcon>
                            Add Events
                          </MenuItem>
                          <MenuItem onClick={() => {
                            navigate("/Admin/community/addcitizens/" + sclass._id);
                            handleMenuClose(sclass._id);
                          }}>
                            <ListItemIcon>
                              <PersonAddAlt1Icon fontSize="small" />
                            </ListItemIcon>
                            Add Citizen
                          </MenuItem>
                        </Menu>
                      </div>

                      <div className="metaLine">Community #{index + 1}</div>

                      <div className="classStats">
                        <div className="statBadge"><EventIcon /> Events</div>
                        <div className="statBadge"><PeopleIcon /> Citizens</div>
                      </div>

                      <div className="classActions">
                        <button
                          className="viewButton"
                          onClick={() => navigate("/Admin/communities/community/" + sclass._id)}
                        >
                          <VisibilityIcon style={{ fontSize: '.9rem' }} /> View Details
                        </button>
                        <button
                          className="deleteButton"
                          onClick={() => deleteHandler(sclass._id, "Sclass")}
                          aria-label="Delete community"
                        >
                          <DeleteIcon fontSize="small" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {searchQuery && displayedClasses.length === 0 && (
                <div className="emptyState" style={{ margin:'1.5rem' }}>
                  <div className="emptyStateIcon"><SearchIcon /></div>
                  <h2>No results</h2>
                  <p>Try a different keyword.</p>
                </div>
              )}
              <SpeedDialTemplate actions={actions} />
            </div>
          </div>
        </div>
      )}
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  );
};

export default ShowClasses;

const styles = {
  styledPaper: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 4px 12px rgba(25,40,60,0.18))',
    mt: 1,
    borderRadius: '12px',
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0
    }
  }
};