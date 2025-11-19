import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    Box,
    Typography,
    Fade
} from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const AdminProfile = () => {
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const styleEl = document.createElement('style');
        styleEl.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
            
            :root {
                --bg-soft: #f3f6fa;
                --panel-bg: #ffffff;
                --border: #e2e8f0;
                --text-dark: #1a202c;
                --text-mid: #4a5568;
                --text-light: #718096;
                --primary: #0a78ff;
                --primary-dark: #065dca;
                --accent: #07b389;
                --radius-lg: 20px;
                --shadow-sm: 0 2px 8px rgba(30,45,60,0.06);
                --shadow-md: 0 4px 16px rgba(25,40,60,0.08);
                --shadow-lg: 0 8px 28px rgba(25,40,60,0.12);
            }
            
            * {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
                box-sizing: border-box;
            }
            
            .profilePageWrap {
                background: linear-gradient(135deg, #f0f7ff 0%, #e8f2ff 50%, #f3f6fa 100%) fixed;
                min-height: 100vh;
                padding: 2rem 1.5rem;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .profileContainer {
                max-width: 680px;
                width: 100%;
                margin: 0 auto;
            }
            
            .profilePanel {
                background: var(--panel-bg);
                border: 1px solid var(--border);
                border-radius: var(--radius-lg);
                box-shadow: var(--shadow-lg);
                overflow: hidden;
                animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            }
            
            @keyframes slideUp {
                from { opacity: 0; transform: translateY(40px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            .profileHeader {
                text-align: center;
                padding: 3rem 2.5rem 2rem;
                background: linear-gradient(135deg, #fafcff 0%, #f5f9ff 100%);
                border-bottom: 1px solid var(--border);
                position: relative;
                overflow: hidden;
            }
            
            .profileHeader::before {
                content: '';
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: radial-gradient(circle, rgba(10,120,255,0.04) 0%, transparent 70%);
            }
            
            .profileAvatarWrap {
                position: relative;
                display: inline-block;
                margin-bottom: 1.5rem;
            }
            
            .profileAvatar {
                width: 120px;
                height: 120px;
                border-radius: 30px;
                background: linear-gradient(135deg, #0a78ff 0%, #07b389 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                font-size: 3rem;
                box-shadow: 0 12px 35px rgba(10,120,255,0.35);
                position: relative;
                z-index: 1;
                transition: transform 0.3s ease;
            }
            
            .profileAvatar:hover {
                transform: scale(1.05);
            }
            
            .profileAvatarBadge {
                position: absolute;
                bottom: -8px;
                right: -8px;
                width: 48px;
                height: 48px;
                border-radius: 14px;
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                font-size: 1.3rem;
                box-shadow: 0 6px 20px rgba(16,185,129,0.4);
                border: 4px solid #fff;
                z-index: 2;
            }
            
            .profileTitle {
                margin: 0;
                font-size: 2.2rem;
                font-weight: 900;
                letter-spacing: -0.9px;
                color: var(--text-dark);
                line-height: 1.2;
                position: relative;
                z-index: 1;
            }
            
            .profileSubtitle {
                margin: 0.6rem 0 0;
                font-size: 0.9rem;
                font-weight: 700;
                letter-spacing: 1px;
                text-transform: uppercase;
                color: var(--text-mid);
                position: relative;
                z-index: 1;
            }
            
            .profileRoleBadge {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                padding: 0.6rem 1.2rem;
                border-radius: 12px;
                background: linear-gradient(135deg, #e8f4ff 0%, #f0f9ff 100%);
                color: #0a78ff;
                font-size: 0.8rem;
                font-weight: 800;
                letter-spacing: 0.8px;
                text-transform: uppercase;
                margin-top: 1.2rem;
                box-shadow: 0 3px 12px rgba(10,120,255,0.18);
                border: 1.5px solid rgba(10,120,255,0.25);
            }
            
            .profileContent {
                padding: 2.5rem 2.5rem 3rem;
            }
            
            .profileSectionTitle {
                font-size: 1rem;
                font-weight: 800;
                letter-spacing: 1px;
                text-transform: uppercase;
                color: var(--text-light);
                margin: 0 0 1.5rem;
                padding-bottom: 0.8rem;
                border-bottom: 2px solid rgba(10,120,255,0.1);
            }
            
            .profileInfoGrid {
                display: grid;
                gap: 1.3rem;
            }
            
            .profileInfoCard {
                background: linear-gradient(145deg, #ffffff 0%, #f9fbfe 100%);
                border: 1px solid rgba(10,120,255,0.08);
                border-radius: 18px;
                padding: 1.4rem 1.5rem;
                display: flex;
                align-items: center;
                gap: 1.2rem;
                position: relative;
                overflow: hidden;
                transition: all 0.3s ease;
                box-shadow: 0 3px 12px rgba(0,0,0,0.06);
            }
            
            .profileInfoCard::before {
                content: '';
                position: absolute;
                top: 0;
                right: 0;
                width: 80px;
                height: 80px;
                background: radial-gradient(circle, rgba(10,120,255,0.05) 0%, transparent 70%);
                border-radius: 50%;
                transform: translate(30%, -30%);
            }
            
            .profileInfoCard:hover {
                transform: translateY(-4px);
                box-shadow: 0 8px 24px rgba(0,0,0,0.12);
                border-color: rgba(10,120,255,0.18);
            }
            
            .profileInfoIcon {
                width: 56px;
                height: 56px;
                border-radius: 16px;
                background: linear-gradient(135deg, #e8f4ff 0%, #f0f9ff 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                color: #0a78ff;
                font-size: 1.5rem;
                flex-shrink: 0;
                box-shadow: 0 4px 12px rgba(10,120,255,0.18);
                position: relative;
                z-index: 1;
            }
            
            .profileInfoContent {
                flex: 1;
                position: relative;
                z-index: 1;
            }
            
            .profileInfoLabel {
                font-size: 0.7rem;
                font-weight: 800;
                letter-spacing: 1px;
                text-transform: uppercase;
                color: var(--text-light);
                margin-bottom: 0.4rem;
                display: block;
            }
            
            .profileInfoValue {
                font-size: 1.05rem;
                font-weight: 800;
                letter-spacing: -0.3px;
                color: var(--text-dark);
                line-height: 1.3;
                word-break: break-word;
            }
            
            .profileStatsBar {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 1rem;
                margin-top: 2rem;
                padding-top: 2rem;
                border-top: 2px solid rgba(10,120,255,0.1);
            }
            
            .profileStatCard {
                text-align: center;
                padding: 1.2rem 1rem;
                background: linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%);
                border: 1px solid rgba(79,70,229,0.08);
                border-radius: 16px;
                transition: all 0.3s ease;
                box-shadow: 0 3px 12px rgba(0,0,0,0.06);
            }
            
            .profileStatCard:hover {
                transform: translateY(-4px);
                box-shadow: 0 6px 20px rgba(0,0,0,0.12);
            }
            
            .profileStatIcon {
                width: 44px;
                height: 44px;
                border-radius: 12px;
                background: linear-gradient(135deg, #0a78ff 0%, #07b389 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                font-size: 1.2rem;
                margin: 0 auto 0.8rem;
                box-shadow: 0 4px 12px rgba(10,120,255,0.3);
            }
            
            .profileStatLabel {
                font-size: 0.7rem;
                font-weight: 700;
                letter-spacing: 0.8px;
                text-transform: uppercase;
                color: var(--text-light);
                margin-bottom: 0.3rem;
            }
            
            .profileStatValue {
                font-size: 1.8rem;
                font-weight: 900;
                letter-spacing: -0.5px;
                color: var(--text-dark);
            }
            
            @media (max-width: 768px) {
                .profilePageWrap {
                    padding: 1.5rem 1rem;
                }
                
                .profileHeader {
                    padding: 2.5rem 1.5rem 1.5rem;
                }
                
                .profileAvatar {
                    width: 100px;
                    height: 100px;
                    font-size: 2.5rem;
                }
                
                .profileTitle {
                    font-size: 1.8rem;
                }
                
                .profileContent {
                    padding: 2rem 1.5rem 2.5rem;
                }
                
                .profileStatsBar {
                    grid-template-columns: 1fr;
                }
            }
        `;
        document.head.appendChild(styleEl);
        return () => styleEl.remove();
    }, []);

    return (
        <Box className="profilePageWrap">
            <Box className="profileContainer">
                <Fade in timeout={500}>
                    <Box className="profilePanel">
                        {/* Header */}
                        <Box className="profileHeader">
                            <Box className="profileAvatarWrap">
                                <Box className="profileAvatar">
                                    <AdminPanelSettingsIcon style={{ fontSize: '3.5rem' }} />
                                </Box>
                                <Box className="profileAvatarBadge">
                                    <AccountCircleIcon style={{ fontSize: '1.5rem' }} />
                                </Box>
                            </Box>
                            <Typography className="profileTitle">
                                {currentUser?.name || 'Admin User'}
                            </Typography>
                            <Typography className="profileSubtitle">
                                Administrator Account
                            </Typography>
                            <Box className="profileRoleBadge">
                                <AdminPanelSettingsIcon style={{ fontSize: '1rem' }} />
                                Super Admin
                            </Box>
                        </Box>

                        {/* Content */}
                        <Box className="profileContent">
                            <Typography className="profileSectionTitle">
                                Account Information
                            </Typography>
                            
                            <Box className="profileInfoGrid">
                                <Box className="profileInfoCard">
                                    <Box className="profileInfoIcon">
                                        <PersonIcon />
                                    </Box>
                                    <Box className="profileInfoContent">
                                        <span className="profileInfoLabel">Full Name</span>
                                        <Typography className="profileInfoValue">
                                            {currentUser?.name || 'N/A'}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box className="profileInfoCard">
                                    <Box className="profileInfoIcon">
                                        <EmailIcon />
                                    </Box>
                                    <Box className="profileInfoContent">
                                        <span className="profileInfoLabel">Email Address</span>
                                        <Typography className="profileInfoValue">
                                            {currentUser?.email || 'N/A'}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box className="profileInfoCard">
                                    <Box className="profileInfoIcon">
                                        <BadgeIcon />
                                    </Box>
                                    <Box className="profileInfoContent">
                                        <span className="profileInfoLabel">GEO ID</span>
                                        <Typography className="profileInfoValue">
                                            {currentUser?.schoolName || 'N/A'}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>

                            {/* Stats Bar */}
                            <Box className="profileStatsBar">
                                <Box className="profileStatCard">
                                    <Box className="profileStatIcon">
                                        <AdminPanelSettingsIcon />
                                    </Box>
                                    <Typography className="profileStatLabel">Role</Typography>
                                    <Typography className="profileStatValue">Admin</Typography>
                                </Box>
                                
                                <Box className="profileStatCard">
                                    <Box className="profileStatIcon">
                                        <AccountCircleIcon />
                                    </Box>
                                    <Typography className="profileStatLabel">Status</Typography>
                                    <Typography className="profileStatValue">Active</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Fade>
            </Box>
        </Box>
    );
};

export default AdminProfile;