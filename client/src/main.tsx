import { createTheme, ThemeProvider } from "@mui/material";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.tsx";
import {Toaster} from "react-hot-toast"
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000/api";
axios.defaults.withCredentials = true;
const theme = createTheme({
  typography: {
    fontFamily: "Roboto Slab,serif",
    allVariants: { color: "white" },
  },
});

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <ThemeProvider theme={theme}>
      <Toaster position="top-center"/>
      <App />
    </ThemeProvider>
  </AuthProvider>
);
