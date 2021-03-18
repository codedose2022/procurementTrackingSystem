import React, { useState, useEffect } from "react";
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
  InputAdornment,
  Link,
  FormControl,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import logo from "../../images/mersat-logo.png";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useStyles from "./LoginStyles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { validateField } from "../../Helpers/validationHelper";
import { login, sendResetLink } from "../../Actions/AuthenticationActions";

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
  const history = useHistory();
  const dispatch = useDispatch();
  const [forgotPassword, setForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [serviceErrors, setServiceErrors] = useState("");
  const [resetSuccessMsg, setResetSuccessMsg] = useState("");
  const [touched, setTouched] = useState(false);
  useEffect(() => {
    if (window.location.pathname == "/") {
      localStorage.setItem("auth-token", "");
      dispatch({ type: "RESET_STORE" });
      localStorage.setItem("master_class", "");
    }
  }, []);

  const handleForgotPassword = () => {
    setServiceErrors("");
    setResetSuccessMsg("");
    setForgotPassword(!forgotPassword);
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);
    setServiceErrors("");
    setResetSuccessMsg("");
    if (!forgotPassword) {
      if (
        validateField("password", loginData.password) === "" &&
        validateField("username", loginData.username) === ""
      ) {
        dispatch(login(loginData, setServiceErrors, history));
      }
    } else {
      if (validateField("username", loginData.username) === "") {
        dispatch(
          sendResetLink(
            loginData.username,
            setServiceErrors,
            setResetSuccessMsg
          )
        );
      }
    }
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
              <form
                className={classes.LoginForm}
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                {serviceErrors && (
                  <Alert severity="error"> {serviceErrors} </Alert>
                )}
                {forgotPassword && resetSuccessMsg && (
                  <Alert severity="success"> {resetSuccessMsg} </Alert>
                )}
                {!forgotPassword && (
                  <>
                  <FormControl className={classes.formControl} fullWidth >
                    <TextField
                      id="username"
                      placeholder="Enter your username"
                      name="username"
                      size="small"
                      label="Username"
                      FormHelperTextProps={{
                        className: classes.helperTextError,
                      }}
                      fullWidth
                      type="text"
                      value={loginData.username}
                      helperText={
                        touched && validateField("username", loginData.username)
                      }
                      onChange={(e) =>
                        setLoginData({
                          ...loginData,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                    </FormControl>
                    <FormControl className={classes.formControl} fullWidth>
                      <TextField
                        id="password"
                        placeholder="Enter your password"
                        name="password"
                        size="small"
                        label="Password"
                        FormHelperTextProps={{
                          className: classes.helperTextError,
                        }}
                        fullWidth
                        value={loginData.password}
                        helperText={
                          touched &&
                          validateField("password", loginData.password)
                        }
                        onChange={(e) =>
                          setLoginData({
                            ...loginData,
                            [e.target.name]: e.target.value,
                          })
                        }
                        type={showPassword ? "text" : "password"}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleShowPassword}
                                size="small"
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </FormControl>
                  </>
                )}
                {forgotPassword && (
                  <>
                    <FormControl className={classes.formControl} fullWidth>
                      <TextField
                        id="email"
                        placeholder="Enter your email"
                        name="username"
                        size="small"
                        label="Email"
                        FormHelperTextProps={{
                          className: classes.helperTextError,
                        }}
                        fullWidth
                        type="text"
                        helperText={
                          touched &&
                          validateField("username", loginData.username)
                        }
                        value={loginData.username}
                        onChange={(e) =>
                          setLoginData({
                            ...loginData,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </FormControl>
                  </>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  className={classes.customBtn}
                  type="submit"
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
