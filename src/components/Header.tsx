import {
  AppBar,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useGetGroupAnalyticsQuery } from "../services/api";
import { motion } from "framer-motion";
import styled from "styled-components";

// Styled Components with Glassmorphism and Pro Look
const StyledAppBar = styled(AppBar)`
  background: rgba(20, 30, 48, 0.85);
  backdrop-filter: blur(8px);
  border-radius: 15px;
  padding: 10px 20px;
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2);
  z-index: 1200;
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledAvatar = styled(Avatar)`
  cursor: pointer;
  box-shadow: 0px 3px 10px rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.2);
    box-shadow: 0px 8px 20px rgba(255, 255, 255, 0.3);
  }
`;

const GroupName = styled(Typography)`
  flex-grow: 1;
  font-weight: 700;
  color: #f8f9fa;
  text-align: center;
  letter-spacing: 1.5px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled(Box)`
  padding: 5px;
  border-radius: 50%;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0px 6px 15px rgba(255, 255, 255, 0.3);
  }
`;

const StyledDialog = styled(Dialog)`
  backdrop-filter: blur(5px);
  background: rgba(0, 0, 0, 0.4);
`;

const StyledDialogTitle = styled(DialogTitle)`
  background: #162447;
  color: #f8f9fa;
  padding: 20px;
  text-align: center;
  font-weight: bold;
  border-bottom: 2px solid #1f4068;
`;

const StyledDialogContent = styled(DialogContent)`
  background: #1b1b2f;
  color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
`;

const StyledDialogActions = styled(DialogActions)`
  background: #1b1b2f;
  padding: 15px;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  background: linear-gradient(135deg, #00adb5, #0082c8);
  color: white;
  font-weight: 600;
  padding: 8px 20px;
  border-radius: 20px;

  &:hover {
    background: linear-gradient(135deg, #0082c8, #00adb5);
  }
`;

//Header Component
const Header = () => {
  const { name, id } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  //Fetch Group Analytics Data
  const { data, isLoading } = useGetGroupAnalyticsQuery(
    { id: id ?? "" },
    { skip: !id }
  );

  if (isLoading) {
    return (
      <Box
        width="100vw"
        padding={5}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress size={60} color="primary" />
      </Box>
    );
  }

  //Extract Group Analytics Data
  const groupName = data?.data?.group?.name || "Unknown Group";
  const adminName = data?.data?.group?.admin?.name || "Unknown Admin";
  const members = data?.data?.group?.members || [];
  const type = data?.data?.group?.type || "unknown";

  return (
    <>
      <Box sx={{ flexGrow: 1, mt: 1 }}>
        <StyledAppBar position="static">
          <StyledToolbar>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpen(true)}
            >
              <StyledAvatar
                alt={name}
                src={`https://api.dicebear.com/5.x/initials/svg?seed=${name}`}
              />
            </motion.div>

            <GroupName variant="h5">{name}</GroupName>

            <CloseButton onClick={() => navigate("/app")}>
              <CloseIcon sx={{ color: "#f8f9fa" }} />
            </CloseButton>
          </StyledToolbar>
        </StyledAppBar>
      </Box>

      {/* Group Analytics Dialog */}
      <StyledDialog open={open} onClose={() => setOpen(false)} fullWidth>
        <motion.div
          initial={{ opacity: 0, y: "-20px" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <StyledDialogTitle>Group Analytics</StyledDialogTitle>

          <StyledDialogContent>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Group Name: <strong>{groupName}</strong>
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              Admin: <strong>{adminName}</strong>
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              Type: <strong>{type}</strong>
            </Typography>

            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              Members:
            </Typography>
            <Box sx={{ marginLeft: 2 }}>
              {members.length > 0 ? (
                members.map((member) => (
                  <Typography key={member._id} variant="body2">
                    • {member.name}
                  </Typography>
                ))
              ) : (
                <Typography variant="body2">No members available</Typography>
              )}
            </Box>
          </StyledDialogContent>

          <StyledDialogActions>
            <StyledButton onClick={() => setOpen(false)}>Close</StyledButton>
          </StyledDialogActions>
        </motion.div>
      </StyledDialog>
    </>
  );
};

export default Header;
