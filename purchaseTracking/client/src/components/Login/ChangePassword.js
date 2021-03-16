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
import { useDispatch } from "react-redux";
import useStyles from "./LoginStyles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { validateField } from "../../Helpers/validationHelper";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
import { changePassword } from "../../Actions/AuthenticationActions";

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

const ChangePassword = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState(false);
  const [serviceErrors, setServiceErrors] = useState("");
  const [changePasswordData, setChangePasswordData] = useState({
    username: props.user.userInfo.username,
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const handleCancel = (e) => {
    e.preventDefault();
    history.push("/dashboard")
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);
    setServiceErrors('');
    if (
      validateField("password", changePasswordData.password) === "" &&
      validateField("password", changePasswordData.newPassword) === "" &&
      validateField("password", changePasswordData.confirmPassword) === ""
    ) {
      dispatch(changePassword(changePasswordData, setServiceErrors, history,props.user.token));
    }
  };

  return (
    <Grid container className={classes.loginContainer}>
      <Grid item lg={4} className={classes.mauto}>
        <ThemeProvider theme={theme}>
          <Card className={classes.customCard} elevation={5}>
            <CardContent>
              <div className={`${classes.logo} ${classes.loginCardHeader}`}>
                <img src={logo} alt='company logo' />
                <Typography variant='h5'>
                  {props.changePassword ? "Change password" : "Reset password"}
                </Typography>
              </div>
              <form
                className={classes.LoginForm}
                autoComplete='off'
                onSubmit={handleSubmit}
              >
                {serviceErrors && (
                  <Alert severity='error'> {serviceErrors} </Alert>
                )}
                <>
                  <TextField
                    id='username'
                    disabled
                    placeholder='Enter your username'
                    name='username'
                    size='small'
                    label='Username'
                    FormHelperTextProps={{
                      className: classes.helperTextError,
                    }}
                    fullWidth
                    type='text'
                    value={changePasswordData.username}
                    helperText={
                      touched &&
                      validateField("username", changePasswordData.username)
                    }
                    onChange={(e) =>
                      setChangePasswordData({
                        ...changePasswordData,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                  <div style={{ position: "relative" }}>
                    <TextField
                      id='password'
                      placeholder='Enter your password'
                      name='password'
                      size='small'
                      label='Current Password'
                      FormHelperTextProps={{
                        className: classes.helperTextError,
                      }}
                      fullWidth
                      value={changePasswordData.password}
                      helperText={
                        touched &&
                        validateField("password", changePasswordData.password)
                      }
                      onChange={(e) =>
                        setChangePasswordData({
                          ...changePasswordData,
                          [e.target.name]: e.target.value,
                        })
                      }
                      type={showPassword ? "text" : "password"}
                    />
                    <IconButton
                      size='small'
                      className={classes.absoluteIcon}
                      onClick={handleShowPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </div>
                  <TextField
                    id='password'
                    placeholder='Enter your password'
                    name='newPassword'
                    size='small'
                    label='New Password'
                    FormHelperTextProps={{
                      className: classes.helperTextError,
                    }}
                    type='password'
                    fullWidth
                    value={changePasswordData.newPassword}
                    helperText={
                      touched &&
                      validateField("password", changePasswordData.newPassword)
                    }
                    onChange={(e) =>
                      setChangePasswordData({
                        ...changePasswordData,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                  <TextField
                    id='password'
                    placeholder='Enter your password'
                    name='confirmPassword'
                    size='small'
                    label='Confirm Password'
                    FormHelperTextProps={{
                      className: classes.helperTextError,
                    }}
                    type='password'
                    fullWidth
                    value={changePasswordData.confirmPassword}
                    helperText={
                      touched &&
                      validateField(
                        "password",
                        changePasswordData.confirmPassword
                      )
                    }
                    onChange={(e) =>
                      setChangePasswordData({
                        ...changePasswordData,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </>

                <Button
                  variant='contained'
                  color='primary'
                  fullWidth
                  type='submit'
                  className={classes.customBtn}
                >
                  {props.changePassword ? "CHANGE PASSWORD" : "RESET PASSWORD"}
                </Button>
                <Typography className={classes.footText} variant='body1'>
                  <Link className={classes.Link} onClick={handleCancel}>
                    cancel
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

export default ChangePassword;
