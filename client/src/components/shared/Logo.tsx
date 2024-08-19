import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <div className="mr-auto flex items-center gap-3">
      <Link to={"/"}>
        <img
          src="open_ai.png"
          alt="openai"
          className="w-8 h-8 invert"
        />
      </Link>
      <Typography className="hidden md:block mr-auto font-extrabold shadow-[2px 2px 20px #000]">
        <span className="text-xl">MERN</span>-GPT
      </Typography>
    </div>
  );
}
