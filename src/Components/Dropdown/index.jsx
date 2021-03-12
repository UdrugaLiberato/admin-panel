const Dropdown = ({
  showAll = true,
  heading,
  onSelect,
  value,
  isValid,
}) => {
  const [option, setOption] = useState();
  const { categories } = getAllCategories()000;
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef < HTMLDivElement > null;

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
    return categories.map((category1) => {
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
    <div
      className={`dropdown-wrapper ${isValid ? "" : "invalid"} flex`}
      ref={dropdownRef}
    >
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
