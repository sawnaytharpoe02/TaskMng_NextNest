import * as React from 'react';
import { ReactElement, useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ClearIcon from '@mui/icons-material/Clear';
import AddNewBtn from '@/components/addNewBtn';
import palette from '@/theme/palette';
import dayjs from 'dayjs';
import Loading from '@/components/loading';
import { useRouter } from 'next/router';
import { StyledGridOverlay } from '@/components/styledGridOverlay';

const ReportListPage = ({ reports, isLoading }: any) => {
  const [formData, setFormData] = useState({
    reportTo: '',
    reportBy: '',
    selectedDate: null,
  });
  const router = useRouter();

  const statusOptions = [
    { value: 0, label: 'Open' },
    { value: 1, label: 'In Progress' },
    { value: 2, label: 'Finish' },
    { value: 3, label: 'Close' },
  ];

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date: any) => {
    setFormData({
      ...formData,
      selectedDate: date,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formattedDate = formData.selectedDate ? dayjs(formData.selectedDate).format('YYYY-MM-DD') : '';
    const formattedReportTo = formData.reportTo.toLowerCase().trim();
    const formattedBy = formData.reportBy.toLowerCase().trim();

    const reportToParam = formData.reportTo ? `&reportTo=${formattedReportTo}` : '';
    const reportByParam = formData.reportBy ? `&reportBy=${formattedBy}` : '';
    const dateParam = formData.selectedDate ? `&date=${formattedDate}` : '';
    router.push(`${router.pathname}?page=1&limit=2000${reportToParam}${reportByParam}${dateParam}`);
  };

  if (isLoading) return <Loading />;

  return (
    <Box sx={{ height: 400, width: '100%', my: 4 }}>
      <Grid
        container
        spacing={2}
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}
      >
        <Grid item>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
              <Grid item xs={6} sm={3}>
                <TextField
                  name="reportTo"
                  id="report-to"
                  value={formData.reportTo}
                  onChange={handleInputChange}
                  placeholder="Report To"
                  variant="outlined"
                  sx={{
                    '.MuiInputBase-root': {
                      borderRadius: '.4rem',
                    },
                    '.MuiOutlinedInput-input': {
                      p: '11.5px 14px',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  name="reportBy"
                  id="report-by"
                  value={formData.reportBy}
                  onChange={handleInputChange}
                  placeholder="Report By"
                  variant="outlined"
                  InputProps={{
                    endAdornment: formData.reportBy && (
                      <InputAdornment
                        position="end"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            reportBy: '',
                          })
                        }
                        style={{ cursor: 'pointer' }}
                      >
                        <ClearIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '.MuiInputBase-root': {
                      borderRadius: '.4rem',
                    },
                    '.MuiOutlinedInput-input': {
                      p: '11.5px 14px',
                      borderRadius: '.7rem',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <DatePicker
                  format="YYYY/MM/DD"
                  value={formData.selectedDate}
                  onChange={(newValue: any) => handleDateChange(newValue)}
                  sx={{
                    '.MuiInputBase-root': {
                      borderRadius: '.4rem',
                    },
                    '.MuiOutlinedInput-input': {
                      p: '11.5px 14px',
                      borderRadius: '.7rem',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <Button
                  variant="contained"
                  size="large"
                  type="submit"
                  sx={{
                    backgroundColor: palette.primary.main,
                    color: palette.text.primary,
                    borderRadius: '.7rem',
                    '&:hover': {
                      backgroundColor: palette.primary.main,
                      boxShadow: 'none',
                    },
                  }}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item>
          <AddNewBtn AddNewBtnText="Add Report" path="/report/add" />
        </Grid>
      </Grid>
      <Grid
        py={4}
        container
        spacing={3}
        sx={{
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {reports?.data?.length === 0 ? (
          <StyledGridOverlay>
            <svg
              style={{ flexShrink: 0, marginTop: '5rem' }}
              width="240"
              height="150"
              viewBox="0 0 184 152"
              aria-hidden
              focusable="false"
            >
              <g fill="none" fillRule="evenodd">
                <g transform="translate(24 31.67)">
                  <ellipse className="ant-empty-img-5" cx="67.797" cy="106.89" rx="67.797" ry="12.668" />
                  <path
                    className="ant-empty-img-1"
                    d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
                  />
                  <path
                    className="ant-empty-img-2"
                    d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
                  />
                  <path
                    className="ant-empty-img-3"
                    d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
                  />
                </g>
                <path
                  className="ant-empty-img-3"
                  d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
                />
                <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
                  <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
                  <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
                </g>
              </g>
            </svg>
            <Box sx={{ mt: 2 }}>No Data</Box>
          </StyledGridOverlay>
        ) : (
          reports?.data?.map((row: any) => {
            return (
              <Grid key={row._id} item>
                <Card
                  sx={{
                    bgcolor: palette.common.white,
                    boxShadow: 'none',
                    width: '340px',
                    p: 1,
                    borderRadius: '1.4rem',
                    '@media (min-width: 320px)': {
                      width: '335px',
                    },
                  }}
                >
                  <CardContent>
                    <Box>
                      <Avatar
                        sx={{
                          width: 60,
                          height: 60,
                        }}
                        alt="reporter profile"
                        src={row.reportBy.profile}
                      />
                      <Typography sx={{ my: 1 }}>
                        <Box component="span" sx={{ fontWeight: '600', fontSize: '1.2rem' }}>
                          {row.reportBy.employeeName}
                        </Box>{' '}
                        ({row.reportBy.position === '1' ? 'Member' : 'Admin'})
                      </Typography>
                    </Box>
                    <Box>
                      <Typography>Report To : {row.reportTo}</Typography>
                      <Typography>Project : {row.project}</Typography>

                      <Typography>【所感】Problem : {row.problemFeeling}</Typography>
                      <Typography>【実績】- {row.taskTitle}</Typography>
                      <Typography>Date : {dayjs(row.createdAt).format('YYYY-MM-DD')}</Typography>
                      <Stack spacing={1} sx={{ mt: 1.75 }} direction={{ xs: 'column', sm: 'row' }}>
                        <Chip label={row.percentage + '%'} sx={{ backgroundColor: '#D9D8DF' }} />
                        <Chip label={row.types} sx={{ backgroundColor: '#DACEF2' }} />
                        <Chip label={statusOptions.find((option) => option.value === row.status)?.label} />
                        <Chip label={row.hours + 'hrs'} sx={{ backgroundColor: '#F2CED6' }} />
                      </Stack>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })
        )}
      </Grid>
    </Box>
  );
};

export default ReportListPage;
ReportListPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export async function getServerSideProps(context: any) {
  try {
    const res = await fetch(
      `http://localhost:8080/reports/list?${new URLSearchParams(context.query).toString()}`
    );
    const reports = await res.json();

    return { props: { reports } };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { props: { reports: null } };
  }
}
