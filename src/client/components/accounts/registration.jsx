import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        WorkBx
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Registration = () => {
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} method="POST" action="/registration" noValidate>
            <Grid container spacing={2}>
            {/* <input type="text" className="form-control" id="accountname" name="accountname" placeholder="Account Name"></input> */}
              <Grid item xs={12} >
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Account Name"
                  name="accountname"
                  autoComplete="lname"
                />
              </Grid>
            {/* <input type="email" className="form-control" id="email" name="email" placeholder="Email"></input> */}
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  id="password"
                  autoComplete="confirm-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
  
        // <div className ="container-fluid">
        //     <div class="row justify-content-center">
        //         <div className="col-sm-6 col-md-4 d-inline-flex">
        //         <img className="logo" src="/img/logo.png" alt="logo"/>
        //         <h5 className="logo-text">Banana Box</h5>
        //         </div>
        //     </div>
        //     <div class="row justify-content-center">
        //         <div className="col-sm-6 col-md-4 shadow p-3 mt-3 mb-5">
        //             <div className="container mb-4"><h3 className="form-header">Register</h3></div>
        //             <form method="POST" action="/registration" className = "container">
        //             <div className="form-group mb-3">
        //                 <input type="text" className="form-control" id="accountname" name="accountname" placeholder="Account Name"></input>
        //             </div>
        //             <div className="form-group mb-3">
        //                 <input type="email" className="form-control" id="email" name="email" placeholder="Email"></input>
        //             </div>
        //             <div className="form-group">
        //                 <input type="password" className="form-control" id="password" name="password" placeholder="Password"></input>
        //             </div>
        //             <div className="form-group">
        //                 <input type="password" className="form-control" id="confirmpassword" placeholder="Confirm Password"></input>
        //             </div>
        //                 <button type="submit" value="Submit" className="btn btn-primary mt-3">Register</button>
        //             </form>
        //                 <div style={{textAlign: "right"}}>
        //                     <a href="/login">Log In</a>
        //                 </div>
        //             <br />
        //         </div>
        //     </div>
        // </div>
    );
    
    
  }

export default Registration;
