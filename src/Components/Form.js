import React from "react";

export default function Form(props) {
  return (
    <form onBlur={props.blur} onSubmit={props.submit}>
      <input
        autoFocus={true}
        type="text"
        className={props.className}
        placeholder={props.placeholder}
        name="countryName"
        value={props.value}
        onChange={props.handleChange}
      />
    </form>
  );
}
