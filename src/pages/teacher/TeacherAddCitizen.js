import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/userRelated/userHandle';
import { underControl } from '../../redux/userRelated/userSlice';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
  Tooltip,
  InputAdornment,
  Fade,
  Paper
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BadgeIcon from '@mui/icons-material/Badge';
import LockIcon from '@mui/icons-material/Lock';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

// Teacher-specific Add Citizen (simplified from AddStudent)
// Auto binds citizen to teacher's community (teachSclass) and subject context is ignored.

const TeacherAddCitizen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, currentUser, response, error } = useSelector(state => state.user);

  const [name, setName] = useState('');
  const [rollNum, setRollNum] = useState('');
  const [password, setPassword] = useState('');

  const [touched, setTouched] = useState({});
  const [showPopup, setShowPopup] = useState(false); // retained for possible future toast integration
  const [message, setMessage] = useState('');
  const [loader, setLoader] = useState(false);

  const teacherID = currentUser?._id;
  const communityID = currentUser?.teachSclass?._id; // teacher's bound community
  const role = 'Student'; // backend treats citizens as Student role
  const attendance = [];

  // Inject local styles (lightweight subset of AddStudent aesthetics)
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      :root { --panel-bg:#ffffff; --border:#e2e8f0; --primary:#0a78ff; --accent:#07b389; --danger:#c53030; }
      .tCitizenWrap { min-height:100vh; padding:clamp(1rem,2.5vw,2rem); background:radial-gradient(circle at 25% 20%, #f0f7ff 0%, #f3f6fa 40%); display:flex; justify-content:center; }
      .tCitizenCard { width:100%; max-width:900px; background:var(--panel-bg); border:1px solid var(--border); border-radius:24px; box-shadow:0 8px 24px -6px rgba(30,45,60,.15); overflow:hidden; animation:fadeSlide .4s ease; }
      @keyframes fadeSlide { from { opacity:0; transform:translateY(18px);} to { opacity:1; transform:translateY(0);} }
      .tHead { display:flex; gap:1.2rem; align-items:center; padding:1.4rem 1.6rem; background:linear-gradient(135deg,#f8fbff 0%, #e9f3ff 100%); border-bottom:1px solid var(--border); }
      .tIcon { width:60px; height:60px; border-radius:18px; display:flex; align-items:center; justify-content:center; background:linear-gradient(135deg,var(--primary),var(--accent)); color:#fff; box-shadow:0 10px 28px -10px rgba(10,120,255,.35); }
      .tTitle { margin:0; font-weight:800; font-size:1.5rem; letter-spacing:-.5px; color:#1a202c; }
      .tSub { margin:.2rem 0 0; font-size:.7rem; font-weight:700; letter-spacing:.8px; text-transform:uppercase; color:#54657a; }
      .tBody { padding:1.5rem 1.6rem 2rem; }
      .sectionLabel { font-size:.72rem; font-weight:700; letter-spacing:.75px; text-transform:uppercase; color:#54657a; display:flex; align-items:center; gap:.45rem; margin:1.4rem 0 .6rem; }
      .inlineError { display:flex; align-items:center; gap:.35rem; font-size:.66rem; font-weight:600; letter-spacing:.5px; color:var(--danger); margin-top:.35rem; }
      .inlineSuccess { display:flex; align-items:center; gap:.35rem; font-size:.66rem; font-weight:600; letter-spacing:.5px; color:var(--accent); margin-top:.35rem; }
      .infoBox { display:flex; gap:.6rem; padding:.7rem .9rem; border-radius:14px; background:#f0f7ff; border:1px solid #d4e7ff; margin-top:.7rem; }
      .infoBox p { margin:0; font-size:.65rem; line-height:1.4; color:#54657a; }
    `;
    document.head.appendChild(styleEl);
    return () => styleEl.remove();
  }, []);

  // Password strength logic (same as AddStudent simplified)
  const pwdStrength = useMemo(() => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  }, [password]);

  const strengthLabel = ['Very Weak','Weak','Fair','Good','Strong','Excellent'][pwdStrength];

  const canSubmit = name.trim().length > 1 && rollNum.trim().length > 0 && pwdStrength >= 3 && communityID && teacherID && !loader;

  const markTouched = (f) => setTouched(prev => ({ ...prev, [f]: true }));

  const fields = { name, rollNum, password, sclassName: communityID, adminID: teacherID, role, attendance };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!communityID) {
      setMessage('Your account lacks an associated community.');
      setShowPopup(true);
    } else if (!canSubmit) {
      setMessage('Please fix validation errors first.');
      setShowPopup(true);
    } else {
      setLoader(true);
      dispatch(registerUser(fields, role));
    }
  };

  useEffect(() => {
    if (status === 'added') {
      dispatch(underControl());
      navigate(-1);
    } else if (status === 'failed') {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === 'error') {
      setMessage('Network Error');
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, response, error, dispatch, navigate]);

  return (
    <Box className='tCitizenWrap'>
      <Fade in timeout={400}>
        <Box className='tCitizenCard'>
          <Box className='tHead'>
            <Box className='tIcon'><PersonAddIcon style={{ fontSize:'1.8rem' }}/></Box>
            <Box style={{ flex:1 }}>
              <Typography className='tTitle'>Add Citizen</Typography>
              <Typography className='tSub'>Register New Community Member</Typography>
            </Box>
            <Tooltip title='Go Back' arrow>
              <Button variant='text' startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ textTransform:'none', fontWeight:600 }}>
                Back
              </Button>
            </Tooltip>
          </Box>
          <Box className='tBody'>
            <form onSubmit={submitHandler} noValidate>
              <Typography className='sectionLabel'><PersonIcon style={{ fontSize:'1rem' }}/> Citizen Information</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField label='Full Name' fullWidth value={name} onChange={e => setName(e.target.value)} onBlur={() => markTouched('name')} error={touched.name && name.trim().length < 2} helperText={touched.name && name.trim().length < 2 ? 'Enter at least 2 characters.' : ''} InputProps={{ startAdornment:<InputAdornment position='start'><BadgeIcon /></InputAdornment> }} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField label='Citizen ID' fullWidth value={rollNum} onChange={e => setRollNum(e.target.value)} onBlur={() => markTouched('rollNum')} error={touched.rollNum && rollNum.trim().length === 0} helperText={touched.rollNum && rollNum.trim().length === 0 ? 'ID is required.' : ''} InputProps={{ startAdornment:<InputAdornment position='start'><BadgeIcon /></InputAdornment> }} />
                </Grid>
              </Grid>

              <Typography className='sectionLabel' style={{ marginTop:'1.6rem' }}><LockIcon style={{ fontSize:'1rem' }}/> Security</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField type='password' label='Password' fullWidth value={password} onChange={e => setPassword(e.target.value)} onBlur={() => markTouched('password')} error={touched.password && pwdStrength < 3} helperText={touched.password && pwdStrength < 3 ? 'Include upper, lower, number & 8+ chars.' : ''} InputProps={{ startAdornment:<InputAdornment position='start'><LockIcon /></InputAdornment> }} />
                  {password && (
                    <Box className={pwdStrength >= 3 ? 'inlineSuccess' : 'inlineError'}>
                      {pwdStrength >= 3 ? <CheckCircleIcon style={{ fontSize:'0.9rem' }}/> : <ErrorOutlineIcon style={{ fontSize:'0.9rem' }}/>}<span>{strengthLabel}</span>
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper elevation={0} className='infoBox'>
                    <InfoOutlinedIcon style={{ fontSize:'1.1rem' }}/>
                    <p>Password should be at least 8 chars and contain a mix of upper/lowercase letters, numbers, and special characters for strong security.</p>
                  </Paper>
                </Grid>
              </Grid>

              <Box sx={{ display:'flex', alignItems:'center', justifyContent:'space-between', mt:3, flexWrap:'wrap', gap:2 }}>
                <Typography sx={{ fontSize:'.7rem', fontWeight:600, letterSpacing:'.6px', color:'#54657a', textTransform:'uppercase' }}>Community: {currentUser?.teachSclass?.sclassName || 'Not Assigned'}</Typography>
                <Button type='submit' disabled={!canSubmit} variant='contained' sx={{ textTransform:'none', fontWeight:700, borderRadius:'14px', background:'linear-gradient(135deg,#0a78ff,#07b389)' }}>
                  {loader ? <CircularProgress size={22} sx={{ color:'#fff' }}/> : 'Add Citizen'}
                </Button>
              </Box>
              {showPopup && message && (
                <Typography sx={{ mt:2, fontSize:'.75rem', fontWeight:600, color:'#c53030' }}>{message}</Typography>
              )}
            </form>
          </Box>
        </Box>
      </Fade>
    </Box>
  );
};

export default TeacherAddCitizen;
