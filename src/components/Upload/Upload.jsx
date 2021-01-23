//dependencies
import React, { useState } from "react";
import {
  Container,
  makeStyles,
  IconButton,
  Button,
  Dialog,
  Divider,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

//imports
import { firebaseStorage, firebaseDB } from "../../utility/firebase";

const Upload = () => {
  const [file, setFile] = useState({});
  const [previewUrl, setPreviewUrl] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const storageRef = firebaseStorage().ref();

  const classes = useStyles();

  //onchange (file select) handler
  const onChangeHandler = (e) => {
    setFile(e.target.files[0]);

    console.log("i was called");

    const liveUrl = URL.createObjectURL(e.target.files[0]);
    setPreviewUrl(liveUrl);
    setShowDialog(true);
  };

  //on form submit handler
  const onSubmitHandler = (e) => {
    e.preventDefault();
    setShowDialog(false);
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
        console.log("this is the snapshot state--> ", snapshot.state);
        console.log("total bytes --> ", snapshot.totalBytes);
        console.log("transferred bytes --> ", snapshot.bytesTransferred);
        console.log("task --> ", snapshot.task);
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
      <Dialog open={showDialog} maxWidth="sm">
        <div className={classes.dialogContainer}>
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
    borderRadius: "0",
  },
  addIcon: {
    cursor: "pointer",
    color: "#3BA300",
  },
  previewImg: {
    width: "550px",
    objectFit: "contain",
  },
  buttonContainer: {
    width: "200px",
    display: "flex",
    justifyContent: "space-between",
    margin: "auto",
  },
  dialogContainer: {
    padding: "10px",
  },
  divider: {
    margin: "10px 0",
  },
}));
