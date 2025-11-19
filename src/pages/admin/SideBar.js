import * as React from 'react';
import { ListItemButton, ListItemIcon, ListItemText, Tooltip, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BarChartIcon from '@mui/icons-material/BarChart';
import CampaignIcon from '@mui/icons-material/Campaign';

const SideBar = ({ open, toggleDrawer, miniVersion }) => {
    const location = useLocation();
    
    React.useEffect(() => {
        const styleEl = document.createElement('style');
        styleEl.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
            
            :root {
                --sidebar-bg: #ffffff;
                --sidebar-text: #64748b;
                --sidebar-text-hover: #334155;
                --sidebar-text-active: #0a78ff;
                --sidebar-hover-bg: #f0f7ff;
                --sidebar-active-bg: linear-gradient(135deg, #e8f4ff 0%, #f0f9ff 100%);
                --sidebar-border: #e2e8f0;
                --sidebar-divider: rgba(10,120,255,0.12);
                --sidebar-shadow: 0 2px 8px rgba(0,0,0,0.04);
                --sidebar-icon-bg: rgba(10,120,255,0.08);
            }
            
            /* Sidebar Container Styles */
            .MuiDrawer-paper {
                border-right: 1px solid var(--sidebar-border) !important;
                box-shadow: 2px 0 12px rgba(0,0,0,0.04) !important;
                background: linear-gradient(180deg, #fafafa 0%, #ffffff 100%) !important;
            }
            
            /* Mini sidebar styles */
            .mini-sidebar .MuiListItemButton-root {
                padding: 12px 8px !important;
                justify-content: center !important;
                margin: 4px 8px !important;
            }
            
            .mini-sidebar .MuiListItemIcon-root {
                min-width: auto !important;
                margin: 0 !important;
            }
            
            .mini-sidebar .MuiListItemText-root {
                display: none !important;
            }
            
            /* List Item Button Styles */
            .MuiListItemButton-root {
                margin: 4px 12px !important;
                border-radius: 14px !important;
                padding: 12px 14px !important;
                font-family: 'Inter', sans-serif !important;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                position: relative !important;
                overflow: hidden !important;
                border: 1.5px solid transparent !important;
            }
            
            /* Ripple effect background layer */
            .MuiListItemButton-root::after {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background: radial-gradient(circle at center, rgba(10,120,255,0.06) 0%, transparent 70%);
                opacity: 0;
                transition: opacity 0.4s ease;
                pointer-events: none;
            }
            
            /* Hover State */
            .MuiListItemButton-root:hover {
                background: var(--sidebar-hover-bg) !important;
                transform: translateX(6px);
                box-shadow: 0 4px 12px rgba(0,0,0,0.08) !important;
                border-color: rgba(10,120,255,0.18) !important;
            }
            
            .MuiListItemButton-root:hover::after {
                opacity: 1;
            }
            
            /* Active State */
            .MuiListItemButton-root.active {
                background: var(--sidebar-active-bg) !important;
                box-shadow: 0 4px 16px rgba(10,120,255,0.25) !important;
                border: 1.5px solid rgba(10,120,255,0.32) !important;
                transform: translateX(4px);
            }
            
            .MuiListItemButton-root.active::before {
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                height: 70%;
                width: 4px;
                background: linear-gradient(180deg, #0a78ff 0%, #065dca 100%);
                border-radius: 0 4px 4px 0;
                box-shadow: 2px 0 8px rgba(10,120,255,0.5);
            }
            
            /* Glow effect on active */
            .MuiListItemButton-root.active::after {
                opacity: 0.6;
            }
            
            /* Icon Container Wrapper */
            .MuiListItemIcon-root {
                min-width: 44px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                color: #64748b !important;
            }
            
            .MuiListItemButton-root:hover .MuiListItemIcon-root {
                transform: scale(1.15) rotate(5deg);
            }
            
            .MuiListItemButton-root.active .MuiListItemIcon-root {
                transform: scale(1.1);
            }
            
            /* Icon SVG Styles */
            .MuiListItemIcon-root .MuiSvgIcon-root {
                font-size: 1.45rem !important;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                color: var(--sidebar-text) !important;
                filter: drop-shadow(0 2px 4px rgba(0,0,0,0.05));
            }
            
            .MuiListItemButton-root:hover .MuiSvgIcon-root {
                color: #0a78ff !important;
                filter: drop-shadow(0 3px 8px rgba(10,120,255,0.35));
            }
            
            .MuiListItemButton-root.active .MuiSvgIcon-root {
                color: #0a78ff !important;
                filter: drop-shadow(0 2px 6px rgba(10,120,255,0.45));
            }
            
            /* Text Styles */
            .MuiListItemText-root {
                margin: 0 !important;
            }
            
            .MuiListItemText-root .MuiTypography-root {
                font-family: 'Inter', sans-serif !important;
                font-size: 0.9rem !important;
                font-weight: 600 !important;
                letter-spacing: 0.3px !important;
                color: var(--sidebar-text) !important;
                transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
            }
            
            .MuiListItemButton-root:hover .MuiListItemText-root .MuiTypography-root {
                color: var(--sidebar-text-hover) !important;
                font-weight: 700 !important;
                letter-spacing: 0.4px !important;
            }
            
            .MuiListItemButton-root.active .MuiListItemText-root .MuiTypography-root {
                color: var(--sidebar-text-active) !important;
                font-weight: 800 !important;
                letter-spacing: 0.5px !important;
            }
            
            /* Logout Button Special Style */
            .logout-btn {
                margin-top: 8px !important;
            }
            
            .logout-btn .MuiSvgIcon-root {
                color: #dc2626 !important;
            }
            
            .logout-btn .MuiListItemText-root .MuiTypography-root {
                color: #dc2626 !important;
            }
            
            .logout-btn:hover {
                background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%) !important;
                border-color: rgba(220,38,38,0.2) !important;
            }
            
            .logout-btn:hover .MuiSvgIcon-root {
                color: #b91c1c !important;
                filter: drop-shadow(0 3px 8px rgba(220,38,38,0.3)) !important;
            }
            
            .logout-btn:hover .MuiListItemText-root .MuiTypography-root {
                color: #b91c1c !important;
            }
            
            /* Tooltip Styles */
            .MuiTooltip-tooltip {
                font-family: 'Inter', sans-serif !important;
                font-size: 0.8rem !important;
                font-weight: 600 !important;
                padding: 8px 14px !important;
                background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%) !important;
                border-radius: 10px !important;
                box-shadow: 0 8px 24px rgba(0,0,0,0.2) !important;
                letter-spacing: 0.3px !important;
            }
            
            .MuiTooltip-arrow {
                color: #1e293b !important;
            }
            
            /* Ripple Effect Enhancement */
            .MuiTouchRipple-root {
                color: rgba(10,120,255,0.3) !important;
            }
            
            .MuiTouchRipple-ripple {
                animation-duration: 550ms !important;
            }
            
            /* Scrollbar Styles */
            .MuiDrawer-paper::-webkit-scrollbar {
                width: 7px;
            }
            
            .MuiDrawer-paper::-webkit-scrollbar-track {
                background: #f1f5f9;
                border-radius: 4px;
                margin: 8px 0;
            }
            
            .MuiDrawer-paper::-webkit-scrollbar-thumb {
                background: linear-gradient(180deg, #0a78ff 0%, #065dca 100%);
                border-radius: 4px;
                transition: background 0.3s ease;
            }
            
            .MuiDrawer-paper::-webkit-scrollbar-thumb:hover {
                background: linear-gradient(180deg, #065dca 0%, #0a78ff 100%);
                box-shadow: 0 0 8px rgba(10,120,255,0.55);
            }
            
            /* Focus Styles for Accessibility */
            .MuiListItemButton-root:focus-visible {
                outline: 2px solid #0a78ff !important;
                outline-offset: 2px !important;
                box-shadow: 0 0 0 4px rgba(10,120,255,0.25) !important;
            }
            
            /* Smooth entry animation for menu items */
            .MuiListItemButton-root {
                animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) backwards;
            }
            
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateX(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            /* Staggered animation delay for each item */
            .MuiListItemButton-root:nth-of-type(1) { animation-delay: 0.05s; }
            .MuiListItemButton-root:nth-of-type(2) { animation-delay: 0.1s; }
            .MuiListItemButton-root:nth-of-type(3) { animation-delay: 0.15s; }
            .MuiListItemButton-root:nth-of-type(4) { animation-delay: 0.2s; }
            .MuiListItemButton-root:nth-of-type(5) { animation-delay: 0.25s; }
            .MuiListItemButton-root:nth-of-type(6) { animation-delay: 0.3s; }
            .MuiListItemButton-root:nth-of-type(7) { animation-delay: 0.35s; }
            .MuiListItemButton-root:nth-of-type(8) { animation-delay: 0.4s; }
            .MuiListItemButton-root:nth-of-type(9) { animation-delay: 0.45s; }
            
            /* Active pulse animation */
            @keyframes activePulse {
                0%, 100% { box-shadow: 0 4px 16px rgba(10,120,255,0.25); }
                50% { box-shadow: 0 4px 20px rgba(10,120,255,0.35); }
            }
            
            .MuiListItemButton-root.active {
                animation: activePulse 2s ease-in-out infinite;
            }
        `;
        document.head.appendChild(styleEl);
        return () => styleEl.remove();
    }, []);
    
    const isActive = (path) => {
        if (path === '/') {
            return location.pathname === '/' || location.pathname === '/Admin/dashboard';
        }
        return location.pathname.startsWith(path);
    };
    
    // All menu items in single organized list
    const allMenuItems = [
        { path: '/', icon: HomeIcon, label: 'Home', tooltip: 'Dashboard Home' },
        { path: '/Admin/communities', icon: ClassOutlinedIcon, label: 'Communities', tooltip: 'Manage Communities' },
        { path: '/Admin/citizens', icon: PersonOutlineIcon, label: 'Citizens', tooltip: 'Manage Citizens' },
        { path: '/Admin/leaders', icon: SupervisorAccountOutlinedIcon, label: 'Community Leaders', tooltip: 'Manage Leaders' },
        { path: '/Admin/events', icon: AssignmentIcon, label: 'Events', tooltip: 'View & Manage Events' },
        { path: '/Admin/calendar', icon: CalendarTodayIcon, label: 'Event Calendar', tooltip: 'Calendar View' },
        { path: '/Admin/notices', icon: CampaignIcon, label: 'Notices', tooltip: 'View Notices' },
        { path: '/Admin/poll', icon: BarChartIcon, label: 'Polls', tooltip: 'Manage Polls' },
        { path: '/Admin/complains', icon: AnnouncementOutlinedIcon, label: 'Complains', tooltip: 'View Complaints' },
        { path: '/Admin/profile', icon: AccountCircleOutlinedIcon, label: 'Profile', tooltip: 'Your Profile' },
        { path: '/logout', icon: ExitToAppIcon, label: 'Logout', tooltip: 'Sign Out', isLogout: true },
    ];
    
    return (
        <>
            <Box className={miniVersion ? 'mini-sidebar' : ''} sx={{ width: '100%' }}>
                <React.Fragment>
                    {allMenuItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.path);
                        return (
                            <Tooltip key={item.path} title={item.tooltip} placement="right" arrow>
                                <ListItemButton
                                    component={Link}
                                    to={item.path}
                                    className={`${active ? 'active' : ''} ${item.isLogout ? 'logout-btn' : ''}`}
                                    onClick={miniVersion ? undefined : toggleDrawer}
                                >
                                    <ListItemIcon>
                                        <Icon />
                                    </ListItemIcon>
                                    <ListItemText primary={item.label} />
                                </ListItemButton>
                            </Tooltip>
                        );
                    })}
                </React.Fragment>
            </Box>
        </>
    );
};

export default SideBar;