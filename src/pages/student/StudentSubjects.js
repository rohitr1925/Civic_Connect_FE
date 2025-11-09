import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import {
    BottomNavigation,
    BottomNavigationAction,
    Container,
    Paper,
    Typography,
    Box,
} from '@mui/material';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import CustomBarChart from '../../components/CustomBarChart';

import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

const StudentSubjects = () => {
    const dispatch = useDispatch();
    const { subjectsList, sclassDetails } = useSelector((state) => state.sclass);
    const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
    }, [dispatch, currentUser._id]);

    if (response) console.log(response);
    if (error) console.log(error);
    console.log(userDetails,'this is userlistttt')
    const [subjectMarks, setSubjectMarks] = useState([]);
    const [selectedSection, setSelectedSection] = useState('table');

    useEffect(() => {
        if (userDetails) {
            setSubjectMarks(userDetails.examResult || []);
        }
    }, [userDetails]);

    useEffect(() => {
        dispatch(getSubjectList(currentUser.sclassName._id, "ClassSubjects"));
    }, [subjectMarks, dispatch, currentUser.sclassName._id]);

    const handleSectionChange = (event, newSection) => {
        setSelectedSection(newSection);
    };

    const renderTableSection = () => {
        return (
            <>
                <Typography variant="h4" align="center" gutterBottom>
                    Event Details
                </Typography>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ ...styles.table, tableLayout: 'fixed' }}>
                        <colgroup>
                            <col style={{ width: '50%' }} />
                            <col style={{ width: '50%' }} />
                        </colgroup>
                        <thead>
                            <tr>
                                <th style={styles.th}>Events Attended</th>
                                <th style={styles.th}>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subjectMarks.map((result, index) => {
                                if (!result.subName || !result.marksObtained) return null;
                                return (
                                    <tr key={index} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                                        <td style={styles.td}>{result.subName.subName}</td>
                                        <td style={styles.td}>{result.marksObtained}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </>
        );
    };

    const renderChartSection = () => {
        return <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />;
    };

    const renderClassDetailsSection = () => {
        return (
            <Container maxWidth="md" sx={{ marginTop: 4 }}>
                <Box style={styles.box}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Community Details
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        You are currently in Community:
                    </Typography>
                    <Typography variant="body1" style={styles.highlightedText}>
                        {userDetails?.sclassName?.sclassName}
                    </Typography>

                    <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
    These are the Events:
</Typography>
{subjectsList && subjectsList.length > 0 ? (
    <div style={{ overflowX: 'auto' }}>
        <table style={styles.eventTable}>
            <thead>
                <tr>
                    <th style={styles.th}>Event Name</th>
                    <th style={styles.th}>Event Code</th>
                </tr>
            </thead>
            <tbody>
                {subjectsList.map((subject, index) => (
                    <tr key={index} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                        <td style={styles.td}>{subject.subName}</td>
                        <td style={styles.td}>{subject.subCode}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
) : (
    <Typography variant="body2">No events found.</Typography>
)}

                </Box>
            </Container>
        );
    };

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0 ? (
                        <>
                            {selectedSection === 'table' && renderTableSection()}
                            {selectedSection === 'chart' && renderChartSection()}

                            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                                <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels>
                                    <BottomNavigationAction
                                        label="Table"
                                        value="table"
                                        icon={selectedSection === 'table' ? <TableChartIcon /> : <TableChartOutlinedIcon />}
                                    />
                                    <BottomNavigationAction
                                        label="Chart"
                                        value="chart"
                                        icon={selectedSection === 'chart' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
                                    />
                                </BottomNavigation>
                            </Paper>
                        </>
                    ) : (
                        renderClassDetailsSection()
                    )}
                </div>
            )}
        </>
    );
};

// ✅ Inline CSS styling
const styles = {
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
        tableLayout: 'fixed'
    },
    th: {
        backgroundColor: '#1976d2',
        color: 'white',
        padding: '12px',
        border: '1px solid #ddd',
        fontSize: '16px',
    },
    td: {
        padding: '12px',
        textAlign: 'center',
        border: '1px solid #ddd',
        fontSize: '15px',
        wordBreak: 'break-word',
        whiteSpace: 'normal'
    },
    evenRow: {
        backgroundColor: '#f9f9f9',
    },
    oddRow: {
        backgroundColor: '#ffffff',
    },
    box: {
        backgroundColor: '#f5f5f5',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    },
    highlightedText: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#1976d2',
    },
    eventList: {
        listStyleType: 'none',
        padding: 0,
        marginTop: '10px',
    },
    eventItem: {
        fontSize: '16px',
        marginBottom: '6px',
    },
    eventTable: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '10px',
        fontFamily: 'Arial, sans-serif',
    },    
};

export default StudentSubjects;
