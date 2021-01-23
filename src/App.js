//dependencies
import { ThemeProvider } from "@material-ui/core/styles";

//imports
import "./App.css";
import { theme } from "./utility/Theme";
import Pics from "./components/Pics/Pics";
import Upload from "./components/Upload/Upload";
import Title from "./components/Title";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Title />
      <Upload />
      <Pics />
    </ThemeProvider>
  );
}

export default App;
