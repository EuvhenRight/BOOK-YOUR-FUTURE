import React, { useState } from "react";
import "./Topbar.css";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";

import logo from "../../assets/download.svg";
import { Avatar, ListItemIcon } from "@mui/material";

export default function MainNavigation() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#56ae5a" }}>
      <Container maxWidth="lg">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Avatar src={logo} sx={{ width: 150 }} />
          </Box>

          <Box
            component="div"
            sx={{
              display: {
                xs: "none",
                sm: "block",
              },
            }}
          >
            {/* Horizontal navigation menu */}
            <List sx={{ display: "flex" }}>
              <ListItemButton>
                <ListItemText
                  primary={
                    <Link to="/admin" className="link">
                      Home/admin
                    </Link>
                  }
                />
              </ListItemButton>
              <ListItemButton>
                <ListItemText
                  primary={
                    <Link to="/student" className="link">
                      Home/student
                    </Link>
                  }
                />
              </ListItemButton>
              <ListItemButton sx={{ color: "white" }}>
                <ListItemText
                  primary={
                    <Link to="/events" className="link">
                      Events
                    </Link>
                  }
                />
              </ListItemButton>
              <ListItemButton>
                <ListItemText
                  primary={
                    <Link to="/userProfile" className="link">
                      Profile
                    </Link>
                  }
                />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon
                    sx={{ color: "grey" }}
                    onClick={() => {
                      // logout logic here
                    }}
                  />
                </ListItemIcon>
              </ListItemButton>
            </List>
          </Box>

          <IconButton
            edge="end"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
            sx={{
              display: {
                xs: "block",
                sm: "none",
              },
            }}
          >
            <MenuIcon />
          </IconButton>

          <Drawer
            anchor="left"
            open={open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            <Box
              sx={{
                p: 1,
                height: 2,
              }}
            >
              <IconButton sx={{ mb: 2 }}>
                <CloseIcon onClick={toggleDrawer(false)} />
              </IconButton>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ mb: 2 }}>
                <ListItemButton>
                  <ListItemIcon>
                    <HomeIcon sx={{ color: "grey" }} />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>

                <ListItemButton>
                  <ListItemIcon>
                    <CalendarMonthIcon sx={{ color: "grey" }} />
                  </ListItemIcon>
                  <ListItemText primary="Events" />
                </ListItemButton>

                <ListItemButton>
                  <ListItemIcon>
                    <GroupIcon sx={{ color: "grey" }} />
                  </ListItemIcon>
                  <ListItemText primary="Group" />
                </ListItemButton>

                <ListItemButton>
                  <ListItemIcon>
                    <PersonIcon sx={{ color: "grey" }} />
                  </ListItemIcon>
                  <ListItemText primary="Student" />
                </ListItemButton>

                <ListItemButton>
                  <ListItemIcon>
                    <LogoutIcon sx={{ color: "grey" }} />
                  </ListItemIcon>
                  <ListItemText primary="Log Out" />
                </ListItemButton>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  position: "absolute",
                  bottom: "0",
                  left: "30%",
                  transform: "translate(-50%, 0)",
                }}
              ></Box>
            </Box>
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
