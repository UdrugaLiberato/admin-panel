import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLocation } from "./getLocation";
import "./styles.scss";
import { locationData } from "./locationData";
import Switch from "react-switch";
import { getNewFormData } from "./getNewFormData";

const EditLocation = () => {
  const [location, setLocation] = useState(null);
  const [formData, setFormData] = useState({});
  let { id } = useParams();
  const [newFormData, setNewFormData] = useState(getNewFormData());

  useEffect(() => {
    getLocation(id, setLocation);
  }, []);

  useEffect(() => {
    if (location !== null) {
      locationData(location, setFormData);
    }
  }, [location]);
  const handleChange = () => {};

  const renderQuestions = () => {
    if (formData && formData.questions && formData.questions.length > 0) {
      return formData.questions.map((question) => {
        for (const [key, value] of Object.entries(question)) {
          return (
            <h5 key={key}>
              {key} <Switch onChange={handleChange} checked={value} />
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
  };

  const handleEditChange = (e, target) => {
    e.persist();
    setNewFormData((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        [target]: e.target.value,
      },
    }));
  };

  console.log(newFormData);
  const renderForm = () => {
    return (
      <form>
        <div className="form-group">
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
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">Example select</label>
          <Dropdown
            onSelect={handleDropdownSelect}
            value={categoryId}
            isValid={formData.validation[CATEGORY]}
            heading="Select..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Description</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder={formData.description}
            onChange={(e) => handleEditChange(e, "description")}
          />
          1
        </div>
        {renderQuestions()}
        {renderPhotos()}
        <input type="submit" onClick={handleFormSubmit} value="Edit" />
      </form>
    );
  };

  return <div>{location ? renderForm() : ""}</div>;
};
export default EditLocation;
