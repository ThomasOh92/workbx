import React, {useState} from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Redirect, Route, NavLink } from "react-router-dom";
import Login from './components/accounts/login'
import Main from './components/main/main';
import Registration from './components/accounts/registration'
import Cookies from 'universal-cookie';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const App = props => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          board: prefersDarkMode? '#212121': '#f5f5f5'
        },
      }),
    [prefersDarkMode],
  );


  const cookies = new Cookies();
  const [loggedIn, setLoggedIn] = useState(cookies.get('loggedin'));
  const [accountName, setAccountName] = useState(cookies.get('accountname'));
  
  const logOut = () => {
    setLoggedIn("")
    setAccountName("")
  }
  
  return  <ThemeProvider theme={theme}>
            <CssBaseline/>
              <Switch>
              <Route path="/login" component={Login} />
              <Route path="/registration" component={Registration}/>
              <Route exact path="/">
                {loggedIn ? <Main accountName = {accountName} logOut = {() => {logOut()}}/> : <Login />}
              </Route>
            </Switch>
          </ThemeProvider>
}


export default hot(module)(App);
