import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSclasses, getPollsforAdmin } from '../redux/sclassRelated/sclassHandle';
import { createPoll } from '../redux/userRelated/userHandle';
import { underControl } from '../redux/userRelated/userSlice';
import {
  Box,
  CircularProgress,
  Container,
  Tab,
  Typography,
  Paper,
  Divider,
  Collapse,
  IconButton,
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Popup from './Popup';

// inject CSS into the page (no external import)
const pollStyles = `
/* Layout */
.register { display:flex; justify-content:center; padding:28px 16px; box-sizing:border-box; }
.registerForm { width:100%; max-width:760px; background:linear-gradient(180deg,#ffffff 0%,#fbfdff 100%); border-radius:14px; box-shadow:0 10px 30px rgba(6,10,30,0.06); padding:26px; border:1px solid rgba(12,18,30,0.04); font-family:Inter, Roboto, "Helvetica Neue", Arial, sans-serif; }
.registerTitle { display:block; font-size:1.25rem; font-weight:700; color:#071a2b; margin-bottom:14px; }
.register label { display:block; font-size:0.95rem; color:#3b4a60; margin:10px 0 6px; font-weight:600; }
.registerInput { width:100%; padding:10px 12px; border-radius:10px; border:1px solid #e8f0fb; background:#fff; outline:none; font-size:1rem; color:#071024; transition:box-shadow .15s ease, border-color .15s ease; box-sizing:border-box; }
.registerInput:focus { border-color:#4f8cff; box-shadow:0 8px 22px rgba(79,140,255,0.12); }
.registerForm > div > div { align-items:center; }
.registerForm button[type="button"] { background:transparent; border:none; color:#c53030; font-weight:700; font-size:1.1rem; cursor:pointer; padding:6px 8px; border-radius:6px; transition:background .12s ease, transform .08s ease; }
.registerForm button[type="button"]:hover { background:rgba(197,48,48,0.06); transform:translateY(-1px); }
.registerButton { display:inline-flex; align-items:center; justify-content:center; gap:8px; margin-top:18px; width:160px; padding:10px 14px; border-radius:12px; background:linear-gradient(90deg,#0a78ff 0%,#0556d6 100%); color:#fff; font-weight:700; border:none; cursor:pointer; transition:transform .08s ease, box-shadow .12s ease; box-shadow:0 10px 28px rgba(5,86,214,0.14); }
.registerButton:hover { transform:translateY(-2px); box-shadow:0 14px 44px rgba(5,86,214,0.16); }

/* COMMUNITY / POLL RESULTS STYLES */
.communityPaper { border-radius:12px; box-shadow:0 4px 12px rgba(6,10,30,0.03); overflow:hidden; border:1px solid rgba(12,18,30,0.04); transition:box-shadow .2s ease; background:#fff; }
.communityPaper:hover { box-shadow:0 8px 24px rgba(6,10,30,0.06); }

.communityHeader { display:flex; align-items:center; justify-content:space-between; padding:16px 20px; background:#fafbfd; cursor:pointer; border-bottom:1px solid rgba(10,20,40,0.04); }

.communityLeft { display:flex; align-items:center; gap:14px; min-width:0; }
.communityAvatar { width:48px; height:48px; border-radius:12px; background:linear-gradient(135deg,#0a78ff 0%, #07b389 100%); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:1.1rem; flex:0 0 48px; box-shadow:0 4px 12px rgba(10,120,255,0.15); }
.communityTitle { font-size:1.1rem; font-weight:700; color:#061629; margin:0; line-height:1.3; }

.communityRight { display:flex; align-items:center; gap:10px; flex:0 0 auto; }
.communityMeta { font-size:0.88rem; color:#5a6c7d; padding:5px 12px; border-radius:20px; background:rgba(80,96,122,0.06); white-space:nowrap; font-weight:500; }

.communityToggle { width:36px; height:36px; display:flex; align-items:center; justify-content:center; border-radius:8px; transition:all .2s ease; background:transparent; color:#5a6c7d; }
.communityToggle:hover { background:rgba(10,20,40,0.04); }
.communityToggle.open { transform: rotate(180deg); }

/* CONTENT */
.communityContent { padding:16px 20px 20px; background:#fff; }

/* POLL CARD */
.pollCard { padding:16px; border-radius:10px; margin-bottom:14px; background:#fafbfd; border:1px solid rgba(10,20,40,0.04); position:relative; overflow:hidden; }
.pollCard::before { content:''; position:absolute; left:0; top:0; bottom:0; width:4px; background:linear-gradient(180deg,#0a78ff,#07b389); }

.pollCard.variant0::before { background:linear-gradient(180deg,#0a78ff,#07b389); }
.pollCard.variant1::before { background:linear-gradient(180deg,#d45bff,#7a5cff); }
.pollCard.variant2::before { background:linear-gradient(180deg,#ff8b4b,#ff5c80); }
.pollCard.variant3::before { background:linear-gradient(180deg,#21b6a8,#0a78ff); }

.pollHeader { display:flex; align-items:center; justify-content:space-between; margin-bottom:14px; padding-left:12px; }
.pollTitle { font-weight:600; color:#0b2440; font-size:1rem; line-height:1.4; flex:1; }
.pollMeta { font-size:0.82rem; color:#6b7685; padding-left:12px; white-space:nowrap; }

/* OPTIONS ROW - option|graph|percentage (NO SPACE) then votes far right */
.pollOptionRow { display:flex; align-items:center; padding:1px 0 10px 12px; border-bottom:1px solid rgba(10,20,40,0.03); justify-content:space-between; }
.pollOptionRow:last-child { border-bottom:none; }

/* LEFT GROUP: option + bar + percentage (tightly packed, NO gaps) */
.optionLeftGroup { display:flex; align-items:center; gap:0; flex:0 0 auto; }

/* 1. OPTION label */
.optionLabel { flex:0 0 140px; font-size:0.95rem; color:#2c3e50; font-weight:600; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding-right:10px; }

/* 2. BAR - right next to option */
.optionBarWrap { flex:0 0 200px; display:flex; align-items:center; }
.optionBar { height:10px; background:#e8f0fb; border-radius:6px; overflow:hidden; width:100%; }
.optionFill { height:100%; border-radius:6px; transition:width .6s cubic-bezier(0.4,0,0.2,1); }

.pollCard.variant0 .optionFill { background:linear-gradient(90deg,#0a78ff,#07b389); }
.pollCard.variant1 .optionFill { background:linear-gradient(90deg,#d45bff,#7a5cff); }
.pollCard.variant2 .optionFill { background:linear-gradient(90deg,#ff8b4b,#ff5c80); }
.pollCard.variant3 .optionFill { background:linear-gradient(90deg,#21b6a8,#0a78ff); }

/* 3. PERCENTAGE - immediately next to bar, NO space */
.optionPercent { flex:0 0 50px; font-weight:600; color:#0b2440; font-size:0.9rem; padding-left:8px; text-align:left; }

/* 4. VOTES - far right with large space */
.optionVotes { flex:0 0 auto; font-weight:500; color:#5a6c7d; font-size:0.88rem; padding-left:20px; text-align:right; }

/* responsive */
@media (max-width:720px) {
  .communityHeader { padding:14px 16px; }
  .communityAvatar { width:42px; height:42px; font-size:1rem; }
  .pollCard { padding:14px; }
  .optionLabel { flex-basis:110px; font-size:0.88rem; }
  .optionBarWrap { flex-basis:150px; }
  .optionPercent { flex-basis:45px; font-size:0.85rem; }
  .optionVotes { font-size:0.82rem; }
}
`;

const CreatePoll = ({ situation }) => {
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
  const { sclassesList, adminPollslist } = useSelector((state) => state.sclass);

  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['']);
  const [date, setDate] = useState(new Date());
  const [className, setClassName] = useState('');
  const [sclassName, setSclassName] = useState('');
  const [value, setValue] = useState('1');
  const [openCommunities, setOpenCommunities] = useState({});

  const adminID = currentUser._id;

  useEffect(() => {
    if (situation === 'Class') {
      setSclassName(params.id);
    }
  }, [params.id, situation]);

  useEffect(() => {
    dispatch(getPollsforAdmin(adminID, 'Polls'));
    dispatch(getAllSclasses(adminID, 'Sclass'));
  }, [dispatch, adminID]);

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

  const fields = {
    question,
    options: options.filter((opt) => opt.trim() !== ''),
    expiryDate: new Date(date).toISOString(),
    sclassName,
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
        <span className="registerTitle">Add Poll</span>

        <label>Question</label>
        <input className="registerInput" type="text" placeholder="Enter question"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            autoComplete="question" required />

        <label>Community</label>
        <select
          className="registerInput"
          value={className}
          onChange={changeHandler}
          required
        >
          <option value="Select Class">Select Community</option>
          {sclassesList.map((classItem, index) => (
            <option key={index} value={classItem.sclassName}>
              {classItem.sclassName}
            </option>
          ))}
        </select>

        <label>Options</label>
        {options.map((opt, index) => (
          <div key={index} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
            <input
              className="registerInput"
              type="text"
              placeholder={`Option ${index + 1}`}
              value={opt}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              required={index < 2}
            />
            {options.length > 1 && index !== options.length - 1 && (
              <button type="button" onClick={() => removeOption(index)}>✕</button>
            )}
          </div>
        ))}

        <label>Expiry</label>
        <input
          className="registerInput"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          required
        />

        <button className="registerButton" type="submit" disabled={loader}>
          {loader ? <CircularProgress size={24} color="inherit" /> : 'Add'}
        </button>
      </form>

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </div>
  );

  const PollResults = () => {
    if (!adminPollslist || Object.keys(adminPollslist).length === 0) {
      return <Typography>No poll results available.</Typography>;
    }

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {Object.entries(adminPollslist).map(([communityName, polls]) => (
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
                  return (
                    <div key={poll._id} className={`pollCard variant${variant}`}>
                      <div className="pollHeader">
                        <div className="pollTitle">{poll.question}</div>
                        <div className="pollMeta">
                          {poll.expiryDate ? new Date(poll.expiryDate).toLocaleDateString('en-GB') : ''}
                        </div>
                      </div>

                      <div>
                        {(poll.options || []).map((opt, idx) => {
                          const v = (poll.votes && poll.votes[idx]) ? poll.votes[idx] : 0;
                          const pct = total ? Math.round((v / total) * 100) : 0;
                          return (
                            <div key={idx} className="pollOptionRow">
                              {/* LEFT GROUP: option + bar + percentage (grouped together) */}
                              <div className="optionLeftGroup">
                                {/* 1. option label */}
                                <div className="optionLabel">{opt}</div>

                                {/* 2. progress bar */}
                                <div className="optionBarWrap">
                                  <div className="optionBar">
                                    <div className="optionFill" style={{ width: `${pct}%` }} />
                                  </div>
                                </div>

                                {/* 3. percentage next to bar */}
                                <div className="optionPercent">{pct}%</div>
                              </div>

                              {/* FAR RIGHT: number of votes */}
                              <div className="optionVotes">{v} votes</div>
                            </div>
                          );
                        })}
                      </div>
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
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList
            onChange={handleChange}
            sx={{ position: 'fixed', width: '100%', bgcolor: 'background.paper', zIndex: 1 }}
          >
            <Tab label="Poll Results" value="1" />
            <Tab label="Add Poll" value="2" />
          </TabList>
        </Box>

        <Container sx={{ marginTop: "3rem", marginBottom: "4rem" }}>
          <TabPanel value="1">
            <PollResults />
          </TabPanel>
          <TabPanel value="2">
            <Addpoll />
          </TabPanel>
        </Container>
      </TabContext>
    </Box>
  );
};

export default CreatePoll;
