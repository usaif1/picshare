import React from "react";
import { LinearProgress, makeStyles } from "@material-ui/core";

const ProgressBar = (props) => {
  const { value, variant, classname } = props;
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <LinearProgress
        valueBuffer={100}
        value={value}
        variant={variant}
        className={classname}
      />
      <p className={classes.percentage}>{`${Math.round(value)}%`}</p>
    </div>
  );
};

export default ProgressBar;

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column-reverse",
    alignItems: "center",
  },
  percentage: {
    fontSize: "1.5rem",
    textAlign: "center",
    margin: "0.5rem 0",
  },
}));
