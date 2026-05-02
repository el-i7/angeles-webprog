import React from 'react';
import { Typography, Box, Stack, Card, CardContent, Chip, Avatar } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import ArticleIcon from '@mui/icons-material/Article';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

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

function ReportsPage() {
  return (
    <>
      {/* ── Page Header ── */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={800} color="#4338ca">
          Reports
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Portfolio content analytics — article performance, skill breakdown, and reading trends for Angeles · BSIT INF 234
        </Typography>
      </Box>

      {/* ── KPI Cards — Icon on top, label below, big value ── */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 2,
        mb: 4,
      }}>
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.label} elevation={0} sx={{
              border: '1px solid #ede9fe',
              borderRadius: 3,
              overflow: 'visible',
            }}>
              <CardContent sx={{ p: 2.5 }}>
                {/* Icon — top, on its own, with colored bg circle */}
                <Box sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 44,
                  height: 44,
                  borderRadius: '12px',
                  bgcolor: kpi.bg,
                  mb: 2,
                }}>
                  <Icon sx={{ color: kpi.color, fontSize: 24 }} />
                </Box>

                {/* Big value */}
                <Typography variant="h4" fontWeight={800} color="#1e1b4b" sx={{ lineHeight: 1, mb: 0.5 }}>
                  {kpi.value}
                </Typography>

                {/* Label */}
                <Typography variant="caption" fontWeight={600} color="text.secondary"
                  sx={{ textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', mb: 1.5 }}>
                  {kpi.label}
                </Typography>

                {/* Sparkline */}
                <SparkLineChart data={kpi.spark} height={44} color={kpi.color} />
              </CardContent>
            </Card>
          );
        })}
      </Box>

      {/* ── Views Over Time ── */}
      <Card elevation={0} sx={{ border: '1px solid #ede9fe', borderRadius: 3, mb: 3 }}>
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

      {/* ── Bar + Pie ── */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ mb: 3 }}>
        <Card elevation={0} sx={{ flex: 1, border: '1px solid #ede9fe', borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={700} gutterBottom>Views per Article</Typography>
            <Typography variant="caption" color="text.secondary">
              Individual article performance by total views
            </Typography>
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
            <Typography variant="caption" color="text.secondary">
              Distribution of published articles per category
            </Typography>
            <PieChart
              series={[{ data: topicData, innerRadius: 55 }]}
              width={280}
              height={230}
              colors={['#4338ca', '#f59e0b', '#ec4899', '#3b82f6']}
            />
          </CardContent>
        </Card>
      </Stack>

      {/* ── Skills Bar ── */}
      <Card elevation={0} sx={{ border: '1px solid #ede9fe', borderRadius: 3, mb: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={700} gutterBottom>Skill Proficiency</Typography>
          <Typography variant="caption" color="text.secondary">
            Self-assessed proficiency levels across core technologies
          </Typography>
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
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
            Summary of all published articles with tag, read time, and views
          </Typography>
          <Stack spacing={1.5}>
            {articles.map((article, i) => (
              <Box key={i} sx={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                p: 1.5, borderRadius: 2, bgcolor: '#f8f7ff',
                border: '1px solid #ede9fe', flexWrap: 'wrap', gap: 1,
              }}>
                <Stack direction="row" alignItems="center" gap={1.5} sx={{ flex: 1 }}>
                  <Avatar sx={{
                    bgcolor: tagColors[article.tag]?.bg,
                    color: tagColors[article.tag]?.color,
                    width: 32, height: 32, fontSize: 13, fontWeight: 800,
                  }}>
                    {i + 1}
                  </Avatar>
                  <Typography variant="body2" fontWeight={600} sx={{ flex: 1 }}>
                    {article.title}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap={1}>
                  <Chip label={article.tag} size="small"
                    sx={{ bgcolor: tagColors[article.tag]?.bg, color: tagColors[article.tag]?.color,
                          fontWeight: 700, fontSize: 11 }} />
                  <Chip label={`${article.readTime} min`} size="small" variant="outlined"
                    icon={<AccessTimeIcon style={{ fontSize: 12 }} />} sx={{ fontSize: 11 }} />
                  <Chip label={`${article.views} views`} size="small"
                    sx={{ bgcolor: '#ede9fe', color: '#4338ca', fontWeight: 700, fontSize: 11 }}
                    icon={<VisibilityIcon style={{ fontSize: 12 }} />} />
                </Stack>
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}

export default ReportsPage;