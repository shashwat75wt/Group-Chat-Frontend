import { Box, TextField, IconButton } from "@mui/material";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { toast } from "react-toastify";
import { useSendMsgMutation } from "../services/api";
import { useParams } from "react-router-dom";

const Footer = () => {
  const [content, setContent] = useState("");
  const { id } = useParams();

  // API Hook for sending messages
  const [sendMsg] = useSendMsgMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (content.trim() === "") {
      toast.error("Please enter a message.");
      return;
    }
    if (!id) {
      toast.error("Select a group to send a message.");
      return;
    }

    try {
      await sendMsg({ groupId: id, content }).unwrap();
      setContent("");
      window.location.reload(); // 🔄 Reloads the entire page after sending
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message.");
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      padding="8px 16px"
      bgcolor="#F4F6F9"
      borderTop="1px solid #E0E0E0"
      sx={{
        boxShadow: "0px -2px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Message Input Field */}
      <TextField
        sx={{
          flexGrow: 1,
          borderRadius: "20px",
          backgroundColor: "#FFFFFF",
          "& .MuiOutlinedInput-root": {
            borderRadius: "20px",
            padding: "6px 12px",
            "& fieldset": {
              borderColor: "#E0E0E0",
            },
            "&:hover fieldset": {
              borderColor: "#1976D2",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#1976D2",
            },
          },
        }}
        size="small"
        placeholder="Type a message..."
        variant="outlined"
        value={content}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      {/* Send Button */}
      <IconButton
        onClick={handleSendMessage}
        sx={{
          ml: 2,
          backgroundColor: "#1976D2",
          color: "#FFFFFF",
          borderRadius: "50%",
          padding: "8px",
          "&:hover": {
            backgroundColor: "#1565C0",
          },
        }}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default Footer;
