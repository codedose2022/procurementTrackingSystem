import {
  Button,
  ButtonGroup,
  Container,
  Grid,
  Snackbar,
} from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import MuiAlert from "@material-ui/lab/Alert";
import _ from "lodash";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import AddRequest from "../Forms/AddRequest";
import AddUser from "../Forms/AddUser";
import ViewDeleteUser from "../Forms/ViewDeleteUser";
import ModalPop from "../Modal/ModalPop";
import useStyles from "./ButtonsPanelStyles";
import {isAdminOrPr} from '../../../Helpers/validationHelper';

const ButtonsPanel = ({ user }) => {
  const classes = useStyles();
  const isAdmin = user.userInfo.department;
  const state = useSelector((state) => state);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [displaySnackbarText, setDisplaySnackbarText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [reqModOpen, setReqModOpen] = useState(false);
  const [popupContent, setpopupContent] = useState(false);
  let userData = _.get(state, "user.usersList", []);
  const handleDialogClose = () => {
    setIsOpen(false);
    setReqModOpen(false);
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSnackbar(false);
  };
  const anchorRef = useRef(null);
  const handleAddRequest = () => {
    setReqModOpen(true);
  };

  const handleAddUser = () => {
    setErrorMessage("");
    setpopupContent(true);
    setIsOpen(true);
  };
  const handleShowUsers = () => {
    setErrorMessage("");
    setpopupContent(false);
    setIsOpen(true);
  };
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    <Container>
      <Grid container>
        <Grid item lg={12} className={classes.ButtonsPanel}>
          <div className={classes.arrangeButton}>
            {isAdmin === "Admin" && (
              <ButtonGroup
                variant="contained"
                color="primary"
                ref={anchorRef}
                aria-label="split button"
                style = {{marginRight : '20px'}}
              >
                <Button onClick={handleShowUsers} id="usersButton">
                  USERS
                </Button>
                <Button
                  size="small"
                  aria-label="select merge strategy"
                  aria-haspopup="menu"
                  onClick={handleAddUser}
                  id="addUserButton"
                >
                  <Add />
                </Button>
              </ButtonGroup>
            )}
            {!isAdminOrPr(user.userInfo.department) && <Button
              color="primary"
              variant="contained"
              onClick={handleAddRequest}
            >
              <Add /> Add New request
            </Button> }
          </div>
        </Grid>
      </Grid>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert severity="success">{displaySnackbarText}</Alert>
      </Snackbar>
      <ModalPop
        isOpen={reqModOpen}
        handleClose={handleDialogClose}
        title={"Add New Request"}
        errorMessage={errorMessage}
        width={"lg"}
        content={<AddRequest 
          setShowSnackbar={setShowSnackbar}
          setDisplaySnackbarText={setDisplaySnackbarText}
          handleDialogClose={handleDialogClose} 
          user={user} />}
      ></ModalPop>
      <ModalPop
        isOpen={isOpen}
        handleClose={handleDialogClose}
        title={popupContent ? "Add new user" : "Users"}
        width={popupContent ? "xs" : "sm"}
        errorMessage={errorMessage}
        content={
          popupContent ? (
            <AddUser
              setShowSnackbar={setShowSnackbar}
              setDisplaySnackbarText={setDisplaySnackbarText}
              setErrorMessage={setErrorMessage}
              user={user}
              handleDialogClose={handleDialogClose}
            />
          ) : (
            <>
              {userData.map((u_data, index) => (
                <ViewDeleteUser
                  key={index}
                  setShowSnackbar={setShowSnackbar}
                  setDisplaySnackbarText={setDisplaySnackbarText}
                  setErrorMessage={setErrorMessage}
                  firstName={u_data.name}
                  username={u_data.username}
                  department={u_data.department}
                  avatarLetter={u_data.name.charAt(0).toUpperCase()}
                  id={u_data._id}
                  user={user}
                />
              ))}
            </>
          )
        }
      ></ModalPop>
    </Container>
  );
};

export default ButtonsPanel;
