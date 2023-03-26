import React, { useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Avatar, Button, TextField, Grid, Typography, Container } from '@material-ui/core';
import { Link } from "react-router-dom";
import { handleSignin } from "../../common/Api.js"
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({username: '', password: ''});
  const [errorMsg, setErrorMsg] = useState('');
  //const [storedUserObject, setStoredUserObject] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await handleSignin(formData, setErrorMsg);
      const currUser = JSON.parse(sessionStorage.getItem('currentUser'));
      console.log("The current user is ", currUser);
      if (currUser != null) {
        dispatch({type: 'login', payload: currUser});
        navigate('/Product');
        window.location.reload();
      }
      else {
        console.log("Signin error ", errorMsg);
        console.log("The signin returned error");
      }
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={formData.username}
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
          {errorMsg && <Typography color="error" variant="subtitle1">{errorMsg}</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Login;

