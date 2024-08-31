import { Avatar, Box, Typography } from "@mui/material";
import { useAuth } from "../../helpers/useAuth";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// Function to extract code blocks from a string
function extractCodeFromString(message: string) {
  const blocks: { language: string; code: string }[] = [];
  const regex = /```(\w+)?\n([\s\S]*?)```/g;
  let match;

  while ((match = regex.exec(message)) !== null) {
    blocks.push({ language: match[1] || "javascript", code: match[2] });
  }

  return blocks.length ? blocks : null;
}

// Function to dynamically format content into JSX elements
function formatContent(content: string) {
  // Remove any asterisks and process the content
  const sanitizedContent = content.replace(/\*/g, '');

  // Split content into lines
  const lines = sanitizedContent.split('\n');
  
  return lines.map((line, index) => {
    // Detect headings (lines starting with ##)
    if (line.startsWith('## ')) {
      return (
        <Typography key={index} variant="h6" fontWeight={600} sx={{ mb: 1 }}>
          {line.substring(3)}
        </Typography>
      );
    }
    // Detect list items (lines starting with -)
    else if (line.startsWith('- ')) {
      return (
        <Typography key={index} paragraph fontWeight={500} sx={{ mb: 1 }}>
          {line.substring(2)}
        </Typography>
      );
    }
    // Normal paragraphs
    else {
      return (
        <Typography key={index} paragraph sx={{ mb: 2 }}>
          {line}
        </Typography>
      );
    }
  });
}

// Props interface
interface ChatItemProps {
  content: string;
  role: "user" | "assistant";
}

// ChatItem component
export const ChatItem: React.FC<ChatItemProps> = ({ content, role }) => {
  const auth = useAuth();
  const messageBlocks = extractCodeFromString(content);

  // Common styles for both user and assistant
  const commonBoxStyles = {
    display: "flex",
    p: 2,
    gap: 2,
    my: 2,
  };

  // Styles specific to assistant
  const assistantBoxStyles = {
    ...commonBoxStyles,
    bgcolor: "#004d5612",
  };

  // Styles specific to user
  const userBoxStyles = {
    ...commonBoxStyles,
    bgcolor: "#004d56",
  };

  return role === "assistant" ? (
    <Box sx={assistantBoxStyles}>
      <Avatar sx={{ ml: "0" }}>
        <img src="open_ai.png" alt="openai" width={"30px"} />
      </Avatar>
      <Box>
        {!messageBlocks ? (
          formatContent(content)
        ) : (
          messageBlocks.map((block, index) => (
            <SyntaxHighlighter
              key={index}
              style={coldarkDark}
              language={block.language}
            >
              {block.code}
            </SyntaxHighlighter>
          ))
        )}
      </Box>
    </Box>
  ) : (
    <Box sx={userBoxStyles}>
      <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
        {auth?.user?.name[0]}
        {auth?.user?.name.split(" ")[1][0]}
      </Avatar>
      <Box>
        {!messageBlocks ? (
          formatContent(content)
        ) : (
          messageBlocks.map((block, index) => (
            <SyntaxHighlighter
              key={index}
              style={coldarkDark}
              language={block.language}
            >
              {block.code}
            </SyntaxHighlighter>
          ))
        )}
      </Box>
    </Box>
  );
};
