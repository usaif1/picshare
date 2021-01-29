//dependencies
import React from "react";
import { Container, makeStyles } from "@material-ui/core";

//imports
import { Colors } from "../utility/Colors";

const Title = () => {
  const classes = useStyles();
  return (
    <Container>
      <h1 className={classes.heading}>PicShare App</h1>
      <h2 className={classes.subHeading}>Share your pics</h2>
    </Container>
  );
};

export default Title;

const useStyles = makeStyles((theme) => ({
  heading: {
    textAlign: "center",
    color: Colors.darkGrey,
  },
  subHeading: {
    textAlign: "center",
    color: Colors.darkGrey,
  },
}));
