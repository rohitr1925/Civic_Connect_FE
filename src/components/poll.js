import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSclasses, getPollsforAdmin, getAllCommunityPolls } from '../redux/sclassRelated/sclassHandle';
import { createPoll } from '../redux/userRelated/userHandle';
import { underControl } from '../redux/userRelated/userSlice';
import {
  Box,
  CircularProgress,
  Tab,
  Typography,
  Paper,
  Collapse,
  IconButton,
  Fade,
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CloseIcon from '@mui/icons-material/Close';
import PollIcon from '@mui/icons-material/Poll';
import BarChartIcon from '@mui/icons-material/BarChart';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Popup from './Popup';

// inject CSS into the page (no external import)
const pollStyles = `
/* Main Container */
.polls-page-wrap { 
  min-height:100vh; 
  background:#f8fafc; 
  padding:1.5rem 1rem; 
}

.polls-panel { 
  max-width:1320px; 
  margin:0 auto; 
  background:#fff; 
  border-radius:20px; 
  box-shadow:0 2px 8px rgba(6,10,30,0.08); 
  border:2px solid #e2e8f0; 
  overflow:hidden;
  animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideUp {
  from { opacity:0; transform:translateY(30px); }
  to { opacity:1; transform:translateY(0); }
}

.polls-header { 
  display:flex; 
  flex-wrap:wrap; 
  align-items:center; 
  justify-content:space-between; 
  gap:1.2rem; 
  padding:1.75rem 2rem; 
  background:linear-gradient(135deg, #0a78ff, #07b389); 
  border-bottom:none; 
  position:relative; 
}

.polls-header::after { 
  display:none;
}

.header-left { 
  display:flex; 
  align-items:center; 
  gap:1.2rem; 
  position:relative; 
  z-index:1; 
}

.header-icon { 
  width:68px; 
  height:68px; 
  border-radius:16px; 
  background:rgba(255,255,255,0.25); 
  backdrop-filter:blur(10px);
  display:flex; 
  align-items:center; 
  justify-content:center; 
  color:#fff; 
  font-size:2rem; 
  box-shadow:0 8px 20px -6px rgba(0,0,0,0.2); 
}

.polls-title { 
  margin:0; 
  font-size:1.85rem; 
  font-weight:900; 
  letter-spacing:-.8px; 
  color:#fff; 
  line-height:1.2;
}

.polls-subtitle { 
  margin:.4rem 0 0; 
  font-size:.85rem; 
  font-weight:600; 
  letter-spacing:.3px; 
  color:rgba(255,255,255,0.95); 
  display:flex; 
  align-items:center; 
  gap:.45rem; 
}

.polls-content { 
  padding:2rem 2rem 2.5rem; 
  background:#fafcfe;
}

.empty-state-polls {
  text-align:center;
  padding:5rem 2rem;
}

.empty-state-polls .empty-icon {
  width:80px;
  height:80px;
  margin:0 auto 1.5rem;
  border-radius:50%;
  background:linear-gradient(135deg, #0a78ff, #07b389);
  display:flex;
  align-items:center;
  justify-content:center;
  color:#fff;
  box-shadow:0 10px 30px -8px rgba(10,120,255,0.3);
}

.empty-state-polls .empty-icon svg {
  font-size:2.5rem;
}

.empty-state-polls .empty-title {
  font-size:1.5rem;
  font-weight:800;
  color:#1a202c;
  margin-bottom:0.5rem;
  font-family:Inter, Roboto, sans-serif;
}

.empty-state-polls .empty-text {
  font-size:1rem;
  color:#718096;
  font-weight:600;
  font-family:Inter, Roboto, sans-serif;
  line-height:1.6;
}

/* Form Layout */
.register { 
  display:flex; 
  justify-content:center; 
  padding:0; 
  box-sizing:border-box;
  width:100%;
  max-width:100%;
}

.registerForm { 
  width:100%; 
  max-width:760px; 
  background:#fff; 
  border-radius:14px; 
  box-shadow:none; 
  padding:0; 
  border:none; 
  font-family:Inter, Roboto, "Helvetica Neue", Arial, sans-serif;
  overflow:hidden;
}

.registerTitle { 
  display:block; 
  font-size:1.35rem; 
  font-weight:800; 
  color:#1a202c; 
  margin-bottom:1.5rem;
  padding-bottom:1rem;
  border-bottom:2px solid #e2e8f0;
  font-family:Inter, Roboto, sans-serif;
}

.register label { 
  display:block; 
  font-size:0.9rem; 
  color:#2d3748; 
  margin:1rem 0 0.5rem; 
  font-weight:700;
  font-family:Inter, Roboto, sans-serif;
}

.registerInput { 
  width:100%; 
  padding:11px 13px; 
  border-radius:10px; 
  border:2px solid #e2e8f0; 
  background:#fff; 
  outline:none; 
  font-size:0.95rem; 
  color:#1a202c; 
  transition:all .2s ease; 
  box-sizing:border-box;
  font-weight:600;
  word-wrap:break-word;
  overflow-wrap:break-word;
  max-width:100%;
  text-overflow:ellipsis;
  white-space:nowrap;
  overflow:hidden;
  font-family:Inter, Roboto, sans-serif;
}

.registerInput:hover {
  border-color:#cbd5e0;
}

.registerInput:focus { 
  border-color:#0a78ff; 
  box-shadow:0 0 0 3px rgba(10,120,255,0.1); 
}

.registerForm > div > div { 
  align-items:center; 
}

.option-row {
  display:flex;
  gap:10px;
  margin-bottom:10px;
  align-items:center;
  width:100%;
  max-width:100%;
  overflow:hidden;
}

.option-input-wrapper {
  flex:1;
  position:relative;
  min-width:0;
  max-width:100%;
  overflow:hidden;
}

.option-number {
  position:absolute;
  left:13px;
  top:50%;
  transform:translateY(-50%);
  font-weight:700;
  color:#718096;
  font-size:0.85rem;
  pointer-events:none;
  font-family:Inter, Roboto, sans-serif;
}

.option-input {
  padding-left:38px !important;
  max-width:100%;
  word-wrap:break-word;
  overflow-wrap:break-word;
  text-overflow:ellipsis;
  white-space:nowrap;
  overflow:hidden;
}

.removeOptionBtn { 
  background:#fff; 
  border:2px solid #e2e8f0; 
  color:#e53e3e; 
  font-weight:700; 
  cursor:pointer; 
  padding:10px; 
  border-radius:10px; 
  transition:all .2s ease; 
  display:inline-flex; 
  align-items:center; 
  justify-content:center;
  min-width:42px;
  height:42px;
}

.removeOptionBtn:hover { 
  background:#fff5f5; 
  border-color:#e53e3e; 
  transform:translateY(-2px); 
  box-shadow:0 4px 12px rgba(229,62,62,0.2);
}

.registerButton { 
  display:inline-flex; 
  align-items:center; 
  justify-content:center; 
  gap:8px; 
  margin-top:1.75rem; 
  width:170px; 
  padding:11px 18px; 
  border-radius:12px; 
  background:linear-gradient(135deg,#0a78ff 0%,#07b389 100%); 
  color:#fff; 
  font-weight:700; 
  font-size:0.95rem;
  border:none; 
  cursor:pointer; 
  transition:all .2s ease; 
  box-shadow:0 6px 20px -6px rgba(10,120,255,0.35); 
  font-family:Inter, Roboto, sans-serif;
}

.registerButton:hover { 
  transform:translateY(-2px); 
  box-shadow:0 10px 30px -8px rgba(10,120,255,0.45); 
}

.registerButton:active {
  transform:translateY(0);
}

.registerButton:disabled {
  opacity:0.6;
  cursor:not-allowed;
  transform:none;
}

/* COMMUNITY / POLL RESULTS STYLES */
.communityPaper { 
  border-radius:16px; 
  box-shadow:0 2px 8px rgba(6,10,30,0.06); 
  overflow:hidden; 
  border:2px solid #e2e8f0; 
  transition:all .3s ease; 
  background:#fff; 
  margin-bottom:20px; 
}

.communityPaper:hover { 
  box-shadow:0 4px 16px rgba(6,10,30,0.1); 
  transform:translateY(-2px);
  border-color:#cbd5e0;
}

.communityHeader { 
  display:flex; 
  align-items:center; 
  justify-content:space-between; 
  padding:18px 22px; 
  background:#fff; 
  cursor:pointer; 
  border-bottom:2px solid #e2e8f0;
  transition:all .2s ease;
}

.communityHeader:hover {
  background:#fafcfe;
}

.communityLeft { 
  display:flex; 
  align-items:center; 
  gap:14px; 
  min-width:0; 
}

.communityAvatar { 
  width:54px; 
  height:54px; 
  border-radius:14px; 
  background:linear-gradient(135deg,#0a78ff 0%, #07b389 100%); 
  color:#fff; 
  display:flex; 
  align-items:center; 
  justify-content:center; 
  font-weight:800; 
  font-size:1.2rem; 
  flex:0 0 54px; 
  box-shadow:0 6px 20px -6px rgba(10,120,255,0.35); 
}

.communityTitle { 
  font-size:1.1rem; 
  font-weight:800; 
  color:#1a202c; 
  margin:0; 
  line-height:1.3;
  font-family:Inter, Roboto, sans-serif;
}

.communityRight { 
  display:flex; 
  align-items:center; 
  gap:10px; 
  flex:0 0 auto; 
}

.communityMeta { 
  font-size:0.85rem; 
  color:#718096; 
  padding:6px 14px; 
  border-radius:20px; 
  background:#f7fafc; 
  white-space:nowrap; 
  font-weight:700; 
  border:2px solid #e2e8f0; 
  font-family:Inter, Roboto, sans-serif;
}

.communityToggle { 
  width:38px; 
  height:38px; 
  display:flex; 
  align-items:center; 
  justify-content:center; 
  border-radius:10px; 
  transition:all .2s ease; 
  background:#fff; 
  color:#718096; 
  border:2px solid #e2e8f0; 
}

.communityToggle:hover { 
  background:#f0f7ff; 
  border-color:#0a78ff; 
  color:#0a78ff;
  transform:scale(1.05);
}

.communityToggle.open { 
  transform: rotate(180deg); 
}

.communityToggle.open:hover {
  transform: rotate(180deg) scale(1.05);
}

/* CONTENT */
.communityContent { 
  padding:20px 24px 24px; 
  background:#fafcfe; 
}

/* POLL CARD */
.pollCard { 
  padding:18px; 
  border-radius:14px; 
  margin-bottom:16px; 
  background:#fff; 
  border:2px solid #e2e8f0; 
  position:relative; 
  overflow:hidden; 
  box-shadow:0 1px 4px rgba(6,10,30,0.04); 
  transition:all .3s ease; 
}

.pollCard:hover { 
  box-shadow:0 4px 12px rgba(6,10,30,0.08); 
  transform:translateY(-2px); 
  border-color:#cbd5e0;
}

.pollCard:last-child {
  margin-bottom:0;
}

.pollCard::before { 
  content:''; 
  position:absolute; 
  left:0; 
  top:0; 
  bottom:0; 
  width:4px; 
  background:linear-gradient(180deg,#0a78ff,#07b389); 
}

.pollCard.variant0::before { background:linear-gradient(180deg,#0a78ff,#07b389); }
.pollCard.variant1::before { background:linear-gradient(180deg,#d45bff,#7a5cff); }
.pollCard.variant2::before { background:linear-gradient(180deg,#ff8b4b,#ff5c80); }
.pollCard.variant3::before { background:linear-gradient(180deg,#21b6a8,#0a78ff); }

.pollHeader { 
  display:flex; 
  align-items:flex-start; 
  justify-content:space-between; 
  margin-bottom:16px; 
  padding-left:12px; 
  gap:14px;
}

.pollTitle { 
  font-weight:800; 
  color:#1a202c; 
  font-size:1.05rem; 
  line-height:1.5; 
  flex:1; 
  word-break:break-word;
  font-family:Inter, Roboto, sans-serif;
}

.pollMeta { 
  font-size:0.82rem; 
  color:#718096; 
  padding:5px 12px; 
  background:#f7fafc; 
  border-radius:10px; 
  white-space:nowrap; 
  font-weight:700; 
  border:2px solid #e2e8f0;
  flex-shrink:0;
  font-family:Inter, Roboto, sans-serif;
}

/* OPTIONS ROW - option|graph|percentage (NO SPACE) then votes far right */
.pollOptionRow { 
  display:flex; 
  align-items:center; 
  padding:10px 0 10px 12px; 
  border-bottom:2px solid rgba(226,232,240,0.6); 
  justify-content:space-between;
  transition:all .2s ease;
}

.pollOptionRow:hover {
  background:rgba(240,247,255,0.7);
  border-radius:8px;
  padding-left:16px;
  padding-right:4px;
  margin-left:-4px;
  margin-right:-4px;
}

.pollOptionRow:last-child { 
  border-bottom:none; 
}

/* LEFT GROUP: option + bar + percentage (tightly packed, NO gaps) */
.optionLeftGroup { display:flex; align-items:center; gap:0; flex:0 0 auto; }

/* 1. OPTION label */
.optionLabel { 
  flex:0 0 130px; 
  font-size:0.9rem; 
  color:#2d3748; 
  font-weight:700; 
  overflow:hidden; 
  text-overflow:ellipsis; 
  white-space:nowrap; 
  padding-right:8px;
  display:flex;
  align-items:center;
  font-family:Inter, Roboto, sans-serif;
}

/* 2. BAR - right next to option */
.optionBarWrap { flex:0 0 180px; display:flex; align-items:center; }
.optionBar { 
  height:10px; 
  background:#edf2f7; 
  border-radius:8px; 
  overflow:hidden; 
  width:100%; 
  box-shadow:inset 0 1px 2px rgba(0,0,0,0.05);
}
.optionFill { 
  height:100%; 
  border-radius:8px; 
  transition:width .6s cubic-bezier(0.4,0,0.2,1); 
  box-shadow:0 1px 2px rgba(0,0,0,0.08);
}

.pollCard.variant0 .optionFill { background:linear-gradient(90deg,#0a78ff,#07b389); }
.pollCard.variant1 .optionFill { background:linear-gradient(90deg,#d45bff,#7a5cff); }
.pollCard.variant2 .optionFill { background:linear-gradient(90deg,#ff8b4b,#ff5c80); }
.pollCard.variant3 .optionFill { background:linear-gradient(90deg,#21b6a8,#0a78ff); }

/* 3. PERCENTAGE - immediately next to bar, NO space */
.optionPercent { 
  flex:0 0 48px; 
  font-weight:800; 
  color:#1a202c; 
  font-size:0.9rem; 
  padding-left:8px; 
  text-align:left;
  font-family:Inter, Roboto, sans-serif;
}

/* 4. VOTES - far right with large space */
.optionVotes { 
  flex:0 0 auto; 
  font-weight:600; 
  color:#718096; 
  font-size:0.85rem; 
  padding-left:16px; 
  text-align:right;
  font-family:Inter, Roboto, sans-serif;
}

/* responsive */
@media (max-width:720px) {
  .polls-page-wrap {
    padding:1rem 0.75rem;
  }
  
  .polls-panel {
    border-radius:16px;
  }
  
  .polls-header {
    padding:1.25rem 1.25rem;
  }
  
  .header-icon {
    width:56px;
    height:56px;
    font-size:1.75rem;
  }
  
  .polls-title {
    font-size:1.4rem;
  }
  
  .polls-subtitle {
    font-size:0.8rem;
  }
  
  .polls-content {
    padding:1.5rem 1.25rem;
  }
  
  .communityHeader { 
    padding:12px 14px; 
  }
  
  .communityAvatar { 
    width:44px; 
    height:44px; 
    font-size:1rem; 
  }
  
  .communityTitle {
    font-size:0.95rem;
  }
  
  .communityMeta {
    font-size:0.75rem;
    padding:4px 10px;
  }
  
  .pollCard { 
    padding:14px; 
  }
  
  .pollTitle {
    font-size:0.95rem;
  }
  
  .pollMeta {
    font-size:0.75rem;
    padding:4px 10px;
  }
  
  .optionLabel { 
    flex-basis:100px; 
    font-size:0.82rem; 
  }
  
  .optionBarWrap { 
    flex-basis:120px; 
  }
  
  .optionPercent { 
    flex-basis:40px; 
    font-size:0.8rem; 
  }
  
  .optionVotes { 
    font-size:0.75rem;
    padding-left:10px;
  }
  
  .registerTitle {
    font-size:1.15rem;
  }
  
  .registerButton {
    width:100%;
  }
  
  .option-row {
    flex-direction:column;
    align-items:stretch;
  }
  
  .removeOptionBtn {
    width:100%;
    margin-top:8px;
  }
  
  .empty-state-polls {
    padding:3rem 1.5rem;
  }
  
  .empty-state-polls .empty-icon {
    width:70px;
    height:70px;
  }
  
  .empty-state-polls .empty-icon svg {
    font-size:2rem;
  }
}
`;

const CreatePoll = ({ situation, mode = 'admin' }) => {
  // inject styles once
  useEffect(() => {
    if (!document.getElementById('poll-styles')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'poll-styles';
      styleEl.innerHTML = pollStyles;
      document.head.appendChild(styleEl);
    }
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const userState = useSelector((state) => state.user);
  const { status, currentUser, response, error } = userState;
  const { sclassesList, adminPollslist, pollsList } = useSelector((state) => state.sclass);

  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['']);
  const [date, setDate] = useState(new Date());
  const [className, setClassName] = useState('');
  const [sclassName, setSclassName] = useState('');
  const [value, setValue] = useState('1');
  const [openCommunities, setOpenCommunities] = useState({});

  const adminID = currentUser._id;
  const teacherCommunityID = currentUser?.teachSclass?._id || currentUser?.classDetails?._id;
  const teacherCommunityName = currentUser?.teachSclass?.sclassName || currentUser?.classDetails?.sclassName;

  useEffect(() => {
    if (situation === 'Class') {
      setSclassName(params.id);
    }
  }, [params.id, situation]);

  useEffect(() => {
    if (mode === 'admin') {
      dispatch(getPollsforAdmin(adminID, 'Polls'));
      dispatch(getAllSclasses(adminID, 'Sclass'));
    } else if (mode === 'teacher' && teacherCommunityID) {
      dispatch(getAllCommunityPolls(adminID, teacherCommunityID, 'Polls'));
    }
  }, [dispatch, adminID, mode, teacherCommunityID]);

  const changeHandler = (event) => {
    if (event.target.value === 'Select Class') {
      setClassName('Select Class');
      setSclassName('');
    } else {
      const selectedClass = sclassesList.find(
        (classItem) => classItem.sclassName === event.target.value
      );
      setClassName(selectedClass.sclassName);
      setSclassName(selectedClass._id);
    }
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
    if (index === options.length - 1 && value.trim() !== '') {
      setOptions([...updatedOptions, '']);
    }
  };

  const removeOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');
  const [loader, setLoader] = useState(false);

  const effectiveSclassName = mode === 'teacher' ? teacherCommunityID : sclassName;
  const fields = {
    question,
    options: options.filter((opt) => opt.trim() !== ''),
    expiryDate: new Date(date).toISOString(),
    sclassName: effectiveSclassName,
    adminID,
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(createPoll(fields, 'Poll'));
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
  }, [status, navigate, error, response, dispatch]);

  const handleToggle = (communityName) => {
    setOpenCommunities((prev) => ({
      ...prev,
      [communityName]: !prev[communityName],
    }));
  };

  const Addpoll = () => (
    <div className="register">
      <form className="registerForm" onSubmit={submitHandler}>
        <span className="registerTitle">Create New Poll</span>

        <label>Poll Question *</label>
        <input 
          className="registerInput" 
          type="text" 
          placeholder="What would you like to ask?"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          autoComplete="question" 
          required 
          style={{ maxWidth: '100%', boxSizing: 'border-box' }}
        />

        {mode === 'admin' ? (
          <>
            <label>Select Community *</label>
            <select
              className="registerInput"
              value={className}
              onChange={changeHandler}
              required
              style={{ maxWidth: '100%', boxSizing: 'border-box' }}
            >
              <option value="Select Class">Choose a community</option>
              {sclassesList.map((classItem, index) => (
                <option key={index} value={classItem.sclassName}>
                  {classItem.sclassName}
                </option>
              ))}
            </select>
          </>
        ) : (
          <Box sx={{ mb: 2, p: 2, border: '1px solid #e2e8f0', borderRadius: '12px', background: '#f8fafc' }}>
            <Typography sx={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: '.8px', textTransform: 'uppercase', color: '#64748b', mb: .5 }}>Community</Typography>
            <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#1e293b' }}>{teacherCommunityName || 'Unassigned'}</Typography>
          </Box>
        )}

        <label>Poll Options *</label>
        <Typography sx={{ fontSize: '0.85rem', color: '#718096', marginBottom: '0.75rem', fontWeight: 500 }}>
          Add at least 2 options. Start typing in the last field to add more.
        </Typography>
        {options.map((opt, index) => (
          <div key={index} className="option-row" style={{ maxWidth: '100%', boxSizing: 'border-box' }}>
            <div className="option-input-wrapper" style={{ maxWidth: '100%', boxSizing: 'border-box' }}>
              <span className="option-number">{index + 1}.</span>
              <input
                className="registerInput option-input"
                type="text"
                placeholder={`Enter option ${index + 1}`}
                value={opt}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                required={index < 2}
                style={{ maxWidth: '100%', boxSizing: 'border-box' }}
              />
            </div>
            {options.length > 1 && index !== options.length - 1 && (
              <IconButton 
                type="button" 
                onClick={() => removeOption(index)}
                size="small"
                className="removeOptionBtn"
                sx={{ 
                  backgroundColor: '#fff',
                  border: '1.5px solid #e2e8f0',
                  color: '#e53e3e',
                  padding: '10px',
                  borderRadius: '10px',
                  minWidth: '44px',
                  height: '44px',
                  '&:hover': { 
                    backgroundColor: '#fff5f5', 
                    borderColor: '#e53e3e',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(229,62,62,0.2)'
                  }
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
          </div>
        ))}

        <label>Expiry Date *</label>
        <input
          className="registerInput"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          required
          style={{ maxWidth: '100%', boxSizing: 'border-box' }}
        />

        <button className="registerButton" type="submit" disabled={loader}>
          {loader ? <CircularProgress size={24} color="inherit" /> : 'Create Poll'}
        </button>
      </form>

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </div>
  );

  const PollResults = () => {
    const displayPollsObject = mode === 'teacher'
      ? (teacherCommunityName ? { [teacherCommunityName]: pollsList || [] } : {})
      : adminPollslist;

    if (!displayPollsObject || Object.keys(displayPollsObject).length === 0) {
      return (
        <Fade in timeout={600}>
          <Box className="empty-state-polls">
            <Box className="empty-icon">
              <PollIcon />
            </Box>
            <Typography className="empty-title">
              {mode === 'teacher' ? 'No Polls For Your Community Yet' : 'No Polls Created Yet'}
            </Typography>
            <Typography className="empty-text">
              {mode === 'teacher' ? 'Create the first poll to gather feedback' : 'Create your first poll to start gathering community feedback'}
            </Typography>
          </Box>
        </Fade>
      );
    }

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {Object.entries(displayPollsObject).map(([communityName, polls]) => (
          <Paper key={communityName} className="communityPaper" elevation={0}>
            <div
              className="communityHeader"
              role="button"
              onClick={() => handleToggle(communityName)}
            >
              <div className="communityLeft">
                <div className="communityAvatar">{communityName?.charAt(0)?.toUpperCase()}</div>
                <Typography className="communityTitle">{communityName}</Typography>
              </div>

              <div className="communityRight">
                <Typography className="communityMeta">{polls.length} poll{polls.length > 1 ? 's' : ''}</Typography>
                <IconButton
                  className={`communityToggle ${openCommunities[communityName] ? 'open' : ''}`}
                  aria-label={openCommunities[communityName] ? 'collapse' : 'expand'}
                >
                  {openCommunities[communityName] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </div>
            </div>

            <Collapse in={openCommunities[communityName]} timeout="auto" unmountOnExit>
              <div className="communityContent">
                {polls.map((poll, pIndex) => {
                  const total = (poll.votes || []).reduce((a, b) => a + (b || 0), 0);
                  const variant = pIndex % 4;
                  const expiryDate = poll.expiryDate ? new Date(poll.expiryDate) : null;
                  const isExpired = expiryDate && expiryDate < new Date();
                  
                  // Find the leading option
                  const maxVotes = Math.max(...(poll.votes || [0]));
                  
                  return (
                    <div key={poll._id} className={`pollCard variant${variant}`}>
                      <div className="pollHeader">
                        <div className="pollTitle">{poll.question}</div>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <div className="pollMeta">
                            {expiryDate ? expiryDate.toLocaleDateString('en-GB') : 'No expiry'}
                          </div>
                          {isExpired && (
                            <Box sx={{ 
                              padding: '4px 10px', 
                              borderRadius: '8px', 
                              background: '#fee', 
                              color: '#c53030',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              border: '1px solid #fcc'
                            }}>
                              Expired
                            </Box>
                          )}
                        </Box>
                      </div>

                      {/* Total Votes Display */}
                      {total > 0 && (
                        <Box sx={{ 
                          padding: '10px 14px', 
                          marginBottom: '16px',
                          marginLeft: '14px',
                          background: 'linear-gradient(135deg, #f0f7ff, #e6f2ff)',
                          borderRadius: '10px',
                          border: '1px solid #cbd5e0',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 1
                        }}>
                          <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, color: '#2d3748' }}>
                            Total Responses: 
                          </Typography>
                          <Typography sx={{ fontSize: '1rem', fontWeight: 800, color: '#0a78ff' }}>
                            {total}
                          </Typography>
                        </Box>
                      )}

                      <div>
                        {(poll.options || []).map((opt, idx) => {
                          const v = (poll.votes && poll.votes[idx]) ? poll.votes[idx] : 0;
                          const pct = total ? Math.round((v / total) * 100) : 0;
                          const isLeading = total > 0 && v === maxVotes && v > 0;
                          
                          return (
                            <div key={idx} className="pollOptionRow" style={{ 
                              background: isLeading ? 'linear-gradient(90deg, rgba(10,120,255,0.05), rgba(7,179,137,0.05))' : 'transparent',
                              alignItems: 'flex-start',
                              flexWrap: 'wrap'
                            }}>
                              {/* LEFT GROUP: option + bar + percentage (grouped together) */}
                              <div className="optionLeftGroup" style={{ display: 'flex', alignItems: 'center', minWidth: 0, flex: 1 }}>
                                {/* 1. option label */}
                                <div className="optionLabel" title={opt} style={{
                                  minWidth: 0,
                                  maxWidth: '180px',
                                  fontSize: '.95rem',
                                  fontWeight: 700,
                                  color: '#2d3748',
                                  overflowWrap: 'break-word',
                                  wordBreak: 'break-word',
                                  whiteSpace: 'normal',
                                  paddingRight: 8,
                                  display: 'flex',
                                  alignItems: 'center'
                                }}>
                                  {isLeading && (
                                    <EmojiEventsIcon 
                                      sx={{ 
                                        fontSize: '1rem', 
                                        color: '#f59e0b', 
                                        marginRight: '4px',
                                        verticalAlign: 'middle'
                                      }} 
                                    />
                                  )}
                                  {opt}
                                </div>
                                {/* 2. progress bar */}
                                <div className="optionBarWrap" style={{ flex: '0 0 160px', marginLeft: 8 }}>
                                  <div className="optionBar">
                                    <div className="optionFill" style={{ width: `${pct}%` }} />
                                  </div>
                                </div>
                                {/* 3. percentage next to bar */}
                                <div className="optionPercent" style={{ flex: '0 0 48px', paddingLeft: 8 }}>{pct}%</div>
                              </div>
                              {/* FAR RIGHT: number of votes */}
                              <div className="optionVotes" style={{ flex: '0 0 auto', fontWeight: 600, color: '#718096', fontSize: '.95rem', paddingLeft: 16, textAlign: 'right' }}>
                                {v} {v === 1 ? 'vote' : 'votes'}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* No votes message */}
                      {total === 0 && (
                        <Box sx={{ 
                          textAlign: 'center', 
                          padding: '1.5rem',
                          marginTop: '1rem',
                          color: '#718096',
                          fontSize: '0.95rem',
                          fontWeight: 600,
                          background: '#f7fafc',
                          borderRadius: '10px',
                          border: '1px dashed #cbd5e0'
                        }}>
                          No votes yet!
                        </Box>
                      )}
                    </div>
                  );
                })}
              </div>
            </Collapse>
          </Paper>
        ))}
      </Box>
    );
  };

  return (
    <Box className="polls-page-wrap">
      <Box className="polls-panel">
        {/* Header Section */}
        <Box className="polls-header">
          <Box className="header-left">
            <Box className="header-icon">
              <PollIcon sx={{ fontSize: '2rem' }} />
            </Box>
            <Box>
              <Typography className="polls-title">
                Polls Management
              </Typography>
              <Typography className="polls-subtitle">
                Create & Monitor Community Polls
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Content Section */}
        <Box className="polls-content">
          <TabContext value={value}>
            <Box sx={{ borderBottom: 2, borderColor: '#e2e8f0', marginBottom: '2rem' }}>
              <TabList
                onChange={handleChange}
                sx={{ 
                  '& .MuiTab-root': { 
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    textTransform: 'none',
                    padding: '12px 24px',
                    minHeight: '48px',
                    color: '#718096',
                    transition: 'all .2s ease',
                    fontFamily: 'Inter, Roboto, sans-serif'
                  },
                  '& .Mui-selected': {
                    color: '#0a78ff',
                    fontWeight: 800
                  },
                  '& .MuiTabs-indicator': {
                    height: '3px',
                    borderRadius: '3px 3px 0 0',
                    background: 'linear-gradient(90deg, #0a78ff, #07b389)'
                  }
                }}
              >
                <Tab 
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <BarChartIcon fontSize="small" />
                      <span>Poll Results</span>
                    </Box>
                  } 
                  value="1" 
                />
                <Tab 
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AddCircleOutlineIcon fontSize="small" />
                      <span>Create Poll</span>
                    </Box>
                  } 
                  value="2" 
                />
              </TabList>
            </Box>

            <TabPanel value="1" sx={{ padding: 0 }}>
              <PollResults />
            </TabPanel>
            <TabPanel value="2" sx={{ padding: 0 }}>
              <Addpoll />
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </Box>
  );
};

export default CreatePoll;
