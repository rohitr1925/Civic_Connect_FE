import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  Dialog, DialogActions, DialogContent,
  DialogTitle, TextField
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { getSubjectList } from '../redux/sclassRelated/sclassHandle';
import { useDispatch, useSelector } from 'react-redux';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CivicCalendar = () => {
  const [events, setEvents] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: new Date(),
    end: new Date()
  });


  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);
  const { subjectsList } = useSelector((state) => state.sclass);

  // Fetch subjects on mount
  useEffect(() => {
    if (currentUser?._id) {
      dispatch(getSubjectList(currentUser._id,currentUser.role, "AllSubjects"));
    }
  }, [currentUser._id, currentUser.role,dispatch]);

  // Convert subjectsList to calendar events
  useEffect(() => {
    if (Array.isArray(subjectsList)) {
      const transformed = subjectsList.map(subject => ({
        title: `${subject.subName} (${subject.subCode}) - ${subject.sclassName?.sclassName || 'No Community'}`,
        start: new Date(subject.startDate),
        end: new Date(subject.endDate),
        allDay: false,
      }));
      setEvents(transformed);
    }
  }, [subjectsList]);


  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        <h2>Civic Event Calendar</h2>
        {/* <Button variant="contained" onClick={() => setOpenModal(true)}>Add Event</Button> */}
      </div>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />

      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Add New Event</DialogTitle>
        <DialogContent>
          <TextField
            label="Event Title"
            fullWidth
            margin="dense"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          />
          <DateTimePicker
            label="Start Date"
            value={newEvent.start}
            onChange={(date) => setNewEvent({ ...newEvent, start: date })}
            renderInput={(params) => <TextField fullWidth margin="dense" {...params} />}
          />
          <DateTimePicker
            label="End Date"
            value={newEvent.end}
            onChange={(date) => setNewEvent({ ...newEvent, end: date })}
            renderInput={(params) => <TextField fullWidth margin="dense" {...params} />}
          />
        </DialogContent>
        <DialogActions>
          {/* Buttons if needed */}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CivicCalendar;
