import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLocation } from "./getLocation";
import "./styles.scss";
import { locationData } from "./locationData";
import Switch from "react-switch";
import Dropdown from "../Dropdown";
import Checkbox from "../Checkbox";
import { getCategoryName } from "./getCategoryName";
import { getUserId } from "../../context/user";
import { getEditData } from "./getEditData";
import { updateLocationData } from "./updateLocationData";

const EditLocation = () => {
  const [location, setLocation] = useState(null);
  const [formData, setFormData] = useState({});
  let { id } = useParams();
  const [checkbox, setCheckbox] = useState(false);
  const handleCheckboxChange = () => setCheckbox(!checkbox);

  useEffect(() => {
    getLocation(id, setLocation);
  }, []);

  useEffect(() => {
    if (location !== null) {
      locationData(location, setFormData);
    }
  }, [location]);

  const handleAnswerChange = () => {};

  const renderQuestions = () => {
    if (formData && formData.questions && formData.questions.length > 0) {
      return formData.questions.map((question) => {
        for (const [key, value] of Object.entries(question)) {
          return (
            <h5 key={key}>
              {key} <Switch onChange={handleAnswerChange} checked={value} />
            </h5>
          );
        }
      });
    } else {
      return null;
    }
  };

  const renderPhotos = () => {
    if (formData && formData.images && formData.images.length > 0) {
      return formData.images.map((image) => {
        return (
          <img
            key={image}
            src={`https://api.udruga-liberato.hr/images/${image}`}
            alt={formData.name}
          />
        );
      });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!checkbox) {
      const addressParts = formData.street.split(" ");
      const addressLen = addressParts.length;

      const numIdx = addressParts.findIndex((part) => {
        const firstChar = parseInt(part[0]);
        return !isNaN(firstChar);
      });

      if (numIdx === addressLen - 1) {
        const num = addressParts.pop();
        addressParts.unshift(num);
      }
      const address = addressParts.join(" ");

      const request = {
        fields: ["geometry"],
        query: `${address} ${formData.city}`,
      };

      const node = document.querySelector("#node");
      const placesService = new window.google.maps.places.PlacesService(node);

      placesService.findPlaceFromQuery(request, function (results, status) {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          let lat;
          let lng;
          if (results && results.length) {
            lat = results[0].geometry.location.lat();
            lng = results[0].geometry.location.lng();
          }
          const editData = getEditData(
            location.id,
            formData,
            lat,
            lng,
            getUserId(),
            location.attributes.images
          );
          updateLocationData(editData);
        } else {
          console.log(false);
        }
      });
    }
  };

  const handleEditChange = (e, target) => {
    e.persist();
    setFormData((prevState) => ({
      ...prevState,
      ...prevState.data,
      [target]: e.target.value,
    }));
  };

  const handleDropdownSelect = (value) => {
    setFormData((prev) => ({
      ...prev,
      ...prev.data,
      category: value,
    }));
  };

  console.log(formData);
  const renderForm = () => {
    return (
      <form onSubmit={handleFormSubmit}>
        <div className="form-group" id="node">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder={formData.name}
            onChange={(e) => handleEditChange(e, "name")}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="street">Street address</label>
          <input
            type="text"
            className="form-control"
            id="street"
            placeholder={formData.street}
            onChange={(e) => handleEditChange(e, "street")}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            className="form-control"
            id="city"
            placeholder={formData.city}
            onChange={(e) => handleEditChange(e, "city")}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder={formData.email}
            onChange={(e) => handleEditChange(e, "email")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Phone number</label>
          <input
            type="text"
            className="form-control"
            id="email"
            placeholder={formData.phone}
            onChange={(e) => handleEditChange(e, "phone")}
          />
        </div>
        <Checkbox isChecked={checkbox} handleClickCb={handleCheckboxChange} />
        {checkbox && (
          <>
            <div className="form-group">
              <label htmlFor="lat">Lat</label>
              <input
                type="number"
                className="form-control"
                id="lat"
                step="any"
                placeholder={formData.lat}
                onChange={(e) => handleEditChange(e, "lat")}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lng">Lng</label>
              <input
                type="number"
                className="form-control"
                id="lng"
                step="any"
                placeholder={formData.lng}
                onChange={(e) => handleEditChange(e, "lng")}
              />
            </div>
          </>
        )}
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">Example select</label>
          <Dropdown
            onSelect={handleDropdownSelect}
            value={location.relationships.category.data.id}
            heading={getCategoryName(location.relationships.category.data.id)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Description</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder={formData.description}
            onChange={(e) => handleEditChange(e, "about")}
          />
        </div>
        {renderQuestions()}
        {renderPhotos()}
        <input type="submit" onClick={handleFormSubmit} value="Edit" />
      </form>
    );
  };

  return <div>{location && renderForm()}</div>;
};
export default EditLocation;
