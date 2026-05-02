import React, { useState } from 'react';
import {
  Typography, Box, Stack, Card, CardContent,
  Avatar, Chip, TextField, InputAdornment,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BlockIcon from '@mui/icons-material/Block';

// ── Sample User Data ──
const users = [
  { id: 1,  firstName: 'Jon',       lastName: 'Snow',       age: 14,  role: 'Viewer',  status: 'Active',   email: 'jon@got.com' },
  { id: 2,  firstName: 'Cersei',    lastName: 'Lannister',  age: 31,  role: 'Admin',   status: 'Active',   email: 'cersei@got.com' },
  { id: 3,  firstName: 'Jaime',     lastName: 'Lannister',  age: 31,  role: 'Editor',  status: 'Active',   email: 'jaime@got.com' },
  { id: 4,  firstName: 'Arya',      lastName: 'Stark',      age: 11,  role: 'Viewer',  status: 'Active',   email: 'arya@got.com' },
  { id: 5,  firstName: 'Daenerys',  lastName: 'Targaryen',  age: null,  role: 'Admin',   status: 'Active',   email: 'dany@got.com' },
  { id: 6,  firstName: 'Melisandre',lastName: '',           age: 150, role: 'Editor',  status: 'Inactive', email: 'red@got.com' },
  { id: 7,  firstName: 'Ferrara',   lastName: 'Clifford',   age: 44,  role: 'Viewer',  status: 'Active',   email: 'ferrara@got.com' },
  { id: 8,  firstName: 'Rossini',   lastName: 'Frances',    age: 36,  role: 'Editor',  status: 'Active',   email: 'rossini@got.com' },
  { id: 9,  firstName: 'Harvey',    lastName: 'Roxie',      age: 65,  role: 'Viewer',  status: 'Inactive', email: 'harvey@got.com' },
];

const columns = [
  {
    field: 'avatar',
    headerName: '',
    width: 60,
    sortable: false,
    renderCell: (params) => (
      <Avatar sx={{ bgcolor: '#4338ca', width: 32, height: 32, fontSize: 14 }}>
        {params.row.firstName?.[0]}{params.row.lastName?.[0]}
      </Avatar>
    ),
  },
  { field: 'id',        headerName: 'ID',         width: 60 },
  { field: 'firstName', headerName: 'First Name',  width: 130, editable: true },
  { field: 'lastName',  headerName: 'Last Name',   width: 130, editable: true },
  { field: 'email',     headerName: 'Email',       width: 200 },
  { field: 'age',       headerName: 'Age',         type: 'number', width: 80, editable: true },
  {
    field: 'role',
    headerName: 'Role',
    width: 110,
    renderCell: (params) => (
      <Chip
        label={params.value}
        size="small"
        sx={{
          bgcolor: params.value === 'Admin' ? '#ede9fe' : params.value === 'Editor' ? '#f0fdf4' : '#f1f5f9',
          color:   params.value === 'Admin' ? '#4338ca' : params.value === 'Editor' ? '#16a34a' : '#475569',
          fontWeight: 600,
          fontSize: 11,
        }}
      />
    ),
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 110,
    renderCell: (params) => (
      <Chip
        label={params.value}
        size="small"
        sx={{
          bgcolor: params.value === 'Active' ? '#dcfce7' : '#fee2e2',
          color:   params.value === 'Active' ? '#16a34a' : '#dc2626',
          fontWeight: 600,
          fontSize: 11,
        }}
      />
    ),
  },
  {
    field: 'fullName',
    headerName: 'Full Name',
    width: 160,
    sortable: false,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`.trim(),
  },
];

function UsersPage() {
  const [search, setSearch] = useState('');

  const filtered = users.filter((u) =>
    `${u.firstName} ${u.lastName} ${u.email} ${u.role}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const activeCount   = users.filter((u) => u.status === 'Active').length;
  const inactiveCount = users.filter((u) => u.status === 'Inactive').length;

  return (
    <>
      <Typography variant="h4" gutterBottom fontWeight={800} color="#4338ca">
        Users
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Manage and view all registered users for Angeles Portfolio.
      </Typography>

      {/* ── Summary Cards ── */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
        <Card sx={{ flex: 1, borderLeft: '4px solid #4338ca' }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <PeopleIcon sx={{ color: '#4338ca', fontSize: 36 }} />
            <Box>
              <Typography variant="h4" fontWeight={800}>{users.length}</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                Total Users
              </Typography>
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, borderLeft: '4px solid #16a34a' }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <PersonAddIcon sx={{ color: '#16a34a', fontSize: 36 }} />
            <Box>
              <Typography variant="h4" fontWeight={800}>{activeCount}</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                Active Users
              </Typography>
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, borderLeft: '4px solid #dc2626' }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <BlockIcon sx={{ color: '#dc2626', fontSize: 36 }} />
            <Box>
              <Typography variant="h4" fontWeight={800}>{inactiveCount}</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                Inactive Users
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Stack>

      {/* ── Search ── */}
      <TextField
        placeholder="Search users by name, email, or role…"
        size="small"
        fullWidth
        sx={{ mb: 2 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
      />

      {/* ── Data Grid ── */}
      <Box sx={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={filtered}
          columns={columns}
          initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
          sx={{
            '& .MuiDataGrid-columnHeaders': { bgcolor: '#f5f3ff', fontWeight: 700 },
            '& .MuiDataGrid-row:hover': { bgcolor: '#f5f3ff' },
          }}
        />
      </Box>
    </>
  );
}

export default UsersPage;