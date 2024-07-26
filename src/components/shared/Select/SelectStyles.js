const selectStyles = {
  control: (styles, state) => ({
    ...styles,
    height: 42,
    minHeight: 42,
    boxShadow: state.isFocused ? "rgb(85, 155, 209) 0 0 4px;" : null,
    borderColor: state.isFocused ? "rgb(85, 155, 209)" : "#333",
    borderType: "solid",
    borderWidth: "1px",
    padding: "8px 12px",
    borderRadius: "4px",
    alignItems: "center",
    cursor: "pointer",
    transition: "all 0.4s",

    "&:hover, &:active, &:focus": {
      boxShadow: "rgb(85, 155, 209) 0 0 4px",
      borderColor: "rgb(85, 155, 209)"
    },

    "&:focus": {
      outLine: "none"
    }
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: 24
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    color: "#ff6200",

    "& svg": {
      width: 24,
      height: 24
    }
  }),
  singleValue: (base) => ({
    ...base,
    color: "#3d3d4e",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "24px",
    margin: 0,
    padding: 0
  }),
  valueContainer: (base) => ({
    ...base,
    margin: 0,
    display: "block",
    padding: 0
  }),
  input: (base) => ({
    ...base,
    margin: 0,
    padding: 0,
    color: "transparent"
  }),
  placeholder: (base) => ({
    ...base,
    color: "#696969",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "24px",
    margin: 0,
    padding: 0
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 40,
    overflow: "hidden",
    borderRadius: "4px"
  }),
  menuList: (provided) => ({
    ...provided,
    paddingTop: 0,
    paddingBottom: 0,
    maxHeight: 200
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: 16,
    position: "relative",
    fontWeight: 500,
    lineHeight: "20px",
    color: state.isSelected ? "#ff6200" : "#333",
    backgroundColor: state.isSelected ? "#f0f0f0" : "#fff",
    padding: "12px 24px",
    cursor: "pointer",

    "&:active": {
      backgroundColor: "#f0f0f0"
    }
  })
};

export default selectStyles;
