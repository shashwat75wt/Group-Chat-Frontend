import { useState } from "react";
import { 
  Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions 
} from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  const [open, setOpen] = useState(false); // State to control modal

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100vh"
      bgcolor="#f0f4f8"
      border="1px solid #ddd"
      borderBottom="10px solid #3D5A80"
      sx={{ padding: "20px" }}
    >
      <Typography
        variant="h2"
        textAlign="center"
        fontWeight={700}
        sx={{ color: "#2D3E50", marginBottom: 3 }}
      >
        Welcome to Our Real-Time Collaboration Platform!
      </Typography>

      <Typography
        variant="h5"
        textAlign="center"
        sx={{ color: "#3D5A80", marginBottom: 4 }}
      >
        Stay connected with your teams and engage in seamless communication with real-time chat and group management features. Create your groups, join public channels, and start collaborating today!
      </Typography>

      <Box display="flex" justifyContent="center" gap={2}>
        {/* Navigate to create group page */}
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/app/createGroup"
          sx={{
            padding: "12px 24px",
            fontSize: "16px",
            textTransform: "none",
            boxShadow: 3,
            "&:hover": { backgroundColor: "#3D5A80" },
          }}
        >
          Create a Group
        </Button>

        {/* Open the pop-up */}
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setOpen(true)}
          sx={{
            padding: "12px 24px",
            fontSize: "16px",
            textTransform: "none",
            borderColor: "white",
          }}
        >
          Explore Public Groups
        </Button>
      </Box>

      {/* MODAL - Public Groups List */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Public Groups</DialogTitle>
        <DialogContent>
          <Typography>All Public Groups is Listed on your left side</Typography>
          {/* Fetch and display public groups here */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Home;
