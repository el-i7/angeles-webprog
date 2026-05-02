import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { DataGrid } from '@mui/x-data-grid';
import { Stack, Card, CardContent, Typography, Box } from '@mui/material';
import { Gauge } from '@mui/x-charts/Gauge';

// ── Sample Data ──
const columns = [
  { field: 'id',        headerName: 'ID',         width: 60 },
  { field: 'firstName', headerName: 'First name',  width: 130, editable: true },
  { field: 'lastName',  headerName: 'Last name',   width: 130, editable: true },
  { field: 'age',       headerName: 'Age',         type: 'number', width: 80, editable: true },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const rows = [
  { id: 1,  lastName: 'Snow',       firstName: 'Jon',        age: 14  },
  { id: 2,  lastName: 'Lannister',  firstName: 'Cersei',     age: 31  },
  { id: 3,  lastName: 'Lannister',  firstName: 'Jaime',      age: 31  },
  { id: 4,  lastName: 'Stark',      firstName: 'Arya',       age: 11  },
  { id: 5,  lastName: 'Targaryen',  firstName: 'Daenys',   age: null },
  { id: 6,  lastName: 'Melisandre', firstName: null,         age: 150 },
  { id: 7,  lastName: 'Clifford',   firstName: 'Ferrara',    age: 44  },
  { id: 8,  lastName: 'Frances',    firstName: 'Rossini',    age: 36  },
  { id: 9,  lastName: 'Roxie',      firstName: 'Harvey',     age: 65  },
];

// Fix: compute average age outside JSX to avoid syntax issues
const validAges = rows.filter((row) => row.age !== null);
const averageAge = (validAges.reduce((sum, row) => sum + row.age, 0) / validAges.length).toFixed(1);

function DashboardPage() {
  return (
    <>
      <Typography variant="h4" gutterBottom fontWeight={800} color="#4338ca">
        Dashboard
      </Typography>

      {/* ── KPI Cards ── */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 4 }}>
        <Card sx={{ minWidth: 160, borderLeft: '4px solid #4338ca' }}>
          <CardContent>
            <Typography variant="h6" color="text.secondary">Total Users</Typography>
            <Typography variant="h4" fontWeight={800}>{rows.length}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 160, borderLeft: '4px solid #7c3aed' }}>
          <CardContent>
            <Typography variant="h6" color="text.secondary">Average Age</Typography>
            <Typography variant="h4" fontWeight={800}>{averageAge}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 160, borderLeft: '4px solid #a855f7' }}>
          <CardContent>
            <Typography variant="h6" color="text.secondary">Departments</Typography>
            <Typography variant="h4" fontWeight={800}>3</Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 160, borderLeft: '4px solid #c084fc' }}>
          <CardContent>
            <Typography variant="h6" color="text.secondary">Active</Typography>
            <Typography variant="h4" fontWeight={800}>7</Typography>
          </CardContent>
        </Card>
      </Stack>

      {/* ── Gauges ── */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 4 }}>
        <Gauge width={200} height={150} value={65} valueMax={100} valueMin={0} />
        <Gauge width={200} height={150} value={30} valueMax={100} valueMin={0} />
        <Gauge width={200} height={150} value={80} valueMax={100} valueMin={0} />
      </Stack>

      {/* ── Charts ── */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 4 }}>
        {/* Bar Chart */}
        <Box sx={{ flex: 1 }}>
          <BarChart
            series={[
              { data: [35, 44, 24, 34], label: 'Series 1' },
              { data: [51, 6,  49, 30], label: 'Series 2' },
            ]}
            height={200}
            xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band', label: 'Quarterly Sales' }]}
          />
        </Box>

        {/* Pie Chart */}
        <Box>
          <PieChart
            series={[{
              data: [
                { id: 0, value: 10, label: 'Series A' },
                { id: 1, value: 15, label: 'Series B' },
                { id: 2, value: 20, label: 'Series C' },
              ],
            }]}
            width={200}
            height={200}
          />
        </Box>
      </Stack>

      {/* ── Users Overview Table ── */}
      <Typography variant="h5" gutterBottom fontWeight={700}>
        Users Overview
      </Typography>
      <Box sx={{ height: 400, width: '100%', mb: 2 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
}

export default DashboardPage;