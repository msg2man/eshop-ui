import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from 'react-select';
import {useNavigate} from 'react-router-dom';

import { editProduct, getProduct } from "../../common/Api.js"

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
  { value: 'clothing', label: 'Clothing' },
  { value: 'beauty', label: 'Beauty' },
  { value: 'food', label: 'Food' },
  { value: 'home', label: 'Home' },
];

const EditProduct = () => {
  const classes = useStyles();
  const [category, setCategory] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({name: '', manufacturer: '', price: '', availableItems: '', imageUrl: '', description: ''});

  const handleSave = async (event) => {
    event.preventDefault();
    // Do something with the form data
    try {
        console.log("The category is ", category);
        if (category === null) {
            alert("Please select a category");
            return;
        }
        let productId = sessionStorage.getItem('editProductId');
        console.log("The form data in edit product is ", formData);
        await editProduct(formData, category, productId, setErrorMsg);
        if (errorMsg) {
            console.log(errorMsg);
        }
        else {
          alert("Product modified sucessfully. Pressing will take to Product page.");
          navigate('/Product');
        }
      } catch (error) {
        setErrorMsg(error.message);
        alert(error.message);
      }
  };

  useEffect(() => {
    let productId = sessionStorage.getItem('editProductId');
    console.log("The product id in edit product use effect ", productId);
    const fetchData = async () => {
      const response = await getProduct(setErrorMsg, productId);
      console.log("The response in edit product use effect ", response);
      setFormData(response);
      setCategory(response.category.value);
    };
    fetchData();
  }, []);

  const handleCategoryChange = (selectedOption) => {
    console.log("The category selected option is ", selectedOption);
    setCategory(selectedOption);
    console.log("The category selected is ", selectedOption.value);
  };

  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormData({...formData, [name]: value});
  };

  return (
    <div className={classes.root}>
      <h2>Modify Product</h2>
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
          Modify Product
        </Button>
      </form>
    </div>
  );
};

export default EditProduct;
