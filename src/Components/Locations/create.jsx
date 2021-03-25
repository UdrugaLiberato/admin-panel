import React, { useState } from "react";
import Switch from "react-switch";
import Checkbox from "../Checkbox";
import Dropdown from "../Dropdown";
import { blankLocationData } from "../../helpers/blankLocationData";
import { FilePond } from "react-filepond";
import { createLocationData } from "../../helpers/createLocationData";
import { createNewLocation } from "../../api/createNewLocation";

const CreateLocation = () => {
  const [formData, setFormData] = useState(blankLocationData);
  const [checkbox, setCheckbox] = useState(false);
  const handleCheckboxChange = () => setCheckbox(!checkbox);
  const [files, setFiles] = useState([]);

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
          const newLocationData = createLocationData(formData, lat, lng, files);
          console.log(newLocationData);
          // createNewLocation(newLocationData);
        }
      });
    } else {
      const newLocationData = createLocationData(
        formData,
        formData.lat,
        formData.lng,
        files
      );
      createNewLocation(newLocationData);
    }
  };

  const handleEditChange = (e, target) => {
    if (target === "published") {
      setFormData((prevState) => ({
        ...prevState,
        published: !formData.published,
      }));
      return;
    }

    if (target === "featured") {
      setFormData((prevState) => ({
        ...prevState,
        featured: !formData.featured,
      }));
      return;
    }

    e.persist();
    setFormData((prevState) => ({
      ...prevState,
      [target]: e.target.value,
    }));
  };

  const handleDropdownSelect = (value) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const renderPhotoBlock = () => {
    return (
      <div className="App">
        <FilePond
          onaddfile={(err, item) => {
            if (err) {
              return;
            }
            setFiles((file) => file.concat(item.getFileEncodeDataURL()));
          }}
          allowReorder={true}
          allowMultiple={true}
          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        />
      </div>
    );
  };

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
            value={"1"}
            heading="Select..."
          />
        </div>
        <Switch
          checked={formData.published}
          onChange={(e) => handleEditChange(e, "published")}
        />
        <Switch
          checked={formData.featured}
          onChange={(e) => handleEditChange(e, "featured")}
        />
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
        {/*{renderQuestions()}*/}
        {renderPhotoBlock()}

        <input type="submit" onClick={handleFormSubmit} value="Create" />
      </form>
    );
  };

  return <div>{renderForm()}</div>;
};

export default CreateLocation;
