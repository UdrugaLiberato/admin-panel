import { useContext, useState } from "react";
import { CategoriesContext } from "../../context/categories";
import "./style.scss";

const Dropdown = ({ showAll = true, heading, onSelect, value }) => {
  const [option, setOption] = useState();
  const { categories } = useContext(CategoriesContext);
  const [open, setOpen] = useState(false);

  const valueInWords = !showAll && !value ? "Select..." : option;

  const handleClick = () => {
    setOpen((prevState) => !prevState);
  };

  const handleOptionClick = (option) => {
    setOpen(false);
    const cName = categories.find((c) => c.id === option);
    setOption(cName.attributes.name);
    onSelect(option);
  };

  const renderOptions = () => {
    return categories.map((category) => {
      // TODO: language

      return (
        <div
          key={`category-option-${category.id}`}
          className="option-wrap"
          onClick={() => handleOptionClick(category.id)}
        >
          <span>{category.attributes.name}</span>
        </div>
      );
    });
  };

  return (
    <div className={`dropdown-wrapper flex`}>
      <div className="dropdown-heading" onClick={handleClick}>
        <div>{valueInWords || heading}</div>
        <div className="arrow-wrap">
          <div className={`arrow ${open ? "up" : ""}`} />
        </div>
      </div>
      <div
        className="dropdown-content"
        style={open ? { height: "auto" } : { height: 0, padding: 0, border: 0 }}
      >
        <div>{renderOptions()}</div>
      </div>
    </div>
  );
};

export default Dropdown;
