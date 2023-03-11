import "./styles/index.scss";
import ThemeContext from "./Components/ThemeContext/ThemeContext.js";
import { useContext } from "react";
import Home from "./Components/Home/Home.js";


function App(props) {
  const theme = useContext(ThemeContext);
  return (
    <div className = "App" style={{background: theme.background, color:theme.color, border:theme.border}}>
     <div> {props.element}</div>
     <Home />
    </div>
  );
}

export default App;
