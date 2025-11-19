import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  Dialog, 
  DialogActions, 
  DialogContent,
  DialogTitle, 
  TextField,
  Box,
  Typography,
  CircularProgress
} from '@mui/material';
import { 
  Event as EventIcon,
  PlayCircle as OngoingIcon,
  Upcoming as UpcomingIcon,
  CalendarMonth as CalendarIcon,
  PushPin as PinIcon
} from '@mui/icons-material';
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
  const { subjectsList, loading } = useSelector((state) => state.sclass);

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

  // Calculate events this month
  const getEventsThisMonth = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
    }).length;
  };

  // Calculate ongoing events
  const getOngoingEvents = () => {
    const now = new Date();
    return events.filter(event => {
      const start = new Date(event.start);
      const end = new Date(event.end);
      return start <= now && end >= now;
    }).length;
  };

  // Calculate upcoming events
  const getUpcomingEvents = () => {
    const now = new Date();
    return events.filter(event => {
      const start = new Date(event.start);
      return start > now;
    }).length;
  };

  // Add custom styles
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
      
      * {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
      }

      .calendar-page-wrap {
        min-height: 100vh;
        background: linear-gradient(135deg, #f0f7ff 0%, #eaf4ff 100%);
        padding: 2.5rem 1.5rem;
      }

      .calendar-panel {
        max-width: 1320px;
        margin: 0 auto;
        background: #fff;
        border-radius: 24px;
        box-shadow: 0 8px 32px rgba(25, 40, 60, 0.12);
        border: 1px solid #e2e8f0;
        overflow: hidden;
        animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      }

      @keyframes slideUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .calendar-header {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 1.2rem;
        padding: 2rem 2.5rem;
        background: linear-gradient(135deg, #fcfdff, #f5f9ff);
        border-bottom: 1px solid #e2e8f0;
        position: relative;
      }

      .calendar-header::after {
        content: '';
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at 85% 15%, rgba(10, 120, 255, 0.08), transparent 70%);
        pointer-events: none;
      }

      .header-left {
        display: flex;
        align-items: center;
        gap: 1.2rem;
        position: relative;
        z-index: 1;
      }

      .header-icon {
        width: 62px;
        height: 62px;
        border-radius: 16px;
        background: linear-gradient(135deg, #0a78ff, #07b389);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 2rem;
        box-shadow: 0 10px 24px -8px rgba(10, 120, 255, 0.45);
      }

      .calendar-title {
        margin: 0;
        font-size: 1.85rem;
        font-weight: 900;
        letter-spacing: -0.8px;
        color: #1a202c;
        line-height: 1.2;
      }

      .calendar-subtitle {
        margin: 0.4rem 0 0;
        font-size: 0.74rem;
        font-weight: 700;
        letter-spacing: 0.7px;
        text-transform: uppercase;
        color: #4a5568;
        display: flex;
        align-items: center;
        gap: 0.45rem;
      }

      .stats-bar {
        padding: 1.4rem 2.5rem;
        border-bottom: 1px solid #e2e8f0;
        display: flex;
        flex-wrap: wrap;
        gap: 1.2rem;
        background: #fbfdff;
      }

      .stat-item {
        display: flex;
        align-items: center;
        gap: 0.9rem;
        padding: 0.95rem 1.4rem;
        background: #fff;
        border: 1px solid #e2e8f0;
        border-radius: 14px;
        transition: 0.25s;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      }

      .stat-item:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
        border-color: #e0e7ff;
      }

      .stat-icon {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        background: linear-gradient(135deg, #eef2ff, #e0e7ff);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #4f46e5;
        font-size: 1.5rem;
      }

      .stat-icon svg {
        font-size: 1.5rem;
      }

      .stat-label {
        font-size: 0.7rem;
        font-weight: 800;
        letter-spacing: 0.8px;
        text-transform: uppercase;
        color: #718096;
        margin: 0;
      }

      .stat-value {
        font-size: 1.25rem;
        font-weight: 900;
        letter-spacing: -0.5px;
        color: #1a202c;
        margin: 0;
      }

      .calendar-content {
        padding: 2rem 2.5rem 2.5rem;
      }

      .calendar-card {
        border: 1px solid #e2e8f0;
        border-radius: 18px;
        overflow: hidden;
        background: #fff;
        box-shadow: 0 4px 16px rgba(25, 40, 60, 0.08);
        padding: 1.5rem;
      }

      .loading-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 500px;
        flex-direction: column;
        gap: 1.5rem;
      }

      .loading-text {
        font-size: 1.2rem;
        font-weight: 700;
        color: #4a5568;
        letter-spacing: 0.5px;
      }

      /* Calendar Customization */
      .rbc-calendar {
        font-family: 'Inter', sans-serif !important;
      }

      .rbc-header {
        padding: 1rem 0.5rem;
        font-weight: 800;
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 0.8px;
        color: #4a5568;
        background: linear-gradient(135deg, #f2f7ff, #edf4fb);
        border-bottom: 2px solid #e3edf6 !important;
      }

      .rbc-today {
        background-color: #e8f2ff !important;
      }

      .rbc-off-range-bg {
        background: #fafcfe;
      }

      .rbc-event {
        background: linear-gradient(135deg, #0a78ff, #065dca) !important;
        border: none !important;
        border-radius: 6px !important;
        padding: 4px 8px !important;
        font-weight: 600 !important;
        font-size: 0.8rem !important;
        box-shadow: 0 2px 8px rgba(10, 120, 255, 0.3);
      }

      .rbc-event:hover {
        background: linear-gradient(135deg, #065dca, #054aa8) !important;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(10, 120, 255, 0.4);
      }

      .rbc-event-label {
        font-weight: 700 !important;
      }

      .rbc-date-cell {
        padding: 8px;
        font-weight: 600;
        color: #1a202c;
      }

      .rbc-month-view, .rbc-time-view {
        border: none !important;
        border-radius: 12px;
        overflow: hidden;
      }

      .rbc-month-row, .rbc-day-bg {
        border-color: #eef4f9 !important;
      }

      .rbc-toolbar {
        padding: 1.2rem 0;
        margin-bottom: 1.5rem;
        border-bottom: 2px solid #e2e8f0;
      }

      .rbc-toolbar button {
        font-weight: 700 !important;
        font-size: 0.85rem !important;
        padding: 0.6rem 1.2rem !important;
        border-radius: 10px !important;
        border: 1px solid #e2e8f0 !important;
        background: #fff !important;
        color: #4a5568 !important;
        transition: 0.2s !important;
      }

      .rbc-toolbar button:hover {
        background: #f6faff !important;
        border-color: #cbd5e0 !important;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      }

      .rbc-toolbar button.rbc-active {
        background: linear-gradient(135deg, #0a78ff, #065dca) !important;
        color: #fff !important;
        border-color: #0a78ff !important;
      }

      .rbc-toolbar-label {
        font-weight: 900 !important;
        font-size: 1.3rem !important;
        color: #1a202c;
        letter-spacing: -0.5px;
      }
    `;
    document.head.appendChild(styleEl);
    return () => document.head.removeChild(styleEl);
  }, []);


  return (
    <Box className="calendar-page-wrap">
      <Box className="calendar-panel">
        {/* Header Section */}
        <Box className="calendar-header">
          <Box className="header-left">
            <Box className="header-icon">
              <CalendarIcon sx={{ fontSize: '2rem' }} />
            </Box>
            <Box>
              <Typography className="calendar-title">
                Civic Event Calendar
              </Typography>
              <Typography className="calendar-subtitle">
                <PinIcon sx={{ fontSize: '0.9rem' }} /> Track & Manage Important Events
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Stats Bar */}
        {events && events.length > 0 && (
          <Box className="stats-bar">
            <Box className="stat-item">
              <Box className="stat-icon" style={{ background: 'linear-gradient(135deg, #e8f4ff, #f0f9ff)', color: '#0a78ff' }}>
                <EventIcon />
              </Box>
              <Box>
                <Typography className="stat-label">Events This Month</Typography>
                <Typography className="stat-value">{getEventsThisMonth()}</Typography>
              </Box>
            </Box>
            
            <Box className="stat-item">
              <Box className="stat-icon" style={{ background: 'linear-gradient(135deg, #e6faf6, #d4f5ef)', color: '#07b389' }}>
                <OngoingIcon />
              </Box>
              <Box>
                <Typography className="stat-label">Ongoing Events</Typography>
                <Typography className="stat-value">{getOngoingEvents()}</Typography>
              </Box>
            </Box>

            <Box className="stat-item">
              <Box className="stat-icon" style={{ background: 'linear-gradient(135deg, #e8f2ff, #d6ebff)', color: '#065dca' }}>
                <UpcomingIcon />
              </Box>
              <Box>
                <Typography className="stat-label">Upcoming Events</Typography>
                <Typography className="stat-value">{getUpcomingEvents()}</Typography>
              </Box>
            </Box>
          </Box>
        )}

        {/* Calendar Content */}
        <Box className="calendar-content">
          <Box className="calendar-card">
            {loading ? (
              <Box className="loading-wrap">
                <CircularProgress size={60} thickness={4} style={{ color: '#0a78ff' }} />
                <Typography className="loading-text">Loading calendar...</Typography>
              </Box>
            ) : (
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600 }}
              />
            )}
          </Box>
        </Box>
      </Box>

      {/* Modal Dialog */}
      <Dialog 
        open={openModal} 
        onClose={() => setOpenModal(false)}
        PaperProps={{
          style: {
            borderRadius: '16px',
            padding: '8px',
          }
        }}
      >
        <DialogTitle style={{ 
          fontWeight: 800, 
          fontSize: '1.4rem',
          color: '#1a202c'
        }}>
          Add New Event
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Event Title"
            fullWidth
            margin="dense"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
              }
            }}
          />
          <DateTimePicker
            label="Start Date"
            value={newEvent.start}
            onChange={(date) => setNewEvent({ ...newEvent, start: date })}
            renderInput={(params) => (
              <TextField 
                fullWidth 
                margin="dense" 
                {...params}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  }
                }}
              />
            )}
          />
          <DateTimePicker
            label="End Date"
            value={newEvent.end}
            onChange={(date) => setNewEvent({ ...newEvent, end: date })}
            renderInput={(params) => (
              <TextField 
                fullWidth 
                margin="dense" 
                {...params}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  }
                }}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          {/* Buttons if needed */}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CivicCalendar;
