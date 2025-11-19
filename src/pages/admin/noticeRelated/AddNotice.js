import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import CampaignIcon from '@mui/icons-material/Campaign';
import TitleIcon from '@mui/icons-material/Title';
import DescriptionIcon from '@mui/icons-material/Description';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import Popup from '../../../components/Popup';

const AddNotice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector(state => state.user);
  const { currentUser } = useSelector(state => state.user);

  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState('');
  const adminID = currentUser?._id;

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const fields = { title, details, date, adminID };
  const address = "Notice";

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(addStuff(fields, address));
  };

  useEffect(() => {
    if (status === 'added') {
      dispatch(underControl());
      navigate('/Admin/notices');
    } else if (status === 'error') {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, error, dispatch]);

  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800;900&display=swap');
      :root{
        --notice-primary:#0a78ff;
        --notice-accent:#07b389;
        --notice-danger:#f44336;
        --notice-border:#e2e8f0;
        --notice-text-dark:#1a202c;
        --notice-text-mid:#4a5568;
      }
      *{ font-family:'Inter', system-ui, sans-serif; }

      .add-page-wrap{ min-height:100vh; background:linear-gradient(135deg,#f0f7ff 0%, #eaf4ff 100%); padding:2.5rem 1.5rem; }
      .add-panel{ max-width:980px; margin:0 auto; background:#fff; border:1px solid var(--notice-border); border-radius:24px; box-shadow:0 10px 40px rgba(25,40,60,.12); overflow:hidden; }

      .add-header{ display:flex; align-items:center; justify-content:space-between; gap:1rem; padding:1.8rem 2rem; background:linear-gradient(135deg,#fcfdff,#f5f9ff); border-bottom:1px solid var(--notice-border); position:relative; }
      .add-header::after{ content:''; position:absolute; inset:0; background:radial-gradient(circle at 85% 15%, rgba(10,120,255,.06), transparent 70%); pointer-events:none; }
      .header-left{ display:flex; align-items:center; gap:1rem; z-index:1; }
      .header-icon{ width:56px; height:56px; border-radius:14px; background:linear-gradient(135deg,var(--notice-primary),var(--notice-accent)); color:#fff; display:flex; align-items:center; justify-content:center; box-shadow:0 8px 20px -6px rgba(10,120,255,.4); }
      .add-title{ margin:0; font-size:1.6rem; font-weight:900; letter-spacing:-.5px; color:var(--notice-text-dark); }
      .add-subtitle{ margin:.25rem 0 0; font-size:.72rem; font-weight:800; color:var(--notice-text-mid); letter-spacing:.55px; text-transform:uppercase; }

      .add-form{ padding:1.6rem 2rem 2rem; display:grid; grid-template-columns:repeat(12,1fr); gap:1.1rem 1.2rem; }
      .field{ width:100%; }
      .field-title{ grid-column:span 8; }
      .field-date{ grid-column:span 4; }
      .field-details{ grid-column:span 12; }

      .mui-text .MuiOutlinedInput-root{ border-radius:14px; font-weight:600; }
      .mui-text .MuiOutlinedInput-root:hover{ box-shadow:0 4px 12px rgba(0,0,0,.06); }
      .mui-text .MuiOutlinedInput-root.Mui-focused{ box-shadow:0 0 0 4px rgba(10,120,255,.12); }

      .form-actions{ grid-column:span 12; display:flex; gap:.8rem; justify-content:flex-end; padding-top:.4rem; }
      .save-btn{ background:linear-gradient(135deg,var(--notice-accent),#058b65) !important; color:#fff !important; border-radius:14px !important; padding:.7rem 1.4rem !important; font-weight:800 !important; }
      .save-btn:hover{ transform:translateY(-2px); box-shadow:0 10px 22px -6px rgba(7,179,137,.45) !important; }
      .cancel-btn{ background:#ffffff !important; color:var(--notice-text-dark) !important; border:1px solid var(--notice-border) !important; border-radius:14px !important; padding:.65rem 1.2rem !important; font-weight:800 !important; }
      .cancel-btn:hover{ box-shadow:0 8px 20px rgba(25,40,60,.1) !important; transform:translateY(-1px); }

      @media (max-width:900px){
        .field-title{ grid-column:span 12; }
        .field-date{ grid-column:span 12; }
      }
      @media (max-width:650px){
        .add-page-wrap{ padding:1.5rem 1rem; }
        .add-header{ padding:1.2rem 1.2rem; }
        .add-form{ padding:1.2rem; }
      }
    `;
    document.head.appendChild(styleEl);
    return () => styleEl.remove();
  }, []);

  return (
    <>
      <Box className="add-page-wrap">
        <Paper className="add-panel" elevation={0}>
          <Box className="add-header">
            <Box className="header-left">
              <Box className="header-icon">
                <CampaignIcon sx={{ fontSize:'1.5rem' }}/>
              </Box>
              <Box>
                <Typography className="add-title">Add Notice</Typography>
                <Typography className="add-subtitle">Create a new Notice</Typography>
              </Box>
            </Box>
            <Button
              className="cancel-btn"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          </Box>

          <Box component="form" className="add-form" onSubmit={submitHandler} noValidate>
            <Box className="field field-title">
              <TextField
                className="mui-text"
                label="Title"
                placeholder="Enter Notice title"
                fullWidth
                required
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TitleIcon sx={{ color:'#718096' }}/>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box className="field field-date">
              <TextField
                className="mui-text"
                label="Date"
                type="date"
                placeholder="Select date"
                fullWidth
                required
                value={date}
                onChange={(e)=>setDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarTodayIcon sx={{ color:'#718096' }}/>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box className="field field-details">
              <TextField
                className="mui-text"
                label="Details"
                placeholder="Enter Notice details"
                fullWidth
                required
                multiline
                minRows={4}
                value={details}
                onChange={(e)=>setDetails(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DescriptionIcon sx={{ alignSelf:'flex-start', mt:.5, color:'#718096' }}/>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box className="form-actions">
              <Button
                type="button"
                className="cancel-btn"
                onClick={() => { setTitle(''); setDetails(''); setDate(''); }}
              >
                Clear
              </Button>

              <Button
                type="submit"
                className="save-btn"
                startIcon={loader ? null : <AddIcon />}
                disabled={loader}
              >
                {loader ? <CircularProgress size={20} color="inherit" /> : 'Add EAR'}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  );
};

export default AddNotice;