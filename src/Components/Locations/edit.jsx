import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLocation } from "./getLocation";
import "./styles.scss";
import { locationData } from "./locationData";

const EditLocation = () => {
  const [location, setLocation] = useState(null);
  const [formData, setFormData] = useState(null);
  let { id } = useParams();

  useEffect(() => {
    getLocation(id, setLocation);
  }, []);

  useEffect(() => {
    if (location !== null) {
      locationData(location, setFormData);
    }
  }, [location]);
  console.log(formData);
  return (
    <div className="edit-page">
      {location && <h1>{location.attributes.name}</h1>}
    </div>
  );
};

export default EditLocation;
