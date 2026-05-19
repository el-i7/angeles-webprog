import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ added
import {
  Alert, Box, Button, Chip, Dialog, DialogActions, DialogContent,
  DialogTitle, FormControlLabel, IconButton, InputAdornment, MenuItem,
  Paper, Stack, Switch, TextField, Typography, useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { DataGrid } from '@mui/x-data-grid';
import { fetchUsers, createUser, updateUser } from '../../services/UserService';

// ── Constants ──
const roles   = ['admin', 'editor', 'viewer'];
const genders = ['male', 'female', 'other'];

const blankForm = {
  firstName: '', lastName: '', age: '', gender: '',
  contactNumber: '', email: '', type: 'editor',
  username: '', password: '', address: '', isActive: true,
};

const labelize = (value) =>
  value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';

// ── Validation ──
const validate = (form) => {
  const nextErrors = {};
  const mustFill = [
    ['firstName', 'First name'], ['lastName', 'Last name'], ['age', 'Age'],
    ['gender', 'Gender'], ['contactNumber', 'Contact number'],
    ['email', 'Email'], ['type', 'Role'], ['username', 'Username'], ['password', 'Password'],
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

  if (form.username && /\s/.test(form.username))
    nextErrors.username = 'Username must not contain spaces.';

  if (form.password && form.password.length < 8)
    nextErrors.password = 'Password must be at least 8 characters.';

  return nextErrors;
};

const fieldProps = (name, label, form, handleChange, errors, extra = {}) => ({
  name, label, value: form[name], onChange: handleChange,
  error: Boolean(errors[name]), helperText: errors[name], fullWidth: true, ...extra,
});

function UsersPage() {
  const theme    = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate(); // ✅ added

  // ✅ Enhancement 1: Only admin can access this page
  useEffect(() => {
    const userType = localStorage.getItem('type');
    if (userType !== 'admin') {
      navigate('/dashboard');
    }
  }, []);

  const [users,        setUsers]        = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [apiError,     setApiError]     = useState('');
  const [modal,        setModal]        = useState({ open: false, id: null });
  const [form,         setForm]         = useState({ ...blankForm });
  const [errors,       setErrors]       = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [search,       setSearch]       = useState('');
  const [filterRole,   setFilterRole]   = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => { loadUsers(); }, []);

  const loadUsers = async () => {
    setLoading(true);
    setApiError('');
    try {
      const { data } = await fetchUsers();
      const mapped = data.users.map((u, i) => ({
        ...u,
        id: u._id || i + 1,
        role: u.type,
      }));
      setUsers(mapped);
    } catch {
      setApiError('Failed to load users. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => { setForm({ ...blankForm }); setErrors({}); };

  const openModal = (user = null) => {
    setModal({ open: true, id: user?._id ?? user?.id ?? null });
    setForm(user
      ? { ...blankForm, ...user, type: user.type || user.role || 'editor' }
      : { ...blankForm }
    );
    setErrors({});
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    setShowPassword(false);
    resetForm();
  };

  const handleChange = ({ target: { name, value, checked, type } }) => {
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate(form);
    if (Object.keys(nextErrors).length) { setErrors(nextErrors); return; }

    const payload = {
      firstName:     form.firstName.trim(),
      lastName:      form.lastName.trim(),
      age:           form.age.trim(),
      gender:        form.gender.trim().toLowerCase(),
      contactNumber: form.contactNumber.trim(),
      email:         form.email.trim().toLowerCase(),
      type:          form.type.trim().toLowerCase(),
      username:      form.username.trim().toLowerCase(),
      password:      form.password,
      address:       form.address.trim(),
      isActive:      form.isActive,
    };

    try {
      if (modal.id) {
        await updateUser(modal.id, payload);
      } else {
        await createUser(payload);
      }
      await loadUsers();
      closeModal();
    } catch (err) {
      setApiError(err.response?.data?.message || 'Failed to save user.');
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      await updateUser(id, { isActive: !currentStatus });
      await loadUsers();
    } catch {
      setApiError('Failed to update user status.');
    }
  };

  // ── Filter + Search ──
  const filteredUsers = users.filter((u) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      u.firstName?.toLowerCase().includes(q) ||
      u.lastName?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.username?.toLowerCase().includes(q);
    const matchRole   = !filterRole   || (u.type || u.role) === filterRole;
    const matchGender = !filterGender || u.gender === filterGender;
    const matchStatus =
      !filterStatus || (filterStatus === 'active' ? u.isActive : !u.isActive);
    return matchSearch && matchRole && matchGender && matchStatus;
  });

  // ── DataGrid columns ──
  const columns = [
    {
      field: 'id', headerName: 'ID', width: 80,
      valueGetter: (_, row) => String(row._id || row.id).slice(-6).toUpperCase(),
    },
    {
      field: 'fullName', headerName: 'Full Name', width: 170, sortable: false,
      valueGetter: (_, row) => `${row.firstName} ${row.lastName}`.trim(),
    },
    { field: 'username',      headerName: 'Username',  width: 150 },
    { field: 'age',           headerName: 'Age',       width: 70 },
    {
      field: 'gender', headerName: 'Gender', width: 110,
      valueGetter: (_, row) => labelize(row.gender),
    },
    { field: 'contactNumber', headerName: 'Contact',   width: 140 },
    { field: 'email',         headerName: 'Email',     flex: 1, minWidth: 200 },
    {
      field: 'type', headerName: 'Role', width: 100,
      valueGetter: (_, row) => labelize(row.type || row.role),
    },
    {
      field: 'isActive', headerName: 'Status', width: 110, sortable: false,
      renderCell: ({ row }) => (
        <Chip
          label={row.isActive ? 'Active' : 'Inactive'} size="small"
          sx={{
            bgcolor: row.isActive ? '#dcfce7' : '#fee2e2',
            color:   row.isActive ? '#16a34a' : '#dc2626',
            fontWeight: 700, fontSize: 11,
          }}
        />
      ),
    },
    {
      field: 'actions', headerName: 'Actions', width: 180, sortable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={0.5} sx={{ height: '100%', alignItems: 'center', py: 0.5 }}>
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
            onClick={() => toggleStatus(row._id || row.id, row.isActive)}>
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

      {apiError && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setApiError('')}>
          {apiError}
        </Alert>
      )}

      {/* ── Search + Filter ── */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }} flexWrap="wrap" useFlexGap>
        <TextField
          placeholder="Search by name, email, or username…" size="small"
          value={search} onChange={(e) => setSearch(e.target.value)}
          sx={{ flex: 2, minWidth: 200 }}
          InputProps={{
            startAdornment: <InputAdornment position="start">🔍</InputAdornment>,
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

      {/* ── Table ── */}
      <Paper sx={{ p: { xs: 1.5, sm: 2 }, minWidth: 0, overflow: 'hidden' }}>
        {loading ? (
          <Alert severity="info">Loading users from database…</Alert>
        ) : filteredUsers.length ? (
          <Box sx={{ height: 460, width: '100%' }}>
            <DataGrid
              rows={filteredUsers}
              columns={columns}
              getRowId={(row) => row._id || row.id}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10]}
              initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 } } }}
              sx={{
                '& .MuiDataGrid-cell': { display: 'flex', alignItems: 'center' },
                '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader': { outline: 'none' },
                '& .MuiDataGrid-columnHeaders': { bgcolor: '#f5f3ff', fontWeight: 700 },
                '& .MuiDataGrid-row:hover': { bgcolor: '#f5f3ff' },
              }}
            />
          </Box>
        ) : (
          <Alert severity="info">
            {search || filterRole || filterGender || filterStatus
              ? 'No users match your filters.'
              : 'No users found. Click Add User to create one.'}
          </Alert>
        )}
      </Paper>

      {/* ── Add / Edit Dialog ── */}
      <Dialog open={modal.open} onClose={closeModal} fullWidth fullScreen={isMobile} maxWidth="md">
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>{modal.id ? 'Edit User' : 'Add User'}</DialogTitle>
          <DialogContent dividers sx={{ pt: 2 }}>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('firstName', 'First Name', form, handleChange, errors)} />
                <TextField {...fieldProps('lastName',  'Last Name',  form, handleChange, errors)} />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('age', 'Age', form, handleChange, errors)}
                  inputProps={{ inputMode: 'numeric' }} />
                <TextField {...fieldProps('gender', 'Gender', form, handleChange, errors, { select: true })}>
                  {genders.map((g) => <MenuItem key={g} value={g}>{labelize(g)}</MenuItem>)}
                </TextField>
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('contactNumber', 'Contact Number', form, handleChange, errors)}
                  inputProps={{ maxLength: 11, inputMode: 'numeric' }} />
                <TextField {...fieldProps('email', 'Email Address', form, handleChange, errors, { type: 'email' })} />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('type', 'Role', form, handleChange, errors, { select: true })}>
                  {roles.map((r) => <MenuItem key={r} value={r}>{labelize(r)}</MenuItem>)}
                </TextField>
                <TextField {...fieldProps('username', 'Username', form, handleChange, errors)} />
              </Stack>
              <TextField
                {...fieldProps('password', 'Password', form, handleChange, errors, {
                  type: showPassword ? 'text' : 'password',
                  slotProps: {
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword((p) => !p)}
                            onMouseDown={(e) => e.preventDefault()}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  },
                })}
              />
              <TextField {...fieldProps('address', 'Address', form, handleChange, errors,
                { multiline: true, rows: 3 })} />
              <FormControlLabel
                control={<Switch name="isActive" checked={form.isActive} onChange={handleChange} />}
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