import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div
        style={{
          width: "100%",
          minHeight: "20vh",
          maxHeight: "30vh",
          marginTop: 60,
        }}
      >
        <p style={{ fontSize: "30px", textAlign: "center", padding: "20px" }}>
          Built by
          <span>
            <Link
              style={{ color: "white" }}
              className="nav-link ml-2"
              to={"https://github.com/RahulKoju/OpenAI-chat-bot"}
              target="_blank"
            >
              Rahul Koju
            </Link>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
