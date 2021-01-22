//dependencies
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

//imports
import { initializeFirebase } from "./utility/firebase";

initializeFirebase();

ReactDOM.render(<App />, document.getElementById("root"));
