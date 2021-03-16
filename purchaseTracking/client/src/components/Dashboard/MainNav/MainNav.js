import {
  AppBar,
  Toolbar,
    IconButton,
  Menu,
  Avatar,
  Typography,
  Button,
  Link,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import React, { useState } from "react";
import logo from "../../../images/mersat-logo.png";
import useStyles from "./MainNavStyles";
import { withStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const StyledMenu = withStyles({
  paper: {
    width: "300",
    top: "56px !important",
    backgroundColor: "#ececec",
  },
})((props) => (
  <Menu
    elevation={5}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));
const MainNav = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    localStorage.setItem("auth-token", "");
    dispatch({ type: "RESET_STORE" });
    localStorage.setItem("master_class", "");
    history.push("/");
  };
  const handleChangePassword = () => {
    history.push("/changePassword");
  };

  return (
      <AppBar className={classes.main}>
        <Toolbar>
          <div className={classes.branding}>
            <img src={logo} alt="company logo" />
          </div>
          <div className={classes.mainNavIcon}>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="secondary"
              edge="end"
            >
              <AccountCircle />
            </IconButton>
            <StyledMenu
              id="menu-appbar"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
            >
              <div className={classes.menuPopover}>
                <div className={classes.popoverAvatar}>
                  <Avatar size="large">{props.user.userInfo.username.charAt(0).toUpperCase()}</Avatar>
                </div>
                <div className={classes.popoverContent}>
                  <Typography variant="body2">{props.user.userInfo.username}</Typography>
                  <Typography className={classes.footText} variant="body2">
                    <Link className={classes.customLink} color="primary" onClick = {handleChangePassword}> Change password </Link>
                  </Typography>
                </div>
                <div className={classes.popoverButton}>
                  <Button className={classes.customBtn} size="small" variant="contained" onClick = {handleLogOut} color="primary">
                    Logout
                  </Button>
                </div>
              </div>
            </StyledMenu>
          </div>
        </Toolbar>
      </AppBar>
  );
};

export default MainNav;
