import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper, 
  Box, 
  Checkbox, 
  Typography, 
  Tooltip,
  CircularProgress
} from '@mui/material';
import { 
  CheckCircle as CheckCircleIcon,
  PendingActions as PendingIcon,
  Assignment as AssignmentIcon,
  Bookmark as BookmarkIcon,
  Event as EventIcon
} from '@mui/icons-material';
import { getAllComplains } from '../../../redux/complainRelated/complainHandle';
import TableTemplate from '../../../components/TableTemplate';
import { updateComplain } from '../../../redux/userRelated/userHandle';

const SeeComplains = () => {

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };  
  const dispatch = useDispatch();
  const { complainsList, loading, error, response } = useSelector((state) => state.complain);
  const { currentUser } = useSelector(state => state.user)
  console.log(complainsList,'this is clist')
  const address = 'UpdateComplain'
  
  useEffect(() => {
    dispatch(getAllComplains(currentUser._id, "admin","Complain"));
  }, [currentUser._id, dispatch]);

  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
      :root {
        --complain-primary:#0a78ff;
        --complain-accent:#07b389;
        --complain-warning:#ff9800;
        --complain-danger:#f44336;
        --complain-border:#e2e8f0;
        --complain-text-dark:#1a202c;
        --complain-text-mid:#4a5568;
        --complain-text-light:#718096;
      }
      
      * { 
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
        box-sizing: border-box;
      }

      .complains-page-wrap { 
        min-height:100vh; 
        background:linear-gradient(135deg,#f0f7ff 0%, #eaf4ff 100%); 
        padding:2.5rem 1.5rem; 
      }
      
      .complains-panel { 
        max-width:1320px; 
        margin:0 auto; 
        background:#fff; 
        border-radius:24px; 
        box-shadow:0 8px 32px rgba(25,40,60,.12); 
        border:1px solid var(--complain-border); 
        overflow:hidden;
        animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      }
      
      @keyframes slideUp {
        from { opacity:0; transform:translateY(30px); }
        to { opacity:1; transform:translateY(0); }
      }

      .complains-header { 
        display:flex; 
        flex-wrap:wrap; 
        align-items:center; 
        justify-content:space-between; 
        gap:1.2rem; 
        padding:2rem 2.5rem; 
        background:linear-gradient(135deg,#fcfdff,#f5f9ff); 
        border-bottom:1px solid var(--complain-border); 
        position:relative; 
      }
      
      .complains-header::after { 
        content:''; 
        position:absolute; 
        inset:0; 
        background:radial-gradient(circle at 85% 15%, rgba(10,120,255,.06), transparent 70%); 
        pointer-events:none; 
      }

      .header-left { 
        display:flex; 
        align-items:center; 
        gap:1.2rem; 
        position:relative; 
        z-index:1; 
      }
      
      .header-icon { 
        width:62px; 
        height:62px; 
        border-radius:16px; 
        background:linear-gradient(135deg, var(--complain-primary), var(--complain-accent)); 
        display:flex; 
        align-items:center; 
        justify-content:center; 
        color:#fff; 
        font-size:2rem; 
        box-shadow:0 10px 24px -8px rgba(10,120,255,.45); 
      }
      
      .complains-title { 
        margin:0; 
        font-size:1.85rem; 
        font-weight:900; 
        letter-spacing:-.8px; 
        color:var(--complain-text-dark); 
        line-height:1.2;
      }
      
      .complains-subtitle { 
        margin:.4rem 0 0; 
        font-size:.74rem; 
        font-weight:700; 
        letter-spacing:.7px; 
        text-transform:uppercase; 
        color:var(--complain-text-mid); 
        display:flex; 
        align-items:center; 
        gap:.45rem; 
      }

      .stats-bar { 
        padding:1.4rem 2.5rem; 
        border-bottom:1px solid var(--complain-border); 
        display:flex; 
        flex-wrap:wrap; 
        gap:1.2rem; 
        background:#fbfdff; 
      }
      
      .stat-item { 
        display:flex; 
        align-items:center; 
        gap:.9rem; 
        padding:.95rem 1.4rem; 
        background:#fff; 
        border:1px solid var(--complain-border); 
        border-radius:14px; 
        transition:.25s; 
        box-shadow:0 2px 8px rgba(0,0,0,.04); 
      }
      
      .stat-item:hover { 
        transform:translateY(-3px); 
        box-shadow:0 6px 16px rgba(0,0,0,.1); 
        border-color:#d4ecff; 
      }
      
      .stat-icon { 
        width:48px; 
        height:48px; 
        border-radius:12px; 
        background:linear-gradient(135deg,#fff3e0,#ffe0b2); 
        display:flex; 
        align-items:center; 
        justify-content:center; 
        color:var(--complain-warning); 
        font-size:1.5rem;
      }

      .stat-icon svg {
        font-size:1.5rem;
      }
      
      .stat-label { 
        font-size:.7rem; 
        font-weight:800; 
        letter-spacing:.8px; 
        text-transform:uppercase; 
        color:var(--complain-text-light); 
        margin:0; 
      }
      
      .stat-value { 
        font-size:1.25rem; 
        font-weight:900; 
        letter-spacing:-.5px; 
        color:var(--complain-text-dark); 
        margin:0; 
      }

      .complains-table-wrap { 
        padding:1.8rem 2.5rem 2.3rem; 
      }
      
      .complains-table-card { 
        border:1px solid var(--complain-border); 
        border-radius:18px; 
        overflow:hidden; 
        background:#fff; 
        box-shadow:0 4px 16px rgba(25,40,60,.08); 
      }

      .complains-table-card .MuiTable-root {
        table-layout:fixed;
        width:100%;
      }

      .complains-table-card .MuiTableCell-head {
        background:linear-gradient(135deg,#f2f7ff,#edf4fb);
        font-weight:800;
        font-size:.88rem;
        letter-spacing:.65px;
        color:var(--complain-text-mid);
        text-transform:uppercase;
        padding:18px 20px;
        border-bottom:2px solid #e3edf6;
        text-align:center;
        vertical-align:middle;
      }

      .complains-table-card .MuiTableCell-head:first-child {
        width:30%;
      }

      .complains-table-card .MuiTableCell-head:nth-child(2) {
        width:40%;
      }

      .complains-table-card .MuiTableCell-head:nth-child(3) {
        width:20%;
      }

      .complains-table-card .MuiTableCell-head:last-child {
        width:10%;
      }

      .complains-table-card .MuiTableRow-root {
        transition:.25s;
        border-bottom:1px solid #eef4f9;
      }

      .complains-table-card .MuiTableBody-root .MuiTableRow-root {
        background:#fff;
      }

      .complains-table-card .MuiTableBody-root .MuiTableRow-root:nth-of-type(even) {
        background:#fafcfe;
      }

      .complains-table-card .MuiTableBody-root .MuiTableRow-root:hover {
        background:#f6faff;
      }

      .complains-table-card .MuiTableCell-body {
        padding:18px 20px;
        font-size:.95rem;
        font-weight:600;
        color:var(--complain-text-dark);
        vertical-align:middle;
        text-align:center;
      }

      .complains-table-card .MuiTableCell-body:first-child {
        text-align:left;
      }

      .complains-table-card .MuiTableCell-body:nth-child(2) {
        color:var(--complain-text-mid);
        font-weight:600;
        line-height:1.5;
      }

      .user-cell {
        display:flex;
        align-items:center;
        gap:1rem;
        min-width:0;
      }

      .user-avatar {
        width:44px;
        height:44px;
        border-radius:11px;
        background:linear-gradient(135deg,#e8f2ff,#d6ebff);
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:.85rem;
        font-weight:800;
        color:var(--complain-primary);
        box-shadow:0 3px 8px rgba(10,120,255,.15);
        flex-shrink:0;
      }

      .user-name {
        font-weight:700;
        line-height:1.4;
        flex:1;
      }

      .complaint-text {
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
        overflow:hidden;
        text-overflow:ellipsis;
        color:var(--complain-text-mid);
        font-weight:600;
        line-height:1.5;
        word-break:break-word;
      }

      .date-chip {
        display:inline-flex;
        align-items:center;
        gap:.55rem;
        padding:.6rem 1.1rem;
        border-radius:10px;
        background:linear-gradient(135deg,#e8f5e9,#c8e6c9);
        color:#2e7d32;
        font-size:.82rem;
        font-weight:700;
        letter-spacing:.3px;
        white-space:nowrap;
      }

      .resolve-checkbox { 
        display:flex; 
        justify-content:center; 
      }
      
      .resolve-checkbox .MuiCheckbox-root { 
        padding:8px; 
      }
      
      .resolve-checkbox .MuiCheckbox-root:hover { 
        background:rgba(10,120,255,.08); 
        border-radius:10px; 
      }

      .empty-state { 
        padding:5rem 2.5rem; 
        text-align:center; 
      }
      
      .empty-icon { 
        font-size:4.5rem; 
        color:var(--complain-accent); 
        opacity:.8; 
        margin-bottom:1.5rem; 
      }
      
      .empty-title { 
        font-size:1.6rem; 
        font-weight:800; 
        color:var(--complain-text-dark); 
        margin-bottom:.7rem; 
        letter-spacing:-.5px;
      }
      
      .empty-text { 
        font-size:1.05rem; 
        color:var(--complain-text-mid); 
        font-weight:600; 
        line-height:1.6;
      }

      .loading-wrap { 
        display:flex; 
        justify-content:center; 
        align-items:center; 
        min-height:400px; 
        flex-direction:column; 
        gap:1.5rem; 
      }
      
      .loading-text { 
        font-size:1.2rem; 
        font-weight:700; 
        color:var(--complain-text-mid); 
        letter-spacing:.5px; 
      }
    `;
    document.head.appendChild(styleEl);
    return () => document.head.removeChild(styleEl);
  }, []);


  const handleCheckboxChange = (complaintId, event) => {
      console.log(event,'this is event')
      dispatch(updateComplain({complaintId}, address));
      window.location.reload(); 
    };
  
  console.log(currentUser,'this is userDetails')

  if (error) {
    console.log(error);
  }

  const complainColumns = [
    { id: 'user', label: 'User', minWidth: 170 },
    { id: 'complaint', label: 'Complaint', minWidth: 100 },
    { id: 'date', label: 'Date', minWidth: 170 },
  ];

  console.log(complainsList, 'this is cList')
  const complainList = complainsList.filter((complain)=>{
    if(complain.status==='Pending')return true;
    return false;
  })
  
  console.log(complainList, 'this is updated clist')
  
  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const complainRows = complainList && complainList.length > 0 && complainList.map((complain) => {
    const date = new Date(complain.date);
    const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
    const userName = complain.userDetails?.name || 'Unknown';
    return {
      user: (
        <Box className="user-cell">
          <Box className="user-avatar">{getInitials(userName)}</Box>
          <span className="user-name">{userName}</span>
        </Box>
      ),
      complaint: (
        <Tooltip title={complain.complaint} arrow>
          <span className="complaint-text">{complain.complaint}</span>
        </Tooltip>
      ),
      date: (
        <span className="date-chip">
          <EventIcon sx={{ fontSize: '1rem' }} />
          {dateString}
        </span>
      ),
      id: complain._id,
    };
  });

  const ComplainButtonHaver = ({ row }) => {
    return (
      <Box className="resolve-checkbox">
        <Tooltip title="Mark as Resolved" placement="top" arrow>
          <Checkbox 
            {...label} 
            onChange={(event) => handleCheckboxChange(row.id, event)}
            icon={<PendingIcon style={{ color: '#ff9800', fontSize: 28 }} />}
            checkedIcon={<CheckCircleIcon style={{ color: '#07b389', fontSize: 28 }} />}
          />
        </Tooltip>
      </Box>
    );
  };

  return (
    <Box className="complains-page-wrap">
      <Box className="complains-panel">
        {/* Header Section */}
        <Box className="complains-header">
          <Box className="header-left">
            <Box className="header-icon">
              <AssignmentIcon sx={{ fontSize: '2rem' }} />
            </Box>
            <Box>
              <Typography className="complains-title">
                Student Complaints
              </Typography>
              <Typography className="complains-subtitle">
                <BookmarkIcon sx={{ fontSize: '0.9rem', marginRight: '0.25rem' }} />
                Review & Resolve Pending Issues
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Stats Bar */}
        {!loading && complainList && complainList.length > 0 && (
          <Box className="stats-bar">
            <Box className="stat-item">
              <Box className="stat-icon" style={{ background: 'linear-gradient(135deg, #fff3e0, #ffe0b2)', color: '#f57c00' }}>
                <PendingIcon />
              </Box>
              <Box>
                <Typography className="stat-label">Pending Complaints</Typography>
                <Typography className="stat-value">{complainList.length}</Typography>
              </Box>
            </Box>
          </Box>
        )}

        {/* Content Section */}
        {loading ? (
          <Box className="loading-wrap">
            <CircularProgress size={60} thickness={4} style={{ color: '#0a78ff' }} />
            <Typography className="loading-text">Loading complaints...</Typography>
          </Box>
        ) : (
          <>
            {response || (complainList && complainList.length === 0) ? (
              <Box className="empty-state">
                <CheckCircleIcon className="empty-icon" />
                <Typography className="empty-title">
                  All Clear!
                </Typography>
                <Typography className="empty-text">
                  No pending complaints at this time. Great job keeping students happy!
                </Typography>
              </Box>
            ) : (
              <Box className="complains-table-wrap">
                <Paper className="complains-table-card" elevation={0}>
                  {Array.isArray(complainsList) && complainsList.length > 0 && (
                    <TableTemplate 
                      buttonHaver={ComplainButtonHaver} 
                      columns={complainColumns} 
                      rows={complainRows} 
                    />
                  )}
                </Paper>
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default SeeComplains;