import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  Error: {
    fontSize: "12px",
    color: "#ff0000",
  },
  formControl: {
    margin: "8px 0",
    minWidth: 120,
  },
  formControlButton: {
    display: "flex",
    alignItems: "flex-end",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  userList: {
    alignItems: "center",
  },
  userName: {
    fontSize: "12px",
  },
  deleteUser: {
    "&:hover": {
      color: "#c50000",
    },
  },
  buttonStyle: {
    paddingTop: "0px !important",
    display: "flex",
    justifyContent: "flex-end",
  },
}));
