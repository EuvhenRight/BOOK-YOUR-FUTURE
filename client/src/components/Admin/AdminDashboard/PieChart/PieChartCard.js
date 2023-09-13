import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import BasicPie from "./PieChart";
import EventTwoToneIcon from "@mui/icons-material/EventTwoTone";

export default function PieChartCard() {
  return (
    <>
      <Card
        style={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "row",
          margin: "16px",
        }}
      >
        <CardContent
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            flex: "2",
            backgroundColor: "white",
            padding: "16px",
            color: "#00695c",
          }}
        >
          <Typography variant="h6">Active Students</Typography>
          <Typography variant="h4">{40}</Typography>
        </CardContent>
        <div
          style={{
            flex: "1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <AccountCircleTwoToneIcon
            style={{ fontSize: 50, color: "#00695c" }}
          />
        </div>
      </Card>

      <Card
        style={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "row",
          margin: "16px",
        }}
      >
        <CardContent
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            flex: "2",
            backgroundColor: "white",
            padding: "16px",
            color: "#1976d2",
          }}
        >
          <Typography variant="h6">Upcoming Events</Typography>
          <Typography variant="h4">{17}</Typography>
        </CardContent>
        <div
          style={{
            flex: "1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <EventTwoToneIcon
            style={{ fontSize: 50, color: "#1976d2" }} // Matching color with the text
          />
        </div>
      </Card>
      <Card sx={{ my: 3, mx: 2 }}>
        <BasicPie />
      </Card>
    </>
  );
}
