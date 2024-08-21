import { Box, Button, Typography } from "@mui/material";
import { CustomizedInput } from "../components/shared/CustomizedInput";
import { IoIosLogIn } from "react-icons/io";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
export default function SignIn() {
  const auth = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      toast.loading("Signing In", { id: "signin" });
      await auth?.signin(email, password);
      toast.success("Signed In Successfully", { id: "signin" });
    } catch (error) {
      console.log(error);
      toast.error("Signing In Failed", { id: "signin" });
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
      }}
    >
      <Box sx={{ p: 4, mt: 4, display: { md: "block", xs: "none" } }}>
        <img width={"400px"} src="airobot.png" alt="Robot" />
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            margin: "auto",
            padding: "30px",
            boxShadow: "10px 10px 20px #000",
            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{ p: 2, textAlign: "center", fontWeight: 600 }}
            >
              Login
            </Typography>
            <CustomizedInput type="email" name="email" label="Email" />
            <CustomizedInput type="password" name="password" label="Password" />
            <Button
              type="submit"
              endIcon={<IoIosLogIn />}
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: "400px",
                borderRadius: 2,
                bgcolor: "#00fffc",
                color: "black",
                ":hover": {
                  bgcolor: "white",
                  color: "black",
                },
              }}
            >
              Sign In
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
