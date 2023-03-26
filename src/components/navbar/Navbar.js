import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  IconButton,
  InputBase,
} from "@material-ui/core";
import { alpha, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { styled } from "@material-ui/core/styles";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Logout from "../Logout/Logout";
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import "./Navbar.css";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(10),
    display: "flex",
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(40),
  marginLeft: 40,
  display: "flex", 
  justifyContent: "center",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
  },
}));

const SearchBar = (props) => {
  if(props.isLoggedIn) {
    return (
      <Search>
        <SearchIcon />
        <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} onInput={(e) => {
          console.log("Inside search bar ", e.currentTarget.firstChild.value);
          alert("Search filter to be impemented");
          props.dispatch({type: 'setSearch', payload: e.currentTarget.firstChild.value})
        }}/>
      </Search>
    )
  }
}

function Navbar() {
  const classes = useStyles();
  const [role, setRole] = useState(false);
  const [token, setToken] = useState(null);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const userDetail = async () => {
      const admin = JSON.parse(sessionStorage.getItem('isAdmin'));
      console.log("The user admin in navbar is ", admin);
      if (admin)
        setRole(true);
      //const token = JSON.parse(sessionStorage.getItem('token'));
      const token = sessionStorage.getItem('token');
      console.log("The user token in navbar is ", token);
      if (token !== null)
      setToken(token);
    }
    userDetail();
  }, []);

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
        <ShoppingCartIcon />
        </IconButton>
        <Typography variant="h4" className="logo">
          UpGrad E-Shop
        </Typography>
        {/* <Search>
          <SearchIcon />
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search> */}
        <SearchBar isLoggedIn={token} dispatch={dispatch}/>
        <div className={`navlinks ${classes.navlinks}`}>
        {token ? (
          <>
            <Link to="/Home" className="link">
              Home
            </Link>
            {role === true ? (
              <Link to="/AddProduct" className="link">
                Add Product
              </Link>
            ) : null}
            {token && <Logout />}
          </>
        ) : (
          <>
            <Link to="/Login" className="link">
              Login
            </Link>
            <Link to="/Signup" className="link" style={{ marginRight: "100px" }}>
              Sign up
            </Link>
          </>
        )}
      </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
