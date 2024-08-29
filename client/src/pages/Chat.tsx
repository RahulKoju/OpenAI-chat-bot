import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { useAuth } from "../helpers/useAuth";
import { red } from "@mui/material/colors";
import { ChatItem } from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  deleteUserChats,
  getUserChats,
  sendChatReq,
} from "../helpers/api-communicator";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type message = {
  content: string;
  role: "user" | "assistant";
};

export default function Chat() {
  const navigate = useNavigate();
  const auth = useAuth();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [chatMessages, setChatMessages] = useState<message[]>([]);

  const handleSubmit = async () => {
    const content = inputRef.current?.value.trim();
    if (!content) return;

    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }

    const newMessage: message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);

    try {
      const chatData = await sendChatReq(content);
      if (chatData?.chats) {
        setChatMessages([...chatMessages, ...chatData.chats]);
      } else {
        toast.error("Failed to retrieve chat response.");
      }
    } catch (error) {
      console.error("Error sending chat request:", error);
      toast.error("Sending chat request failed.");
    }
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting chats", { id: "deletechats" });
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Deleted chats successfully", { id: "deletechats" });
    } catch (error) {
      console.error("Error deleting chats:", error);
      toast.error("Deleting chats failed", { id: "deletechats" });
    }
  };

  useLayoutEffect(() => {
    if (auth.isSignedIn && auth.user) {
      toast.loading("Loading chats", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          if (data?.chats) {
            setChatMessages([...data.chats]);
            toast.success("Successfully loaded chats", { id: "loadchats" });
          } else {
            toast.error("Failed to load chats.", { id: "loadchats" });
          }
        })
        .catch((err) => {
          console.error("Error loading chats:", err);
          toast.error("Loading failed", { id: "loadchats" });
        });
    }
  }, [auth]);

  useEffect(() => {
    if (!auth.user) {
      navigate("/sign-in");
    }
  }, [auth, navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "rgb(17,29,39)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {auth?.user?.name
              ? `${auth.user.name[0].toUpperCase()}${
                  auth.user.name.split(" ")[1]?.[0].toUpperCase() || ""
                }`
              : "U"}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            You are talking to Chatbot
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
            You can ask questions about anything. But avoid sharing personal
            information.
          </Typography>
          <Button
            onClick={handleDeleteChats}
            sx={{
              width: "200px",
              m: "auto",
              color: "white",
              fontWeight: 700,
              borderRadius: 3,
              bgcolor: red[300],
              ":hover": {
                bgcolor: red.A400,
              },
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "40px",
            color: "white",
            mb: 2,
            mx: "auto",
          }}
        >
          Model-GPT 3.5 Turbo
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {chatMessages.map((chat, index) => (
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>
        <div className="w-full p-5 rounded-lg bg-[rgb(17,27,39)] flex m-auto">
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-transparent p-3 rounded-none outline-none text-white text-xl"
          />
          <IconButton
            onClick={handleSubmit}
            sx={{ ml: "auto", color: "white" }}
          >
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
}
