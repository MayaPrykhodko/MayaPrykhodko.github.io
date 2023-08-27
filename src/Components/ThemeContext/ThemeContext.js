import {createContext} from "react";


export const themes = {
    dark: {
        background: "rgb(40, 60, 101)",
        color: "white",
        border: "none"
    },
    light: {
        background: "rgb(220, 227, 240)",
        color: "black",
        border: "2px solid black"
    }
}
const ThemeContext = createContext(themes.dark);

export default ThemeContext;