import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from 'react-select';
import {useNavigate} from 'react-router-dom';

import { handleAddProduct } from "../../common/Api.js"

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing(4),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    width: '100%',
    maxWidth: '500px',
  },
  textField: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  button: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
}));

const categories = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Apparel' },
  { value: 'personal', label: 'Personal Care' },
  { value: 'footwear', label: 'Footwear' },
];

const AddProduct = () => {
  const classes = useStyles();
  const [category, setCategory] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({name: '', manufacturer: '', price: '', availableItems: '', imageUrl: '', description: ''});

  const handleSave = async (event) => {
    event.preventDefault();
    // Do something with the form data
    try {
        await handleAddProduct(formData, category, setErrorMsg);
        if (errorMsg == "") {
          alert("Product added sucessfully. You will be taken to Products page.")
          navigate('/Product');
        }
      } catch (error) {
        setErrorMsg(error.message);
      }
  };

  const handleCategoryChange = (selectedOption) => {
    console.log("The category selected is ", selectedOption.value);
    setCategory(selectedOption);
    console.log("The category selected is ", selectedOption);
  };

  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormData({...formData, [name]: value});
  };

  return (
    <div className={classes.root}>
      <h2>Add Product</h2>
      <form className={classes.form} onSubmit={handleSave}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoFocus
          value={formData.name}
          onChange={handleChange}
        />
        <Select
          options={categories}
          value={category}
          onChange={handleCategoryChange}
          isClearable
          placeholder="Category"
          className={classes.textField}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="manufacturer"
          label="Manufacturer"
          name="manufacturer"
          autoFocus
          value={formData.manufacturer}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="price"
          label="Price"
          name="price"
          type="number"
          autoFocus
          value={formData.price}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="availableItems"
          label="Available Items"
          name="availableItems"
          type="number"
          autoFocus
          value={formData.availableItems}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="imageUrl"
          label="Image URL"
          name="imageUrl"
          type="url"
          autoFocus
          value={formData.imageUrl}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="description"
          label="Product Description"
          name="description"
          autoFocus
          value={formData.description}
          onChange={handleChange}
          multiline
          minRows={4}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Save Product
        </Button>
      </form>
    </div>
  );
};

export default AddProduct;
