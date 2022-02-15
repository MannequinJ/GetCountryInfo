import React from "react";
import ListElementButtons from "./ListElementButtons";
// import Input from "./Input";
import Form from "./Form";

export default function ListElement(props) {
  const submit = (e) => {
    const newName = e.target.childNodes[0].value;
    console.log(newName);
    if (newName !== props.data.countryName) {
      props.getCountryData(props.id, newName);
    }
    props.submit(props.data);
    e.preventDefault();
  };
  return (
    <div className="list-element" id={props.id}>
      {props.data.isEditing ? (
        <Form
          className="el-input"
          placeholder={props.data.countryName}
          value={props.editedEl.countryName}
          handleChange={props.handleChange}
          submit={submit}
          blur={submit}
        />
      ) : (
        <p onDoubleClick={() => props.edit(props.data)}>
          {props.data.countryName}
        </p>
      )}
      <ListElementButtons
        delete={props.delete}
        data={props.data}
        getInfo={props.getCountryData}
        toggle={props.toggle}
      />
    </div>
  );
}
