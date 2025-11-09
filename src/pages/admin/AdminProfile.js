import React from 'react';
import { useSelector } from 'react-redux';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Avatar
} from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';


const AdminProfile = () => {
    const { currentUser } = useSelector((state) => state.user);

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
            <Card sx={{ maxWidth: 500, padding: 3, boxShadow: 6, borderRadius: 4 }}>
                <Box display="flex" justifyContent="center" mb={2}>
                    <Avatar sx={{ bgcolor: "#1976d2", width: 64, height: 64 }}>
                        <AdminPanelSettingsIcon fontSize="large" />
                    </Avatar>
                </Box>
                <CardContent>
                    <Typography variant="h5" align="center" gutterBottom>
                        Admin Profile
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        <strong>Name:</strong> {currentUser.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        <strong>Email:</strong> {currentUser.email}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        <strong>GEO ID:</strong> {currentUser.schoolName}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default AdminProfile;
