import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import './Logout.css';

const Logout = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/Login');
    window.location.reload();
  };
  
  return (
    <Button
    className="logout-button"
    variant="contained"
    onClick={handleLogout}
    style={{ backgroundColor: 'red', color: 'white' }}
    > 
    Logout
    </Button>
  );
};

export default Logout;

