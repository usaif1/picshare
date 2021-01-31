//dependencies
import React from "react";
import { makeStyles } from "@material-ui/core";

//imports
import { Colors } from "../utility/Colors";
import GlobalContainer from "../utility/GlobalContainer";

const Title = () => {
  const classes = useStyles();
  return (
    <GlobalContainer>
      <h1 className={classes.heading}>PicShare App</h1>
      <h2 className={classes.subHeading}>Share your pics</h2>
    </GlobalContainer>
  );
};

export default Title;

const useStyles = makeStyles((theme) => ({
  heading: {
    textAlign: "center",
    color: Colors.darkGrey,
    fontSize: "2.5rem",
    letterSpacing: "1px",
  },
  subHeading: {
    textAlign: "center",
    color: Colors.darkGrey,
    fontSize: "1.8rem",
    letterSpacing: "1px",
  },
}));
