import { useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { BarChart } from '@mui/x-charts/BarChart';
import { Gauge } from '@mui/x-charts/Gauge';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import ArticleIcon from '@mui/icons-material/Article';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PrintIcon from '@mui/icons-material/Print';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';

// ── Data ──
const articles = [
  { title: 'Why Semantic HTML Still Matters in 2025',           tag: 'HTML & CSS',   readTime: 4, views: 320 },
  { title: "Understanding the DOM: A Beginner's Guide",         tag: 'JavaScript',   readTime: 6, views: 210 },
  { title: 'My First Time Using Figma: Lessons Learned',        tag: 'UI/UX Design', readTime: 5, views: 175 },
  { title: 'Component Thinking: How React Changed My Approach', tag: 'React JS',     readTime: 7, views: 290 },
  { title: '5 CSS Tips That Made Me a Better Developer',        tag: 'HTML & CSS',   readTime: 5, views: 140 },
];

const tagColors = {
  'HTML & CSS':   { bg: '#ede9fe', color: '#4338ca' },
  'JavaScript':   { bg: '#fef9c3', color: '#854d0e' },
  'UI/UX Design': { bg: '#fce7f3', color: '#be185d' },
  'React JS':     { bg: '#dbeafe', color: '#1d4ed8' },
};

const articleLabels = ['HTML Matters', 'DOM Guide', 'Figma Lessons', 'React Thinking', 'CSS Tips'];
const articleViews  = [320, 210, 175, 290, 140];
const weeklyViews   = [40, 85, 120, 95, 180, 210, 250, 230, 290, 310, 320, 290];
const weeks         = ['W1','W2','W3','W4','W5','W6','W7','W8','W9','W10','W11','W12'];

const topicData = [
  { id: 0, value: 2, label: 'HTML & CSS'   },
  { id: 1, value: 1, label: 'JavaScript'   },
  { id: 2, value: 1, label: 'UI/UX Design' },
  { id: 3, value: 1, label: 'React JS'     },
];

const skills      = ['HTML & CSS', 'JavaScript', 'UI/UX Design', 'React JS', 'Tailwind CSS'];
const skillLevels = [90, 80, 75, 70, 65];

const kpiCards = [
  { label: 'Total Articles',    value: '5',       icon: ArticleIcon,    color: '#4338ca', bg: '#ede9fe', spark: [1,2,2,3,4,4,5] },
  { label: 'Total Views',       value: '1,135',   icon: VisibilityIcon, color: '#7c3aed', bg: '#f3e8ff', spark: [80,180,290,420,550,700,1135] },
  { label: 'Avg. Read Time',    value: '5.4 min', icon: AccessTimeIcon, color: '#a855f7', bg: '#fae8ff', spark: [4,5,4,6,5,7,5] },
  { label: 'Top Article Views', value: '320',     icon: TrendingUpIcon, color: '#6366f1', bg: '#e0e7ff', spark: [50,100,150,200,250,300,320] },
];

const ReportsPage = () => {
  const printRef = useRef(null);

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open('', '_blank', 'width=1200,height=900');
    if (!printWindow) return;

    const headMarkup = Array.from(
      document.querySelectorAll('style, link[rel="stylesheet"]')
    )
      .map((node) => node.outerHTML)
      .join('');

    const exportedAt = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'long',
      timeStyle: 'short',
    }).format(new Date());

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Print Report</title>
          ${headMarkup}
          <style>
            @page { size: A4; margin: 16mm; }
            * { box-sizing: border-box; }
            body {
              margin: 0;
              font-family: Arial, Helvetica, sans-serif;
              background: #fff;
              color: #1f2937;
            }
            .report-shell { padding: 28px; }
            .report-header {
              margin-bottom: 24px;
              padding-bottom: 14px;
              border-bottom: 1px solid #d1d5db;
            }
            .report-header h1 { margin: 0 0 6px; font-size: 20px; font-weight: 700; }
            .report-header p  { margin: 0; font-size: 14px; color: #6b7280; line-height: 1.5; }
            .report-content .MuiCard-root {
              box-shadow: none !important;
              border: 1px solid #e5e7eb;
              break-inside: avoid;
              page-break-inside: avoid;
            }
            .report-content .MuiCardContent-root { padding: 20px; }
            .report-content svg { max-width: 100%; }
          </style>
        </head>
        <body>
          <main class="report-shell">
            <header class="report-header">
              <h1>Reports Summary — Angeles Portfolio</h1>
              <p>Analytics overview for article performance, skill breakdown, and reading trends.</p>
              <p>Prepared on ${exportedAt}</p>
            </header>
            <section class="report-content">
              ${printContent.outerHTML}
            </section>
          </main>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <Box>

      {/* ── Header: title LEFT, Export PDF button RIGHT — always same row ── */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',          // never collapses to column
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={800} color="#4338ca">
            Reports
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Report analytics overview showing generated reports, category breakdown, and current completion performance.
          </Typography>
        </Box>

        <Button
          variant="outlined"
          startIcon={<PrintIcon />}
          onClick={handlePrint}
          sx={{
            borderColor: '#4338ca',
            color: '#4338ca',
            borderRadius: 2,
            fontWeight: 700,
            whiteSpace: 'nowrap',
            flexShrink: 0,
            ml: 2,
            '&:hover': { bgcolor: '#ede9fe', borderColor: '#3730a3' },
          }}
        >
          Export PDF
        </Button>
      </Box>

      {/* ── Printable content ── */}
      <Stack ref={printRef} spacing={3}>

        {/* ── Bar Chart — Monthly Report Output ── */}
        <Card elevation={0} sx={{ border: '1px solid #ede9fe', borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={700} gutterBottom>Monthly Report Output</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              This chart compares how many reports were generated and how many were completed across the last four months.
            </Typography>
            <BarChart
              series={[
                { data: [18, 24, 20, 27], label: 'Generated' },
                { data: [12, 19, 17, 23], label: 'Completed' },
              ]}
              height={300}
              xAxis={[{
                data: ['January', 'February', 'March', 'April'],
                scaleType: 'band',
                label: 'Months',
              }]}
            />
          </CardContent>
        </Card>

        {/* ── Pie + Gauge ── */}
        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3}>
          <Card sx={{ flex: 1, border: '1px solid #ede9fe', borderRadius: 3 }} elevation={0}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} gutterBottom>Report Category Share</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                This chart shows the distribution of report requests by category for the current reporting period.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <PieChart
                  series={[{
                    data: [
                      { id: 0, value: 14, label: 'Sales'     },
                      { id: 1, value: 30, label: 'Users'     },
                      { id: 2, value: 6,  label: 'Inventory' },
                      { id: 3, value: 6,  label: 'Finance'   },
                    ],
                  }]}
                  width={208}
                  height={220}
                />
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ flex: 1, border: '1px solid #ede9fe', borderRadius: 3 }} elevation={0}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} gutterBottom>Completion Rate</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                The gauge highlights the current percentage of reports completed on time based on the latest reporting cycle.
              </Typography>
              <Box sx={{ minHeight: 220, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Gauge width={180} height={180} value={70} />
              </Box>
            </CardContent>
          </Card>
        </Stack>

        {/* ── KPI Cards ── */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 2 }}>
          {kpiCards.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <Card key={kpi.label} elevation={0} sx={{ border: '1px solid #ede9fe', borderRadius: 3 }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Box sx={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 44, height: 44, borderRadius: '12px', bgcolor: kpi.bg, mb: 2,
                  }}>
                    <Icon sx={{ color: kpi.color, fontSize: 24 }} />
                  </Box>
                  <Typography variant="h4" fontWeight={800} color="#1e1b4b" sx={{ lineHeight: 1, mb: 0.5 }}>
                    {kpi.value}
                  </Typography>
                  <Typography
                    variant="caption" fontWeight={600} color="text.secondary"
                    sx={{ textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', mb: 1.5 }}
                  >
                    {kpi.label}
                  </Typography>
                  <SparkLineChart data={kpi.spark} height={44} color={kpi.color} />
                </CardContent>
              </Card>
            );
          })}
        </Box>

        {/* ── Portfolio Views Over Time ── */}
        <Card elevation={0} sx={{ border: '1px solid #ede9fe', borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={700} gutterBottom>Portfolio Views Over Time</Typography>
            <Typography variant="caption" color="text.secondary">
              Cumulative article views tracked weekly since publishing
            </Typography>
            <LineChart
              xAxis={[{ data: weeks, scaleType: 'point' }]}
              series={[{ data: weeklyViews, label: 'Total Views', color: '#4338ca', area: true, showMark: true }]}
              height={260}
            />
          </CardContent>
        </Card>

        {/* ── Views per Article + Articles by Topic ── */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
          <Card elevation={0} sx={{ flex: 1, border: '1px solid #ede9fe', borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} gutterBottom>Views per Article</Typography>
              <BarChart
                series={[{ data: articleViews, label: 'Views', color: '#4338ca' }]}
                xAxis={[{ data: articleLabels, scaleType: 'band' }]}
                height={250}
              />
            </CardContent>
          </Card>

          <Card elevation={0} sx={{ minWidth: 280, border: '1px solid #ede9fe', borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} gutterBottom>Articles by Topic</Typography>
              <PieChart
                series={[{ data: topicData, innerRadius: 55 }]}
                width={280}
                height={230}
                colors={['#4338ca', '#f59e0b', '#ec4899', '#3b82f6']}
              />
            </CardContent>
          </Card>
        </Stack>

        {/* ── Skill Proficiency ── */}
        <Card elevation={0} sx={{ border: '1px solid #ede9fe', borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={700} gutterBottom>Skill Proficiency</Typography>
            <BarChart
              layout="horizontal"
              series={[{ data: skillLevels, label: 'Proficiency %', color: '#4338ca' }]}
              yAxis={[{ data: skills, scaleType: 'band' }]}
              xAxis={[{ min: 0, max: 100 }]}
              height={250}
            />
          </CardContent>
        </Card>

        {/* ── Article Breakdown ── */}
        <Card elevation={0} sx={{ border: '1px solid #ede9fe', borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={700} gutterBottom>Article Breakdown</Typography>
            <Stack spacing={1.5}>
              {articles.map((article, i) => (
                <Box
                  key={i}
                  sx={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    p: 1.5, borderRadius: 2, bgcolor: '#f8f7ff', border: '1px solid #ede9fe',
                    flexWrap: 'wrap', gap: 1,
                  }}
                >
                  <Stack direction="row" alignItems="center" gap={1.5} sx={{ flex: 1 }}>
                    <Avatar
                      sx={{
                        bgcolor: tagColors[article.tag]?.bg,
                        color: tagColors[article.tag]?.color,
                        width: 32, height: 32, fontSize: 13, fontWeight: 800,
                      }}
                    >
                      {i + 1}
                    </Avatar>
                    <Typography variant="body2" fontWeight={600} sx={{ flex: 1 }}>
                      {article.title}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Chip
                      label={article.tag} size="small"
                      sx={{ bgcolor: tagColors[article.tag]?.bg, color: tagColors[article.tag]?.color, fontWeight: 700, fontSize: 11 }}
                    />
                    <Chip
                      label={`${article.readTime} min`} size="small" variant="outlined"
                      icon={<AccessTimeIcon style={{ fontSize: 12 }} />}
                      sx={{ fontSize: 11 }}
                    />
                    <Chip
                      label={`${article.views} views`} size="small"
                      sx={{ bgcolor: '#ede9fe', color: '#4338ca', fontWeight: 700, fontSize: 11 }}
                      icon={<VisibilityIcon style={{ fontSize: 12 }} />}
                    />
                  </Stack>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>

      </Stack>
    </Box>
  );
};

export default ReportsPage;