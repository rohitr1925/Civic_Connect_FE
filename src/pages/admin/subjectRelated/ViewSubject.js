import React, { useEffect, useState, useMemo } from 'react';
import { getClassStudents, getSubjectDetails } from '../../../redux/sclassRelated/sclassHandle';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Tab,
  Container,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import { BlueButton, GreenButton, PurpleButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import InsertChartIcon from '@mui/icons-material/InsertChart';
import TableChartIcon from '@mui/icons-material/TableChart';
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';
import CodeIcon from '@mui/icons-material/Code';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import TimerIcon from '@mui/icons-material/Timer';
import { format } from 'date-fns';

const ViewSubject = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { subloading, subjectDetails, sclassStudents, getresponse, error } = useSelector((state) => state.sclass);

  const { classID, subjectID } = params;

  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
      :root{
        --bg-soft:#eef4fb;
        --panel-bg:#ffffff;
        --border:#e2e8f0;
        --text-dark:#1a202c;
        --text-mid:#4a5568;
        --text-light:#718096;
        --primary:#0a78ff;
        --primary-dark:#065dca;
        --accent:#07b389;
        --radius-lg:20px;
        --shadow-sm:0 2px 8px rgba(30,45,60,0.06);
        --shadow-md:0 4px 16px rgba(25,40,60,0.08);
        --shadow-lg:0 8px 28px rgba(25,40,60,0.12);
      }
      *{font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;box-sizing:border-box;}
      .eventPageWrap{
        background:linear-gradient(135deg,#f0f7ff 0%,#e8f2ff 55%,#f3f6fa 100%) fixed;
        min-height:100vh;
        padding:2rem 1.4rem;
      }
      .eventPanel{
        max-width:1150px;
        margin:0 auto;
        background:var(--panel-bg);
        border:1px solid var(--border);
        border-radius:var(--radius-lg);
        box-shadow:var(--shadow-lg);
        animation:fadeUp .55s cubic-bezier(.16,1,.3,1);
        overflow:hidden;
      }
      @keyframes fadeUp{from{opacity:0;transform:translateY(42px)}to{opacity:1;transform:translateY(0)}}
      .tabsHeader{
        background:linear-gradient(135deg,#fafcff 0%,#f5f9ff 100%);
        border-bottom:1px solid var(--border);
        position:relative;
        padding-left:3.8rem;
      }
      .backMini{
        position:absolute;
        top:50%;left:1.2rem;transform:translateY(-50%);
        width:40px;height:40px;
        background:#f1f6fb;
        border:1px solid var(--border);
        border-radius:12px;
        display:flex;align-items:center;justify-content:center;
        cursor:pointer;
        transition:.25s;
        color:var(--text-mid);
      }
      .backMini:hover{background:var(--primary);color:#fff;box-shadow:0 8px 20px -6px rgba(10,120,255,.35);}
      .MuiTabs-flexContainer{gap:.35rem;}
      .MuiTab-root{
        font-weight:700;letter-spacing:.4px;text-transform:none;
        font-size:.85rem;padding:.9rem 1.35rem;
        border-radius:12px 12px 0 0;min-height:48px;
      }
      .MuiTab-root.Mui-selected{
        background:#fff;
        box-shadow:0 4px 14px -6px rgba(10,120,255,.35);
        color:var(--primary);
      }
      .eventDetailsHeader{
        text-align:center;
        padding:2.1rem 2rem 1.2rem;
        background:linear-gradient(135deg,#fafcff 0%,#f5f9ff 100%);
      }
      .eventIconBadge{
        width:95px;height:95px;border-radius:24px;
        background:linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
        display:flex;align-items:center;justify-content:center;
        margin:0 auto 1.5rem;
        color:#fff;font-size:2.6rem;font-weight:800;
        box-shadow:0 12px 35px rgba(79,70,229,0.4);
        transition: transform .3s ease;
      }
      .eventIconBadge:hover{
        transform: scale(1.05);
      }
      .eventTitle{margin:0;font-size:2.1rem;font-weight:900;letter-spacing:-.9px;color:var(--text-dark);line-height:1.2;}
      .eventSubtitle{margin:.6rem 0 0;font-size:.8rem;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--text-mid);}
      .statusChip{
        display:inline-flex;align-items:center;gap:7px;
        font-size:.7rem;font-weight:800;letter-spacing:.9px;text-transform:uppercase;
        padding:.5rem .85rem;border-radius:11px;margin-top:1.1rem;
        box-shadow: 0 3px 10px rgba(0,0,0,0.1);
      }
      .status-upcoming{background:linear-gradient(135deg, #fff3d1, #fffaeb);color:#7a5a00;border:1.5px solid #f5e2a2;}
      .status-ongoing{background:linear-gradient(135deg, #d9f8ff, #e8fbff);color:#046175;border:1.5px solid #bdeaf3;}
      .status-ended{background:linear-gradient(135deg, #ffe4e4, #fff0f0);color:#7a1e1e;border:1.5px solid #f5c7c7;}
      .summaryBar{
        display:grid;
        grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
        gap:1.2rem;
        padding:0 2rem 2.2rem;
      }
      .summaryItem{
        background:linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%);
        border:1px solid rgba(79,70,229,0.08);
        border-radius:18px;
        padding:1.3rem 1.2rem 1.1rem;
        display:flex;
        flex-direction:column;
        gap:.5rem;
        position:relative;
        overflow:hidden;
        transition:all .3s ease;
        box-shadow: 0 3px 12px rgba(0,0,0,0.06);
      }
      .summaryItem::before{
        content:'';
        position:absolute;
        top:0;
        right:0;
        width:80px;
        height:80px;
        background: radial-gradient(circle, rgba(79,70,229,0.05) 0%, transparent 70%);
        border-radius:50%;
        transform:translate(30%,-30%);
      }
      .summaryItem:hover{
        transform:translateY(-5px);
        box-shadow: 0 8px 24px rgba(0,0,0,0.12);
        border-color:rgba(79,70,229,0.15);
      }
      .summaryLabel{
        font-size:.62rem;
        font-weight:800;
        letter-spacing:1px;
        text-transform:uppercase;
        color:var(--text-light);
        position:relative;
        z-index:1;
      }
      .summaryValue{
        font-size:1.15rem;
        font-weight:800;
        letter-spacing:-.4px;
        color:var(--text-dark);
        position:relative;
        z-index:1;
      }
      .progressWrap{margin-top:.4rem;position:relative;z-index:1;}
      .progressTrack{
        height:9px;border-radius:7px;
        background:#e8edf5;
        overflow:hidden;
        position:relative;
        box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
      }
      .progressFill{
        height:100%;
        background:linear-gradient(90deg, #4f46e5, #7c3aed);
        width:0;
        transition:width .8s cubic-bezier(.4,0,.2,1);
        box-shadow: 0 2px 8px rgba(79,70,229,0.3);
      }
      .detailsGrid{
        display:grid;gap:1.5rem;
        grid-template-columns:repeat(auto-fit,minmax(240px,1fr));
        padding:.6rem 2rem 2.2rem;
      }
      .detailCard{
        background:linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%);
        border:1px solid rgba(79,70,229,0.08);
        border-radius:18px;
        padding:1.3rem 1.3rem 1.15rem;
        display:flex;flex-direction:column;gap:.6rem;
        position:relative;overflow:hidden;
        transition:all .35s cubic-bezier(.4,0,.2,1);
        opacity:0;animation:cardFade .65s forwards;
        box-shadow: 0 3px 12px rgba(0,0,0,0.06);
      }
      @keyframes cardFade{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
      .detailCard::before{
        content:'';position:absolute;top:0;left:0;right:0;height:4px;
        background:linear-gradient(90deg, #4f46e5, #7c3aed);
        opacity:0;transition:.35s;
      }
      .detailCard:hover{
        transform:translateY(-7px);
        box-shadow:0 16px 34px rgba(79,70,229,0.18);
        border-color:rgba(79,70,229,0.2);
      }
      .detailCard:hover::before{opacity:1;}
      .detailIcon{
        width:48px;height:48px;border-radius:15px;
        background:linear-gradient(135deg, #e8f2ff, #dce8ff);
        display:flex;align-items:center;justify-content:center;
        color:#4f46e5;font-size:1.4rem;
        box-shadow:0 4px 12px rgba(79,70,229,0.15);
      }
      .detailLabel{
        font-size:.65rem;
        font-weight:800;
        letter-spacing:1px;
        text-transform:uppercase;
        color:var(--text-light);
        margin-top:.25rem;
      }
      .detailValue{
        font-size:1rem;
        font-weight:800;
        letter-spacing:-.3px;
        color:var(--text-dark);
        line-height:1.35;
        word-break:break-word;
      }
      .attendeesBadge{
        display:inline-flex;align-items:center;gap:7px;
        background:linear-gradient(135deg, #e6fff7, #f0fff9);
        color:#056c50;
        font-size:.72rem;font-weight:700;letter-spacing:.7px;
        padding:.5rem .85rem;border-radius:11px;text-transform:uppercase;
        border:1.5px solid #c3f2e4;margin-top:.6rem;
        box-shadow: 0 2px 8px rgba(5,108,80,0.1);
      }

      /* Top tools bar shared */
      .citizensSectionTitle{
        font-size:1.2rem;
        font-weight:800;
        letter-spacing:-.4px;
        margin:0 0 1.2rem;
        color:var(--text-dark);
      }
      .citizensToolsBar{
        display:flex;flex-wrap:wrap;gap:1.1rem;align-items:center;justify-content:space-between;
        margin-bottom:1.4rem;
        background:linear-gradient(135deg, #fafcff, #f5f9ff);
        border:1px solid rgba(79,70,229,0.08);
        padding:1.1rem 1.3rem;
        border-radius:18px;
        box-shadow: 0 3px 12px rgba(0,0,0,0.06);
      }
      .toolsSide{display:flex;gap:.9rem;align-items:center;}
      .barSpacer{flex:1 1 auto;}

      .citizensSearchField .MuiOutlinedInput-root{
        border-radius:14px;
        background:#f9fbfc;
        font-size:.88rem;
        font-weight:500;
        border:1.5px solid #e2e8f0;
        transition:.2s;
      }
      .citizensSearchField .MuiOutlinedInput-root:hover{
        background:#fff;
        border-color:rgba(79,70,229,0.2);
      }
      .citizensSearchField .MuiOutlinedInput-root.Mui-focused{
        background:#fff;
        border-color:#4f46e5;
        box-shadow:0 0 0 3px rgba(79,70,229,0.15);
      }
      .toggleGroup{
        background:#fff;
        border:1.5px solid rgba(79,70,229,0.08);
        border-radius:14px;
        padding:5px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.04);
      }
      .toggleGroup .MuiToggleButton-root{
        font-size:.72rem;
        font-weight:700;
        letter-spacing:.9px;
        text-transform:uppercase;
        padding:.6rem 1rem;
        border-radius:10px;
        color:var(--text-mid);
        border:none;
      }
      .toggleGroup .MuiToggleButton-root.Mui-selected{
        background:linear-gradient(135deg, #4f46e5, #7c3aed);
        color:#fff;
        box-shadow: 0 3px 10px rgba(79,70,229,0.25);
      }

      /* Citizens tab table card and table beautify */
      .citizensTableCard{
        background:#fff;
        border:1px solid rgba(79,70,229,0.08);
        border-radius:18px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.08);
        overflow:hidden;
      }
      /* Keep both tables aligned perfectly */
      .citizensTableCard table{
        table-layout:fixed;
        width:100%;
      }
      .citizensTableCard thead th,
      .citizensTableCard tbody td{
        padding:13px 17px;
      }
      /* Column widths: 1) ID fixed, 2) Name fluid, 3) Actions/Status fixed */
      .citizensTableCard thead th:nth-of-type(1),
      .citizensTableCard tbody td:nth-of-type(1){ width:160px; text-align:center; }
      .citizensTableCard thead th:nth-of-type(3),
      .citizensTableCard tbody td:nth-of-type(3){ width:220px; text-align:center; }

      /* Truncate text for non-action columns to avoid wrap differences */
      .citizensTableCard .MuiTableCell-root:not(:last-child){
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
      }

      .citizensTableCard .MuiTableContainer-root{border-radius:0;}
      .citizensTableCard .MuiTableHead-root .MuiTableCell-head{
        background:linear-gradient(135deg, #f8fbff 0%, #f0f7ff 100%);
        font-weight:800;
        letter-spacing:.7px;
        color:var(--text-mid);
        text-transform:uppercase;
        border-bottom:2px solid rgba(79,70,229,0.1);
        font-size:.75rem;
      }
      .citizensTableCard .MuiTableBody-root .MuiTableRow-root:nth-of-type(odd){
        background:#fcfdff;
      }
      .citizensTableCard .MuiTableBody-root .MuiTableRow-root:hover{
        background:linear-gradient(135deg, #fafcff 0%, #f8fbff 100%);
        box-shadow: 0 2px 8px rgba(0,0,0,0.04);
      }
      .citizensTableCard .MuiTableCell-root{
        border-bottom:1px solid rgba(79,70,229,0.05);
        vertical-align:middle;
      }
      .citizensTableCard .cellActions{
        display:flex;
        justify-content:center;
        align-items:center;
        gap:.7rem;
      }
      .citizensTableCard .cellActionBtn{
        border-radius:11px;
        padding:.4rem .8rem;
        min-width:86px;
        font-weight:800;
      }
      .citizensTableCard .MuiButton-root{
        height:38px;
        border-radius:11px;
        font-weight:800;
      }
      .citizensTableCard .cellStatus{
        display:flex;
        justify-content:center;
        align-items:center;
        font-weight:800;
        letter-spacing:.3px;
      }

      /* Ensure buttons consistent in bars */
      .citizensToolsBar .MuiButton-root{
        height:42px;
        border-radius:13px;
        font-weight:800;
        box-shadow: 0 3px 10px rgba(0,0,0,0.1);
      }
      .primaryBtn{
        padding:.65rem 1.2rem !important;
        border-radius:13px !important;
        font-weight:800 !important;
      }

      .emptySmall{
        text-align:center;
        padding:4rem 2.5rem;
        border:2px dashed rgba(79,70,229,0.15);
        border-radius:18px;
        background:linear-gradient(135deg, #fafcff, #f8fbff);
      }
      .bottomSpace{height:60px;}
      @media(max-width:768px){
        .eventPageWrap{padding:1.35rem 1rem;}
        .eventTitle{font-size:1.55rem;}
        .eventIconBadge{width:78px;height:78px;font-size:2rem;}
        .summaryBar{padding:0 1.4rem 1.7rem;}
        .detailsGrid{padding:.4rem 1.4rem 1.8rem;}
        .citizensToolsBar{flex-direction:column;align-items:stretch;}
        .toolsSide{justify-content:space-between;}
      }
    `;
    document.head.appendChild(styleEl);
    return () => styleEl.remove();
  }, []);

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, 'Subject'));
    dispatch(getClassStudents(classID, 'classID'));
  }, [dispatch, subjectID, classID]);

  if (error) console.log(error);

  const [value, setValue] = useState('1');
  const [sectionMode, setSectionMode] = useState('attendance');
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (_, newValue) => setValue(newValue);
  const handleSectionMode = (_, newMode) => newMode && setSectionMode(newMode);

  // Align table columns definition to match CSS
  const studentColumns = [
    { id: 'rollNum', label: 'Citizen ID', minWidth: 160, align: 'center' },
    { id: 'name', label: 'Name', minWidth: 300, align: 'left' }
  ];

  const filteredStudents = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return sclassStudents.filter(st =>
      st.name?.toLowerCase().includes(term) ||
      String(st.rollNum)?.toLowerCase().includes(term)
    );
  }, [sclassStudents, searchTerm]);

  const studentRows = filteredStudents.map((student) => ({
    rollNum: student.rollNum,
    name: student.name,
    id: student._id
  }));

  const StudentsAttendanceButtonHaver = ({ row }) => {
    const present = subjectDetails?.attendees?.includes(row.id);
    return (
      <Typography
        className="cellStatus"
        color={present ? 'green' : 'red'}
        sx={{ fontWeight: 800 }}
      >
        {present ? 'Present' : 'Absent'}
      </Typography>
    );
  };

  const StudentsMarksButtonHaver = ({ row }) => (
    <Box className="cellActions">
      <BlueButton
        variant="contained"
        onClick={() => navigate(`/Admin/citizens/citizen/${row.id}`)}
        className="cellActionBtn"
        sx={{ minWidth: 86 }}
      >
        View
      </BlueButton>
      <PurpleButton
        variant="contained"
        onClick={() => navigate(`/Admin/subject/student/marks/${row.id}/${subjectID}`)}
        className="cellActionBtn"
        sx={{ minWidth: 110 }}
      >
        Score
      </PurpleButton>
    </Box>
  );

  const status = useMemo(() => {
    const now = Date.now();
    const start = subjectDetails?.startDate ? new Date(subjectDetails.startDate).getTime() : null;
    const end = subjectDetails?.endDate ? new Date(subjectDetails.endDate).getTime() : null;
    if (start && end) {
      if (now < start) return 'upcoming';
      if (now >= start && now <= end) return 'ongoing';
      if (now > end) return 'ended';
    }
    return 'upcoming';
  }, [subjectDetails]);

  // Add progress calc after status
  const progress = useMemo(() => {
    const start = subjectDetails?.startDate ? new Date(subjectDetails.startDate).getTime() : null;
    const end = subjectDetails?.endDate ? new Date(subjectDetails.endDate).getTime() : null;
    if (!start || !end) return 0;
    const now = Date.now();
    if (now <= start) return 0;
    if (now >= end) return 100;
    return Math.min(100, Math.max(0, ((now - start) / (end - start)) * 100));
  }, [subjectDetails]);

  const EventDetailsSection = () => {
    const details = [
      { icon: <EventIcon />, label: 'Event Name', value: subjectDetails?.subName },
      { icon: <CodeIcon />, label: 'Event Code', value: subjectDetails?.subCode },
      {
        icon: <CalendarMonthIcon />,
        label: 'Start Date',
        value: subjectDetails?.startDate ? format(new Date(subjectDetails.startDate), 'dd-MM-yyyy HH:mm') : 'N/A'
      },
      {
        icon: <AccessTimeIcon />,
        label: 'End Date',
        value: subjectDetails?.endDate ? format(new Date(subjectDetails.endDate), 'dd-MM-yyyy HH:mm') : 'N/A'
      },
      {
        icon: <HowToRegIcon />,
        label: 'Number of Attendees',
        value: subjectDetails?.attendees?.length || 0,
        badge: true
      },
      {
        icon: <GroupIcon />,
        label: 'Community Name',
        value: subjectDetails?.classDetails?.sclassName
      },
      {
        icon: <PersonIcon />,
        label: 'Community Leader',
        value: subjectDetails?.teacherDetails?.name
      }
    ];

    return (
      <>
        <div className="eventDetailsHeader">
          <div className="eventIconBadge">
            <EventIcon style={{ fontSize: '2rem' }} />
          </div>
          <h1 className="eventTitle">{subjectDetails?.subName || 'Event'}</h1>
          <p className="eventSubtitle">Event Details Overview</p>
          <span className={`statusChip status-${status}`}>
            <TimerIcon sx={{ fontSize: '1rem' }} />
            {status}
          </span>
        </div>

        <div className="summaryBar">
          <div className="summaryItem">
            <span className="summaryLabel">Progress</span>
            <span className="summaryValue">{progress.toFixed(0)}%</span>
            <div className="progressWrap">
              <div className="progressTrack">
                <div
                  className="progressFill"
                  style={{ width: progress + '%' }}
                />
              </div>
            </div>
          </div>
          <div className="summaryItem">
            <span className="summaryLabel">Attendees</span>
              <span className="summaryValue">{subjectDetails?.attendees?.length || 0}</span>
          </div>
          <div className="summaryItem">
            <span className="summaryLabel">Starts</span>
            <span className="summaryValue">
              {subjectDetails?.startDate ? format(new Date(subjectDetails.startDate), 'dd MMM yyyy') : 'N/A'}
            </span>
          </div>
          <div className="summaryItem">
            <span className="summaryLabel">Ends</span>
            <span className="summaryValue">
              {subjectDetails?.endDate ? format(new Date(subjectDetails.endDate), 'dd MMM yyyy') : 'N/A'}
            </span>
          </div>
        </div>

        <div className="detailsGrid">
          {details.map((d, i) => (
            <div className="detailCard" key={i} style={{ animationDelay: `${0.05 * i}s` }}>
              <div className="detailIcon">{d.icon}</div>
              <span className="detailLabel">{d.label}</span>
              <span className="detailValue">
                {d.value || 'N/A'}
                {d.badge && <span className="attendeesBadge">{d.value} Attending</span>}
              </span>
            </div>
          ))}
        </div>
      </>
    );
  };

  const SubjectStudentsSection = () => (
    <>
      {getresponse ? (
        <div className="citizensToolsBar" style={{ justifyContent: 'flex-end' }}>
          <div className="barSpacer" />
          <div className="toolsSide">
            <GreenButton
              variant="contained"
              className="primaryBtn"
              onClick={() => navigate(`/Admin/community/addcitizens/${classID}`)}
            >
              Add Citizens
            </GreenButton>
          </div>
        </div>
      ) : (
        <>
          <p className="citizensSectionTitle">Citizens</p>
          <div className="citizensToolsBar">
            <div className="toolsSide">
              <TextField
                placeholder="Search citizens..."
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="citizensSearchField"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#718096' }} />
                    </InputAdornment>
                  )
                }}
                sx={{ minWidth: 240 }}
              />
            </div>
            <div className="toolsSide">
              <ToggleButtonGroup
                value={sectionMode}
                exclusive
                onChange={handleSectionMode}
                className="toggleGroup"
              >
                <ToggleButton value="attendance">
                  <TableChartIcon sx={{ fontSize: '1rem', mr: .5 }} /> Attendance
                </ToggleButton>
                <ToggleButton value="marks">
                  <InsertChartIcon sx={{ fontSize: '1rem', mr: .5 }} /> Marks
                </ToggleButton>
              </ToggleButtonGroup>
              <GreenButton
                variant="contained"
                className="primaryBtn"
                onClick={() => navigate(`/Admin/community/addcitizens/${classID}`)}
              >
                Add Citizens
              </GreenButton>
            </div>
          </div>

          {filteredStudents.length === 0 ? (
            <div className="emptySmall">
              <SearchIcon style={{ fontSize: '2.2rem', color: '#0a78ff', opacity: .8 }} />
              <Typography sx={{ mt: 2, fontWeight: 700, letterSpacing: -.3 }}>
                No citizens match your search
              </Typography>
              <Typography sx={{ mt: .4, color: 'var(--text-light)', fontSize: '.85rem' }}>
                Try different keywords.
              </Typography>
            </div>
          ) : sectionMode === 'attendance' ? (
            <div className="citizensTableCard">
              <TableTemplate
                buttonHaver={StudentsAttendanceButtonHaver}
                columns={studentColumns}
                rows={studentRows}
              />
            </div>
          ) : (
            <div className="citizensTableCard">
              <TableTemplate
                buttonHaver={StudentsMarksButtonHaver}
                columns={studentColumns}
                rows={studentRows}
              />
            </div>
          )}

          <div className="bottomSpace" />
        </>
      )}
    </>
  );

  return (
    <>
      {subloading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <Box sx={{
            width: 52, height: 52, border: '5px solid #e5edf4',
            borderTop: '5px solid var(--primary)', borderRadius: '50%',
            animation: 'spin .85s linear infinite'
          }} />
        </Box>
      ) : (
        <div className="eventPageWrap">
          <div className="eventPanel">
            <TabContext value={value}>
              <Box className="tabsHeader">
                <button className="backMini" onClick={() => navigate(-1)} aria-label="Back">
                  <ArrowBackIcon />
                </button>
                <TabList onChange={handleChange} variant="scrollable" scrollButtons="auto">
                  <Tab label="Details" value="1" />
                  <Tab label="Citizens" value="2" />
                </TabList>
              </Box>
              <Container sx={{ pt: 3, pb: 3 }}>
                <TabPanel value="1" sx={{ p: 0 }}>
                  <EventDetailsSection />
                </TabPanel>
                <TabPanel value="2" sx={{ p: 0 }}>
                  <SubjectStudentsSection />
                </TabPanel>
              </Container>
            </TabContext>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewSubject;
