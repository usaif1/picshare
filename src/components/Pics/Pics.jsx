//dependencies
import React, { useEffect, useState } from "react";

//imports
import { firebaseDB } from "../../utility/firebase";

const Pics = () => {
  const [pics, setPics] = useState([]);

  useEffect(() => {
    fetchImageUrls();
    //eslint-disable-next-line
  }, []);

  const fetchImageUrls = () => {
    firebaseDB()
      .collection("img_urls")
      .get()
      .then((querySnapshot) => {
        setPics(
          querySnapshot.docs.map((doc) => {
            return {
              id: doc.id,
              url: doc.data().url,
            };
          })
        );
      });
  };

  const url = (pic) => (
    <div key={pic.id}>
      <img src={pic.url} alt="pic" />
    </div>
  );

  return (
    <div>
      {pics.length > 0
        ? pics.map((pic) => {
            return url(pic);
          })
        : "loading..."}
    </div>
  );
};

export default Pics;
