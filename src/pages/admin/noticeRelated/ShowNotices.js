import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {
    Box, IconButton, TextField, InputAdornment, Fade,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Tooltip, Button, Typography, TablePagination
} from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from '@mui/icons-material/Search';
import CampaignIcon from '@mui/icons-material/Campaign';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArticleIcon from '@mui/icons-material/Article';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { getAllNotices } from '../../../redux/noticeRelated/noticeHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';

const ShowNotices = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { noticesList, loading, error } = useSelector((state) => state.notice);
    const { currentUser } = useSelector(state => state.user);

    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        const styleEl = document.createElement('style');
        styleEl.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800;900&display=swap');
            :root {
                --notice-primary:#0a78ff;
                --notice-accent:#07b389;
                --notice-danger:#f44336;
                --notice-border:#e2e8f0;
                --notice-text-dark:#1a202c;
                --notice-text-mid:#4a5568;
            }
            * { font-family:'Inter', system-ui, sans-serif; }

            .notices-page-wrap { min-height:100vh; background:linear-gradient(135deg,#f0f7ff 0%, #eaf4ff 100%); padding:2.5rem 1.5rem; }
            .notices-panel { max-width:1320px; margin:0 auto; background:#fff; border-radius:24px; box-shadow:0 8px 32px rgba(25,40,60,.12); border:1px solid var(--notice-border); overflow:hidden; }

            .notices-header { display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:1.2rem; padding:2rem 2.2rem; background:linear-gradient(135deg,#fcfdff,#f5f9ff); border-bottom:1px solid var(--notice-border); position:relative; }
            .notices-header::after { content:''; position:absolute; inset:0; background:radial-gradient(circle at 85% 15%, rgba(10,120,255,.06), transparent 70%); pointer-events:none; }

            .header-left { display:flex; align-items:center; gap:1.2rem; position:relative; z-index:1; }
            .header-icon { width:56px; height:56px; border-radius:14px; background:linear-gradient(135deg, var(--notice-primary), var(--notice-accent)); display:flex; align-items:center; justify-content:center; color:#fff; box-shadow:0 8px 20px -6px rgba(10,120,255,.4); }
            .notices-title { margin:0; font-size:1.75rem; font-weight:900; letter-spacing:-.6px; color:var(--notice-text-dark); }
            .notices-subtitle { margin:.3rem 0 0; font-size:.72rem; font-weight:700; letter-spacing:.6px; text-transform:uppercase; color:var(--notice-text-mid); display:flex; align-items:center; gap:.4rem; }

            .header-right { display:flex; align-items:center; gap:1rem; position:relative; z-index:1; }
            .search-field .MuiOutlinedInput-root { border-radius:14px; font-size:.85rem; font-weight:600; background:#fff; border:2px solid var(--notice-border); transition:.25s; min-width:300px; }
            .search-field .MuiOutlinedInput-root:hover { border-color:#cbd5e0; box-shadow:0 4px 12px rgba(0,0,0,.06); }
            .search-field .MuiOutlinedInput-root.Mui-focused { border-color:var(--notice-primary); box-shadow:0 0 0 4px rgba(10,120,255,.12); }

            .add-notice-btn { height:44px !important; font-weight:800 !important; font-size:.85rem !important; text-transform:none !important; border-radius:14px !important; padding:.75rem 1.6rem !important; background:linear-gradient(135deg, var(--notice-accent), #058b65) !important; color:#fff !important; box-shadow:0 6px 18px -6px rgba(7,179,137,.4) !important; transition:.3s !important; }
            .add-notice-btn:hover { transform:translateY(-3px) !important; box-shadow:0 10px 24px -4px rgba(7,179,137,.45) !important; }

            .notices-table-wrap { padding:1.8rem 2.5rem 0; }
            .table-footer-wrap { padding:0 2.5rem 2.5rem; }

            .notices-table-card { border:1px solid var(--notice-border); border-radius:18px; overflow:hidden; background:#fff; box-shadow:0 4px 16px rgba(25,40,60,.08); }
            .notices-table { width:100%; border-collapse:separate; border-spacing:0; table-layout:fixed; }

            .notices-table thead th { background:linear-gradient(135deg,#f2f7ff,#edf4fb); font-weight:800; font-size:.88rem; letter-spacing:.65px; color:var(--notice-text-mid); text-transform:uppercase; padding:18px 20px; border-bottom:2px solid #e3edf6; text-align:center; vertical-align:middle; width:25%; }
            .notices-table thead th.actions-head { text-align:center; }

            .notices-table tbody tr { transition:.25s; border-bottom:1px solid #eef4f9; }
            .notices-table tbody tr:nth-of-type(even) { background:#fafcfe; }
            .notices-table tbody tr:hover { background:#f6faff; }

            .notices-table tbody td { padding:18px 20px; font-size:.95rem; font-weight:600; color:var(--notice-text-dark); vertical-align:middle; text-align:center; width:25%; }
            .notices-table tbody td:first-child { text-align:left; }

            .notice-title-cell { display:flex; align-items:center; gap:1rem; min-width:0; }
            .notice-icon { width:44px; height:44px; border-radius:11px; background:linear-gradient(135deg,#e8f2ff,#d6ebff); display:flex; align-items:center; justify-content:center; color:var(--notice-primary); flex-shrink:0; box-shadow:0 3px 8px rgba(10,120,255,.15); }
            .notice-icon svg { font-size:1.2rem !important; }
            .notice-title-text { font-weight:700; color:var(--notice-text-dark); line-height:1.4; flex:1; }

            .notice-details-text { display:inline-block; color:var(--notice-text-mid); font-weight:600; line-height:1.5; word-break:break-word; text-align:center; }

            .date-cell { display:inline-flex; align-items:center; gap:.6rem; justify-content:center; }
            .notice-date-chip { display:inline-flex; align-items:center; gap:.55rem; padding:.6rem 1.1rem; border-radius:10px; background:linear-gradient(135deg,#e8f5e9,#c8e6c9); color:#2e7d32; font-size:.82rem; font-weight:700; letter-spacing:.3px; white-space:nowrap; }

            .notice-actions { display:flex; gap:.5rem; justify-content:center; align-items:center; }
            .delete-btn { width:40px !important; height:40px !important; border-radius:10px !important; background:#fff !important; border:1px solid #ffebee !important; color:var(--notice-danger) !important; transition:.25s !important; }
            .delete-btn:hover { background:var(--notice-danger) !important; color:#fff !important; transform:translateY(-2px); box-shadow:0 6px 14px rgba(244,67,54,.3) !important; }
            .delete-btn svg { font-size:1.15rem !important; }

            .empty-state { padding:5rem 2.5rem; text-align:center; border:2px dashed #d5e0ea; border-radius:18px; background:linear-gradient(135deg,#fafcfe,#f4f8fb); }
            .empty-icon { font-size:4.5rem !important; color:var(--notice-primary); opacity:.7; margin-bottom:1.5rem; }
            .empty-title { font-size:1.6rem; font-weight:800; color:var(--notice-text-dark); margin-bottom:.7rem; letter-spacing:-.5px; }
            .empty-text { font-size:1.05rem; color:var(--notice-text-mid); font-weight:600; line-height:1.6; }

            .highlight-mark { background:#ffe58f; border-radius:3px; padding:0 2px; }

            .loading-overlay { display:flex; justify-content:center; align-items:center; min-height:100vh; background:linear-gradient(135deg,#f0f7ff 0%, #eaf4ff 100%); }
            .loading-spinner { display:flex; flex-direction:column; align-items:center; gap:1.5rem; background:white; padding:3rem 4rem; border-radius:24px; box-shadow:0 20px 60px rgba(25,40,60,.15); border:1px solid var(--notice-border); }
            .loading-text { font-size:1.2rem; font-weight:700; color:var(--notice-text-mid); letter-spacing:.5px; }

            @keyframes spin { 0%{transform:rotate(0)} 100%{transform:rotate(360deg)} }

            @media (max-width:900px){
                .notices-header { flex-direction:column; align-items:flex-start; }
                .header-right { width:100%; justify-content:space-between; }
                .search-field .MuiOutlinedInput-root { min-width:0; flex:1; }
            }
            @media (max-width:650px){
                .notices-page-wrap { padding:1.5rem 1rem; }
                .notices-header { padding:1.5rem 1.2rem; }
                .notices-title { font-size:1.4rem; }
                .notices-table-wrap { padding:1.2rem; }
                .notices-table thead th, .notices-table tbody td { padding:12px 14px; font-size:.8rem; }
            }
        `;
        document.head.appendChild(styleEl);
        return () => styleEl.remove();
    }, []);

    useEffect(() => {
        if (currentUser?._id) dispatch(getAllNotices(currentUser._id, "Notice"));
    }, [currentUser, dispatch]);

    useEffect(() => { setPage(0); }, [searchTerm]);

    if (error) console.log(error);

    const deleteHandler = (deleteID, address) => {
        dispatch(deleteUser(deleteID, address))
            .then(() => dispatch(getAllNotices(currentUser._id, "Notice")));
    };

    const highlight = (text) => {
        if (!searchTerm.trim()) return text;
        const term = searchTerm.trim();
        const safe = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${safe})`, 'ig');
        return String(text || '').split(regex).map((part, i) =>
            regex.test(part) ? <span key={i} className="highlight-mark">{part}</span> : part
        );
    };

    const filtered = useMemo(() => {
        const list = Array.isArray(noticesList) ? noticesList : [];
        const term = searchTerm.trim().toLowerCase();
        if (!term) return list;
        return list.filter(notice => {
            const title = (notice.title || '').toLowerCase();
            const details = (notice.details || '').toLowerCase();
            const d = new Date(notice.date);
            const date = d.toString() !== 'Invalid Date' ? d.toISOString().slice(0, 10) : '';
            return title.includes(term) || details.includes(term) || date.includes(term);
        });
    }, [noticesList, searchTerm]);

    const displayed = useMemo(
        () => filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [filtered, page, rowsPerPage]
    );

    const actions = [
        { icon: <NoteAddIcon color="primary" />, name: 'Add New EAR', action: () => navigate("/Admin/addnotice") },
        { icon: <DeleteIcon color="error" />, name: 'Delete All EARs', action: () => deleteHandler(currentUser._id, "Notices") }
    ];

    return (
        <>
            {loading ? (
                <Box className="loading-overlay">
                    <Box className="loading-spinner">
                        <Box sx={{
                            width: 60,
                            height: 60,
                            border: '4px solid #e2e8f0',
                            borderTop: '4px solid #0a78ff',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                        }} />
                        <Typography className="loading-text">Loading EARs...</Typography>
                    </Box>
                </Box>
            ) : (
                <Fade in timeout={600}>
                    <Box className="notices-page-wrap">
                        <Box className="notices-panel">
                            <Box className="notices-header">
                                <Box className="header-left">
                                    <Box className="header-icon">
                                        <CampaignIcon sx={{ fontSize: '1.6rem' }} />
                                    </Box>
                                    <Box>
                                        <Typography className="notices-title">Emergency Alerts</Typography>
                                        <Typography className="notices-subtitle">
                                            <TrendingUpIcon fontSize="inherit" />
                                            Manage Alerts
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box className="header-right">
                                    <TextField
                                        placeholder="Search EARs..."
                                        size="small"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="search-field"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon sx={{ color: '#718096', fontSize: '1.1rem' }} />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                    <Button
                                        variant="contained"
                                        className="add-notice-btn"
                                        onClick={() => navigate("/Admin/addnotice")}
                                        startIcon={<NoteAddIcon />}
                                    >
                                        Add EAR
                                    </Button>
                                </Box>
                            </Box>

                            <Box className="notices-table-wrap">
                                {filtered.length === 0 ? (
                                    <Box className="empty-state">
                                        <ArticleIcon className="empty-icon" />
                                        <Typography className="empty-title">
                                            {searchTerm ? 'No EARs match your search' : 'No EARs found'}
                                        </Typography>
                                        <Typography className="empty-text">
                                            {searchTerm
                                                ? 'Try adjusting your search keywords.'
                                                : 'Start by adding a new Event Activity Report.'}
                                        </Typography>
                                    </Box>
                                ) : (
                                    <TableContainer className="notices-table-card">
                                        <Table className="notices-table">
                                            <colgroup>
                                                <col style={{ width: '25%' }} />
                                                <col style={{ width: '25%' }} />
                                                <col style={{ width: '25%' }} />
                                                <col style={{ width: '25%' }} />
                                            </colgroup>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Title</TableCell>
                                                    <TableCell>Details</TableCell>
                                                    <TableCell>Date</TableCell>
                                                    <TableCell align="center" className="actions-head">Actions</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {displayed.map((notice) => {
                                                    const d = new Date(notice.date);
                                                    const dateString = d.toString() !== "Invalid Date"
                                                        ? d.toISOString().slice(0, 10)
                                                        : "Invalid Date";

                                                    return (
                                                        <TableRow key={notice._id} hover>
                                                            <TableCell>
                                                                <Box className="notice-title-cell">
                                                                    <Box className="notice-icon">
                                                                        <ArticleIcon sx={{ fontSize: '1.2rem' }} />
                                                                    </Box>
                                                                    <span className="notice-title-text">
                                                                        {highlight(notice.title)}
                                                                    </span>
                                                                </Box>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Tooltip title={notice.details} arrow>
                                                                    <span className="notice-details-text">
                                                                        {highlight(notice.details)}
                                                                    </span>
                                                                </Tooltip>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Box className="date-cell">
                                                                    <CalendarTodayIcon sx={{ fontSize: '0.9rem', color: '#056c50' }} />
                                                                    <span className="notice-date-chip">{highlight(dateString)}</span>
                                                                </Box>
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                <Box className="notice-actions">
                                                                    <Tooltip title="Delete EAR" arrow>
                                                                        <IconButton
                                                                            className="delete-btn"
                                                                            onClick={() => deleteHandler(notice._id, "Notice")}
                                                                            size="small"
                                                                        >
                                                                            <DeleteIcon sx={{ fontSize: '1.1rem' }} />
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

                            {filtered.length > 0 && (
                                <Box className="table-footer-wrap">
                                    <TablePagination
                                        component="div"
                                        count={filtered.length}
                                        page={page}
                                        onPageChange={(_e, p) => setPage(p)}
                                        rowsPerPage={rowsPerPage}
                                        onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
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
        </>
    );
};

export default ShowNotices;