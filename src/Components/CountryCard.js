import React from "react";

export default function CountryCard(props) {
  const language = props.data.languages[Object.keys(props.data.languages)[0]];
  const currency =
    props.data.currencies[Object.keys(props.data.currencies)[0]].name;
  console.log(props.data);

  return (
    <div className="country-card">
      <img src={props.data.flags.svg} />
      <div className="country-card-content">
        <div className="country-card-content-name">
          <h1>{props.data.name.common}</h1>
        </div>
        <div>🌍 {props.data.subregion}</div>
        <div>
          👫 {(props.data.population / 1000000).toFixed(1)} million people
        </div>
        <div>🗣️ {language}</div>
        <div>💶 {currency}</div>
      </div>
    </div>
  );
}
//   second click on info btn disapear country card
