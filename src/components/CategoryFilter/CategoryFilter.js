import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const Categories = ['ALL', 'APPAREL', 'ELECTRONICS', 'FOOTWEAR', 'PERSONAL CARE'];

const CategoryToggleFilter = () => {
  const dispatch = useDispatch();
  const [alignment, setAlignment] = useState('web');

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem", marginLeft: "40rem" }}>
      <ToggleButtonGroup
        color="primary"
        size="large"
        value={alignment}
        exclusive
        onChange={(e, newAlignment) => {
          alert("Search not yet implemented");
          dispatch({ type: 'setCategory', payload: newAlignment });
          setAlignment(newAlignment);
        }}
        aria-label="Platform"
      >
        {Categories.map((category) => (
          <ToggleButton key={category} value={category}>{category}</ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
};

export default CategoryToggleFilter;
