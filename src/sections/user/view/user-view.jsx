import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import { useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import DialogContentText from '@mui/material/DialogContentText';

import { getUsers, removeUser } from 'src/api/server';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function UserPage() {
    const router = useNavigate();
    const theme = useTheme();
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [removeId, setRemoveId] = useState(null);

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState('name');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        getUsers(dispatch)
            .then(() => {})
            .catch((err) => {
                toast(err, { type: 'error' });
            });
    }, [dispatch]);

    const handleOpenDeleteModal = () => setOpenDeleteModal(true);
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);

    const handleRemove = (id) => {
        setRemoveId(id);
        handleOpenDeleteModal();
    };

    const goRemove = () => {
        if (removeId) {
            handleCloseDeleteModal();
            removeUser(dispatch, { id: removeId })
                .then((res) => {
                    getData();
                    toast('Successfully deleted user', { type: 'success' });
                })
                .catch((err) => {
                    toast(err, { type: 'error' });
                });
        }
    };

    const getData = useCallback(() => {
        getUsers(dispatch)
            .then(() => {})
            .catch((err) => {
                toast(err, { type: 'error' });
            });
    }, [dispatch]);

    const handleSort = (event, id) => {
        const isAsc = orderBy === id && order === 'asc';
        if (id !== '') {
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(id);
        }
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = users.map((n) => `${n.firstName} ${n.lastName}`);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleDetail = (userData) => {
        router(`/user/${userData.id}`, { state: userData });
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleFilterByName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
    };

    const dataFiltered = applyFilter({
        inputData: users,
        comparator: getComparator(order, orderBy),
        filterName,
    });

    const notFound = !dataFiltered.length && !!filterName;

    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">Users</Typography>

                <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
                    New User
                </Button>
            </Stack>

            <Card>
                <UserTableToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

                <Scrollbar>
                    <TableContainer sx={{ overflow: 'unset' }}>
                        <Table sx={{ minWidth: 800 }}>
                            <UserTableHead
                                order={order}
                                orderBy={orderBy}
                                rowCount={users.length}
                                numSelected={selected.length}
                                onRequestSort={handleSort}
                                onSelectAllClick={handleSelectAllClick}
                                headLabel={[
                                    { id: 'name', label: 'Name' },
                                    { id: 'company', label: 'Company' },
                                    { id: 'email', label: 'Email' },
                                    { id: 'phone', label: 'Phone' },
                                    { id: 'role', label: 'Role' },
                                    { id: 'status', label: 'Status' },
                                    { id: '' },
                                ]}
                            />
                            <TableBody>
                                {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    <UserTableRow
                                        key={row.id}
                                        name={`${row.firstName} ${row.lastName}`}
                                        role={row.role}
                                        status={row.verified ? 'success' : 'pending'}
                                        company={row.companyName}
                                        avatarUrl={row.avatar}
                                        email={row.email}
                                        phone={row.phone}
                                        selected={selected.indexOf(`${row.firstName} ${row.lastName}`) !== -1}
                                        handleClick={(event) => handleClick(event, `${row.firstName} ${row.lastName}`)}
                                        handleRemove={() => handleRemove(row.id)}
                                        handleDetail={() => handleDetail(row)}
                                    />
                                ))}

                                <TableEmptyRows height={77} emptyRows={emptyRows(page, rowsPerPage, users.length)} />

                                {notFound && <TableNoData query={filterName} />}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <TablePagination
                    page={page}
                    component="div"
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Card>

            <Dialog open={openDeleteModal} onClose={handleCloseDeleteModal} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">Remove User</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">Are you sure you want to remove this user?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteModal} sx={{ color: theme.palette.grey[600] }}>
                        Cancle
                    </Button>
                    <Button onClick={goRemove} autoFocus color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
