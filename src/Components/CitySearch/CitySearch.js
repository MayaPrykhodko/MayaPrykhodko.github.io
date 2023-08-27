import React from "react";

export default function CitySearch(props) {
      return (
            <div className="search-city">
                  <form id="form">
                        <label htmlFor="city">City</label>
                        <input
                              id="city"
                              type="text"
                              onChange={props.onChange}
                              value={props.city}
                        />
                        <div className="city-search" onClick={props.onClick}><i className="fa-solid fa-magnifying-glass"></i></div>
                  </form>
            </div>
      );
}
