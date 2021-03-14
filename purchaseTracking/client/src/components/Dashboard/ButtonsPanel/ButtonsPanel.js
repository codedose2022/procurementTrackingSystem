import { Container, Grid, ButtonGroup, Button } from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import React, { useRef, useState } from "react";
import useStyles from "./ButtonsPanelStyles";
import ModalPop from "../Modal/ModalPop";
import AddUser from "../Forms/AddUser";
import ViewDeleteUser from "../Forms/ViewDeleteUser";

const ButtonsPanel = () => {
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);
  const [popupContent, setpopupContent] = useState(false);

  const handleDialogClose = () => {
    setIsOpen(false);
  };

  const anchorRef = useRef(null);

  const handleAddUser = () => {
    setpopupContent(true);
    setIsOpen(true);
  };
  const handleShowUsers = () => {
    setpopupContent(false);
    setIsOpen(true);
  };

  const data = [
    {
      id: 1,
      firstName: "John Doe",
      userName: "jd@mg.com",
      department: "Admin",
    },
    {
      id: 2,
      firstName: "Victor Wayne",
      userName: "vw@mg.com",
      department: "Pro",
    },
    { id: 3, firstName: "Jane Doe", userName: "jad@mg.com", department: "Bdm" },
  ];

  const handleUserDelete = () => {};

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
        content={
          popupContent ? (
            <AddUser />
          ) : (
            <>
              {data.map((user) => (
                <ViewDeleteUser
                  firstName={user.firstName}
                  username={user.userName}
                  department={user.department}
                  avatarLetter={user.firstName.charAt(0)}
                  handleUserDelete={handleUserDelete}
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
