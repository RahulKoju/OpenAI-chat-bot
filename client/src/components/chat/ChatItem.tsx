import React from 'react';
import { Avatar, Box, Typography, Link } from "@mui/material";
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
  const sanitizedContent = content.replace(/\*/g, '');

  const lines = sanitizedContent.split('\n');
  return lines.map((line, index) => {
    // Handle headings (lines starting with ##)
    if (line.startsWith('## ')) {
      return (
        <Typography key={index} variant="h6" fontWeight={600} sx={{ mb: 1 }}>
          {line.substring(3)}
        </Typography>
      );
    }
    // Handle list items (lines starting with -)
    else if (line.startsWith('- ')) {
      return (
        <Typography key={index} paragraph fontWeight={500} sx={{ mb: 1 }}>
          • {line.substring(2)}
        </Typography>
      );
    }
    // Handle links (detect URLs and convert them to clickable links)
    else if (line.match(/\[([^\]]+)\]\(([^\)]+)\)/g)) {
      const parts = line.split(/(\[([^\]]+)\]\(([^\)]+)\))/g);
      return (
        <Typography key={index} paragraph>
          {parts.map((part, i) => {
            const match = part.match(/\[([^\]]+)\]\(([^\)]+)\)/);
            if (match) {
              const [_, text, url] = match;
              return (
                <Link key={i} href={url} target="_blank" rel="noopener noreferrer">
                  {text}
                </Link>
              );
            } else {
              return part;
            }
          })}
        </Typography>
      );
    }
    // Handle images (Markdown style)
    else if (line.startsWith('![')) {
      const match = line.match(/!\[([^\]]*)\]\(([^\)]+)\)/);
      if (match) {
        const [_, alt, src] = match;
        return (
          <Box key={index} sx={{ mb: 2 }}>
            <img src={src} alt={alt} style={{ maxWidth: '100%' }} />
          </Box>
        );
      }
    }
    // Normal paragraphs
    return (
      <Typography key={index} paragraph sx={{ mb: 2 }}>
        {line}
      </Typography>
    );
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

  const userName = auth?.user?.name;
  const initials = userName ? `${userName[0]}${userName.split(" ")[1]?.[0] || ''}` : '';

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
        {initials}
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