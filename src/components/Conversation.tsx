import { Box, CircularProgress, Typography, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetGroupMsgsMutation } from "../services/api";
import Message from "./Message";


const Conversation = () => {
  const { id: groupId } = useParams();
  const [getMsgs, { isLoading }] = useGetGroupMsgsMutation();
  const [messages, setMessages] = useState<any>([]);
  
  useEffect(() => {
    const fetchMsg = async () => {
      if (!groupId) return; // Prevent API call if groupId is undefined

      try {
        const res = await getMsgs({ groupId }).unwrap();
        setMessages(res.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMsg();
  }, [groupId, getMsgs]);

  if (isLoading) {
    return (
      <Box
        width="100%"
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="#f0f8ff"
        borderRadius="8px"
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
        padding={3}
      >
        <CircularProgress size={50} color="primary" />
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="16px"
      bgcolor="white"
      padding="16px"
      height="100%"
      overflow="auto"
      borderRadius="10px"
      boxShadow="0px 4px 12px rgba(0, 0, 0, 0.05)"
      sx={{
        maxHeight: 'calc(100vh - 100px)', // Adjusts to ensure it's scrollable but stays within view
        transition: "background-color 300ms ease-in-out",
        "&:hover": {
          backgroundColor: "black", // Subtle background change on hover
        },
      }}
    >
      {!isLoading && Array.isArray(messages) && messages.length > 0 && (
        <>
          {messages.map((el: any, ind: number) => (
            <Message el={el} key={ind} />
          ))}
        </>
      )}
     <Divider sx={{ my: 2, borderColor: "#B7B1F2" }} />
      <Typography variant="body2" alignSelf="center" color="#B7B1F2">
        End of messages
      </Typography>
      {/* <Footer /> */}
    </Box>
    
    
  );
};

export default Conversation;
