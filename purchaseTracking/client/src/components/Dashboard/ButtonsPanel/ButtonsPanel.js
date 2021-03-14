import {
  Container,
  Grid,
  ButtonGroup,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import React, { useRef, useState } from "react";
import useStyles from "./ButtonsPanelStyles";
import ModalPop from "../Modal/ModalPop";

const ButtonsPanel = () => {
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);

  const handleDialogOpen = () => {
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
              >
                <Add />
              </Button>
            </ButtonGroup>
            <Button
              color="primary"
              variant="contained"
              onClick={handleDialogOpen}
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
        button="Add"
        content={
          <form id="newUser">
            <TextField required fullWidth label="Name" className={classes.inputMargin}></TextField>
            <TextField required fullWidth label="Username" className={classes.inputMargin}></TextField>
            <FormControl fullWidth>
            <Select
              labelId="department"
              id="department"
              value={department}
              onChange={handleChange}
              fullWidth
              className={classes.selectMargin}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value={'Customer relations'}>Customer relations</MenuItem>
              <MenuItem value={'Procurement'}>Procurement</MenuItem>
            </Select>
            </FormControl>
            <TextField required fullWidth label="Password" className={classes.inputMargin}></TextField>
          </form>
        }
      ></ModalPop>
    </Container>
  );
};

export default ButtonsPanel;
