import { Box, CircularProgress, Divider, Typography, Paper } from "@mui/material";
import ChatElement from "../listChat/ListChat";
import ChatElementPublic from "../ChatElementPublic";
import { useGetPublicGroupsQuery, useGetUserGroupsQuery } from "../../services/api";

const UserCards = () => {
  const { data: userData, isLoading } = useGetUserGroupsQuery();
  const { data: publicGroup, isLoading: publicGroupLoading } = useGetPublicGroupsQuery();

  if (isLoading || publicGroupLoading) {
    return (
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{
        width: "22%",
        minWidth: "250px",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        padding: "16px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      
      {/* Public Groups */}
      <Typography variant="h6" fontWeight={600} textAlign="center" color="secondary">
        Public Groups
      </Typography>

      {/* Public Group List - Scrollable */}
      <Box
        display="flex"
        flexDirection="column"
        gap="10px"
        padding="10px"
        sx={{
          overflowY: "auto", // Enables scrolling
          maxHeight: "calc(50vh - 50px)", // Adjust maxHeight to half the container
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-thumb": { backgroundColor: "#bbb", borderRadius: "10px" },
        }}
      >
        {publicGroup?.data.length > 0 &&
          publicGroup?.data.map((el: any, ind: any) => (
            <ChatElementPublic el={el} key={ind} />
          ))}
      </Box>
      <Divider sx={{ marginY: "12px" }} />
      {/* Header */}
      <Typography variant="h6" fontWeight={600} textAlign="center" color="primary">
        Chats
      </Typography>

     

      {/* User Chats - Scrollable */}
      <Box
        display="flex"
        flexDirection="column"
        gap="10px"
        padding="10px"
        sx={{
          overflowY: "auto", // Enables scrolling
          maxHeight: "calc(50vh - 50px)", // Adjust maxHeight to half the container
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-thumb": { backgroundColor: "#bbb", borderRadius: "10px" },
        }}
      >
        {userData?.data?.groups.map((el: any, ind: any) => (
          <ChatElement el={el} key={ind} />
        ))}
      </Box>

      <Divider sx={{ marginY: "12px" }} />

    </Paper>
  );
};

export default UserCards;
