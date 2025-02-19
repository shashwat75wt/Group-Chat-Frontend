import React, { useState, useMemo } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useMediaQuery,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Menu,
  Avatar,
  ListItemIcon,
  Slide,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/store";
import { useLogoutMutation } from "../../services/api";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { isLoggedIn, user } = useAppSelector((state) => state.auth);
  const [dialogOpen, setDialogOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [logoutUser] = useLogoutMutation();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (route?: "profile" | "createGroup" | "logout") => {
    return () => {
      if (route === "logout") {
        setDialogOpen(true);
      } else if (route === "profile") {
        navigate("/app/profile");
      } else if (route === "createGroup") {
        navigate("/app/createGroup");
      }
      setAnchorEl(null);
    };
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogoutConfirm = () => {
    setDialogOpen(false);
    logoutUser();
  };

  const handleLogoutCancel = () => {
    setDialogOpen(false);
  };

  // Desktop Navbar Links
  const desktopLinks = useMemo(
    () => (
      <Box sx={{ display: "flex", gap: 2 }}>
        {!isMobile && isLoggedIn && (
          <Button
            startIcon={<GroupAddIcon />}
            color="inherit"
            component={Link}
            to="/app/createGroup"
          >
            Create Group
          </Button>
        )}
        
      </Box>
    ),
    [isLoggedIn, isMobile]
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* AppBar */}
      <AppBar
        position="sticky"
        sx={{
          background: "linear-gradient(to right, #1e3c72, #2a5298)",
          color: "white",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Toolbar
  sx={{
    display: "flex",
    justifyContent: isLoggedIn ? "space-between" : "center",
  }}
>
          {/* Logo */}
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600 }}>
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              PulseChat
            </Link>
          </Typography>

          {/* Desktop Navbar Links */}
          {!isMobile && desktopLinks}

          {/* Profile Dropdown */}
          {isLoggedIn && (
            <Box marginLeft="auto">
              <IconButton size="large" onClick={handleMenuOpen} color="inherit">
                <Avatar
                  alt={user?.name || "User"}
                  src={
                    user?.imageUrl ||
                    `https://api.dicebear.com/5.x/initials/svg?seed=${user?.name}`
                  }
                  sx={{ width: 40, height: 40, border: "2px solid white" }}
                />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose()}
                PaperProps={{
                  elevation: 8,
                  sx: {
                    backgroundColor: "#2a5298",
                    color: "white",
                    minWidth: "160px",
                    "& .MuiMenuItem-root": {
                      "&:hover": {
                        backgroundColor: "#1e3c72",
                      },
                    },
                  },
                }}
              >
                <MenuItem onClick={handleMenuClose("profile")}>
                  <ListItemIcon>
                    <PersonIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  Profile
                </MenuItem>
                <MenuItem onClick={handleMenuClose("createGroup")}>
                  <ListItemIcon>
                    <GroupAddIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  Create Group
                </MenuItem>
                <MenuItem onClick={handleMenuClose("logout")}>
                  <ListItemIcon>
                    <LogoutIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          )}

          {/* Mobile Menu */}
          {isMobile && (
            <IconButton color="inherit" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={open} onClose={toggleDrawer}>
        <Slide direction="left" in={open} mountOnEnter unmountOnExit>
          <Box role="presentation" onClick={toggleDrawer}>
            <List sx={{ width: 250 }}>
              <ListItem component={Link} to="/app/profile">
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
              <ListItem component={Link} to="/app/createGroup">
                <ListItemIcon>
                  <GroupAddIcon />
                </ListItemIcon>
                <ListItemText primary="Create Group" />
              </ListItem>
              {isLoggedIn && (
                <>
                  <Divider />
                  <ListItem button onClick={() => setDialogOpen(true)}>
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItem>
                </>
              )}
            </List>
          </Box>
        </Slide>
      </Drawer>

      {/* Logout Confirmation Dialog */}
      <Dialog open={dialogOpen} onClose={handleLogoutCancel}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>Are you sure you want to logout?</DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel} color="primary">
            No
          </Button>
          <Button onClick={handleLogoutConfirm} color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Navbar;
