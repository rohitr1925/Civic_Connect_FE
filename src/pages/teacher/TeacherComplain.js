import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper, Box, Checkbox
} from '@mui/material';
import { getAllComplains } from '../../redux/complainRelated/complainHandle';
import { updateComplain } from '../../redux/userRelated/userHandle';
import TableTemplate from '../../components/TableTemplate';

const TeacherComplain = () => {

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };  const dispatch = useDispatch();
  const { complainsList, loading, error, response } = useSelector((state) => state.complain);
  const { currentUser } = useSelector(state => state.user)
  console.log(complainsList,'this is clist')
  // const [loader, setLoader] = useState(false);
  const address = 'UpdateComplain'
  useEffect(() => {
    dispatch(getAllComplains(currentUser._id, "teacher","Complain"));
  }, [currentUser._id, dispatch]);

  const handleCheckboxChange = (complaintId, event) => {
      // event.preventDefault();
      // setLoader(true);
      console.log(event,'this is event')
      dispatch(updateComplain({complaintId}, address));
      window.location.reload(); 

    };
  console.log(currentUser,'this is userDetails')
    // useEffect(() => {
    // dispatch(updateComplains())
    // }, [status, navigate, error, response, dispatch]);

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
  const complainRows = complainList && complainList.length > 0 && complainList.map((complain) => {
    const date = new Date(complain.date);
    const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
    return {
      user: complain.userDetails?.name,
      complaint: complain.complaint,
      date: dateString,
      id: complain._id,
    };
  });
  
  //   const isChecked = event.target.checked;
  //   console.log(`Complain ID: ${complainId}, Checked: ${isChecked}`);

  //   try {
  //     const response = await fetch(`/api/complains/${complainId}`, {
  //       method: 'PUT', // or POST/DELETE based on your API design
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ resolved: isChecked }),
  //     });

  //     if (response.ok) {
  //       console.log("Status updated successfully");
  //     } else {
  //       console.error("Failed to update status");
  //     }
  //   } catch (error) {
  //     console.error("Error updating status:", error);
  //   }
  // };

  const ComplainButtonHaver = ({ row }) => {
    return (
      <>
        <Checkbox {...label} onChange={(event) => handleCheckboxChange(row.id, event)} 
        />
      </>
    );
  };

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
                <TableTemplate buttonHaver={null} columns={complainColumns} rows={complainRows} />
              }
            </Paper>
          }
        </>
      }
    </>
  );
};

export default TeacherComplain;