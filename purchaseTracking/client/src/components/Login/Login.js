import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  createMuiTheme,
  ThemeProvider,
  IconButton,
  Link,
} from "@material-ui/core";
import logo from "../../images/mersat-logo.png";
import useStyles from "./LoginStyles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#169B71",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

const Login = () => {
  const classes = useStyles();

  const [forgotPassword, setForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleForgotPassword = () => {
    setForgotPassword(!forgotPassword);
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Grid container className={classes.loginContainer}>
      <Grid item lg={4} className={classes.mauto}>
        <ThemeProvider theme={theme}>
          <Card className={classes.customCard} elevation={5}>
            <CardContent>
              <div className={`${classes.logo} ${classes.loginCardHeader}`}>
                <img src={logo} alt="company logo" />
                <Typography variant="h5">
                  {forgotPassword ? "Reset password" : "Login"}
                </Typography>
              </div>
              <form className={classes.LoginForm} autoComplete="off">
                {!forgotPassword && (
                  <>
                    <TextField
                      id="username"
                      placeholder="Enter your username"
                      name="username"
                      size="small"
                      label="Username"
                      fullWidth
                      type="text"
                    />
                    <div style={{ position: "relative" }}>
                      <TextField
                        id="password"
                        placeholder="Enter your password"
                        name="password"
                        size="small"
                        label="Password"
                        fullWidth
                        type={showPassword ? "text" : "password"}
                      />
                      <IconButton
                        size="small"
                        className={classes.absoluteIcon}
                        onClick={handleShowPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </div>
                  </>
                )}
                {forgotPassword && (
                  <>
                    <TextField
                      id="email"
                      placeholder="Enter your email"
                      name="email"
                      size="small"
                      label="Email"
                      fullWidth
                      type="text"
                    />
                  </>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  className={classes.customBtn}
                >
                  {forgotPassword ? "Get reset link" : "Login"}
                </Button>
                <Typography className={classes.footText} variant="body1">
                  <Link className={classes.Link} onClick={handleForgotPassword}>
                    {forgotPassword ? "Login" : "Forgot Password"}
                  </Link>
                </Typography>
              </form>
            </CardContent>
          </Card>
        </ThemeProvider>
      </Grid>
    </Grid>
  );
};

export default Login;
