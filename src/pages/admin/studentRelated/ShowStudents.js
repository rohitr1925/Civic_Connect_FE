import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getAllStudents } from '../../../redux/studentRelated/studentHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';

import {
  Box, IconButton, TextField, InputAdornment, Fade,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Tooltip, Menu, MenuItem, Button, TablePagination
} from '@mui/material';

import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SearchIcon from '@mui/icons-material/Search';
import GroupIcon from '@mui/icons-material/Group';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GradingIcon from '@mui/icons-material/Grading';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SortIcon from '@mui/icons-material/Sort';

import { GreenButton } from '../../../components/buttonStyles';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';

const ShowStudents = () => {
  const { studentsList = [], loading, error } = useSelector((state) => state.student);
  const totalCitizens = studentsList.length;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorElActions, setAnchorElActions] = useState(null);
  const [actionRowId, setActionRowId] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800;900&display=swap');
      :root{
        --panel-bg:#ffffff;--border:#e2e8f0;--text-dark:#1a202c;--text-mid:#4a5568;
        --text-light:#718096;--primary:#0a78ff;--primary-light:#e8f2ff;--primary-dark:#065dca;
        --accent:#07b389;--accent-dark:#058b65;--danger:#f44336;--danger-light:#ffebee;
        --shadow-md:0 4px 16px rgba(25,40,60,0.08);--shadow-lg:0 8px 28px rgba(25,40,60,0.12);
        --radius-lg:20px;--radius-md:14px;--focus-ring:0 0 0 4px rgba(10,120,255,.15);
      }
      *{box-sizing:border-box;font-family:'Inter',system-ui,sans-serif;}
      body{background:#f0f7ff;}
      .citizensPageWrap{min-height:100vh;padding:2.2rem 1.6rem;background:linear-gradient(135deg,#f0f7ff,#eaf4ff);}
      .citizensPanel{max-width:1320px;margin:0 auto;background:var(--panel-bg);border:1px solid var(--border);border-radius:var(--radius-lg);box-shadow:var(--shadow-lg);overflow:hidden;}
      .panelHeader{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;padding:1.75rem 2.2rem;background:linear-gradient(135deg,#fcfdff,#f5f9ff);border-bottom:1px solid var(--border);position:relative;}
      .panelHeader::after{content:'';position:absolute;inset:0;background:radial-gradient(circle at 85% 15%,rgba(10,120,255,.08),transparent 70%);pointer-events:none;}
      .headerLeft{display:flex;align-items:center;gap:1.2rem;min-width:260px;position:relative;z-index:1;}
      .headerIcon{width:58px;height:58px;border-radius:16px;background:linear-gradient(135deg,var(--primary),var(--accent));display:flex;align-items:center;justify-content:center;color:#fff;font-size:1.6rem;font-weight:800;box-shadow:0 10px 26px -8px rgba(10,120,255,.5);}
      .panelTitle{margin:0;font-size:1.75rem;font-weight:900;letter-spacing:-.8px;color:var(--text-dark);}
      .panelSubtitle{margin:.35rem 0 0;font-size:.72rem;font-weight:700;letter-spacing:.7px;text-transform:uppercase;color:var(--text-mid);display:flex;align-items:center;gap:.45rem;}
      .headerRight{display:flex;align-items:center;gap:1rem;flex:1;justify-content:flex-end;min-width:280px;position:relative;z-index:1;}
      .headerSearchField{position:relative;z-index:1;}
      .headerSearchField .MuiOutlinedInput-root{border-radius:var(--radius-md);font-size:.85rem;font-weight:600;background:#fff;border:2px solid #e2e8f0;transition:.25s;min-width:320px;}
      .headerSearchField .MuiOutlinedInput-root:hover{border-color:#cbd5e0;box-shadow:0 4px 12px rgba(0,0,0,.06);}
      .headerSearchField .MuiOutlinedInput-root.Mui-focused{border-color:var(--primary);box-shadow:var(--focus-ring);}
      .addCitizenBtn{height:44px!important;font-weight:800!important;font-size:.85rem!important;text-transform:none!important;border-radius:var(--radius-md)!important;padding:.75rem 1.6rem!important;background:linear-gradient(135deg,var(--accent),var(--accent-dark))!important;color:#fff!important;box-shadow:0 6px 18px -6px rgba(7,179,137,.4)!important;transition:.3s!important;position:relative;z-index:1;cursor:pointer!important;}
      .addCitizenBtn:hover{transform:translateY(-3px)!important;box-shadow:0 10px 24px -4px rgba(7,179,137,.45)!important;}

      .statsBar{padding:1.2rem 2.2rem;border-bottom:1px solid var(--border);display:flex;flex-wrap:wrap;gap:1.4rem;background:#fbfdff;}
      .statItem{display:flex;align-items:center;gap:.9rem;padding:.85rem 1.2rem;background:#fff;border:1px solid var(--border);border-radius:14px;transition:.25s;box-shadow:0 2px 8px rgba(0,0,0,.04);}
      .statItem:hover{transform:translateY(-3px);box-shadow:0 6px 16px rgba(0,0,0,.1);border-color:var(--primary-light);}
      .statIcon{width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,#e8f2ff,#d7ecff);display:flex;align-items:center;justify-content:center;color:var(--primary);}
      .statLabel{font-size:.65rem;font-weight:800;letter-spacing:.7px;text-transform:uppercase;color:var(--text-light);}
      .statValue{font-size:1.15rem;font-weight:900;letter-spacing:-.4px;color:var(--text-dark);}

      .tableWrap{padding:1.8rem 2.5rem 0;}
      .table-footer-wrap{padding:0 2.5rem 2.5rem;}
      .citizensTableCard{border:1px solid var(--border);border-radius:18px;overflow:hidden;background:#fff;box-shadow:var(--shadow-md);}
      .citizensTable{width:100%;border-collapse:separate;border-spacing:0;table-layout:fixed;}
      .citizensTable thead th{background:linear-gradient(135deg,#f2f7ff,#edf4fb);font-weight:800;font-size:.88rem;letter-spacing:.65px;color:var(--text-mid);text-transform:uppercase;padding:18px 20px;border-bottom:2px solid #e3edf6;text-align:center;vertical-align:middle;user-select:none;cursor:pointer;}
      .citizensTable thead th.sortable:hover{background:linear-gradient(135deg,#eaf3ff,#e6f0fa);}
      .citizensTable thead th.actions-head{text-align:center;cursor:default;}
      .sortIndicator{margin-left:6px;display:inline-flex;vertical-align:middle;opacity:.7;}
      .citizensTable tbody tr{transition:.25s;border-bottom:1px solid #eef4f9;}
      .citizensTable tbody tr:nth-of-type(even){background:#fafcfe;}
      .citizensTable tbody tr:hover{background:#f6faff;}
      .citizensTable tbody td{padding:18px 20px;font-size:.98rem;font-weight:600;color:var(--text-dark);vertical-align:middle;text-align:center;}
      .citizensTable tbody td:first-child{text-align:left;}
      .highlightMark{background:#ffe58f;border-radius:4px;padding:0 2px;}
      .nameCell{display:flex;align-items:center;gap:1rem;min-width:0;}
      .nameAvatar{width:44px;height:44px;border-radius:11px;background:linear-gradient(135deg,#e8f2ff,#d6ebff);display:flex;align-items:center;justify-content:center;font-size:.85rem;font-weight:800;color:var(--primary);box-shadow:0 3px 8px rgba(10,120,255,.2);flex-shrink:0;}
      .nameCell span{font-weight:700;line-height:1.4;flex:1;}
      .communityChip{display:inline-flex;align-items:center;font-size:.82rem;font-weight:700;letter-spacing:.3px;padding:.6rem 1.1rem;border-radius:10px;background:linear-gradient(135deg,#e8f5e9,#c8e6c9);color:#2e7d32;white-space:nowrap;}
      .cellActions{display:flex;align-items:center;justify-content:center;gap:.55rem;flex-wrap:wrap;}
      .actionBtn{height:38px!important;padding:.55rem .95rem!important;font-size:.78rem!important;font-weight:800!important;text-transform:none!important;border-radius:10px!important;display:inline-flex!important;align-items:center!important;gap:.45rem!important;box-shadow:0 2px 8px rgba(0,0,0,.08)!important;transition:.25s!important;border:none!important;}
      .actionBtn:hover{transform:translateY(-2px)!important;box-shadow:0 6px 14px rgba(0,0,0,.15)!important;}
      .viewBtn{background:linear-gradient(135deg,#0a78ff,#065dca)!important;color:#fff!important;}
      .viewBtn:hover{background:linear-gradient(135deg,#065dca,#054aa8)!important;}
      .deleteBtn{color:var(--danger)!important;background:#fff!important;border:1px solid #ffebee!important;width:40px!important;height:40px!important;min-width:40px!important;padding:0!important;}
      .deleteBtn:hover{background:var(--danger)!important;color:#fff!important;border-color:var(--danger)!important;}
      .moreBtn{color:var(--text-mid)!important;background:#fff!important;border:1px solid #e3e9ef!important;width:40px!important;height:40px!important;min-width:40px!important;padding:0!important;}
      .moreBtn:hover{color:var(--primary)!important;border-color:#cbd5e0!important;background:#f7fbff!important;}
      .emptyState{padding:5rem 2.5rem;text-align:center;border:2px dashed #d5e0ea;border-radius:18px;background:linear-gradient(135deg,#fafcfe,#f4f8fb);}
      .emptyIcon{font-size:4.5rem!important;color:var(--primary);opacity:.7;margin-bottom:1.5rem;}
      .emptyState h4{font-size:1.6rem;font-weight:800;color:var(--text-dark);margin:0 0 .7rem 0;letter-spacing:-.5px;}
      .emptyState p{font-size:1.05rem;color:var(--text-mid);font-weight:600;line-height:1.6;margin:0;}
      .paginationWrap{padding:1.1rem 0;display:flex;justify-content:flex-end;}
      .paginationWrap .MuiPagination-root{font-weight:700;}
      @media(max-width:900px){
        .panelHeader{flex-direction:column;align-items:flex-start;}
        .headerRight{width:100%;justify-content:space-between;}
      }
      @media(max-width:650px){
        .headerSearchField .MuiOutlinedInput-root{font-size:.75rem;min-width:0;width:100%;}
        .citizensTable thead th{padding:14px 14px;font-size:.62rem;}
        .citizensTable tbody td{padding:12px 14px;font-size:.78rem;}
        .actionBtn{height:32px;font-size:.62rem;padding:.45rem .65rem;}
        .addCitizenBtn{height:40px!important;padding:.65rem 1.2rem!important;font-size:.75rem!important;}
      }
    `;
    document.head.appendChild(styleEl);
    return () => styleEl.remove();
  }, []);

  useEffect(() => {
    if (currentUser?._id) {
      dispatch(getAllStudents(currentUser._id));
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    if (error) console.error('Student fetch error:', error);
  }, [error]);

  const deleteHandler = useCallback((deleteID, address) => {
    setMessage("Citizen deleted successfully.");
    setShowPopup(true);
    dispatch(deleteUser(deleteID, address)).then(() => {
      if (currentUser?._id) dispatch(getAllStudents(currentUser._id));
    });
  }, [dispatch, currentUser]);

  const handleOpenActions = (e, id) => {
    setAnchorElActions(e.currentTarget);
    setActionRowId(id);
  };
  
  const handleCloseActions = () => {
    setAnchorElActions(null);
    setActionRowId(null);
  };

  const handleSort = (key) => {
    setSortConfig(prev =>
      prev.key === key
        ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
        : { key, direction: 'asc' }
    );
  };

  const sortIcon = (key) => {
    if (sortConfig.key !== key) return <SortIcon className="sortIndicator" fontSize="inherit" />;
    return (
      <span className="sortIndicator" style={{ display: 'inline-flex', flexDirection: 'column', lineHeight: 1 }}>
        <span style={{ opacity: sortConfig.direction === 'asc' ? 1 : .35 }}>▲</span>
        <span style={{ opacity: sortConfig.direction === 'desc' ? 1 : .35 }}>▼</span>
      </span>
    );
  };

  const highlight = useCallback((text) => {
    const base = String(text ?? '');
    if (!searchTerm.trim()) return base;
    const term = searchTerm.trim();
    const safe = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${safe})`, 'ig');
    return base.split(regex).map((part, i) =>
      regex.test(part) ? <span key={i} className="highlightMark">{part}</span> : part
    );
  }, [searchTerm]);

  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return studentsList;
    
    return studentsList.filter(s => {
      const name = (s.name || '').toLowerCase();
      const rollNum = String(s.rollNum || '').toLowerCase();
      const community = (s.sclassName?.sclassName || '').toLowerCase();
      
      return name.includes(term) || rollNum.includes(term) || community.includes(term);
    });
  }, [studentsList, searchTerm]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    const { key, direction } = sortConfig;
    arr.sort((a, b) => {
      const av = key === 'community' ? (a.sclassName?.sclassName || '') : (a[key] ?? '');
      const bv = key === 'community' ? (b.sclassName?.sclassName || '') : (b[key] ?? '');
      const aStr = String(av).toLowerCase();
      const bStr = String(bv).toLowerCase();
      if (aStr < bStr) return direction === 'asc' ? -1 : 1;
      if (aStr > bStr) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    return arr;
  }, [filtered, sortConfig]);

  const paginated = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return sorted.slice(start, start + rowsPerPage);
  }, [sorted, page, rowsPerPage]);

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(sorted.length / rowsPerPage));
    if (page > totalPages) setPage(1);
  }, [sorted, page, rowsPerPage]);

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleAttendance = () => {
    if (actionRowId) navigate("/Admin/citizens/citizen/attendance/" + actionRowId);
    handleCloseActions();
  };
  
  const handleMarks = () => {
    if (actionRowId) navigate("/Admin/citizens/citizen/marks/" + actionRowId);
    handleCloseActions();
  };

  const handleAddCitizen = useCallback(() => {
    console.log('Navigating to add student page...');
    navigate("/Admin/addcitizens");
  }, [navigate]);

  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    console.log('Search term:', value);
    setSearchTerm(value);
    setPage(1);
  }, []);

  const actions = [
    { icon: <PersonAddAlt1Icon color="primary" />, name: 'Add New Citizen', action: handleAddCitizen },
    { icon: <PersonRemoveIcon color="error" />, name: 'Delete All Citizens', action: () => currentUser?._id && deleteHandler(currentUser._id, "Students") }
  ];

  return (
    <>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <Box sx={{ fontSize: '2rem' }}>Loading...</Box>
        </Box>
      ) : (
        <Fade in timeout={500}>
          <Box className="citizensPageWrap">
            <Box className="citizensPanel">
              <Box className="panelHeader">
                <Box className="headerLeft">
                  <Box className="headerIcon">
                    <GroupIcon />
                  </Box>
                  <Box>
                    <h2 className="panelTitle">Citizens Management</h2>
                    <p className="panelSubtitle">
                      <TrendingUpIcon fontSize="inherit" />
                      Manage all citizen records
                    </p>
                  </Box>
                </Box>
                <Box className="headerRight">
                  <TextField
                    placeholder="Search by name, ID or community..."
                    size="small"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="headerSearchField"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: '#718096', fontSize: '1.15rem' }} />
                        </InputAdornment>
                      )
                    }}
                  />
                  <Button
                    variant="contained"
                    className="addCitizenBtn"
                    onClick={handleAddCitizen}
                    startIcon={<PersonAddAlt1Icon />}
                  >
                    Add Citizen
                  </Button>
                </Box>
              </Box>
              {/* Stat card for total citizens */}
              <Box className="statsBar" sx={{ padding: '1.2rem 2.2rem', borderBottom: '1px solid #e2e8f0', display: 'flex', flexWrap: 'wrap', gap: '1.4rem', background: '#fbfdff', justifyContent: 'flex-start', maxWidth: '400px', marginLeft: 0 }}>
                <Box className="statItem" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', minWidth: 0 }}>
                  <Box className="statIcon" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 1 }}><GroupIcon /></Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                    <span className="statLabel" style={{ marginBottom: 2 }}>Total Citizens</span>
                    <span className="statValue">{totalCitizens}</span>
                  </Box>
                </Box>
              </Box>

              <Box className="tableWrap">
                {sorted.length === 0 ? (
                  <Box className="emptyState">
                    <SearchIcon className="emptyIcon" />
                    <h4>{searchTerm ? 'No citizens match your search' : 'No citizens found'}</h4>
                    <p>{searchTerm ? 'Try adjusting your keywords or clear the search.' : 'Start by adding a new citizen record.'}</p>
                  </Box>
                ) : (
                  <TableContainer className="citizensTableCard">
                    <Table className="citizensTable">
                      <colgroup>
                        <col style={{ width: '25%' }} />
                        <col style={{ width: '25%' }} />
                        <col style={{ width: '25%' }} />
                        <col style={{ width: '25%' }} />
                      </colgroup>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            onClick={() => handleSort('name')}
                            className="sortable"
                            aria-sort={sortConfig.key === 'name' ? sortConfig.direction : 'none'}
                          >
                            Name {sortIcon('name')}
                          </TableCell>
                          <TableCell
                            onClick={() => handleSort('rollNum')}
                            className="sortable"
                            aria-sort={sortConfig.key === 'rollNum' ? sortConfig.direction : 'none'}
                          >
                            Citizen ID {sortIcon('rollNum')}
                          </TableCell>
                          <TableCell
                            onClick={() => handleSort('community')}
                            className="sortable"
                            aria-sort={sortConfig.key === 'community' ? sortConfig.direction : 'none'}
                          >
                            Community {sortIcon('community')}
                          </TableCell>
                          <TableCell align="center" className="actions-head">
                            Actions
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {paginated.map((student) => {
                          const community = student.sclassName?.sclassName || 'N/A';
                          return (
                            <TableRow key={student._id} hover>
                              <TableCell>
                                <Box className="nameCell">
                                  <Box className="nameAvatar">{getInitials(student.name)}</Box>
                                  <span>{highlight(student.name || 'N/A')}</span>
                                </Box>
                              </TableCell>
                              <TableCell>{highlight(String(student.rollNum || 'N/A'))}</TableCell>
                              <TableCell>
                                <span className="communityChip">{highlight(community)}</span>
                              </TableCell>
                              <TableCell align="center">
                                <Box className="cellActions">
                                  <Tooltip title="View" arrow>
                                    <Button
                                      className="actionBtn viewBtn"
                                      onClick={() => navigate("/Admin/citizens/citizen/" + student._id)}
                                      variant="contained"
                                    >
                                      <VisibilityIcon sx={{ fontSize: '1rem' }} /> View
                                    </Button>
                                  </Tooltip>
                                  <Tooltip title="Delete" arrow>
                                    <IconButton
                                      className="actionBtn deleteBtn"
                                      size="small"
                                      onClick={() => deleteHandler(student._id, "Student")}
                                    >
                                      <PersonRemoveIcon sx={{ fontSize: '1.05rem' }} />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="More" arrow>
                                    <IconButton
                                      className="actionBtn moreBtn"
                                      size="small"
                                      onClick={(e) => handleOpenActions(e, student._id)}
                                      aria-haspopup="true"
                                      aria-controls={actionRowId === student._id ? 'row-actions-menu' : undefined}
                                      aria-expanded={actionRowId === student._id}
                                    >
                                      <MoreVertIcon sx={{ fontSize: '1.05rem' }} />
                                    </IconButton>
                                  </Tooltip>
                                </Box>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Box>

              {sorted.length > 0 && (
                <Box className="table-footer-wrap">
                  <TablePagination
                    component="div"
                    count={sorted.length}
                    page={page - 1}
                    onPageChange={(_, p) => setPage(p + 1)}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(1); }}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    labelRowsPerPage="Rows:"
                    showFirstButton
                    showLastButton
                  />
                </Box>
              )}
            </Box>
            <SpeedDialTemplate actions={actions} />
          </Box>
        </Fade>
      )}
      <Menu
        id="row-actions-menu"
        anchorEl={anchorElActions}
        open={Boolean(anchorElActions)}
        onClose={handleCloseActions}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          elevation: 10,
          sx: {
            borderRadius: '14px',
            mt: 1.3,
            minWidth: 220,
            boxShadow: '0 10px 28px rgba(0,0,0,.14)',
            border: '1px solid #e2e8f0',
            '& .MuiMenuItem-root': {
              fontWeight: 700,
              fontSize: '.8rem',
              padding: '0.9rem 1.2rem',
              gap: '.8rem',
              display: 'flex',
              alignItems: 'center',
              transition: '.2s',
              borderRadius: '10px',
              margin: '.35rem .55rem'
            },
            '& .MuiMenuItem-root:hover': {
              background: 'linear-gradient(135deg,#f7fbff,#f0f7ff)',
              color: 'var(--primary)',
              transform: 'translateX(4px)'
            }
          }
        }}
      >
        <MenuItem onClick={handleAttendance}>
          <AssignmentIcon sx={{ fontSize: '1.15rem' }} />
          Take Attendance
        </MenuItem>
        <MenuItem onClick={handleMarks}>
          <GradingIcon sx={{ fontSize: '1.15rem' }} />
          Provide Marks
        </MenuItem>
      </Menu>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  );
};

export default ShowStudents;