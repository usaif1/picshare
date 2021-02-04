import React, { useEffect } from "react";
import { Divider, Button } from "@material-ui/core";
import { initializeCropper } from "../../utility/Cropper";

const DialogContent = (props) => {
  const {
    classes,
    onSubmitHandler,
    onCancelHandler,
    previewUrl,
    file,
    setBlob,
  } = props;

  useEffect(() => {
    const image = document.getElementById("image");
    if (image) {
      initializeCropper(image, setBlob);
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div className={classes.dialogContainer}>
      <div>
        <h4 className={classes.dialogHeading}>Upload {file.name} ?</h4>
      </div>
      <div style={{ width: "100%" }}>
        <img
          src={previewUrl}
          alt="preview_img"
          className={classes.previewImg}
          id="image"
        />
      </div>
      <Divider className={classes.divider} />
      <div className={classes.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          onClick={onSubmitHandler}
          classes={{ root: classes.uploadButton }}
        >
          Upload
        </Button>
        <Button
          variant="contained"
          color="secondary"
          classes={{ root: classes.uploadButton }}
          onClick={onCancelHandler}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default DialogContent;
