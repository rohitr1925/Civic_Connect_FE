import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentDetails } from '../../../redux/studentRelated/studentHandle';
import { Box, Fade, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import GroupsIcon from '@mui/icons-material/Groups';
import EmailIcon from '@mui/icons-material/Email';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { BlueButton, PurpleButton } from '../../../components/buttonStyles';

const StudentDetails = () => {
  const navigate = useNavigate();
  const { id: studentID } = useParams();
  const dispatch = useDispatch();
  const { loading, studentDetails, error } = useSelector((state) => state.student);

  useEffect(() => {
    dispatch(getStudentDetails(studentID));
  }, [dispatch, studentID]);

  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
      :root{
        --bg-soft:#f3f6fa;
        --panel-bg:#ffffff;
        --border:#e2e8f0;
        --text-dark:#1a202c;
        --text-mid:#4a5568;
        --text-light:#718096;
        --primary:#0a78ff;
        --accent:#07b389;
        --radius-lg:20px;
        --shadow-sm:0 2px 8px rgba(30,45,60,0.06);
        --shadow-md:0 4px 16px rgba(25,40,60,0.08);
        --shadow-lg:0 8px 28px rgba(25,40,60,0.12);
      }
      *{font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;box-sizing:border-box;}

      .detailsPageWrap{
        background:linear-gradient(135deg,#f0f7ff 0%, #e8f2ff 50%, #f3f6fa 100%) fixed;
        min-height:100vh;
        padding:2rem 1.5rem;
      }
      .detailsContainer{max-width:900px;margin:0 auto;}
      .detailsPanel{
        background:var(--panel-bg);
        border:1px solid var(--border);
        border-radius:var(--radius-lg);
        box-shadow:var(--shadow-lg);
        overflow:hidden;
        animation:slideUp .5s cubic-bezier(0.16, 1, 0.3, 1);
      }
      @keyframes slideUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}

      .detailsHeader{
        position:relative;
        background:linear-gradient(135deg,#fafcff 0%, #f5f9ff 100%);
        padding:2.5rem 2.5rem 1.5rem;
        border-bottom:1px solid var(--border);
        text-align:center;
      }
      .backButton{
        position:absolute;top:1.5rem;left:1.5rem;
        background:#f9fbfc;border:1px solid var(--border);
        width:40px;height:40px;border-radius:12px;
        display:flex;align-items:center;justify-content:center;
        cursor:pointer;transition:.2s;color:var(--text-mid);
      }
      .backButton:hover{background:var(--primary);color:#fff;transform:translateX(-3px)}

      .detailsAvatarWrapper{
        width:120px;height:120px;border-radius:50%;
        background:linear-gradient(135deg,var(--primary),var(--accent));
        display:flex;align-items:center;justify-content:center;
        margin:0 auto 1.5rem;color:#fff;font-size:3rem;font-weight:900;
        box-shadow:0 12px 35px -10px rgba(10,120,255,.45);
        border:5px solid #fff;
      }
      .detailsName{font-size:2rem;font-weight:900;color:var(--text-dark);margin:0 0 .6rem;letter-spacing:-.7px;line-height:1.2;}
      .detailsRole{
        font-size:.85rem;color:var(--text-mid);font-weight:800;letter-spacing:.7px;text-transform:uppercase;
        background:linear-gradient(135deg,#e8f2ff,#f0f7ff);padding:.45rem 1rem;border-radius:10px;display:inline-block;
      }

      .detailsBody{padding:2.2rem}
      .detailsGrid{display:grid;gap:1.2rem}
      .detailsInfoCard{
        background:linear-gradient(135deg,#f9fbfe 0%, #f3f7fc 100%);
        border:1px solid var(--border);
        border-radius:16px;
        padding:1.4rem;
        display:flex;align-items:center;gap:1rem;
        transition:all .25s ease;
      }
      .detailsInfoCard:hover{transform:translateY(-4px);box-shadow:var(--shadow-md);border-color:var(--primary)}
      .detailsInfoIcon{
        width:52px;height:52px;border-radius:14px;
        background:linear-gradient(135deg,#e8f2ff,#f0f7ff);
        display:flex;align-items:center;justify-content:center;
        color:var(--primary);flex-shrink:0;font-size:1.35rem;
      }
      .detailsInfoLabel{
        font-size:.72rem;color:var(--text-light);font-weight:800;text-transform:uppercase;letter-spacing:.8px;margin-bottom:.25rem;
      }
      .detailsInfoValue{
        font-size:1.02rem;color:var(--text-dark);font-weight:800;letter-spacing:-.25px;
        overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
      }

      .actionsBar{
        margin-top:1.6rem;
        display:flex;gap:.8rem;flex-wrap:wrap;justify-content:center;
        padding:1rem;background:#fafcfe;border:1px solid var(--border);border-radius:14px;
      }
      .actionsBar .MuiButton-root{
        height:40px;border-radius:12px;font-weight:800;
      }

      .loadingContainer{display:flex;align-items:center;justify-content:center;min-height:60vh;}
      .loadingSpinner{
        width:52px;height:52px;border:5px solid #e5edf4;border-top:5px solid var(--primary);border-radius:50%;
        animation:spin .85s linear infinite;
      }
      @keyframes spin{to{transform:rotate(360deg)}}

      @media(max-width:768px){
        .detailsPageWrap{padding:1.5rem 1rem}
        .detailsHeader{padding:2rem 1.5rem 1.2rem}
        .detailsBody{padding:1.8rem 1.2rem}
        .detailsName{font-size:1.6rem}
        .detailsAvatarWrapper{width:100px;height:100px;font-size:2.5rem}
        .backButton{top:1.2rem;left:1.2rem}
      }
    `;
    document.head.appendChild(styleEl);
    return () => styleEl.remove();
  }, []);

  if (error) console.log(error);

  if (loading) {
    return (
      <Box className="loadingContainer">
        <Box className="loadingSpinner" />
      </Box>
    );
  }

  const initial = studentDetails?.name?.[0]?.toUpperCase() || 'C';
  const communityName =
    studentDetails?.sclassName?.sclassName ||
    studentDetails?.sclassName ||
    studentDetails?.classDetails?.sclassName ||
    'N/A';

  return (
    <Box className="detailsPageWrap">
      <Box className="detailsContainer">
        <Fade in timeout={500}>
          <Box className="detailsPanel">
            <Box className="detailsHeader">
              <button className="backButton" onClick={() => navigate(-1)} aria-label="Go back">
                <ArrowBackIcon />
              </button>

              <div className="detailsAvatarWrapper">{initial}</div>
              <h1 className="detailsName">{studentDetails?.name || 'Citizen'}</h1>
              <span className="detailsRole">Citizen Details</span>
            </Box>

            <Box className="detailsBody">
              <div className="detailsGrid">
                <div className="detailsInfoCard">
                  <div className="detailsInfoIcon"><PersonIcon /></div>
                  <div>
                    <p className="detailsInfoLabel">Full Name</p>
                    <p className="detailsInfoValue">{studentDetails?.name || 'N/A'}</p>
                  </div>
                </div>

                <div className="detailsInfoCard">
                  <div className="detailsInfoIcon"><BadgeIcon /></div>
                  <div>
                    <p className="detailsInfoLabel">Citizen ID</p>
                    <p className="detailsInfoValue">{studentDetails?.rollNum || 'N/A'}</p>
                  </div>
                </div>

                <div className="detailsInfoCard">
                  <div className="detailsInfoIcon"><GroupsIcon /></div>
                  <div>
                    <p className="detailsInfoLabel">Community</p>
                    <p className="detailsInfoValue">{communityName}</p>
                  </div>
                </div>

                <div className="detailsInfoCard">
                  <div className="detailsInfoIcon"><EmailIcon /></div>
                  <div>
                    <p className="detailsInfoLabel">Email</p>
                    <p className="detailsInfoValue" title={studentDetails?.email || ''}>
                      {studentDetails?.email || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="actionsBar">
                <BlueButton
                  variant="contained"
                  startIcon={<FactCheckIcon />}
                  onClick={() => navigate(`/Admin/students/student/attendance/${studentID}`)}
                >
                  Take Attendance
                </BlueButton>
                <PurpleButton
                  variant="contained"
                  startIcon={<EmojiEventsIcon />}
                  onClick={() => navigate(`/Admin/students/student/marks/${studentID}`)}
                >
                  Provide Marks
                </PurpleButton>
              </div>
            </Box>
          </Box>
        </Fade>
      </Box>
    </Box>
  );
};

export default StudentDetails;