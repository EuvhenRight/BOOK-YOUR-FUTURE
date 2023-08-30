import React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function CustomTabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function EmptyGroupData() {
  return (
    <Typography variant="body1">No events scheduled for this group</Typography>
  );
}

function GroupData({ data }) {
  return (
    <Box
      elevation={1}
      key={data.name}
      sx={{
        paddingY: ".75rem",
        paddingX: "1.5rem",
        borderBottom: "1px solid #e0e0e0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: ".75rem",
        textAlign: "left",
        ":hover": { backgroundColor: "#f5f5f5" },
      }}
    >
      <div>
        <Typography variant="subtitle2">{data.date}</Typography>
        <Typography variant="subtitle2">{data.time}</Typography>
      </div>
      <div>
        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
          {data.name}
        </Typography>
        <Typography variant="subtitle2">{data.title}</Typography>
      </div>
      <div>
        <Typography variant="subtitle1" align="right">
          {data.status}
        </Typography>
      </div>
    </Box>
  );
}

GroupData.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default function TabPanels({ value, groupLabels, demoData }) {
  const getGroupData = (groupNumber) => {
    return demoData.filter((data) => data.groupNumber === groupNumber);
  };

  return (
    <>
      {groupLabels.map((group, index) => {
        const groupData = getGroupData(group);
        return (
          <CustomTabPanel key={index} value={value} index={index}>
            {groupData.length > 0 ? (
              groupData.map((data) => <GroupData key={data.name} data={data} />)
            ) : (
              <EmptyGroupData />
            )}
          </CustomTabPanel>
        );
      })}
    </>
  );
}

TabPanels.propTypes = {
  value: PropTypes.number.isRequired,
  groupLabels: PropTypes.arrayOf(PropTypes.number).isRequired,
  demoData: PropTypes.arrayOf(
    PropTypes.shape({
      groupNumber: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
};
