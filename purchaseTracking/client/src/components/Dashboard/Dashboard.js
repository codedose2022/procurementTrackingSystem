import { Grid, createMuiTheme, ThemeProvider } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import ButtonsPanel from "./ButtonsPanel/ButtonsPanel";
import MainNav from "./MainNav/MainNav";
import { getAllServiceRequests } from "../../Actions/serviceRequestActions";
import Alert from "@material-ui/lab/Alert";
import MasterTable from "./MasterTable/MasterTable";
import { isTokenValid } from "../../api/index";
import { useHistory } from "react-router";
import CircularProgress from "@material-ui/core/CircularProgress";

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
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [serviceErrors, setServiceErrors] = useState("");
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const tokenRes = await isTokenValid(props.user.token);
        if (!tokenRes.data) {
          localStorage.setItem("auth-token", "");
          localStorage.setItem("master_class", "");
          history.push("/");
        } else {
          dispatch(
            getAllServiceRequests(
              props.user.userInfo._id,
              props.user.token,
              setServiceErrors
            )
          );
          setIsLoading(false);
        }
      } catch (error) {
        localStorage.setItem("auth-token", "");
        localStorage.setItem("master_class", "");
      }
    };
    loadDashboard();
  }, [dispatch]);

  return (
    <>
      <ThemeProvider theme={theme}>
        {serviceErrors && <Alert severity='error'> {serviceErrors} </Alert>}
        {!serviceErrors && isLoading ? (
          <CircularProgress
            style={{ position: "absolute", left: "50%", top: "50%" }}
          />
        ) : (
          <>
            <MainNav user={props.user} />
            <Grid container style={{ paddingTop: "80px" }}>
              <ButtonsPanel user={props.user} />
            </Grid>
            <MasterTable user={props.user} />
          </>
        )}
      </ThemeProvider>
    </>
  );
};

export default Dashboard;
