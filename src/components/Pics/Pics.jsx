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
  const classes = useStyles();

  useEffect(() => {
    fetchImageUrls();
    //eslint-disable-next-line
  }, []);

  //fetch images
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
      initial={{ y: 100 }}
      animate={{ y: 0, opacity: 0.85 }}
      layout
      whileHover={{ scale: 1.2, opacity: 1 }}
      transition={{ ease: "easeOut", duration: 0.3 }}
      className={classes.imgContainer}
    >
      <img src={pic.url} alt="pic" className={classes.img} />
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
    marginRight: "4rem",
    marginBottom: "4rem",
    boxShadow: `3px 3px 5px ${Colors.shadow}`,
  },
  img: {
    width: "35rem",
    verticalAlign: "bottom",
    cursor: "inherit",
  },
}));
