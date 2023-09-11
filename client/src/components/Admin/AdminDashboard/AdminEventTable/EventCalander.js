import React, { useEffect, useState } from "react";
import AdminCalender from "../Calender/AdminCalender";
import Box from "@mui/material/Box";
import { CssBaseline, Container } from "@mui/material";
import AdminEventTable from "./AdminEventTable";
import Grid from "@mui/material/Grid";
import useFetch from "../../../../hooks/useFetch";
import todayDate from "../../../Student/StudentEventManagement/FormatDate";

export default function StudentDashboard() {
  function processData(responseData) {
    if (responseData.success === true) {
      const eventsData = responseData.eventsData;
      // eslint-disable-next-line
      console.error("works", eventsData);

      return eventsData;
    } else {
      // eslint-disable-next-line
      console.error("API response indicates an error:", responseData);
      return [];
    }
  }

  const [selectedDate, setSelectedDate] = useState(todayDate);
  const [events, setEvents] = useState([]);

  //eslint-disable-next-line
  console.log(events);

  const { isLoading, error, performFetch } = useFetch(
    "/event/all",
    handleEventsUpdate
  );

  const renderContent = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    } else if (error) {
      return <p>Error: {error.message}</p>;
    } else {
      return <AdminEventTable events={events} selectedDate={selectedDate} />;
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    performFetch();
  };

  function handleEventsUpdate(responseData) {
    const data = processData(responseData);
    setEvents(data);
  }

  useEffect(() => {
    performFetch();
  }, []);

  return (
    <Container sx={{ height: { md: "550px" } }}>
      <Box sx={{ flexGrow: 1, display: "flex" }}>
        <CssBaseline />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignContent: "start",
            justifyContent: "space-between",
          }}
        >
          <Grid container spacing={3}>
            656
            <Grid item xs={12} sm={12} md={12} lg={12}></Grid>
            <Grid item mt="2" xs={12} sm={12} md={3} lg={4}>
              <AdminCalender
                value={selectedDate}
                onDateSelected={handleDateChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={9} lg={8}>
              {renderContent()}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}