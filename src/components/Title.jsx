//dependencies
import React from "react";
import { makeStyles } from "@material-ui/core";

//imports
import { Colors } from "../utility/Colors";
import GlobalContainer from "../utility/GlobalContainer";

const Title = () => {
  // console.log(moment().format(`D-MM-YYYY-HH:mm:ss`));
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
  },
  subHeading: {
    textAlign: "center",
    color: Colors.darkGrey,
  },
}));
