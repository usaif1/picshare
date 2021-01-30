import React from "react";
import { LinearProgress } from "@material-ui/core";

const ProgressBar = (props) => {
  const { value, variant, classname } = props;
  return (
    <LinearProgress
      valueBuffer={100}
      value={value}
      variant={variant}
      className={classname}
    />
  );
};

export default ProgressBar;
