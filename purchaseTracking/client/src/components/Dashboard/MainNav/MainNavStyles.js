import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  main: {
    backgroundColor: '#f3f3f3',
    height: "64px",
    "& div": {
      height: "64px",
    },
  },
  branding: {
    display: "flex",
    alignItems: "center",
    width: "200px",
    "& img": {
      width: "25%",
      padding: "1rem",
    },
  },
  mainNavIcon: {
    display: "flex",
    alignItems: "center",
    width: "calc(100% - 200px)",
    justifyContent: "flex-end",
  },
  popoverAvatar: {
    display: "flex",
    padding: "1rem",
    '& div':{
      backgroundColor: theme.palette.secondary.light
    }
  },
  popoverContent: {
    display: "flex",
    flexDirection: "column",
    padding: "1rem 1rem 1rem 0rem",
  },
  popoverButton: {
    padding: "1rem",
  },
  footText: {
    fontSize: "12px",
  },
  menuPopover: {
    display: "flex",
    alignItems: 'center',
  },
  customLink: {
    cursor: "pointer",
  },
  customBtn: {
    borderRadius: "20px",
  },
}));
