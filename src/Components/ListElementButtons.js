import React from "react";

export default function ListElementButtons(props) {
  return (
    <div className="li-button-block">
      <button
        onClick={(e) => {
          const liElId = e.currentTarget.parentElement.parentElement.id;
          props.getInfo(liElId, props.data.countryName.toLowerCase());
          props.toggle(props.data);
        }}
      >
        <img src="images/icon_info_black.svg" />
      </button>
      <button onClick={() => props.delete(props.data)}>
        <img src="images/icon_trash_black.svg" />
      </button>
    </div>
  );
}
