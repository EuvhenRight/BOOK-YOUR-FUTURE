import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./Notifications.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useRadioContext } from "../StudentEventManagement/TimeSlotContext";

export default function Notifications(props) {
  const { notifications } = props;
  const { setEventName } = useRadioContext();
  const [visibleNotifications, setVisibleNotifications] = useState([]);

  useEffect(() => {
    setVisibleNotifications(notifications.slice(0, 2));
  }, [notifications]);

  const handleDismiss = (notificationId) => {
    setVisibleNotifications((prevNotifications) =>
      prevNotifications.filter(
        (notification) => notification.id !== notificationId
      )
    );
  };

  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      {visibleNotifications.map((notification, index) => (
        <Alert
          key={index}
          className="animated-alert"
          action={
            notification.action ? (
              <Link
                to={notification.action.link}
                onClick={() => {
                  setEventName(notification.id);
                  handleDismiss(notification.id);
                }}
                sx={{ textDecoration: "none" }}
              >
                <Button
                  style={{ color: "black" }}
                  size="small"
                  className="book-a-slot-button"
                >
                  {notification.action.label}
                  <ChevronRightIcon />
                </Button>
              </Link>
            ) : null
          }
          severity={notification.type || "info"}
        >
          {notification.message}
        </Alert>
      ))}
    </Stack>
  );
}

Notifications.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      message: PropTypes.string,
      type: PropTypes.string,
      action: PropTypes.shape({
        label: PropTypes.string,
        link: PropTypes.string,
      }),
    })
  ),
};
