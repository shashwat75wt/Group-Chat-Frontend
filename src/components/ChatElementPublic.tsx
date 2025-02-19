import { Avatar, Box, Button, Typography } from "@mui/material";
import { useJoinPublicGroupMutation } from "../services/api";

interface ChatElementProps {
  el: { name: string; _id: string };
}

const ChatElementPublic: React.FC<ChatElementProps> = ({ el }) => {
  const [joinGroup, { isLoading }] = useJoinPublicGroupMutation();

  const handleJoin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    try {
      const res = await joinGroup({ id: el._id }).unwrap();
      window.location.reload();
      console.log(res);
    } catch (error) {
      console.error("Error joining group:", error);
    }
  };

  return (
    <Box
      padding={2}
      borderRadius={2}
      border="1px solid #ddd"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        backgroundColor: "#f5f5f5",
        transition: "background-color 300ms, transform 300ms",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#e0e0e0",
          transform: "translateY(-3px)", // Subtle lift effect on hover
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Add shadow on hover
        },
      }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar
          alt={el.name}
          src={`https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(el.name)}`}
          sx={{
            width: 40,
            height: 40,
            border: "2px solid #fff", // White border for Avatar
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", // Soft shadow
          }}
        />
        <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
            letterSpacing: 1,
            color: "#333",
            transition: "color 300ms",
            "&:hover": {
              color: "#1976d2", // Hover effect to change text color
            },
          }}
        >
          {el.name}
        </Typography>
      </Box>

      <Button
        variant="contained"
        size="small"
        onClick={handleJoin}
        sx={{
          textTransform: "none",
          backgroundColor: "#1976d2", // Consistent theme color
          "&:hover": {
            backgroundColor: "#1565c0", // Darker shade on hover
          },
          "&:focus": {
            outline: "none",
            boxShadow: "0 0 5px rgba(25, 118, 210, 0.5)", // Focus ring with theme color
          },
        }}
        disabled={isLoading}
      >
        {isLoading ? "Joining..." : "Join"}
      </Button>
    </Box>
  );
};

export default ChatElementPublic;
