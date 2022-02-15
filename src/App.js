import React from "react";
import { nanoid } from "nanoid";
import "./Styles/style.css";
import ListElement from "./Components/ListElement";
import Header from "./Components/Header";
import Form from "./Components/Form";
import CountryCard from "./Components/CountryCard";
import Spinner from "./Components/Spinner";
const axios = require("axios");
export default function App() {
  const [countriesList, setCountriesList] = React.useState([]);
  const [countryData, setCountryData] = React.useState({
    countryName: "",
    id: nanoid(),
    isEditing: false,
  });
  /////////////////////////////////////////////////
  const [editedEl, setEditedEl] = React.useState({});
  //////////////////////////////////////////////////////
  const [dataIsLoading, setDataIsLoading] = React.useState(false);
  const [countryInfo, setCountryInfo] = React.useState({});
  const [countryCardIsShown, setCountryCardIsShown] = React.useState(false);
  const getCountryData = async (id, name) => {
    if (countryInfo.id === id && countryInfo.name === name) {
      console.log(123);
    } else {
      setDataIsLoading(true);
      const res = await axios.get(
        `https://restcountries.com/v3.1/name/${name}`
      );
      const [obj] = [...res.data];
      obj.id = id;
      setCountryInfo(obj);
      setDataIsLoading(false);
    }
  };
  const toggleCountryCardStatus = (data) => {
    if (countryInfo.id === data.id) {
      setCountryCardIsShown(
        (prevCountryCardIsShown) => !prevCountryCardIsShown
      );
    } else {
      setCountryCardIsShown(true);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCountryData((prevCountryData) => ({
      ...prevCountryData,
      [name]: value,
    }));
  };
  ////////////////////////
  ///////////
  // check main input only unique names // only latin letters
  ////////////
  const addCountry = (event) => {
    event.preventDefault();
    setCountriesList((prevCountriesList) => [
      ...prevCountriesList,
      countryData,
    ]);
    setCountryData({
      countryName: "",
      id: nanoid(),
      isEditing: false,
    });
  };

  ///////////////////////////////////////////////////////////
  const handleChangeName = (event) => {
    const { name, value } = event.target;
    setEditedEl((prevEditedData) => ({ ...prevEditedData, [name]: value }));
  };
  const editListElementValue = (data) => {
    setEditedEl(data);
    setCountriesList((prevCountriesList) =>
      prevCountriesList.map((el) => {
        return el.id === data.id
          ? { ...el, isEditing: !el.isEditing }
          : { ...el };
      })
    );
  };
  //////////////////////////////////////////
  const submitEditedData = (data) => {
    setCountriesList((prevCountriesList) => {
      return prevCountriesList.map((el) => (data.id === el.id ? editedEl : el));
    });
    setEditedEl({});
  };
  ////////////////////////////////////////////
  // console.log(editedEl);
  ///////////////////////////////////////////////////////////////
  const deleteCountriesListEl = (data) => {
    setCountriesList((prevCountriesList) =>
      prevCountriesList.filter((el) => el.id !== data.id)
    );
  };

  const listElements = countriesList.map((el) => (
    <ListElement
      key={el.id}
      id={el.id}
      data={el}
      editedEl={editedEl}
      edit={editListElementValue}
      delete={deleteCountriesListEl}
      submit={submitEditedData}
      handleChange={handleChangeName}
      getCountryData={getCountryData}
      toggle={toggleCountryCardStatus}
    />
  ));
  return (
    <div>
      <Header />
      <div className="main">
        <div className="to-do-list">
          <Form
            className="main-input"
            placeholder="Write country name"
            value={countryData.countryName}
            handleChange={handleChange}
            submit={addCountry}
            blur={() => {}}
          />
          {listElements}
        </div>
        <div className="country-card-block">
          {dataIsLoading ? (
            <Spinner />
          ) : (
            countryCardIsShown && <CountryCard data={countryInfo} />
          )}
        </div>
      </div>
    </div>
  );
}
