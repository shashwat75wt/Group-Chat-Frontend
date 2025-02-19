import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../store/store";

interface MessageProps {
  el: {
    content: string;
    senderId: string;
    createdAt: string | number; // Allow both types
  };
}

const Message = ({ el }: MessageProps) => {
  const myId = useAppSelector((state) => state.auth.user?._id);

  // Define an exciting color scheme and animation
  const messageBackground = el.senderId !== myId
    ? "#ffffff" // White for received messages
    : "#64B5F6"; // Blue for sent messages
  const borderColor = el.senderId !== myId ? "#A5D6A7" : "#42A5F5"; // Fresh color borders for both
  const textColor = el.senderId !== myId ? "#2C6AC2" : "#fff"; // Contrasting text colors
  const timestampColor = "#78909C"; // A cool, calm timestamp

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        padding: "12px 20px",
        borderRadius: "25px", // Stylish rounded corners
        backgroundColor: messageBackground,
        border: `2px solid ${borderColor}`, // Border to give it a nice outline
        width: "fit-content",
        alignSelf: el.senderId !== myId ? "flex-start" : "flex-end",
        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)", // Bold shadow for depth
        animation: "fadeIn 1s ease-out", // Exciting fade-in effect
        "&:hover": {
          transform: "scale(1.05)", // Slight scale effect on hover
          boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.2)", // More intense shadow on hover
          backgroundColor: el.senderId !== myId ? "#f5f5f5" : "#42A5F5", // Slight background change on hover
        },
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: textColor,
          fontWeight: 500, // Bold text for clarity
          letterSpacing: "0.5px", // Slightly spaced letters for a clean look
          fontSize: "1.1rem", // Slightly larger font for impact
          textOverflow: "ellipsis", // Truncate text if too long
          whiteSpace: "nowrap", // Avoid text wrapping
          overflow: "hidden",
        }}
      >
        {el.content}
      </Typography>
      <Typography
        variant="caption"
        sx={{
          color: timestampColor,
          fontStyle: "italic", // Subtle charm with italics
          textAlign: "right", // Timestamp aligned to the right
          opacity: 0.7, // Slight transparency for a modern look
        }}
      >
        {new Date(el.createdAt).toLocaleDateString("en-GB")}
      </Typography>
    </Box>
  );
};

export default Message;
