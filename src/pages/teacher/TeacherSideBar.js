import * as React from 'react';
import { ListItemButton, ListItemIcon, ListItemText, Tooltip, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useSelector } from 'react-redux';

const TeacherSideBar = ({ miniVersion, toggleDrawer, open }) => {
    const { currentUser } = useSelector((state) => state.user);
    const location = useLocation();

    React.useEffect(() => {
        const styleEl = document.createElement('style');
        styleEl.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
            :root {
                --sidebar-bg: #ffffff;
                --sidebar-text: #64748b;
                --sidebar-hover-bg: #f0f7ff;
                --sidebar-active-bg: linear-gradient(135deg, #e8f4ff 0%, #f0f9ff 100%);
                --sidebar-border: #e2e8f0;
            }
            .MuiDrawer-paper { border-right: 1px solid var(--sidebar-border) !important; background: linear-gradient(180deg, #fafafa 0%, #ffffff 100%) !important; }
            .mini-sidebar .MuiListItemButton-root { padding: 12px 8px !important; justify-content: center !important; margin: 4px 8px !important; }
            .mini-sidebar .MuiListItemIcon-root { min-width: auto !important; margin: 0 !important; }
            .mini-sidebar .MuiListItemText-root { display: none !important; }
            .MuiListItemButton-root { margin: 4px 12px !important; border-radius: 14px !important; padding: 12px 14px !important; font-family: 'Inter', sans-serif !important; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important; position: relative !important; overflow: hidden !important; border: 1.5px solid transparent !important; }
            .MuiListItemButton-root::after { content: ''; position: absolute; left:0; top:0; width:100%; height:100%; background: radial-gradient(circle at center, rgba(10,120,255,0.06) 0%, transparent 70%); opacity:0; transition: opacity 0.4s ease; pointer-events:none; }
            .MuiListItemButton-root:hover { background: var(--sidebar-hover-bg) !important; transform: translateX(6px); box-shadow: 0 4px 12px rgba(0,0,0,0.08) !important; border-color: rgba(10,120,255,0.18) !important; }
            .MuiListItemButton-root:hover::after { opacity:1; }
            .MuiListItemButton-root.active { background: var(--sidebar-active-bg) !important; box-shadow: 0 4px 16px rgba(10,120,255,0.25) !important; border: 1.5px solid rgba(10,120,255,0.32) !important; transform: translateX(4px); }
            .MuiListItemButton-root.active::before { content:''; position:absolute; left:0; top:50%; transform:translateY(-50%); height:70%; width:4px; background: linear-gradient(180deg,#0a78ff 0%, #065dca 100%); border-radius:0 4px 4px 0; box-shadow:2px 0 8px rgba(10,120,255,0.5); }
            .MuiListItemIcon-root { min-width:44px !important; display:flex !important; align-items:center !important; justify-content:center !important; transition: all .3s cubic-bezier(.4,0,.2,1) !important; color:#64748b !important; }
            .MuiListItemButton-root:hover .MuiListItemIcon-root { transform: scale(1.15) rotate(5deg); }
            .MuiListItemButton-root.active .MuiListItemIcon-root { transform: scale(1.1); }
            .MuiListItemIcon-root .MuiSvgIcon-root { font-size:1.45rem !important; transition: all .3s cubic-bezier(.4,0,.2,1) !important; color:#64748b !important; }
            .MuiListItemButton-root:hover .MuiSvgIcon-root, .MuiListItemButton-root.active .MuiSvgIcon-root { color:#0a78ff !important; }
            .MuiListItemText-root .MuiTypography-root { font-family:'Inter', sans-serif !important; font-size:0.9rem !important; font-weight:600 !important; letter-spacing:0.3px !important; color:#64748b !important; transition: all .25s cubic-bezier(.4,0,.2,1) !important; }
            .MuiListItemButton-root:hover .MuiListItemText-root .MuiTypography-root { color:#334155 !important; font-weight:700 !important; }
            .logout-btn .MuiSvgIcon-root, .logout-btn .MuiListItemText-root .MuiTypography-root { color:#dc2626 !important; }
        `;
        document.head.appendChild(styleEl);
        return () => styleEl.remove();
    }, []);

    const isActive = (path) => {
        if (path === '/') {
            return location.pathname === '/' || location.pathname === '/Leader/dashboard';
        }
        return location.pathname.startsWith(path);
    };

    const menuItems = [
        { path: '/', icon: HomeIcon, label: 'Home', tooltip: 'Dashboard Home' },
        { path: '/Leader/community', icon: ClassOutlinedIcon, label: 'My Community', tooltip: 'Community Details' },
        { path: '/Leader/poll', icon: BarChartIcon, label: 'Polls', tooltip: 'Community Polls' },
        { path: '/Leader/complain', icon: AnnouncementOutlinedIcon, label: 'Complain', tooltip: 'Manage Complaints' },
        { path: '/calendar', icon: CalendarTodayIcon, label: 'Event Calendar', tooltip: 'View Calendar' },
        { path: '/Leader/profile', icon: AccountCircleOutlinedIcon, label: 'Profile', tooltip: 'Your Profile' },
        { path: '/logout', icon: ExitToAppIcon, label: 'Logout', tooltip: 'Sign Out', isLogout: true },
    ];

    return (
        <Box className={miniVersion ? 'mini-sidebar' : ''} sx={{ width: '100%' }}>
            {menuItems.map(item => {
                const Icon = item.icon; const active = isActive(item.path);
                return (
                    <Tooltip key={item.path} title={item.tooltip} placement="right" arrow>
                        <ListItemButton
                            component={Link}
                            to={item.path}
                            className={`${active ? 'active' : ''} ${item.isLogout ? 'logout-btn' : ''}`}
                            onClick={miniVersion ? undefined : toggleDrawer}
                        >
                            <ListItemIcon><Icon /></ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </Tooltip>
                );
            })}
        </Box>
    );
};

export default TeacherSideBar;