import React, { useState } from "react";
import ThemeContext, { themes } from "../ThemeContext/ThemeContext";
import App from "../../App";
import "./Main.scss";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Main() {
    const [theme, setTheme] = useState(themes.dark);

    const button = <button onClick={() => setTheme(theme === themes.light ? themes.dark : themes.light)}/>;

    return (
        <div className="Main">
            <ThemeContext.Provider value={theme}>
                <App element ={button} />  
                <ToastContainer/>  
            </ThemeContext.Provider>
        </div>

    );

}