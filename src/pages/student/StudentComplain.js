import { useEffect, useState } from 'react';
import { Box, CircularProgress, Paper, Stack, Tab, TextField, Typography, Card, Chip, Fade } from '@mui/material';
import Popup from '../../components/Popup';
import { BlueButton } from '../../components/buttonStyles';
import { addStuff } from '../../redux/userRelated/userHandle';
import { useDispatch, useSelector } from 'react-redux';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { getAllComplains } from '../../redux/complainRelated/complainHandle';
import TableTemplate from '../../components/TableTemplate';
import FeedbackIcon from '@mui/icons-material/Feedback';
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DescriptionIcon from '@mui/icons-material/Description';


const StudentComplain = () => {
    const { complainsList, loading, response } = useSelector((state) => state.complain);
    const [complaint, setComplaint] = useState("");
    const [date, setDate] = useState("");
    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const dispatch = useDispatch()

    const { status, currentUser, error } = useSelector(state => state.user);
    // const {pendingComplains} = useSelector(state => state.user);
    const user = currentUser._id
    const school = currentUser.school._id
    const address = "Complain"

    const [loader, setLoader] = useState(false)
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const fields = {
        user,
        date,
        complaint,
        school,
    };

    const submitHandler = (event) => {
        event.preventDefault()
        setLoader(true)
        dispatch(addStuff(fields, address))
    };

    useEffect(() => {
        if (status === "added") {
            setLoader(false)
            setShowPopup(true)
            setMessage("Done Successfully")
        }
        else if (error) {
            setLoader(false)
            setShowPopup(true)
            setMessage("Network Error")
        }
        // dispatch()
        // dispatch()
    }, [status, error])

    useEffect(() => {
        dispatch(getAllComplains(currentUser._id, 'student',"Complain"));
      }, [currentUser._id, dispatch]);
    
    console.log(complainsList, 'this is cslist in student')
    const CreateComplain=()=>{
    return (
        <>
            <Box sx={{ maxWidth:700, mx:'auto' }}>
                <Card sx={{ 
                    p:4, 
                    background:'#f8fafc', 
                    borderRadius:'16px', 
                    border:'2px solid #e2e8f0',
                    boxShadow:'0 4px 12px rgba(0,0,0,0.05)'
                }}>
                    <Box sx={{ display:'flex', alignItems:'center', gap:2, mb:3 }}>
                        <Box sx={{
                            width:48,
                            height:48,
                            borderRadius:'12px',
                            background:'linear-gradient(135deg, #0a78ff 0%, #07b389 100%)',
                            display:'flex',
                            alignItems:'center',
                            justifyContent:'center',
                            color:'#fff'
                        }}>
                            <DescriptionIcon sx={{ fontSize:'1.5rem' }} />
                        </Box>
                        <Box>
                            <Typography sx={{ fontFamily:'Inter,sans-serif', fontWeight:900, fontSize:'1.5rem', color:'#1a202c', letterSpacing:'-0.6px' }}>
                                Submit New Complain
                            </Typography>
                            <Typography sx={{ fontFamily:'Inter,sans-serif', fontWeight:600, fontSize:'.75rem', color:'#64748b' }}>
                                Share your concerns with us
                            </Typography>
                        </Box>
                    </Box>
                    
                    <form onSubmit={submitHandler}>
                        <Stack spacing={3}>
                            <Box>
                                <Typography sx={{ fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:'.75rem', color:'#475569', mb:1, display:'flex', alignItems:'center', gap:.5 }}>
                                    <CalendarTodayIcon sx={{ fontSize:'.95rem' }} /> Select Date
                                </Typography>
                                <TextField
                                    fullWidth
                                    type="date"
                                    value={date}
                                    onChange={(event) => setDate(event.target.value)} 
                                    required
                                    InputLabelProps={{ shrink: true }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            background:'#fff',
                                            borderRadius:'12px',
                                            fontFamily:'Inter,sans-serif',
                                            '& fieldset': { borderColor:'#e2e8f0', borderWidth:'2px' },
                                            '&:hover fieldset': { borderColor:'#0a78ff' },
                                            '&.Mui-focused fieldset': { borderColor:'#0a78ff' }
                                        }
                                    }}
                                />
                            </Box>
                            <Box>
                                <Typography sx={{ fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:'.75rem', color:'#475569', mb:1, display:'flex', alignItems:'center', gap:.5 }}>
                                    <DescriptionIcon sx={{ fontSize:'.95rem' }} /> Write Your Complain
                                </Typography>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    value={complaint}
                                    onChange={(event) => { setComplaint(event.target.value); }}
                                    required
                                    multiline
                                    rows={6}
                                    placeholder="Please describe your concern in detail..."
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            background:'#fff',
                                            borderRadius:'12px',
                                            fontFamily:'Inter,sans-serif',
                                            '& fieldset': { borderColor:'#e2e8f0', borderWidth:'2px' },
                                            '&:hover fieldset': { borderColor:'#0a78ff' },
                                            '&.Mui-focused fieldset': { borderColor:'#0a78ff' }
                                        }
                                    }}
                                />
                            </Box>
                        </Stack>
                        <BlueButton
                            fullWidth
                            size="large"
                            sx={{ 
                                mt: 3,
                                py:1.5,
                                borderRadius:'12px',
                                fontFamily:'Inter,sans-serif',
                                fontWeight:700,
                                fontSize:'.9rem',
                                textTransform:'none',
                                background:'linear-gradient(135deg, #0a78ff 0%, #07b389 100%)',
                                boxShadow:'0 8px 20px -4px rgba(10,120,255,.4)',
                                '&:hover': {
                                    boxShadow:'0 12px 28px -4px rgba(10,120,255,.5)',
                                    transform:'translateY(-2px)'
                                }
                            }}
                            variant="contained"
                            type="submit"
                            disabled={loader}
                        >
                            {loader ? <CircularProgress size={24} color="inherit" /> : "Submit Complain"}
                        </BlueButton>
                    </form>
                </Card>
            </Box>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
}
const ComplainButtonHaver = ()=>{
    return (
        <Chip 
            label="Pending" 
            size="small"
            icon={<PendingIcon />}
            sx={{ 
                background:'rgba(245,158,11,0.15)',
                color:'#f59e0b',
                fontFamily:'Inter,sans-serif',
                fontWeight:700,
                fontSize:'.7rem',
                border:'1px solid rgba(245,158,11,0.3)',
                '& .MuiChip-icon': { color:'#f59e0b' }
            }} 
        />
    );
}
const CComplainButtonHaver = ()=>{
    return (
        <Chip 
            label="Completed" 
            size="small"
            icon={<CheckCircleIcon />}
            sx={{ 
                background:'rgba(7,179,137,0.15)',
                color:'#07b389',
                fontFamily:'Inter,sans-serif',
                fontWeight:700,
                fontSize:'.7rem',
                border:'1px solid rgba(7,179,137,0.3)',
                '& .MuiChip-icon': { color:'#07b389' }
            }} 
        />
    );
}
const Pcomplains = ()=>{
    const complainColumns = [
        { id: 'complaint', label: 'Complaint', minWidth: 100 },
        { id: 'date', label: 'Date', minWidth: 170 },
      ];
    const complainList = complainsList.filter((complain)=>{
      if(complain.status==='Pending')return true;
      return false; 
    })
      const complainRows = complainList && complainList.length > 0 && complainList.map((complain) => {
        const date = new Date(complain.date);
        const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
        return {
          complaint: complain.complaint,
          date: dateString,
          id: complain._id,
        };
      });
      return (
        <>
          {loading ? (
            <Box sx={{ display:'flex', justifyContent:'center', py:4 }}>
                <CircularProgress sx={{ color:'#0a78ff' }} />
            </Box>
          ) : (
            <>
              {response || complainList.length === 0 ? (
                <Fade in timeout={500}>
                    <Box sx={{ 
                        textAlign:'center', 
                        py:8, 
                        px:3,
                        background:'#f8fafc',
                        borderRadius:'16px',
                        border:'2px solid #e2e8f0'
                    }}>
                        <Box sx={{
                            width:80,
                            height:80,
                            borderRadius:'50%',
                            background:'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                            display:'flex',
                            alignItems:'center',
                            justifyContent:'center',
                            mx:'auto',
                            mb:2,
                            color:'#fff'
                        }}>
                            <PendingIcon sx={{ fontSize:'2.5rem' }} />
                        </Box>
                        <Typography sx={{ fontFamily:'Inter,sans-serif', fontSize:'1.5rem', fontWeight:900, letterSpacing:'-0.7px', mb:1, color:'#1a202c' }}>
                            No Pending Complains
                        </Typography>
                        <Typography sx={{ fontFamily:'Inter,sans-serif', fontSize:'.9rem', fontWeight:600, color:'#64748b' }}>
                            You don't have any pending complains right now
                        </Typography>
                    </Box>
                </Fade>
              ) : (
                <Paper elevation={0} sx={{ 
                    width: '100%', 
                    overflow: 'hidden',
                    borderRadius:'16px',
                    border:'2px solid #e2e8f0'
                }}>
                  {Array.isArray(complainsList) && complainsList.length > 0 &&
                    <TableTemplate buttonHaver={ComplainButtonHaver} columns={complainColumns} rows={complainRows} />
                  }
                </Paper>
              )}
            </>
          )}
        </>
      );
    }
    const Ccomplains = ()=>{
        const complainColumns = [
            { id: 'complaint', label: 'Complaint', minWidth: 100 },
            { id: 'date', label: 'Date', minWidth: 170 },
          ];
        const complainList = complainsList.filter((complain)=>{
          if(complain.status==='Completed')return true;
          return false; 
        })
          const complainRows = complainList && complainList.length > 0 && complainList.map((complain) => {
            const date = new Date(complain.date);
            const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
            return {
              complaint: complain.complaint,
              date: dateString,
              id: complain._id,
            };
          });
      
    return (
        <>
          {loading ? (
            <Box sx={{ display:'flex', justifyContent:'center', py:4 }}>
                <CircularProgress sx={{ color:'#0a78ff' }} />
            </Box>
          ) : (
            <>
              {response || complainList.length === 0 ? (
                <Fade in timeout={500}>
                    <Box sx={{ 
                        textAlign:'center', 
                        py:8, 
                        px:3,
                        background:'#f8fafc',
                        borderRadius:'16px',
                        border:'2px solid #e2e8f0'
                    }}>
                        <Box sx={{
                            width:80,
                            height:80,
                            borderRadius:'50%',
                            background:'linear-gradient(135deg, #07b389 0%, #0ec6a9 100%)',
                            display:'flex',
                            alignItems:'center',
                            justifyContent:'center',
                            mx:'auto',
                            mb:2,
                            color:'#fff'
                        }}>
                            <CheckCircleIcon sx={{ fontSize:'2.5rem' }} />
                        </Box>
                        <Typography sx={{ fontFamily:'Inter,sans-serif', fontSize:'1.5rem', fontWeight:900, letterSpacing:'-0.7px', mb:1, color:'#1a202c' }}>
                            No Completed Complains
                        </Typography>
                        <Typography sx={{ fontFamily:'Inter,sans-serif', fontSize:'.9rem', fontWeight:600, color:'#64748b' }}>
                            You don't have any resolved complains yet
                        </Typography>
                    </Box>
                </Fade>
              ) : (
                <Paper elevation={0} sx={{ 
                    width: '100%', 
                    overflow: 'hidden',
                    borderRadius:'16px',
                    border:'2px solid #e2e8f0'
                }}>
                  {Array.isArray(complainsList) && complainsList.length > 0 &&
                    <TableTemplate buttonHaver={CComplainButtonHaver} columns={complainColumns} rows={complainRows} />
                  }
                </Paper>
              )}
            </>
          )}
        </>
      );
}

