//dependencies
import React, { useState } from "react";

//imports
import { firebaseStorage, firebaseDB } from "../../utility/firebase";

const Upload = () => {
  const [file, setFile] = useState({});
  const [imgUrl, setImgUrl] = useState("");
  const storageRef = firebaseStorage().ref();

  const onChangeHandler = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmitHandler = () => {
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
        console.log("uploading");
      },
      (error) => {
        alert(`error!!`);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          setImgUrl(downloadURL);
          firebaseDB()
            .collection("img_urls")
            .add({
              url: downloadURL,
            })
            .then((docRef) => {
              console.log("Url added to db --> ", docRef.id);
            })
            .catch((err) => {
              alert("Error adding document to DB!");
            });
        });
      }
    );
  };

  return (
    <div>
      <input type="file" id="myfile" name="myfile" onChange={onChangeHandler} />
      <button onClick={onSubmitHandler}>Upload Image</button>
      <div>Your Image - </div>
      {imgUrl && (
        <img
          src={imgUrl}
          alt="something"
          style={{ width: "100px", objectFit: "contain" }}
        />
      )}
    </div>
  );
};

export default Upload;
