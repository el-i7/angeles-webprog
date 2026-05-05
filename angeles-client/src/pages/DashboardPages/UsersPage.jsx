import { useState } from 'react';
import {
  Alert, Box, Button, Chip, Dialog, DialogActions, DialogContent,
  DialogTitle, FormControlLabel, IconButton, InputAdornment, MenuItem,
  Paper, Stack, Switch, TextField, Typography, useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { DataGrid } from '@mui/x-data-grid';
import usersSeed from '../../data/users.json';

// ── Constants ──
const roles   = ['admin', 'editor', 'viewer'];
const genders = ['male', 'female', 'other'];

const blankForm = {
  firstName: '', lastName: '', age: '', gender: '',
  contactNumber: '', email: '', role: 'editor',
  username: '', password: '', address: '', isActive: true,
};

const labelize = (value) =>
  value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';

// ── Load users from JSON seed ──
const loadUsers = () => {
  try {
    return {
      users: usersSeed.map((user, index) => ({
        id: Number(user.id) || index + 1,
        firstName:     String(user.firstName  ?? '').trim(),
        lastName:      String(user.lastName   ?? '').trim(),
        age:           String(user.age        ?? '').trim(),
        gender:        genders.includes(String(user.gender ?? '').trim().toLowerCase())
                         ? String(user.gender).trim().toLowerCase() : '',
        contactNumber: String(user.contactNumber ?? '').trim(),
        email:         String(user.email      ?? '').trim().toLowerCase(),
        role:          roles.includes(String(user.role ?? '').trim().toLowerCase())
                         ? String(user.role).trim().toLowerCase() : 'editor',
        username:      String(user.username   ?? '').trim().toLowerCase(),
        password:      String(user.password   ?? ''),
        address:       String(user.address    ?? '').trim(),
        isActive:      typeof user.isActive === 'boolean' ? user.isActive : true,
      })),
      error: '',
    };
  } catch {
    return { users: [], error: 'Unable to read users from src/data/users.json.' };
  }
};

const seed = loadUsers();

// ── Validation ──
const validate = (form, users, modalId) => {
  const nextErrors = {};
  const mustFill = [
    ['firstName', 'First name'], ['lastName', 'Last name'], ['age', 'Age'],
    ['gender', 'Gender'], ['contactNumber', 'Contact number'],
    ['email', 'Email'], ['role', 'Role'], ['username', 'Username'], ['password', 'Password'],
    ['address', 'Address'],
  ];
  mustFill.forEach(([key, label]) => {
    if (!String(form[key] ?? '').trim()) nextErrors[key] = `${label} is required.`;
  });

  if (form.age && !/^\d+$/.test(form.age.trim()))
    nextErrors.age = 'Age must be a number only.';

  if (form.contactNumber && !/^\d{11}$/.test(form.contactNumber.trim()))
    nextErrors.contactNumber = 'Contact number must be exactly 11 digits.';

  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
    nextErrors.email = 'Enter a valid email address.';

  if (form.email && users.some(
    (u) => u.id !== modalId && u.email === form.email.trim().toLowerCase()
  )) nextErrors.email = 'Email address already exists.';

  if (form.username && /\s/.test(form.username))
    nextErrors.username = 'Username must not contain spaces.';

  if (form.username && users.some(
    (u) => u.id !== modalId && u.username === form.username.trim().toLowerCase()
  )) nextErrors.username = 'Username already exists.';

  if (form.password && form.password.length < 8)
    nextErrors.password = 'Password must be at least 8 characters.';

  return nextErrors;
};

// ── Reusable field props helper ──
const fieldProps = (name, label, form, handleChange, errors, extra = {}) => ({
  name,
  label,
  value: form[name],
  onChange: handleChange,
  error: Boolean(errors[name]),
  helperText: errors[name],
  fullWidth: true,
  ...extra,
});

function UsersPage() {
  const theme      = useTheme();
  const isMobile   = useMediaQuery(theme.breakpoints.down('sm'));

  const [users,          setUsers]          = useState(seed.users);
  const [modal,          setModal]          = useState({ open: false, id: null });
  const [form,           setForm]           = useState({ ...blankForm });
  const [errors,         setErrors]         = useState({});
  const [showPassword,   setShowPassword]   = useState(false);

  const [search,         setSearch]         = useState('');
  const [filterRole,     setFilterRole]     = useState('');
  const [filterGender,   setFilterGender]   = useState('');
  const [filterStatus,   setFilterStatus]   = useState('');

  const resetForm = () => { setForm({ ...blankForm }); setErrors([]); };

  const openModal = (user = null) => {
    setModal({ open: true, id: user?.id ?? null });
    setForm(user ? { ...blankForm, ...user } : { ...blankForm });
    setErrors({});
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    setShowPassword(false);
    resetForm();
  };

  const handleChange = ({ target: { name, value, checked, type } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate(form, users, modal.id);
    if (Object.keys(nextErrors).length) { setErrors(nextErrors); return; }

    const newUser = {
      firstName:     form.firstName.trim(),
      lastName:      form.lastName.trim(),
      age:           form.age.trim(),
      gender:        form.gender.trim().toLowerCase(),
      contactNumber: form.contactNumber.trim(),
      email:         form.email.trim().toLowerCase(),
      role:          form.role.trim().toLowerCase(),
      username:      form.username.trim().toLowerCase(),
      password:      form.password,
      address:       form.address.trim(),
      isActive:      form.isActive,
    };

    setUsers((prev) =>
      modal.id
        ? prev.map((u) => (u.id === modal.id ? { ...u, ...newUser } : u))
        : [
            ...prev,
            {
              id: prev.reduce((max, u) => Math.max(max, Number(u.id) || 0), 0) + 1,
              ...newUser,
            },
          ]
    );
    closeModal();
  };

  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, isActive: !u.isActive } : u))
    );
  };

  // ── Filtered + searched users ──
  const filteredUsers = users.filter((u) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      u.firstName.toLowerCase().includes(q) ||
      u.lastName.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.username.toLowerCase().includes(q);
    const matchRole   = !filterRole   || u.role === filterRole;
    const matchGender = !filterGender || u.gender === filterGender;
    const matchStatus =
      !filterStatus ||
      (filterStatus === 'active' ? u.isActive : !u.isActive);
    return matchSearch && matchRole && matchGender && matchStatus;
  });

  // ── DataGrid columns ──
  const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    {
      field: 'fullName', headerName: 'Full Name', width: 170, sortable: false,
      valueGetter: (_, row) => `${row.firstName} ${row.lastName}`.trim(),
    },
    { field: 'username',      headerName: 'Username',       width: 150 },
    { field: 'age',           headerName: 'Age',            width: 70 },
    {
      field: 'gender', headerName: 'Gender', width: 110,
      valueGetter: (_, row) => labelize(row.gender),
    },
    { field: 'contactNumber', headerName: 'Contact Number', width: 150 },
    { field: 'email',         headerName: 'Email',          flex: 1, minWidth: 200 },
    {
      field: 'role', headerName: 'Role', width: 110,
      valueGetter: (_, row) => labelize(row.role),
    },
    {
      field: 'isActive', headerName: 'Status', width: 110, sortable: false,
      renderCell: ({ row }) => (
        <Chip
          label={row.isActive ? 'Active' : 'Inactive'}
          size="small"
          sx={{
            bgcolor: row.isActive ? '#dcfce7' : '#fee2e2',
            color:   row.isActive ? '#16a34a' : '#dc2626',
            fontWeight: 700, fontSize: 11,
          }}
        />
      ),
    },
    {
      field: 'actions', headerName: 'Actions', width: 180, sortable: false, filterable: false,
      renderCell: ({ row }) => (
        <Stack
          direction="row"
          spacing={0.5}
          sx={{
            height: '100%',
            alignItems: 'center',   // ← vertically centers the buttons
            py: 0.5,
          }}
        >
          <Button size="small" variant="contained"
            sx={{ bgcolor: '#4338ca', fontSize: 11, px: 1.5, '&:hover': { bgcolor: '#3730a3' } }}
            onClick={() => openModal(row)}>
            Edit
          </Button>
          <Button size="small" variant="contained"
            sx={{
              bgcolor: row.isActive ? '#dc2626' : '#16a34a', fontSize: 11, px: 1.5,
              '&:hover': { bgcolor: row.isActive ? '#b91c1c' : '#15803d' },
            }}
            onClick={() => toggleStatus(row.id)}>
            {row.isActive ? 'Disable' : 'Activate'}
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ width: '100%', minWidth: 0 }}>
      {/* ── Header ── */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h4" fontWeight={800} color="#4338ca">Users</Typography>
        <Button variant="contained" onClick={() => openModal()}
          sx={{ bgcolor: '#4338ca', borderRadius: 2, '&:hover': { bgcolor: '#3730a3' },
            width: { xs: '100%', sm: 'auto' } }}>
          Add User
        </Button>
      </Box>

      {/* ── Search + Filter row ── */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }} flexWrap="wrap" useFlexGap>
        <TextField
          placeholder="Search by name, email, or username…"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flex: 2, minWidth: 200 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <span style={{ fontSize: 16 }}>🔍</span>
              </InputAdornment>
            ),
          }}
        />
        <TextField select label="Role" size="small" value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)} sx={{ minWidth: 130 }}>
          <MenuItem value="">All Roles</MenuItem>
          {roles.map((r) => <MenuItem key={r} value={r}>{labelize(r)}</MenuItem>)}
        </TextField>
        <TextField select label="Gender" size="small" value={filterGender}
          onChange={(e) => setFilterGender(e.target.value)} sx={{ minWidth: 130 }}>
          <MenuItem value="">All Genders</MenuItem>
          {genders.map((g) => <MenuItem key={g} value={g}>{labelize(g)}</MenuItem>)}
        </TextField>
        <TextField select label="Status" size="small" value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)} sx={{ minWidth: 130 }}>
          <MenuItem value="">All Status</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </TextField>
      </Stack>

      {seed.error ? (
        <Alert severity="error" sx={{ mb: 2 }}>{seed.error}</Alert>
      ) : null}

      {/* ── Data Table ── */}
      <Paper sx={{ p: { xs: 1.5, sm: 2 }, minWidth: 0, overflow: 'hidden' }}>
        {filteredUsers.length ? (
          <Box sx={{ height: 460, width: '100%', minWidth: 0 }}>
            <DataGrid
              rows={filteredUsers}
              columns={columns}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10]}
              initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 } } }}
              sx={{
                minWidth: 0,
                // ── Fix: vertically center all cell content including renderCell ──
                '& .MuiDataGrid-cell': {
                  display: 'flex',
                  alignItems: 'center',
                },
                '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader': { outline: 'none' },
                '& .MuiDataGrid-columnHeaders': { bgcolor: '#f5f3ff', fontWeight: 700 },
                '& .MuiDataGrid-row:hover': { bgcolor: '#f5f3ff' },
              }}
            />
          </Box>
        ) : (
          <Alert severity="info">
            {search || filterRole || filterGender || filterStatus
              ? 'No users match your search or filters.'
              : 'No users found. Use Add User to create your first record.'}
          </Alert>
        )}
      </Paper>

      {/* ── Add / Edit Dialog ── */}
      <Dialog open={modal.open} onClose={closeModal} fullWidth fullScreen={isMobile} maxWidth="md">
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>{modal.id ? 'Edit User' : 'Add User'}</DialogTitle>

          <DialogContent dividers sx={{ pt: 2, sm: 3 }}>
            <Stack spacing={2} sx={{ pt: 1 }}>

              {/* First + Last name */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('firstName', 'First Name', form, handleChange, errors)} />
                <TextField {...fieldProps('lastName',  'Last Name',  form, handleChange, errors)} />
              </Stack>

              {/* Age + Gender */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('age', 'Age', form, handleChange, errors)}
                  inputProps={{ inputMode: 'numeric' }} />
                <TextField {...fieldProps('gender', 'Gender', form, handleChange, errors,
                  { select: true })}>
                  {genders.map((g) => (
                    <MenuItem key={g} value={g}>{labelize(g)}</MenuItem>
                  ))}
                </TextField>
              </Stack>

              {/* Contact + Email */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('contactNumber', 'Contact Number', form, handleChange, errors)}
                  inputProps={{ maxLength: 11, inputMode: 'numeric' }} />
                <TextField {...fieldProps('email', 'Email Address', form, handleChange, errors,
                  { type: 'email' })} />
              </Stack>

              {/* Role + Username */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('role', 'Role', form, handleChange, errors,
                  { select: true })}>
                  {roles.map((r) => (
                    <MenuItem key={r} value={r}>{labelize(r)}</MenuItem>
                  ))}
                </TextField>
                <TextField {...fieldProps('username', 'Username', form, handleChange, errors)} />
              </Stack>

              {/* Password with show/hide toggle */}
              <TextField
                {...fieldProps('password', 'Password', form, handleChange, errors, {
                  type: showPassword ? 'text' : 'password',
                  slotProps: {
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword((prev) => !prev)}
                            onMouseDown={(e) => e.preventDefault()}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  },
                })}
              />

              {/* Address */}
              <TextField {...fieldProps('address', 'Address', form, handleChange, errors,
                { multiline: true, rows: 3 })} />

              {/* Active toggle */}
              <FormControlLabel
                control={
                  <Switch name="isActive" checked={form.isActive} onChange={handleChange} />
                }
                label={form.isActive ? 'User status: Active' : 'User status: Inactive'}
              />
            </Stack>
          </DialogContent>

          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="submit" variant="contained"
              sx={{ bgcolor: '#4338ca', '&:hover': { bgcolor: '#3730a3' } }}>
              {modal.id ? 'Update User' : 'Save User'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}

export default UsersPage;