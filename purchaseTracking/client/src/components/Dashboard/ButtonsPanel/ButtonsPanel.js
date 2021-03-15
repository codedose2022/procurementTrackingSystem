import { Container, Grid, ButtonGroup, Button } from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import React, { useRef, useState } from "react";
import useStyles from "./ButtonsPanelStyles";
import ModalPop from "../Modal/ModalPop";
import AddUser from "../Forms/AddUser";
import ViewDeleteUser from "../Forms/ViewDeleteUser";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

const ButtonsPanel = ({ user }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector((state) => state);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [popupContent, setpopupContent] = useState(false);
  let userData = _.get(state, "user.usersList", []);
  const handleDialogClose = () => {
    setIsOpen(false);
  };

  const anchorRef = useRef(null);

  const handleAddUser = () => {
    setSuccessMessage("");
    setErrorMessage("");
    setpopupContent(true);
    setIsOpen(true);
  };
  const handleShowUsers = () => {
    setSuccessMessage("");
    setErrorMessage("");
    setpopupContent(false);
    setIsOpen(true);
  };

  return (
    <Container>
      <Grid container>
        <Grid item lg={12} className={classes.ButtonsPanel}>
          <div className={classes.arrangeButton}>
            <ButtonGroup
              variant="contained"
              color="primary"
              ref={anchorRef}
              aria-label="split button"
            >
              <Button onClick={handleShowUsers} id="fff">
                USERS
              </Button>
              <Button
                size="small"
                aria-label="select merge strategy"
                aria-haspopup="menu"
                onClick={handleAddUser}
                id="hello"
              >
                <Add />
              </Button>
            </ButtonGroup>
            <Button color="primary" variant="contained">
              <Add /> Add New request
            </Button>
          </div>
        </Grid>
      </Grid>
      <ModalPop
        isOpen={isOpen}
        handleClose={handleDialogClose}
        title={popupContent ? "Add new user" : "Users"}
        successMessage={successMessage}
        errorMessage={errorMessage}
        content={
          popupContent ? (
            <AddUser
              setSuccessMessage={setSuccessMessage}
              setErrorMessage={setErrorMessage}
              user={user}
              handleDialogClose={handleDialogClose}
            />
          ) : (
            <>
              {userData.map((u_data) => (
                <ViewDeleteUser
                  setSuccessMessage={setSuccessMessage}
                  setErrorMessage={setErrorMessage}
                  firstName={u_data.name}
                  username={u_data.username}
                  department={u_data.department}
                  avatarLetter={u_data.name.charAt(0)}
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
