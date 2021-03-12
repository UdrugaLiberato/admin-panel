import React, { useEffect, useState } from "react";
import { getAllLocations } from "./getAllLocations";
import "./styles.scss";
import { FaCheck, FaWindowClose } from "react-icons/all";
import { getCategoryName } from "./getCategoryName";
import axios from "axios";
import { Link } from "react-router-dom";

const ListLocations = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    getAllLocations(setLocations);
  }, []);

  const handleDelete = (id) => {
    const token = "0e3337d3-8d7a-4ffb-bffe-58e6dda65cd3";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    axios
      .delete(`https://api.udruga-liberato.hr/web/v1/location/${id}`, {
        headers,
      })
      .then((res) => {
        if (res && res.data) {
          console.log("deleted");
        }
      })
      .catch((err) => console.error(err));
  };

  const handleUndoDelete = (id) => {
    console.log(id);
  };

  const renderLocations = () => {
    return locations.map((location) => {
      return (
        <tbody key={location.id}>
          <tr className={`${location.attributes.deletedAt && "bg-danger"}`}>
            <th scope="row">{location.attributes.name}</th>
            <th>{getCategoryName(location.relationships.category.data.id)}</th>
            <td>{location.attributes.street}</td>
            <td>{location.attributes.city} </td>
            <td>
              {location.attributes.published === true ? (
                <FaCheck color="green" size="2rem" />
              ) : (
                <FaWindowClose color="red" size="2rem" />
              )}
            </td>
            <td>
              <Link to={`/locations/edit/${location.id}`}>
                <button className="btn btn-primary">Edit</button>
              </Link>
            </td>
            <td>
              {location.attributes.deletedAt ? (
                <button
                  className="btn btn-success"
                  onClick={() => handleUndoDelete(location.id)}
                >
                  Undo Delete
                </button>
              ) : (
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(location.id)}
                >
                  Delete
                </button>
              )}
            </td>
          </tr>
        </tbody>
      );
    });
  };
  return (
    <div className="list-locations">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">Street</th>
            <th scope="col">City</th>
            <th scope="col">Published</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        {renderLocations()}
      </table>
    </div>
  );
};
export default ListLocations;
