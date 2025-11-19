import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCommunityPolls, updatePoll } from '../../redux/sclassRelated/sclassHandle';
import { createPoll } from '../../redux/userRelated/userHandle';
import { underControl } from '../../redux/userRelated/userSlice';
import { Box, Paper, Typography, TextField, Button, IconButton, Tooltip, Fade, RadioGroup, Radio, FormControlLabel, InputAdornment } from '@mui/material';
import PollIcon from '@mui/icons-material/Poll';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import EventIcon from '@mui/icons-material/Event';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

// Leader (Teacher) Polls Page: lists community polls and allows creating new ones scoped to the community

const TeacherPolls = () => {
  const dispatch = useDispatch();
  const { currentUser, status, error, response } = useSelector(state => state.user);
  const { pollsList } = useSelector(state => state.sclass);

  const teacherID = currentUser?._id;
  const communityID = currentUser?.teachSclass?._id || currentUser?.classDetails?._id;

  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['','']);
  const [expiryDate, setExpiryDate] = useState('');
  const [selectedOptions, setSelectedOptions] = useState({});
  const [creating, setCreating] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (teacherID && communityID) {
      dispatch(getAllCommunityPolls(teacherID, communityID, 'Polls'));
    }
  }, [dispatch, teacherID, communityID]);

  useEffect(() => {
    if (status === 'added') {
      dispatch(underControl());
      setCreating(false);
      setQuestion('');
      setOptions(['','']);
      setExpiryDate('');
      setSubmitting(false);
      if (teacherID && communityID) {
        dispatch(getAllCommunityPolls(teacherID, communityID, 'Polls'));
      }
    } else if (status === 'failed') {
      setMessage(response);
      setSubmitting(false);
    } else if (status === 'error') {
      setMessage('Network Error');
      setSubmitting(false);
    }
  }, [status, response, error, dispatch, teacherID, communityID]);

  const addOptionField = () => setOptions(prev => [...prev, '']);
  const updateOption = (i, v) => {
    const next = [...options];
    next[i] = v;
    setOptions(next);
  };
  const removeOption = (i) => {
    const next = options.filter((_, idx) => idx !== i);
    setOptions(next.length ? next : ['']);
  };

  const validOptions = options.filter(o => o.trim() !== '');
  const canSubmit = question.trim().length > 5 && validOptions.length >= 2 && expiryDate && !submitting && communityID;

  const submitPoll = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    const fields = {
      question: question.trim(),
      options: validOptions,
      expiryDate: new Date(expiryDate).toISOString(),
      sclassName: communityID,
      adminID: teacherID,
    };
    dispatch(createPoll(fields, 'Poll'));
  };

  const handleVoteOption = (pollId, idx) => setSelectedOptions(prev => ({ ...prev, [pollId]: idx }));
  const submitVote = (pollId) => {
    const chosen = selectedOptions[pollId];
    if (typeof chosen === 'undefined') return;
    dispatch(updatePoll({ pollID: pollId, userID: teacherID, option: chosen }, 'Pollvote'));
    setTimeout(() => dispatch(getAllCommunityPolls(teacherID, communityID, 'Polls')), 500);
  };

  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      .tpWrap{min-height:100vh;padding:1.4rem 1rem;background:#f1f5f9;font-family:Inter, sans-serif;}
      .tpPanel{max-width:1240px;margin:0 auto;background:#fff;border:2px solid #e2e8f0;border-radius:20px;box-shadow:0 4px 16px rgba(30,41,59,.08);overflow:hidden;}
      .tpHeader{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;padding:1.5rem 2rem;background:linear-gradient(135deg,#0a78ff,#07b389);color:#fff;}
      .tpTitle{font-size:1.7rem;font-weight:900;letter-spacing:-.7px;margin:0;}
      .tpSub{font-size:.7rem;font-weight:700;letter-spacing:.8px;text-transform:uppercase;opacity:.9;margin-top:.3rem;}
      .tpContent{padding:1.8rem 2rem 2.3rem;background:#fafcfe;}
      .pollCard{border:1px solid #e2e8f0;border-radius:16px;margin-bottom:1.2rem;overflow:hidden;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.05);}
      .pollHead{display:flex;align-items:center;justify-content:space-between;padding:1rem 1.2rem;background:linear-gradient(135deg,#f8fbff,#eef5ff);}
      .pollQ{font-weight:700;font-size:1.05rem;color:#1e293b;margin:0;flex:1;}
      .pollStatus{font-size:.65rem;font-weight:700;letter-spacing:.8px;text-transform:uppercase;padding:.35rem .7rem;border-radius:10px;background:#e2e8f0;color:#334155;}
      .voteSection{padding:.9rem 1.1rem 1.2rem;}
      .voteRow{display:flex;align-items:center;justify-content:space-between;padding:.5rem .6rem .5rem .8rem;border:1px solid #e2e8f0;border-radius:10px;margin-bottom:.55rem;}
      .voteRow:last-child{margin-bottom:0;}
      .voteLabel{font-size:.82rem;font-weight:600;color:#334155;}
      .resultBar{height:10px;background:#e2e8f0;border-radius:6px;overflow:hidden;margin-left:.8rem;flex:1;}
      .resultFill{height:100%;background:linear-gradient(90deg,#0a78ff,#07b389);transition:width .5s;}
      .percent{font-size:.7rem;font-weight:700;color:#0f172a;margin-left:.8rem;}
      .votesTag{font-size:.65rem;font-weight:600;color:#64748b;margin-left:.8rem;}
      .addBtn{background:rgba(255,255,255,.25);color:#fff;text-transform:none;font-weight:700;border-radius:12px;}
      .addBtn:hover{background:rgba(255,255,255,.4);}
      .createForm{border:2px dashed #cbd5e1;border-radius:16px;padding:1.4rem 1.4rem;margin-bottom:1.6rem;background:#f8fafc;}
      .optRow{display:flex;align-items:center;gap:.6rem;margin-bottom:.6rem;}
      .removeOpt{color:#dc2626;}
      .formActions{display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap;margin-top:1rem;}
      .smallNote{font-size:.65rem;font-weight:600;color:#64748b;letter-spacing:.6px;text-transform:uppercase;}
      .errorMsg{font-size:.7rem;font-weight:600;color:#dc2626;margin-top:.4rem;}
    `;
    document.head.appendChild(styleEl);return()=>styleEl.remove();
  }, []);

  const totalVotes = poll => (poll.votes || []).reduce((a,b)=>a+(b||0),0);

  return (
    <Box className='tpWrap'>
      <Fade in timeout={400}>
        <Box className='tpPanel'>
          <Box className='tpHeader'>
            <Box>
              <Typography className='tpTitle'>Community Polls</Typography>
              <Typography className='tpSub'>Create & Manage Polls</Typography>
            </Box>
            <Tooltip title={creating? 'Close form':'Create Poll'} arrow>
              <Button onClick={()=>{setCreating(p=>!p); setMessage('');}} startIcon={creating?<CloseIcon/>:<AddCircleOutlineIcon/>} className='addBtn' variant='contained'>
                {creating? 'Cancel':'Add Poll'}
              </Button>
            </Tooltip>
          </Box>
          <Box className='tpContent'>
            {creating && (
              <form onSubmit={submitPoll} className='createForm'>
                <TextField label='Question' fullWidth value={question} onChange={e=>setQuestion(e.target.value)} onBlur={()=>setTouched(t=>({...t,question:true}))} error={touched.question && question.trim().length<6} helperText={touched.question && question.trim().length<6? 'Min 6 characters':''} sx={{ mb:2 }} />
                <TextField type='date' label='Expiry Date' value={expiryDate} onChange={e=>setExpiryDate(e.target.value)} InputLabelProps={{ shrink:true }} sx={{ mb:2 }} fullWidth InputProps={{ startAdornment:<InputAdornment position='start'><EventIcon/></InputAdornment> }} />
                <Typography variant='subtitle2' sx={{ fontWeight:700, mb:1 }}>Options</Typography>
                {options.map((opt,i)=>(
                  <Box key={i} className='optRow'>
                    <TextField size='small' label={`Option ${i+1}`} value={opt} onChange={e=>updateOption(i,e.target.value)} fullWidth />
                    {options.length>2 && (
                      <IconButton className='removeOpt' onClick={()=>removeOption(i)}><DeleteOutlineIcon/></IconButton>
                    )}
                  </Box>
                ))}
                <Button onClick={addOptionField} size='small' sx={{ textTransform:'none', fontWeight:700, mb:1 }}>Add Option</Button>
                {!canSubmit && touched.question && <Typography className='errorMsg'>Provide question, 2+ options and expiry.</Typography>}
                {message && <Typography className='errorMsg'>{message}</Typography>}
                <Box className='formActions'>
                  <Typography className='smallNote'>Community limited poll</Typography>
                  <Button type='submit' disabled={!canSubmit} variant='contained' sx={{ textTransform:'none', fontWeight:700, borderRadius:'12px', background:'linear-gradient(135deg,#0a78ff,#07b389)' }}>
                    {submitting? 'Submitting...':'Create Poll'}
                  </Button>
                </Box>
              </form>
            )}

            {pollsList && pollsList.length>0 ? pollsList.map(poll=>{
              const total = totalVotes(poll);
              const hasVoted = poll.isVoted;
              return (
                <Paper key={poll._id} className='pollCard' elevation={0}>
                  <Box className='pollHead'>
                    <Typography className='pollQ'>{poll.question}</Typography>
                    <Box className='pollStatus'>{hasVoted? 'Voted':'Vote Now'}</Box>
                  </Box>
                  <Box className='voteSection'>
                    {hasVoted ? (
                      poll.options.map((opt,idx)=>{
                        const v = (poll.votes && poll.votes[idx])? poll.votes[idx]:0;
                        const pct = total? Math.round((v/total)*100):0;
                        return (
                          <Box key={idx} className='voteRow'>
                            <Typography className='voteLabel'>{opt}</Typography>
                            <Box sx={{ display:'flex', alignItems:'center', flex:1, ml:1 }}>
                              <Box className='resultBar'><Box className='resultFill' style={{ width:`${pct}%` }}/></Box>
                              <Typography className='percent'>{pct}%</Typography>
                              <Typography className='votesTag'>{v} votes</Typography>
                            </Box>
                          </Box>
                        );
                      })
                    ) : (
                      <Box>
                        <RadioGroup value={selectedOptions[poll._id] ?? ''} onChange={e=>handleVoteOption(poll._id, parseInt(e.target.value))} sx={{ mb:1 }}>
                          {poll.options.map((opt,idx)=>(
                            <FormControlLabel key={idx} value={idx} control={<Radio/>} label={opt} />
                          ))}
                        </RadioGroup>
                        <Button disabled={typeof selectedOptions[poll._id]==='undefined'} onClick={()=>submitVote(poll._id)} variant='contained' sx={{ textTransform:'none', fontWeight:700, borderRadius:'10px', background:'linear-gradient(135deg,#0a78ff,#07b389)' }}>Submit Vote</Button>
                      </Box>
                    )}
                  </Box>
                </Paper>
              );
            }) : (
              <Typography sx={{ textAlign:'center', py:8, fontWeight:600, color:'#64748b' }}>No polls in this community yet.</Typography>
            )}
          </Box>
        </Box>
      </Fade>
    </Box>
  );
};

export default TeacherPolls;
