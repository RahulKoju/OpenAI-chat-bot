import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { useAuth } from "../helpers/useAuth";
import { red } from "@mui/material/colors";
import { ChatItem } from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";

const chatMessages: { role: "user" | "assistant"; content: string }[] = [
  {
    role: "assistant",
    content:
      "You are an AI assistant helping with general inquiries and providing information.",
  },
  {
    role: "user",
    content:
      "Hi, can you help me with some information about Python programming?",
  },
  {
    role: "assistant",
    content:
      "Of course! Python is a versatile programming language used for web development, data analysis, artificial intelligence, and more. What specifically would you like to know?",
  },
  {
    role: "user",
    content: "Can you explain what a list comprehension is?",
  },
  {
    role: "assistant",
    content:
      "Sure! A list comprehension is a concise way to create lists in Python. It allows you to generate lists using a single line of code by applying an expression to each element in an iterable. For example, `[x * 2 for x in range(5)]` creates a list of numbers from 0 to 8, each multiplied by 2.",
  },
  {
    role: "user",
    content: "That's helpful. How about dictionaries? What are they used for?",
  },
  {
    role: "assistant",
    content:
      "Dictionaries in Python are collections of key-value pairs. They are useful for storing data that needs to be quickly retrieved based on a unique key. For example, `{'name': 'Alice', 'age': 25}` is a dictionary where 'name' and 'age' are keys associated with their respective values 'Alice' and 25.",
  },
  {
    role: "user",
    content:
      "Great, thanks for the explanation. How do I handle errors in Python?",
  },
  {
    role: "assistant",
    content:
      "In Python, you handle errors using `try` and `except` blocks. You place the code that might cause an error inside the `try` block, and if an error occurs, the code inside the `except` block will run. For example:\n\n```python\ntry:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print('Cannot divide by zero!')\n```",
  },
  {
    role: "user",
    content: "Thanks! That clears things up.",
  },
  {
    role: "assistant",
    content:
      "You're welcome! If you have any more questions, feel free to ask.",
  },
];

export default function Chat() {
  const auth = useAuth();
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
            {auth?.user?.name[0]}
            {auth?.user?.name.split(" ")[1][0]}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            You are talking to Chatbot
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
            You can ask questions about anything. But avoid sharing personal
            information
          </Typography>
          <Button
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
            Clear Coversation
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
          Model-GPT 4.0
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
          {""}
          <input
            type="text"
            className="w-full bg-transparent p-3 rounded-none outline-none text-white text-xl"
          />
          <IconButton sx={{ ml: "auto", color: "white" }}>
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
}
