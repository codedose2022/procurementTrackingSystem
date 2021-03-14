import { Grid, createMuiTheme, ThemeProvider } from "@material-ui/core";
import React, { useState } from "react";
import ButtonsPanel from "./ButtonsPanel/ButtonsPanel";
import MainNav from "./MainNav/MainNav";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#169B71",
    },
    secondary: {
      main: "#969696",
    },
  },
});

const Dashboard = (props) => {

  return (
    <>
    
    <ThemeProvider theme={theme}>
      <MainNav user = {props.user}/>
      <Grid container style={{ paddingTop: "80px" }}>
        <ButtonsPanel />
      </Grid>
      </ThemeProvider>
    </>
  );
};

export default Dashboard;
