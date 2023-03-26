import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
  Container,
  Typography,
  TextField,
  Button,
  Avatar,
} from '@material-ui/core';
import {useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";
import { handleSignup } from "../../common/Api.js"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Signup = () => {
  const classes = useStyles();

  const [formData, setFormData] = useState({firstName: '', lastName: '', email: '', password: '', confirmPassword: '', phoneNumber: ''});
  const [isAdmin, setIsAdmin] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormData({...formData, [name]: value});
  };

  const handleAdminChange = (event) => {
    setIsAdmin(event.target.checked);
    console.log("Admin is ", event.target.checked );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await handleSignup(formData, isAdmin, setErrorMsg);
      if (errorMsg) {
        console.log(errorMsg);
      }
      else {
        alert("User registered successfully. You will be taken to products page.");
        navigate('/Product');
      }
    } catch (error) {
      setErrorMsg(error.message);
      console.log(error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
      <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoFocus
            value={formData.firstName}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="phoneNumber"
            label="Phone Number"
            type="tel"
            id="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
         <input
          type="checkbox"
          id="isAdmin"
          name="isAdmin"
          label="isAdmin"
          checked={isAdmin}
          onChange={handleAdminChange}
        />
        Admin
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Link to="/Login" className="link">
            Already have an account? Sign in
          </Link>
        </form>
      </div>
    </Container>
  );
};

export default Signup;
