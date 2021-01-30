//dependencies
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { motion } from "framer-motion";

//imports
import { firebaseDB } from "../../utility/firebase";
import GlobalContainer from "../../utility/GlobalContainer";
import { Colors } from "../../utility/Colors";

const Pics = () => {
  const [pics, setPics] = useState([]);
  // const [zoom, setZoom] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    fetchImageUrls();
    //eslint-disable-next-line
  }, []);

  const fetchImageUrls = () => {
    firebaseDB()
      .collection("img_urls")
      .orderBy("createdAt", "desc")
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
    <motion.div
      key={pic.id}
      animate={{ x: 25 }}
      whileHover={{ scale: 1.2 }}
      transition={{ ease: "easeOut", duration: 0.3 }}
      className={classes.imgContainer}
      style={{
        background: `url(${pic.url})`,
      }}
    >
      <div style={{ backdropFilter: "blur(8px)" }}>
        <img src={pic.url} alt="pic" className={classes.img} />
      </div>
    </motion.div>
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
    marginRight: "5rem",
    marginBottom: "5rem",
    cursor: "pointer",
    boxShadow: `3px 3px 5px ${Colors.shadow}`,
    backgroundSize: "cover !important",
    backgroundPosition: "center !important",
  },
  img: {
    width: "35rem",
    height: "40rem",
    objectFit: "contain",
    cursor: "inherit",
  },
}));
