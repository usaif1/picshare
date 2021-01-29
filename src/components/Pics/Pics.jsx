//dependencies
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";

//imports
import { firebaseDB } from "../../utility/firebase";
import GlobalContainer from "../../utility/GlobalContainer";
import { Colors } from "../../utility/Colors";

const Pics = () => {
  const [pics, setPics] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    fetchImageUrls();
    //eslint-disable-next-line
  }, []);

  const fetchImageUrls = () => {
    firebaseDB()
      .collection("img_urls")
      .onSnapshot((snapshot) => {
        setPics(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              url: doc.data().url,
            };
          })
        );
      });
  };

  const singleImg = (pic) => (
    <div
      key={pic.id}
      className={classes.imgContainer}
      style={{
        background: `url(${pic.url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div style={{ backdropFilter: "blur(8px)" }}>
        <img src={pic.url} alt="pic" className={classes.img} />
      </div>
    </div>
  );

  return (
    <GlobalContainer>
      <div className={classes.imgListContainer}>
        {pics.length > 0
          ? pics.map((pic) => {
              return singleImg(pic);
            })
          : null}
      </div>
    </GlobalContainer>
  );
};

export default Pics;

const useStyles = makeStyles((theme) => ({
  imgListContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  imgContainer: {
    marginRight: "50px",
    marginBottom: "50px",
    cursor: "pointer",
    boxShadow: `3px 3px 5px ${Colors.shadow}`,
  },
  img: {
    width: "350px",
    height: "400px",
    objectFit: "contain",
    cursor: "inherit",
  },
}));
