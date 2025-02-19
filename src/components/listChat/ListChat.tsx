import { Avatar, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface ChatElementProps {
  el: { name: string; _id: string };
}

const ChatElement: React.FC<ChatElementProps> = ({ el }) => {
  const navigate = useNavigate();

  return (
    <Box
      onClick={() => navigate(`/app/${el.name}/${el._id}`)}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        padding: "12px 16px",
        borderRadius: "8px",
        backgroundColor: "#ffffff",
        cursor: "pointer",
        transition: "all 250ms ease-in-out",
        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.08)",
        "&:hover": {
          backgroundColor: "#f9f9f9",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.12)",
          transform: "scale(1.02)",
        },
        overflow: "hidden", // Preventing overflow in this container
      }}
    >
      {/* User Avatar */}
      <Avatar
        alt={el.name}
        src={`https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(el.name)}`}
        sx={{
          width: 42,
          height: 42,
          border: "2px solid #e0e0e0",
          transition: "transform 250ms",
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      />

      {/* User Name */}
      <Typography
        variant="subtitle1"
        fontWeight={600}
        color="text.primary"
        sx={{
          flexGrow: 1,
          fontSize: "16px",
          overflow: "hidden", // Prevents overflow of text
          textOverflow: "ellipsis", // Handles long text with an ellipsis
          whiteSpace: "nowrap", // Prevents text from wrapping
        }}
      >
        {el.name}
      </Typography>
    </Box>
  );
};

export default ChatElement;
