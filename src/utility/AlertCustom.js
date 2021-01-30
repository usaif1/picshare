import React from "react";
import { Snackbar, Slide, makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import PropTypes from "prop-types";

const AlertCustom = (props) => {
  const {
    open,
    hideoutDuration,
    onclose,
    transitionComponent,
    severity,
    variant,
    text,
  } = props;
  const classes = useStyles();
  return (
    <Snackbar
      open={open}
      autoHideDuration={hideoutDuration}
      onClose={onclose}
      TransitionComponent={transitionComponent}
    >
      <Alert severity={severity} variant={variant} className={classes.text}>
        {text}
      </Alert>
    </Snackbar>
  );
};

Alert.propTypes = {
  text: PropTypes.string,
};

Alert.defaultProps = {
  transitionComponent: Slide,
  hideoutDuration: 3000,
};

export default AlertCustom;

const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: "1.4em",
  },
}));
