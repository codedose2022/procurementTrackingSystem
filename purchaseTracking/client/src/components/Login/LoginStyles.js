import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  logo: {
    "& img": {
      width: "25%",
    },
  },
  LoginForm: {
    padding: "1rem",
    "& button": {
      margin: "1rem 0",
    },
  },
  loginCardHeader: {
    display: "flex",
    alignItems: "center",
    "& img": {
      marginRight: "1rem",
    },
    "& h5": {
      textTransform: "uppercase !important",
    },
  },
  mauto: {
    margin: "auto",
  },
  loginContainer: {
    height: "calc(100vh)",
  },
  customCard: {
    width: "380px",
    margin: "auto",
  },
  footText: {
    justifyContent: "center",
    display: "flex",
    fontSize: "14px",
  },
  absoluteIcon: {
    position: "absolute",
    top: ".5rem",
    right: ".015rem",
  },
  customBtn: {
    borderRadius: "20px",
  },
  Link: {
    cursor: "pointer",
  },
  helperTextError: {
    color: "#d50000",
  },
  formControl: {
    margin: "8px 0",
    minWidth: 120,
  },
}));
