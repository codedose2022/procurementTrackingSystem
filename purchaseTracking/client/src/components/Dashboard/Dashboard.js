import { Grid, createMuiTheme, ThemeProvider } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import ButtonsPanel from "./ButtonsPanel/ButtonsPanel";
import MainNav from "./MainNav/MainNav";
import { getAllServiceRequests } from "../../Actions/serviceRequestActions";
import Alert from "@material-ui/lab/Alert";
import MasterTable from '../MasterTable/MasterTable';

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
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [serviceErrors, setServiceErrors] = useState("");
  useEffect(() => {
    const loadDashboard = async () => {
      dispatch(
        getAllServiceRequests(
          props.user.userInfo._id,
          props.user.token,
          setServiceErrors
        )
      );
      setIsLoading(false);
    };
    loadDashboard();
  }, [dispatch]);

  return (
    <>
      <ThemeProvider theme={theme}>
        {serviceErrors && <Alert severity='error'> {serviceErrors} </Alert>}
        {!serviceErrors && isLoading ? "loading" : (
          <>
            <MainNav user={props.user} />
            <Grid container style={{ paddingTop: "80px" }}>
              <ButtonsPanel user={props.user}/>
            </Grid>
            <MasterTable user={props.user} />
          </>
        )}
      </ThemeProvider>
    </>
  );
};

export default Dashboard;
