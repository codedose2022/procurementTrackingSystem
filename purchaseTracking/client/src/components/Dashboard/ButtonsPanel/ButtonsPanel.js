import {
  Container,
  Grid,
  ButtonGroup,
  Button
} from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import React, { useRef, useState } from "react";
import useStyles from "./ButtonsPanelStyles";
import ModalPop from "../Modal/ModalPop";
import AddUser from "../Forms/AddUser";

const ButtonsPanel = () => {
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);

  const handleAddUser = () => {
    setIsOpen(true);
  };
  const handleDialogClose = () => {
    setIsOpen(false);
  };
  const anchorRef = useRef(null);

  const showUsers = () => {
    console.log("CLICKED");
  };

  const [department, setDepartment] = useState("");

  const handleChange = (event) => {
    setDepartment(event.target.value);
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
              <Button onClick={showUsers}>USERS</Button>
              <Button
                color="primary"
                size="small"
                aria-label="select merge strategy"
                aria-haspopup="menu"
                onClick={handleAddUser}
              >
                <Add />
              </Button>
            </ButtonGroup>
            <Button
              color="primary"
              variant="contained"
              
            >
              <Add />
            </Button>
          </div>
        </Grid>
      </Grid>
      <ModalPop
        isOpen={isOpen}
        handleClose={handleDialogClose}
        title="Add new user"
        content={
          <AddUser />
        }
      ></ModalPop>
    </Container>
  );
};

export default ButtonsPanel;
