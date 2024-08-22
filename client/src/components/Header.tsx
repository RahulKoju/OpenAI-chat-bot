import { AppBar, Toolbar } from "@mui/material";
import Logo from "./shared/Logo";
import { NavigationLink } from "./shared/NavigationLink";
import { useAuth } from "../helpers/useAuth";

export default function Header() {
  const auth = useAuth();
  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <div>
          {auth?.isSignedIn ? (
            <>
              <NavigationLink
                to="/chat"
                bg="#00fffc"
                text="Go To Chat"
                textColor="black"
              />
              <NavigationLink
                to="/"
                bg="#51538f"
                text="Logout"
                textColor="white"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavigationLink
                to="/sign-in"
                bg="#00fffc"
                text="Sign In"
                textColor="black"
              />
              <NavigationLink
                to="/sign-up"
                bg="#51538f"
                text="Sign Up"
                textColor="white"
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}
