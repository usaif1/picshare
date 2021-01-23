//dependencies
import React, { useState } from "react";
import { Container, makeStyles, IconButton, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

//imports
import { firebaseStorage, firebaseDB } from "../../utility/firebase";

const Upload = () => {
  const [file, setFile] = useState({});
  const [previewUrl, setPreviewUrl] = useState("");
  const storageRef = firebaseStorage().ref();

  const classes = useStyles();

  //onchange (file select) handler
  const onChangeHandler = (e) => {
    setFile(e.target.files[0]);

    const liveUrl = URL.createObjectURL(e.target.files[0]);
    setPreviewUrl(liveUrl);
  };

  //on form submit handler
  const onSubmitHandler = (e) => {
    e.preventDefault();
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
      (snapshot) => {},
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
        <Button variant="text" onClick={onSubmitHandler}>
          <p>Upload</p>
        </Button>
      </form>
      <img src={previewUrl} alt="sjka" />
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
    height: "50px",
    width: "50px",
    borderRadius: "50%",
    padding: "5px",
    cursor: "pointer",
  },
  addIcon: {
    cursor: "pointer",
    color: "#3BA300",
  },
}));
