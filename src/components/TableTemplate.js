import React, { useState, useMemo } from 'react'
import { StyledTableCell, StyledTableRow } from './styles';
import { Box, Table, TableBody, TableContainer, TableHead, TablePagination, TextField, InputAdornment, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const TableTemplate = ({ buttonHaver: ButtonHaver, columns, rows, searchable = false, searchPlaceholder = 'Search...', dense = false }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [query, setQuery] = useState('');

    const filteredRows = useMemo(() => {
        if (!searchable || !query.trim()) return rows || [];
        const lowered = query.toLowerCase();
        return (rows || []).filter(r =>
            columns.some(col => {
                const val = r[col.id];
                if (val == null) return false;
                if (typeof val === 'string') return val.toLowerCase().includes(lowered);
                if (typeof val === 'number') return String(val).includes(lowered);
                return false;
            })
        );
    }, [rows, query, searchable, columns]);

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const pagedRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Box sx={{ width: '100%' }}>
            {searchable && (
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    mb: 2,
                    flexWrap: 'wrap'
                }}>
                    <TextField
                        size="small"
                        placeholder={searchPlaceholder}
                        value={query}
                        onChange={(e) => { setQuery(e.target.value); setPage(0); }}
                        sx={{
                            flexGrow: 1,
                            maxWidth: 340,
                            background: '#ffffff',
                            borderRadius: 2,
                            '& .MuiInputBase-root': { fontFamily: 'Inter, sans-serif' }
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: '#64748b' }} />
                                </InputAdornment>
                            )
                        }}
                    />
                    <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: '.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b' }}>
                        {filteredRows.length} Results
                    </Typography>
                </Box>
            )}
            <TableContainer sx={{
                border: '2px solid #e2e8f0',
                borderRadius: '16px',
                boxShadow: '0 4px 16px rgba(25,40,60,0.08)',
                maxHeight: dense ? 400 : 520,
                overflowX: 'auto',
                '&::-webkit-scrollbar': { height: 10, width: 10 },
                '&::-webkit-scrollbar-track': { background: '#f1f5f9', borderRadius: 10 },
                '&::-webkit-scrollbar-thumb': { background: '#cbd5e1', borderRadius: 10, border: '2px solid #f1f5f9' },
                '&::-webkit-scrollbar-thumb:hover': { background: '#94a3b8' }
            }}>
                <Table stickyHeader aria-label="data table" size={dense ? 'small' : 'medium'}>
                    <TableHead>
                        <StyledTableRow>
                            {columns.map((column) => (
                                <StyledTableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </StyledTableCell>
                            ))}
                            {ButtonHaver && (
                                <StyledTableCell align="center">
                                    Status
                                </StyledTableCell>
                            )}
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {pagedRows.map((row) => (
                            <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                {columns.map((column) => {
                                    const value = row[column.id];
                                    return (
                                        <StyledTableCell key={column.id} align={column.align}>
                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                        </StyledTableCell>
                                    );
                                })}
                                {ButtonHaver && (
                                    <StyledTableCell align="center">
                                        <ButtonHaver row={row} />
                                    </StyledTableCell>
                                )}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1, flexWrap: 'wrap', gap: 2 }}>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={filteredRows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: '.7rem', fontWeight: 600, color: '#718096', letterSpacing: '.5px' }}>
                    Showing {pagedRows.length} of {filteredRows.length}
                </Typography>
            </Box>
        </Box>
    );
};

export default TableTemplate