import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Button, Dialog, DialogTitle, DialogContent, 
  DialogActions, TextField, Grid, Fade
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { editUserDetails } from '../../redux/userRelated/userHandle';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import CakeIcon from '@mui/icons-material/Cake';
import WcIcon from '@mui/icons-material/Wc';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import GroupsIcon from '@mui/icons-material/Groups';
import BusinessIcon from '@mui/icons-material/Business';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const StudentProfile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: currentUser.email || '',
    phone: currentUser.phone || '',
    address: currentUser.address || '',
    dateOfBirth: currentUser.dateOfBirth || '',
    gender: currentUser.gender || '',
    emergencyContact: currentUser.emergencyContact || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenDialog(false);
    dispatch(editUserDetails(currentUser._id, formData, 'Student'));
  };

  const sclassName = currentUser.sclassName;
  const studentSchool = currentUser.school;

  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
      
      :root {
        --bg-soft: #f8fafc;
        --panel-bg: #ffffff;
        --border: #e5e7eb;
        --text-dark: #0f172a;
        --text-mid: #334155;
        --text-light: #64748b;
        --primary: #0a78ff;
        --primary-dark: #0556d6;
        --accent: #07b389;
        --accent-light: #10b981;
        --purple: #8b5cf6;
        --radius-lg: 24px;
        --radius-md: 16px;
        --shadow-sm: 0 1px 3px rgba(0,0,0,0.05);
        --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
        --shadow-lg: 0 12px 40px rgba(0,0,0,0.12);
        --shadow-xl: 0 20px 60px rgba(0,0,0,0.15);
      }
      
      * {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
        box-sizing: border-box;
      }
      
      * {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
        box-sizing: border-box;
      }
      
      .profilePageWrap {
        background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 20%, #dbeafe 40%, #e0e7ff 60%, #ede9fe 80%, #fae8ff 100%);
        min-height: 100vh;
        padding: 2.5rem 1.5rem;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        position: relative;
        overflow: hidden;
      }
      
      .profilePageWrap::before {
        content: '';
        position: absolute;
        top: -50%;
        right: -20%;
        width: 700px;
        height: 700px;
        background: radial-gradient(circle, rgba(10,120,255,0.1) 0%, transparent 65%);
        border-radius: 50%;
        animation: float 18s ease-in-out infinite;
        filter: blur(40px);
      }
      
      .profilePageWrap::after {
        content: '';
        position: absolute;
        bottom: -30%;
        left: -15%;
        width: 600px;
        height: 600px;
        background: radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 65%);
        border-radius: 50%;
        animation: float 22s ease-in-out infinite reverse;
        filter: blur(40px);
      }
      
      @keyframes float {
        0%, 100% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(30px, -30px) scale(1.05); }
        66% { transform: translate(-20px, 20px) scale(0.95); }
      }
      
      .profileContainer {
        max-width: 700px;
        width: 100%;
        margin: 0 auto;
        position: relative;
        z-index: 1;
      }
      
      .profilePanel {
        background: var(--panel-bg);
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-xl);
        overflow: hidden;
        animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        position: relative;
      }
      
      .profilePanel::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, 
          #0a78ff 0%, 
          #3b82f6 20%, 
          #07b389 40%, 
          #10b981 60%, 
          #8b5cf6 80%, 
          #a78bfa 100%
        );
        background-size: 200% 100%;
        animation: gradientShift 8s ease infinite;
        z-index: 10;
      }
      
      @keyframes gradientShift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(50px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      .profileHeader {
        text-align: center;
        padding: 3.5rem 3rem 2.5rem;
        background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
        border-bottom: 1px solid var(--border);
        position: relative;
        overflow: hidden;
      }
      
      .profileHeader::before {
        content: '';
        position: absolute;
        top: -60%;
        left: 50%;
        transform: translateX(-50%);
        width: 500px;
        height: 500px;
        background: radial-gradient(circle, rgba(10,120,255,0.06) 0%, transparent 60%);
        pointer-events: none;
      }
      
      .profileAvatarWrap {
        position: relative;
        display: inline-block;
        margin-bottom: 1.8rem;
      }
      
      .profileAvatar {
        width: 130px;
        height: 130px;
        border-radius: 32px;
        background: linear-gradient(135deg, #0a78ff 0%, #3b82f6 50%, #07b389 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 3.5rem;
        font-weight: 900;
        box-shadow: 0 16px 48px rgba(10,120,255,0.35), 0 0 0 4px rgba(10,120,255,0.1);
        position: relative;
        z-index: 1;
        transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      
      .profileAvatar::before {
        content: '';
        position: absolute;
        inset: -8px;
        border-radius: 36px;
        background: linear-gradient(135deg, rgba(10,120,255,0.15), rgba(7,179,137,0.15));
        z-index: -1;
        animation: pulse 3s ease-in-out infinite;
      }
      
      @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.6; transform: scale(1.05); }
      }
      
      .profileAvatar:hover {
        transform: scale(1.08) rotate(3deg);
        box-shadow: 0 20px 60px rgba(10,120,255,0.45), 0 0 0 6px rgba(10,120,255,0.15);
      }
      
      .profileAvatarBadge {
        position: absolute;
        bottom: -10px;
        right: -10px;
        width: 52px;
        height: 52px;
        border-radius: 16px;
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 1.5rem;
        box-shadow: 0 8px 24px rgba(16,185,129,0.45);
        border: 5px solid #fff;
        z-index: 2;
        animation: bounceIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both;
      }
      
      @keyframes bounceIn {
        0% { opacity: 0; transform: scale(0) rotate(-180deg); }
        100% { opacity: 1; transform: scale(1) rotate(0deg); }
      }
      
      .profileTitle {
        margin: 0;
        font-size: 2.5rem;
        font-weight: 900;
        letter-spacing: -1.2px;
        background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        line-height: 1.2;
        position: relative;
        z-index: 1;
        text-shadow: 0 2px 8px rgba(0,0,0,0.05);
      }
      
      .profileSubtitle {
        margin: 0.8rem 0 0;
        font-size: 0.95rem;
        font-weight: 700;
        letter-spacing: 0.5px;
        color: var(--text-mid);
        position: relative;
        z-index: 1;
        opacity: 0.9;
      }
      
      .profileRoleBadge {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 0.75rem 1.5rem;
        border-radius: 14px;
        background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
        color: #0a78ff;
        font-size: 0.85rem;
        font-weight: 900;
        letter-spacing: 0.8px;
        text-transform: uppercase;
        margin-top: 1.5rem;
        box-shadow: 0 4px 16px rgba(10,120,255,0.2);
        border: 2px solid rgba(10,120,255,0.2);
        transition: all 0.3s ease;
      }
      
      .profileRoleBadge:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 24px rgba(10,120,255,0.3);
        border-color: rgba(10,120,255,0.3);
      }
      
      .profileContent {
        padding: 3rem 3rem 3.5rem;
        background: linear-gradient(180deg, #fafafa 0%, #ffffff 100%);
      }
      
      .profileSectionTitle {
        font-size: 1.05rem;
        font-weight: 900;
        letter-spacing: 1.2px;
        text-transform: uppercase;
        color: var(--text-light);
        margin: 0 0 2rem;
        padding-bottom: 1rem;
        border-bottom: 2px solid rgba(10,120,255,0.12);
        position: relative;
      }
      
      .profileSectionTitle::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 60px;
        height: 2px;
        background: linear-gradient(90deg, #0a78ff 0%, #07b389 100%);
        animation: expandLine 2s ease-in-out infinite;
      }
      
      @keyframes expandLine {
        0%, 100% { width: 60px; opacity: 1; }
        50% { width: 80px; opacity: 0.7; }
      }
      
      @keyframes rotateIcon {
        0%, 100% { transform: rotate(0deg) scale(1); }
        25% { transform: rotate(-5deg) scale(1.05); }
        50% { transform: rotate(0deg) scale(1); }
        75% { transform: rotate(5deg) scale(1.05); }
      }
      
      .profileInfoGrid {
        display: grid;
        gap: 1.5rem;
      }
      
      .profileInfoCard {
        background: linear-gradient(145deg, #ffffff 0%, #fafafa 100%);
        border: 1.5px solid rgba(10,120,255,0.1);
        border-radius: 20px;
        padding: 1.6rem 1.8rem;
        display: flex;
        align-items: center;
        gap: 1.4rem;
        position: relative;
        overflow: hidden;
        transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        box-shadow: var(--shadow-sm);
      }
      
      .profileInfoCard::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 120px;
        height: 120px;
        background: radial-gradient(circle, rgba(10,120,255,0.04) 0%, transparent 70%);
        border-radius: 50%;
        transform: translate(40%, -40%);
        transition: all 0.35s ease;
      }
      
      .profileInfoCard:hover {
        transform: translateY(-6px) scale(1.01);
        box-shadow: 0 12px 32px rgba(0,0,0,0.15);
        border-color: rgba(10,120,255,0.25);
      }
      
      .profileInfoCard:hover::before {
        transform: translate(30%, -30%) scale(1.3);
        opacity: 0.7;
      }
      
      .profileInfoIcon {
        width: 60px;
        height: 60px;
        border-radius: 18px;
        background: linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #0a78ff;
        font-size: 1.6rem;
        flex-shrink: 0;
        box-shadow: 0 6px 16px rgba(10,120,255,0.2);
        position: relative;
        z-index: 1;
        transition: all 0.3s ease;
      }
      
      .profileInfoCard:hover .profileInfoIcon {
        transform: scale(1.1) rotate(5deg);
        box-shadow: 0 8px 24px rgba(10,120,255,0.3);
      }
      
      .profileInfoContent {
        flex: 1;
        position: relative;
        z-index: 1;
      }
      
      .profileInfoLabel {
        font-size: 0.75rem;
        font-weight: 800;
        letter-spacing: 1.2px;
        text-transform: uppercase;
        color: var(--text-light);
        margin-bottom: 0.5rem;
        display: block;
      }
      
      .profileInfoValue {
        font-size: 1.1rem;
        font-weight: 900;
        letter-spacing: -0.4px;
        color: var(--text-dark);
        line-height: 1.4;
        word-break: break-word;
      }
      
      .profileStatsBar {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: 1.5rem;
        margin-top: 2.5rem;
        padding-top: 2.5rem;
        border-top: 2px solid rgba(10,120,255,0.12);
      }
      
      .profileStatCard {
        text-align: center;
        padding: 1.5rem 1.2rem;
        background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
        border: 1.5px solid rgba(139,92,246,0.12);
        border-radius: 18px;
        transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        box-shadow: var(--shadow-sm);
        position: relative;
        overflow: hidden;
      }
      
      .profileStatCard::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, rgba(139,92,246,0.03) 0%, transparent 100%);
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      .profileStatCard:hover {
        transform: translateY(-6px) scale(1.02);
        box-shadow: 0 12px 32px rgba(139,92,246,0.2);
        border-color: rgba(139,92,246,0.25);
      }
      
      .profileStatCard:hover::before {
        opacity: 1;
      }
      
      .profileStatIcon {
        width: 50px;
        height: 50px;
        border-radius: 14px;
        background: linear-gradient(135deg, #0a78ff 0%, #3b82f6 50%, #07b389 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 1.3rem;
        margin: 0 auto 1rem;
        box-shadow: 0 6px 16px rgba(10,120,255,0.35);
        transition: all 0.3s ease;
      }
      
      .profileStatCard:hover .profileStatIcon {
        transform: scale(1.15) rotate(10deg);
        box-shadow: 0 8px 24px rgba(10,120,255,0.5);
      }
      
      .profileStatLabel {
        font-size: 0.75rem;
        font-weight: 800;
        letter-spacing: 1px;
        text-transform: uppercase;
        color: var(--text-light);
        margin-bottom: 0.4rem;
      }
      
      .profileStatValue {
        font-size: 1.6rem;
        font-weight: 900;
        letter-spacing: -0.6px;
        background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .editBtn {
        margin-top: 1.5rem;
        padding: 0.85rem 2.2rem;
        background: linear-gradient(135deg, #0a78ff 0%, #3b82f6 50%, #07b389 100%);
        color: #fff;
        border: none;
        border-radius: 14px;
        font-weight: 900;
        font-size: 0.95rem;
        letter-spacing: 0.6px;
        text-transform: uppercase;
        box-shadow: 0 8px 24px rgba(10,120,255,0.4);
        cursor: pointer;
        transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        display: inline-flex;
        align-items: center;
        gap: 0.6rem;
        position: relative;
        overflow: hidden;
      }
      
      .editBtn::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 100%);
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      .editBtn::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%);
        transform: translateX(-100%);
        transition: transform 0.6s ease;
      }
      
      .editBtn:hover::before {
        opacity: 1;
      }
      
      .editBtn:hover::after {
        transform: translateX(100%);
      }
      
      .editBtn:hover {
        transform: translateY(-3px) scale(1.05);
        box-shadow: 0 12px 36px rgba(10,120,255,0.5);
      }
      
      .editBtn:active {
        transform: translateY(-1px) scale(1.02);
      }
      
      @media (max-width: 768px) {
        .profilePageWrap {
          padding: 1.5rem 1rem;
        }
        
        .profileHeader {
          padding: 2.5rem 1.5rem 2rem;
        }
        
        .profileAvatar {
          width: 110px;
          height: 110px;
          font-size: 2.8rem;
          border-radius: 28px;
        }
        
        .profileAvatarBadge {
          width: 44px;
          height: 44px;
          font-size: 1.2rem;
          border-radius: 14px;
        }
        
        .profileTitle {
          font-size: 2rem;
        }
        
        .profileContent {
          padding: 2rem 1.5rem 2.5rem;
        }
        
        .profileInfoCard {
          padding: 1.3rem 1.5rem;
        }
        
        .profileInfoIcon {
          width: 52px;
          height: 52px;
          font-size: 1.4rem;
        }
        
        .profileStatsBar {
          grid-template-columns: 1fr;
          gap: 1.2rem;
        }
      }
    `;
    document.head.appendChild(styleEl);
    return () => styleEl.remove();
  }, []);

  return (
    <Fade in timeout={600}>
      <div className="profilePageWrap">
        <div className="profileContainer">
          <div className="profilePanel">
            <div className="profileHeader">
              <div className="profileAvatarWrap">
                <div className="profileAvatar">
                  {String(currentUser.name).charAt(0)}
                </div>
                <div className="profileAvatarBadge">
                  <AccountCircleIcon style={{ fontSize: '1.3rem' }} />
                </div>
              </div>
              
              <h1 className="profileTitle">{currentUser.name}</h1>
              <p className="profileSubtitle">Citizen ID: {currentUser.rollNum}</p>
              
              <div className="profileRoleBadge">
                <AccountCircleIcon style={{ fontSize: '1rem' }} />
                Citizen
              </div>

              <button className="editBtn" onClick={() => setOpenDialog(true)}>
                <EditIcon style={{ fontSize: '1.1rem' }} />
                Edit Profile
              </button>
            </div>

            <div className="profileContent">
              <h3 className="profileSectionTitle">Personal Information</h3>
              
              <div className="profileInfoGrid">
                <div className="profileInfoCard">
                  <div className="profileInfoIcon">
                    <CakeIcon />
                  </div>
                  <div className="profileInfoContent">
                    <span className="profileInfoLabel">Date of Birth</span>
                    <div className="profileInfoValue">
                      {currentUser.dateOfBirth ? 
                        new Date(currentUser.dateOfBirth).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        }) 
                        : 'N/A'}
                    </div>
                  </div>
                </div>

                <div className="profileInfoCard">
                  <div className="profileInfoIcon">
                    <WcIcon />
                  </div>
                  <div className="profileInfoContent">
                    <span className="profileInfoLabel">Gender</span>
                    <div className="profileInfoValue">{currentUser.gender || 'N/A'}</div>
                  </div>
                </div>

                <div className="profileInfoCard">
                  <div className="profileInfoIcon">
                    <EmailIcon />
                  </div>
                  <div className="profileInfoContent">
                    <span className="profileInfoLabel">Email</span>
                    <div className="profileInfoValue">{currentUser.email || 'N/A'}</div>
                  </div>
                </div>

                <div className="profileInfoCard">
                  <div className="profileInfoIcon">
                    <PhoneIcon />
                  </div>
                  <div className="profileInfoContent">
                    <span className="profileInfoLabel">Phone</span>
                    <div className="profileInfoValue">{currentUser.phone || 'N/A'}</div>
                  </div>
                </div>

                <div className="profileInfoCard">
                  <div className="profileInfoIcon">
                    <HomeIcon />
                  </div>
                  <div className="profileInfoContent">
                    <span className="profileInfoLabel">Address</span>
                    <div className="profileInfoValue">{currentUser.address || 'N/A'}</div>
                  </div>
                </div>

                <div className="profileInfoCard">
                  <div className="profileInfoIcon">
                    <ContactPhoneIcon />
                  </div>
                  <div className="profileInfoContent">
                    <span className="profileInfoLabel">Emergency Contact</span>
                    <div className="profileInfoValue">{currentUser.emergencyContact || 'N/A'}</div>
                  </div>
                </div>
              </div>

              <div className="profileStatsBar">
                <div className="profileStatCard">
                  <div className="profileStatIcon">
                    <GroupsIcon />
                  </div>
                  <div className="profileStatLabel">Community</div>
                  <div className="profileStatValue">{sclassName.sclassName}</div>
                </div>
                
                <div className="profileStatCard">
                  <div className="profileStatIcon">
                    <BusinessIcon />
                  </div>
                  <div className="profileStatLabel">GEO ID</div>
                  <div className="profileStatValue">{studentSchool.schoolName}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Dialog */}
        <Dialog 
          open={openDialog} 
          onClose={() => setOpenDialog(false)} 
          maxWidth="sm" 
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: '24px',
              border: '2px solid #e5e7eb',
              boxShadow: '0 25px 70px -15px rgba(10,120,255,0.3)',
              overflow: 'hidden',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, #0a78ff 0%, #3b82f6 33%, #07b389 66%, #8b5cf6 100%)',
              }
            }
          }}
        >
          <DialogTitle sx={{ 
            fontWeight: 800, 
            color: '#0f172a',
            fontFamily: 'Inter, Roboto, sans-serif',
            fontSize: '1.5rem',
            borderBottom: '2px solid #e5e7eb',
            background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
            pb: 2.5,
            pt: 3
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{
                width: 48,
                height: 48,
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #0a78ff 0%, #07b389 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 6px 20px rgba(10,120,255,0.35)',
                animation: 'rotateIcon 3s ease-in-out infinite'
              }}>
                <EditIcon sx={{ color: '#fff', fontSize: '1.4rem' }} />
              </Box>
              <Box>
                <Typography sx={{ 
                  fontSize: '1.35rem', 
                  fontWeight: 900,
                  color: '#0f172a',
                  fontFamily: 'Inter, Roboto, sans-serif',
                  lineHeight: 1.2,
                  mb: 0.3
                }}>
                  Edit Profile
                </Typography>
                <Typography sx={{
                  fontSize: '0.85rem',
                  color: '#64748b',
                  fontWeight: 600,
                  fontFamily: 'Inter, Roboto, sans-serif'
                }}>
                  Update your personal information
                </Typography>
              </Box>
            </Box>
          </DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent sx={{ pt: 3, pb: 3, background: 'linear-gradient(180deg, #fafafa 0%, #ffffff 100%)' }}>
              <Grid container spacing={2.5}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        background: '#fff',
                        fontFamily: 'Inter, Roboto, sans-serif',
                        fontWeight: 600,
                        '& fieldset': {
                          borderColor: '#e2e8f0',
                          borderWidth: '2px'
                        },
                        '&:hover fieldset': {
                          borderColor: '#cbd5e0'
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#0a78ff'
                        }
                      },
                      '& .MuiInputLabel-root': {
                        fontFamily: 'Inter, Roboto, sans-serif',
                        fontWeight: 700
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        background: '#fff',
                        fontFamily: 'Inter, Roboto, sans-serif',
                        fontWeight: 600,
                        '& fieldset': {
                          borderColor: '#e2e8f0',
                          borderWidth: '2px'
                        },
                        '&:hover fieldset': {
                          borderColor: '#cbd5e0'
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#0a78ff'
                        }
                      },
                      '& .MuiInputLabel-root': {
                        fontFamily: 'Inter, Roboto, sans-serif',
                        fontWeight: 700
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        background: '#fff',
                        fontFamily: 'Inter, Roboto, sans-serif',
                        fontWeight: 600,
                        '& fieldset': {
                          borderColor: '#e2e8f0',
                          borderWidth: '2px'
                        },
                        '&:hover fieldset': {
                          borderColor: '#cbd5e0'
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#0a78ff'
                        }
                      },
                      '& .MuiInputLabel-root': {
                        fontFamily: 'Inter, Roboto, sans-serif',
                        fontWeight: 700
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        background: '#fff',
                        fontFamily: 'Inter, Roboto, sans-serif',
                        fontWeight: 600,
                        '& fieldset': {
                          borderColor: '#e2e8f0',
                          borderWidth: '2px'
                        },
                        '&:hover fieldset': {
                          borderColor: '#cbd5e0'
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#0a78ff'
                        }
                      },
                      '& .MuiInputLabel-root': {
                        fontFamily: 'Inter, Roboto, sans-serif',
                        fontWeight: 700
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        background: '#fff',
                        fontFamily: 'Inter, Roboto, sans-serif',
                        fontWeight: 600,
                        '& fieldset': {
                          borderColor: '#e2e8f0',
                          borderWidth: '2px'
                        },
                        '&:hover fieldset': {
                          borderColor: '#cbd5e0'
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#0a78ff'
                        }
                      },
                      '& .MuiInputLabel-root': {
                        fontFamily: 'Inter, Roboto, sans-serif',
                        fontWeight: 700
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        background: '#fff',
                        fontFamily: 'Inter, Roboto, sans-serif',
                        fontWeight: 600,
                        '& fieldset': {
                          borderColor: '#e2e8f0',
                          borderWidth: '2px'
                        },
                        '&:hover fieldset': {
                          borderColor: '#cbd5e0'
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#0a78ff'
                        }
                      },
                      '& .MuiInputLabel-root': {
                        fontFamily: 'Inter, Roboto, sans-serif',
                        fontWeight: 700
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Emergency Contact"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        background: '#fff',
                        fontFamily: 'Inter, Roboto, sans-serif',
                        fontWeight: 600,
                        '& fieldset': {
                          borderColor: '#e2e8f0',
                          borderWidth: '2px'
                        },
                        '&:hover fieldset': {
                          borderColor: '#cbd5e0'
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#0a78ff'
                        }
                      },
                      '& .MuiInputLabel-root': {
                        fontFamily: 'Inter, Roboto, sans-serif',
                        fontWeight: 700
                      }
                    }}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 3, gap: 1.5, background: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)', borderTop: '2px solid #e5e7eb' }}>
              <Button 
                onClick={() => setOpenDialog(false)}
                sx={{
                  color: '#64748b',
                  fontWeight: 800,
                  textTransform: 'none',
                  px: 3,
                  py: 1.4,
                  borderRadius: '14px',
                  fontFamily: 'Inter, Roboto, sans-serif',
                  fontSize: '0.95rem',
                  border: '2px solid #e5e7eb',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: '#f8fafc',
                    borderColor: '#cbd5e1',
                    color: '#334155',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                  }
                }}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="contained"
                sx={{
                  background: 'linear-gradient(135deg, #0a78ff 0%, #3b82f6 50%, #07b389 100%)',
                  color: '#fff',
                  fontWeight: 900,
                  textTransform: 'none',
                  px: 4,
                  py: 1.4,
                  borderRadius: '14px',
                  fontFamily: 'Inter, Roboto, sans-serif',
                  fontSize: '0.95rem',
                  boxShadow: '0 8px 24px rgba(10,120,255,0.4)',
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
                    transform: 'translateX(-100%)',
                    transition: 'transform 0.6s ease'
                  },
                  '&:hover': {
                    transform: 'translateY(-2px) scale(1.03)',
                    boxShadow: '0 12px 32px rgba(10,120,255,0.5)'
                  },
                  '&:hover::before': {
                    transform: 'translateX(100%)'
                  }
                }}
              >
                Save Changes
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </Fade>
  );
}

export default StudentProfile;;