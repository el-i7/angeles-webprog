import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { styled, useTheme, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PeopleIcon from '@mui/icons-material/People';
import ArticleIcon from '@mui/icons-material/Article';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const drawerWidth = 240;

// Enhancement 1: Users is admin-only, Articles available to both admin and editor
const dashboardNavItems = [
  { label: 'Dashboard', title: 'Dashboard', to: '/dashboard/',         icon: DashboardIcon,  roles: ['admin', 'editor'] },
  { label: 'Reports',   title: 'Reports',   to: '/dashboard/reports',  icon: AssessmentIcon, roles: ['admin', 'editor'] },
  { label: 'Users',     title: 'Users',     to: '/dashboard/users',    icon: PeopleIcon,     roles: ['admin'] },           // admin only
  { label: 'Articles',  title: 'Articles',  to: '/dashboard/articles', icon: ArticleIcon,    roles: ['admin', 'editor'] },
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  '&:focus-within': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  display: 'flex',
  alignItems: 'center',
  marginLeft: theme.spacing(2),
  width: 'auto',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1.5),
  height: '100%',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'rgba(255,255,255,0.8)',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#fff',
  fontSize: 14,
  '& .MuiInputBase-input': {
    padding: theme.spacing(0.75, 1.5, 0.75, 0),
    width: '18ch',
    '&::placeholder': { color: 'rgba(255,255,255,0.65)', opacity: 1 },
  },
}));

const getPageTitle = (pathname) =>
  dashboardNavItems.find(({ to }) => to === pathname)?.title ?? 'Welcome';

const DashLayout = () => {
  const theme     = useTheme();
  const [open, setOpen] = useState(false);
  const location  = useLocation();
  const navigate  = useNavigate();
  const pageTitle = getPageTitle(location.pathname);

  const userType  = localStorage.getItem('type') || '';
  const firstName = localStorage.getItem('firstName') || '';

  // Enhancement 1: filter nav items based on role
  const visibleNavItems = dashboardNavItems.filter((item) =>
    item.roles.includes(userType)
  );

  const handleDrawerOpen  = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('firstName');
    localStorage.removeItem('type');
    navigate('/auth/signin');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* ── Top AppBar ── */}
      <AppBar position="fixed" open={open} sx={{ bgcolor: '#4338ca' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 5, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
            {firstName ? `Welcome, ${firstName}` : pageTitle}
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{ fontSize: 18 }} />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
          </Search>

          <Button
            color="inherit" variant="outlined" onClick={handleLogout}
            sx={{
              ml: 2, borderColor: 'rgba(255,255,255,0.5)',
              fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase',
              '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.12)' },
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* ── Sidebar Drawer ── */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          {open && (
            <Box sx={{ flexGrow: 1, pl: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
                <polygon points="18,2 33,10 33,26 18,34 3,26 3,10" fill="#4338ca" />
                <text x="18" y="25" textAnchor="middle" fontSize="18" fontWeight="800"
                  fontFamily="Georgia, serif" fill="white">A</text>
                <circle cx="27" cy="9" r="3" fill="#a5b4fc" />
              </svg>
              <Typography variant="caption" fontWeight={800} sx={{ color: '#4338ca', letterSpacing: 1 }}>
                ANGELES
              </Typography>
            </Box>
          )}
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>

        <Divider />

        {/* Role-filtered nav items */}
        <List>
          {visibleNavItems.map(({ label, to, icon: Icon }) => (
            <ListItem key={to} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                component={Link}
                to={to}
                selected={location.pathname === to}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  justifyContent: open ? 'initial' : 'center',
                  '&.Mui-selected': {
                    bgcolor: '#ede9fe', color: '#4338ca',
                    '& .MuiListItemIcon-root': { color: '#4338ca' },
                  },
                  '&:hover': { bgcolor: '#f5f3ff' },
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={label} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

      
      </Drawer>

      {/* ── Main Content ── */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashLayout;