import React from "react";

export default function Input(props) {
  return (
    <input
      className="main-input "
      type="text"
      placeholder="Write country name"
      name="countryName"
      value={props.value}
      onChange={props.handleChange}
    />
  );
}
