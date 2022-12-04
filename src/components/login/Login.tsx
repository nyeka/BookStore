import { useContext } from "react";
import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase-config";
import img from "../images/posting_photo.svg";
import { AppContext } from "../../App";
import GoogleIcon from "@mui/icons-material/Google";
import { Box, Typography, useTheme } from "@mui/material";
import "./styles.scss";
import { tokens } from "../../theme";

const Login = () => {
  const { setAuth } = useContext(AppContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setAuth(true);
      localStorage.setItem("auth", "true");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section id="sign">
      <div className="container">
        <div className="image-content">
          <img src={img} alt="ini gambar" />
        </div>
        <div className="form-login">
          <h2>Login</h2>
          <form>
            <div className="form">
              <input type="email" placeholder="Email" required disabled />
              <input type="password" placeholder="Password" required disabled />
            </div>
          </form>
          <button type="submit" disabled>
            Login
          </button>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: colors.primary[400],
              padding: "12px",
              gap: "10px",
              cursor: "pointer",
            }}
            onClick={googleLogin}
          >
            <GoogleIcon />
            <Typography variant="body2">Login with Google</Typography>
          </Box>
        </div>
      </div>
    </section>
  );
};

export default Login;
