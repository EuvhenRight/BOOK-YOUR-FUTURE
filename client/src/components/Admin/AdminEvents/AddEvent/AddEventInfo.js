import React from "react";
import { TextField, Stack } from "@mui/material";
import EventContext from "./EventContext";
import { useContext } from "react";

import {
  DurationDropdown,
  LocationToggle,
  ReceiverToggle,
  GroupDropdown,
  StudentDropdown,
} from "./AddEventElements";

export default function MainEventInfo() {
  const { eventData, setEventData } = useContext(EventContext);

  function handleDropdownChange(name) {
    return (event) => {
      setEventData((prev) => ({
        ...prev,
        [name]: event.target.value,
      }));
    };
  }

  return (
    <>
      <Stack spacing={4}>
        <TextField
          id="standard-basic"
          label="Title"
          variant="standard"
          fullWidth
          value={eventData.title}
          onChange={handleDropdownChange("title")}
        />

        <TextField
          id="standard-multiline-flexible"
          label="Description"
          multiline
          maxRows={4}
          variant="standard"
          fullWidth
          value={eventData.description}
          onChange={handleDropdownChange("description")}
        />
      </Stack>
      <Stack direction="row" justifyContent="space-between" sx={{ mt: 6 }}>
        <DurationDropdown
          value={eventData.duration}
          onChange={handleDropdownChange("duration")}
        />
        <LocationToggle
          value={eventData.location}
          onChange={handleDropdownChange("location")}
        />
      </Stack>
      <ReceiverToggle
        value={eventData.receiverType}
        onChange={handleDropdownChange("receiverType")}
      />
      <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
        <GroupDropdown
          value={eventData.group}
          onChange={handleDropdownChange("group")}
        />
        <StudentDropdown
          value={eventData.student}
          onChange={handleDropdownChange("student")}
        />
      </Stack>
    </>
  );
}