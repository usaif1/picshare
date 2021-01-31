//dependencies
import React, { useState } from "react";
import {
  Container,
  makeStyles,
  IconButton,
  Button,
  Dialog,
  Divider,
  Slide,
} from "@material-ui/core";
import moment from "moment";
import AddIcon from "@material-ui/icons/Add";

//imports
import { firebaseStorage, firebaseDB } from "../../utility/firebase";
import ProgressBar from "../../utility/ProgressBar";
import AlertCustom from "../../utility/AlertCustom";
import { Colors } from "../../utility/Colors";

const Upload = () => {
  const [file, setFile] = useState({});
  const [previewUrl, setPreviewUrl] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [buffer, setBuffer] = useState(0);
  const [progress, setProgress] = useState(false);
  const [success, setSuccess] = useState(false);

  const storageRef = firebaseStorage().ref();

  const classes = useStyles();

  //onchange (file select) handler
  const onChangeHandler = (e) => {
    setFile(e.target.files[0]);
    let liveUrl;
    try {
      liveUrl = URL.createObjectURL(e.target.files[0]);
    } catch (error) {
      alert("Something went wrong! Please try again after some time");
    }

    setPreviewUrl(liveUrl);
    setShowDialog(true);
    setProgress(false);
    setBuffer(0);
  };

  //on form submit handler
  const onSubmitHandler = (e) => {
    e.preventDefault();
    setShowDialog(false);
    setProgress(true);
    const metadata = {
      name: file.name,
      contentType: file.type,
      size: file.size,
    };

    const uploadTask = storageRef
      .child(`images/${file.name}`)
      .put(file, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setBuffer(progress);
        if (progress === 100) {
          setTimeout(() => {
            setProgress(false);
            setSuccess(true);
          }, 500);
        }
      },
      (error) => {
        alert(`error!!`);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          firebaseDB()
            .collection("img_urls")
            .add({
              url: downloadURL,
              createdAt: moment().toISOString(),
            })
            .then((docRef) => {})
            .catch((err) => {
              alert("Error adding document to DB!");
            });
        });
      }
    );
  };

  //oncancel handle
  const onCancelHandler = () => {
    setShowDialog(false);
  };

  //handle snackbar close
  const handleClose = () => {
    setSuccess(false);
  };

  return (
    <Container>
      <form className={classes.form}>
        <label htmlFor="myfile">
          <input
            type="file"
            id="myfile"
            name="myfile"
            onChange={onChangeHandler}
            hidden
            accept="image/*"
          />
          <IconButton component="span" classes={{ root: classes.addIcon }}>
            <AddIcon fontSize="large" classes={{ root: classes.addIcon }} />
          </IconButton>
        </label>
      </form>
      {progress ? (
        <ProgressBar
          value={buffer}
          variant="buffer"
          classname={classes.progressbar}
        />
      ) : null}

      <AlertCustom
        //snackbar props
        open={success}
        hideoutDuration={3000}
        onclose={handleClose}
        transitionComponent={Slide}
        //alert props
        severity="success"
        variant="filled"
        text="Image Uploaded Successfully"
      />
      <Dialog open={showDialog} maxWidth="sm">
        <div className={classes.dialogContainer}>
          <div>
            <h4 className={classes.dialogHeading}>
              Upload {file.name ? file.name : null} ?
            </h4>
          </div>
          <div>
            <img
              src={previewUrl}
              alt="preview_img"
              className={classes.previewImg}
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
      </Dialog>
    </Container>
  );
};

export default Upload;

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    justifyContent: "center",
  },
  uploadButton: {
    fontSize: "1.3rem",
    fontWeight: "bold",
    borderRadius: "0",
  },
  addIcon: {
    cursor: "pointer",
    color: "#3BA300",
  },
  previewImg: {
    width: "55rem",
    objectFit: "contain",
  },
  buttonContainer: {
    width: "20rem",
    display: "flex",
    justifyContent: "space-between",
    margin: "auto",
  },
  dialogContainer: {
    padding: "1rem",
  },
  divider: {
    margin: "1rem 0",
  },
  progressbar: {
    width: "15rem",
    margin: "auto",
  },
  dialogHeading: {
    fontSize: "1.5rem",
    textAlign: "center",
    color: Colors.darkGrey,
  },
}));
