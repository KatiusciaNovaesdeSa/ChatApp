import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'


const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};


function ButtonAppBar(props) {
  var isLoggedIn = localStorage.getItem("token")
  let adm;
  let btnLogout

 let handleLogout = event => {
    localStorage.removeItem('token')
    window.location = '/chat'
  };

    if(isLoggedIn){
      adm = <Button className="text-white" component={Link} to="/admin">
                      Admin 
                    </Button>
      btnLogout = <Button className="text-white" component={Link} to="/login" onClick={handleLogout} >
                    <b>Logout</b>
                  </Button>
    }else{
      btnLogout = <Button className="text-white" component={Link} to="/login">
                    <b>Admin</b>
                  </Button>
    }

  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" className = "pink">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow} >
          <Button className="text-white" component={Link} to="/chat">
              ChatApp
            </Button>
            {adm}
          </Typography>
          {btnLogout}
        </Toolbar>
      </AppBar>
    </div>
    
    
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);