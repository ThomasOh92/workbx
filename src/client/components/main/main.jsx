import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Menu } from '@material-ui/icons';
import { AppBar, Toolbar, IconButton, Button, Typography, Box } from '@material-ui/core'
import Cookies from 'universal-cookie';
import Board from './board'

const useStyles = makeStyles((theme) => ({
  appBar: {
    border: `1px solid ${theme.palette.divider}`,
    marginBottom: '10px'
  },
  toolBarRight: {
    marginLeft: 'auto',
    float: 'left'
  },
  logOut: {
    margin: theme.spacing(1, 1.5),
  },
  logo: {
    border: `2px solid ${theme.palette.divider}`,
    paddingLeft: '5px',
    paddingRight: '5px'
  }
}));

const Main = props => {
  const classes = useStyles();
  const cookies = new Cookies();
  const [showBar, setShowBar] = React.useState(true);
  let logOutHandler = () => {
    console.log("Hello!")
      cookies.remove('loggedin')
      cookies.remove('accountname')
      cookies.remove('account_id')
      cookies.remove('email')
      props.logOut()
  }
  const showBarHandle = () => {
    setShowBar(!showBar)
  }
  return <>
            <AppBar position="static" color="default" className={classes.appBar} style={{display: showBar? 'flex' : 'none'}}>
              <Toolbar className={classes.toolBar}>
                  <IconButton edge="start" aria-label="menu">
                    <Menu />
                  </IconButton>
                  <Typography variant="h6" className={classes.logo}>
                    WORK BX  
                  </Typography>
                  <Typography variant="subtitle1" className={classes.toolBarRight} >
                      {props.accountName}
                  </Typography>
                  <Button className={classes.logOut} onClick={() => { logOutHandler() }}>Log Out</Button>
              </Toolbar>
              
            </AppBar>
            <Board accountName={props.accountName} showBar={() => {showBarHandle()}}/>
         </>
    ;
  
}

export default Main;
