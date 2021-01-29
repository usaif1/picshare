import React from "react";
import { Container, makeStyles } from "@material-ui/core";

const GlobalContainer = (props) => {
  const classes = useStyles();
  return (
    <Container className={classes.globalContainer}>{props.children}</Container>
  );
};

export default GlobalContainer;
const useStyles = makeStyles((theme) => ({
  globalContainer: {
    marginTop: "20px",
  },
}));
