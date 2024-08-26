import { Avatar, Box, Typography } from "@mui/material";
import { useAuth } from "../../helpers/useAuth";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function extractCodeFromString(message: string) {
  const blocks = [];
  const regex = /```(\w+)?\n([\s\S]*?)```/g;
  let match;
  while ((match = regex.exec(message)) !== null) {
    blocks.push({ language: match[1] || "javascript", code: match[2] });
  }
  return blocks.length ? blocks : null;
}

export const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  const auth = useAuth();
  const messageBlocks = extractCodeFromString(content);

  return role === "assistant" ? (
    <Box sx={{ display: "flex", p: 2, bgcolor: "#004d5612", my: 2, gap: 2 }}>
      <Avatar sx={{ ml: "0" }}>
        <img src="open_ai.png" alt="openai" width={"30px"} />
      </Avatar>
      <Box>
        {!messageBlocks && <Typography fontSize={"20px"}>{content}</Typography>}
        {messageBlocks &&
          messageBlocks.map((block, index) => (
            <SyntaxHighlighter
              key={index}
              style={coldarkDark}
              language={block.language}
            >
              {block.code}
            </SyntaxHighlighter>
          ))}
      </Box>
    </Box>
  ) : (
    <Box sx={{ display: "flex", p: 2, bgcolor: "#004d56", gap: 2, my: 2 }}>
      <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
        {auth?.user?.name[0]}
        {auth?.user?.name.split(" ")[1][0]}
      </Avatar>
      <Box>
        {!messageBlocks && <Typography fontSize={"20px"}>{content}</Typography>}
        {messageBlocks &&
          messageBlocks.map((block, index) => (
            <SyntaxHighlighter
              key={index}
              style={coldarkDark}
              language={block.language}
            >
              {block.code}
            </SyntaxHighlighter>
          ))}
      </Box>
    </Box>
  );
};