return (
    <>
         {loading ? (
            <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'40vh', flexDirection:'column', gap:2 }}>
                <CircularProgress size={60} thickness={4} sx={{ color:'#0a78ff' }} />
                <Typography sx={{ fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:'.9rem', color:'#64748b' }}>Loading complains...</Typography>
            </Box>
        ) : (
            <>
                <Box sx={{ minHeight:'100vh', background:'#f8fafc', pb:4 }}>
                    <Paper elevation={0} sx={{ 
                        maxWidth:'1400px', 
                        width:'100%', 
                        mx:'auto', 
                        background:'#ffffff', 
                        borderRadius:'20px', 
                        border:'2px solid #e2e8f0', 
                        boxShadow:'0 2px 8px rgba(30,45,60,0.06)', 
                        overflow:'hidden' 
                    }}>
                        {/* Header */}
                        <Box sx={{ p:3, background:'linear-gradient(135deg, #fafcff 0%, #f5f9ff 100%)', borderBottom:'2px solid #e2e8f0' }}>
                            <Box sx={{ display:'flex', alignItems:'center', gap:2, flexWrap:'wrap' }}>
                                <Box sx={{
                                    width:68,
                                    height:68,
                                    borderRadius:'18px',
                                    background:'linear-gradient(135deg, #0a78ff 0%, #07b389 100%)',
                                    display:'flex',
                                    alignItems:'center',
                                    justifyContent:'center',
                                    color:'#ffffff',
                                    boxShadow:'0 10px 30px -8px rgba(10,120,255,.45)',
                                    flexShrink:0
                                }}>
                                    <FeedbackIcon sx={{ fontSize:'2rem' }} />
                                </Box>
                                <Box sx={{ flex:1, minWidth:'220px' }}>
                                    <Typography sx={{ 
                                        fontFamily:'Inter,sans-serif', 
                                        fontWeight:900, 
                                        fontSize:'2rem', 
                                        color:'#1a202c', 
                                        letterSpacing:'-0.8px', 
                                        lineHeight:1.1, 
                                        mb:0.5 
                                    }}>Complain Management</Typography>
                                    <Typography sx={{ 
                                        fontFamily:'Inter,sans-serif', 
                                        fontWeight:700, 
                                        fontSize:'.8rem', 
                                        color:'#4a5568', 
                                        letterSpacing:'1.1px', 
                                        textTransform:'uppercase' 
                                    }}>Submit & Track Your Concerns</Typography>
                                </Box>
                                <Box sx={{
                                    display:'flex',
                                    alignItems:'center',
                                    gap:3
                                }}>
                                    <Box sx={{ textAlign:'center' }}>
                                        <Typography sx={{ fontFamily:'Inter,sans-serif', fontSize:'.65rem', fontWeight:700, color:'#64748b', textTransform:'uppercase', letterSpacing:'.6px' }}>Pending</Typography>
                                        <Typography sx={{ fontFamily:'Inter,sans-serif', fontSize:'1.5rem', fontWeight:900, color:'#f59e0b', letterSpacing:'-0.5px' }}>
                                            {complainsList.filter(c => c.status === 'Pending').length}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ textAlign:'center' }}>
                                        <Typography sx={{ fontFamily:'Inter,sans-serif', fontSize:'.65rem', fontWeight:700, color:'#64748b', textTransform:'uppercase', letterSpacing:'.6px' }}>Resolved</Typography>
                                        <Typography sx={{ fontFamily:'Inter,sans-serif', fontSize:'1.5rem', fontWeight:900, color:'#07b389', letterSpacing:'-0.5px' }}>
                                            {complainsList.filter(c => c.status === 'Completed').length}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                        {/* Tabs */}
                        <Box sx={{ width: '100%' }}>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: '#e2e8f0', background:'#fafafa' }}>
                                    <TabList 
                                        onChange={handleChange} 
                                        sx={{ 
                                            px:3,
                                            '& .MuiTab-root': {
                                                fontFamily:'Inter,sans-serif',
                                                fontWeight:700,
                                                fontSize:'.8rem',
                                                textTransform:'none',
                                                minHeight:'56px',
                                                color:'#64748b',
                                                '&.Mui-selected': {
                                                    color:'#0a78ff'
                                                }
                                            },
                                            '& .MuiTabs-indicator': {
                                                height:'3px',
                                                borderRadius:'3px 3px 0 0',
                                                background:'linear-gradient(90deg, #0a78ff 0%, #07b389 100%)'
                                            }
                                        }}
                                    >
                                        <Tab icon={<PendingIcon />} iconPosition="start" label="Pending Complains" value="1" />
                                        <Tab icon={<CheckCircleIcon />} iconPosition="start" label="Completed Complains" value="2" />
                                        <Tab icon={<AddCircleOutlineIcon />} iconPosition="start" label="New Complain" value="3" />
                                    </TabList>
                                </Box>
                                <Box sx={{ p:4 }}>
                                    <TabPanel value="1" sx={{ p:0 }}>
                                        <Pcomplains />
                                    </TabPanel>
                                    <TabPanel value="2" sx={{ p:0 }}>
                                        <Ccomplains />
                                    </TabPanel>
                                    <TabPanel value="3" sx={{ p:0 }}>
                                        <CreateComplain />
                                    </TabPanel>
                                </Box>
                            </TabContext>
                        </Box>
                    </Paper>
                </Box>
            </>
        )}
        <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} /> 
    </>
);
};

export default StudentComplain;