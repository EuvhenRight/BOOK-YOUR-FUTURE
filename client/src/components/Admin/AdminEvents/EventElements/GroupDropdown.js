import React from "react";
import { useState, useEffect } from "react";
import useFetch from "../../../../hooks/useFetch";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import PropTypes from "prop-types";

export default function GroupDropdown({ value, onChange }) {
  const [groupList, setGroupList] = useState([]);

  const { performFetch, error } = useFetch("/group/all", handleReceivedData);

  useEffect(() => {
    performFetch();
  }, []);

  function handleReceivedData(data) {
    setGroupList(data.groupsData);
  }

  if (error) return <div>Error: {error.message}</div>;

  //eslint-disable-next-line
  // const activeGroups = groupList
  //   .filter((group) => group.status === "active")
  //   .map((group) => group.numberOfGroupName);

  const activeGroups = groupList.filter((group) => group.status === "active");

  return (
    <FormControl sx={{ minWidth: 220 }}>
      <InputLabel id="group-select-label">Group</InputLabel>
      <Select
        id="group-select"
        variant="outlined"
        value={value}
        onChange={onChange}
        label="Group"
      >
        {/* {activeGroups.map((groupNumber) => (
          <MenuItem key={groupNumber} value={groupNumber}>
            {groupNumber}
          </MenuItem>
        ))} */}
        {activeGroups.map((group) => (
          <MenuItem key={group._id} value={group._id}>
            {group.numberOfGroupName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

GroupDropdown.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};