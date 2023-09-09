import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import PropTypes from "prop-types";
import useFetch from "../../../../hooks/useFetch";

export default function FilterByGroup({ onFilterChange }) {
  const [group, setGroup] = useState("");
  const [groupList, setGroupList] = useState([]);

  const { performFetch, error } = useFetch("/group/all", handleReceivedData);

  useEffect(() => {
    performFetch();
  }, []);

  function handleReceivedData(data) {
    setGroupList(data.groupsData);
  }

  const handleChange = (e) => {
    const selectGroup = e.target.value;
    setGroup(selectGroup);
    onFilterChange(selectGroup);
  };

  if (error) return <div>Error: {error.message}</div>;

  const activeGroups = groupList
    .filter((group) => group.status === "active")
    .map((group) => group.numberOfGroupName);

  return (
    <FormControl size="small" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="group-label">Group</InputLabel>
      <Select
        labelId="group-label"
        variant="outlined"
        size="small"
        value={group}
        onChange={handleChange}
        label="Group"
      >
        <MenuItem value="">
          <em>All</em>
        </MenuItem>
        {activeGroups.map((group) => (
          <MenuItem key={group} value={group.toString()}>
            {`Group ${group}`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

FilterByGroup.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

// const activeGroups = groupList
//     .filter(group => group.status === "active")
//     .map(group => ({ label: group.numberOfGroupName, value: group._id }));

//   return (
//     <FormControl size="small" sx={{ m: 1, minWidth: 120 }}>
//       <InputLabel id="group-label">Group</InputLabel>
//       <Select
//         labelId="group-label"
//         variant="outlined"
//         size="small"
//         value={group}
//         onChange={handleChange}
//         label="Group"
//       >
//         <MenuItem value="">
//           <em>All</em>
//         </MenuItem>
//         {activeGroups.map(groupItem => (
//           <MenuItem key={groupItem.value} value={groupItem.value}>
//             {`Group ${groupItem.label}`}
//           </MenuItem>
//         ))}
//       </Select>
//     </FormControl>
//   );
// }
