import { useEffect, useState } from 'react';
import { Box, CircularProgress, Container, Paper, Stack, Tab, TextField, Typography } from '@mui/material';
import Popup from '../../components/Popup';
import { BlueButton } from '../../components/buttonStyles';
import { addStuff } from '../../redux/userRelated/userHandle';
import { useDispatch, useSelector } from 'react-redux';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { getAllComplains } from '../../redux/complainRelated/complainHandle';
import TableTemplate from '../../components/TableTemplate';


const StudentComplain = () => {
    const { complainsList, loading, cError, response } = useSelector((state) => state.complain);
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
            <Box
                sx={{
                    flex: '1 1 auto',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Box
                    sx={{
                        maxWidth: 550,
                        px: 3,
                        py: '100px',
                        width: '100%'
                    }}
                >
                    <div>
                        <Stack spacing={1} sx={{ mb: 3 }}>
                            <Typography variant="h4">Complain</Typography>
                        </Stack>
                        <form onSubmit={submitHandler}>
                            <Stack spacing={3}>
                                <TextField
                                    fullWidth
                                    label="Select Date"
                                    type="date"
                                    value={date}
                                    onChange={(event) => setDate(event.target.value)} required
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="Write your complain"
                                    variant="outlined"
                                    value={complaint}
                                    onChange={(event) => {
                                        setComplaint(event.target.value);
                                    }}
                                    required
                                    multiline
                                    maxRows={4}
                                />
                            </Stack>
                            <BlueButton
                                fullWidth
                                size="large"
                                sx={{ mt: 3 }}
                                variant="contained"
                                type="submit"
                                disabled={loader}
                            >
                                {loader ? <CircularProgress size={24} color="inherit" /> : "Add"}
                            </BlueButton>
                        </form>
                    </div>
                </Box>
            </Box>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
}
const ComplainButtonHaver = ()=>{
    return <>Pending</>
}
const CComplainButtonHaver = ()=>{
    return <>Completed</>
}
const Pcomplains = ()=>{
    const complainColumns = [
        { id: 'complaint', label: 'Complaint', minWidth: 100 },
        { id: 'date', label: 'Date', minWidth: 170 },
      ];
    console.log(complainsList, 'this is cList')
    const complainList = complainsList.filter((complain)=>{
      if(complain.status==='Pending')return true;
      return false; 
    })
    console.log(complainList, 'this is updated clist')
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
          {loading ?
            <div>Loading...</div>
            :
            <>
              {response ?
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                  No Complains Right Now
                </Box>
                :
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                  {Array.isArray(complainsList) && complainsList.length > 0 &&
                    <TableTemplate buttonHaver={ComplainButtonHaver} columns={complainColumns} rows={complainRows} />
                  }
                </Paper>
              }
            </>
          }
        </>
      );
    }
    const Ccomplains = ()=>{
        const complainColumns = [
            { id: 'complaint', label: 'Complaint', minWidth: 100 },
            { id: 'date', label: 'Date', minWidth: 170 },
          ];
        console.log(complainsList, 'this is cList')
        const complainList = complainsList.filter((complain)=>{
          if(complain.status==='Completed')return true;
          return false; 
        })
        console.log(complainList, 'this is updated clist')
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
          {loading ?
            <div>Loading...</div>
            :
            <>
              {response ?
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                  No Complains Right Now
                </Box>
                :
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                  {Array.isArray(complainsList) && complainsList.length > 0 &&
                    <TableTemplate buttonHaver={CComplainButtonHaver} columns={complainColumns} rows={complainRows} />
                  }
                </Paper>
              }
            </>
          }
        </>
      );
}

return (
    <>
         {loading ? (
            <div>Loading...</div>
        ) : (
            <>
                <Box sx={{ width: '100%', typography: 'body1', }} >
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} sx={{ position: 'fixed', width: '100%', bgcolor: 'background.paper', zIndex: 1 }}>
                                <Tab label="Pending Complains" value="1" />
                                <Tab label="Completed Complains" value="2" />
                                <Tab label="New Complain" value="3" />
                            </TabList>
                        </Box>
                        <Container sx={{ marginTop: "3rem", marginBottom: "4rem" }}>
                            <TabPanel value="1">
                                <Pcomplains />
                            </TabPanel>
                            <TabPanel value="2">
                                <Ccomplains />
                            </TabPanel>
                            <TabPanel value="3">
                                <CreateComplain />
                            </TabPanel>
                        </Container>
                    </TabContext>
                </Box>
            </>
        )}
        <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} /> 
    </>
);
};

export default StudentComplain;