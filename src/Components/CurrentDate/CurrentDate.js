import React, { useState, useEffect }  from "react";

 export default function CurrentDate() {
    const [currentDate, setCurrentDate] = useState("");
  
    useEffect(() => {
    
      const date = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = date.toLocaleDateString('en-US', options);
      setCurrentDate(formattedDate);
    
}, []);
  
    return (
      <div className="current-date">
         <img src="../favicon.ico" alt="weather-icon"/>
        {currentDate}
      </div>
    );
  }
  