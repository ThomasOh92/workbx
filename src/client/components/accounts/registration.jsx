import React from 'react';

import classnames from 'classnames';

// const cx = classnames.bind(styles)

const Registration = () => {

    return (
        <div className ="container-fluid">
            <div class="row justify-content-center">
                <div className="col-sm-6 col-md-4 d-inline-flex">
                <img className="logo" src="/img/logo.png" alt="logo"/>
                <h5 className="logo-text">Banana Box</h5>
                </div>
            </div>
            <div class="row justify-content-center">
                <div className="col-sm-6 col-md-4 shadow p-3 mt-3 mb-5">
                    <div className="container mb-4"><h3 className="form-header">Register</h3></div>
                    <form method="POST" action="/registration" className = "container">
                    <div className="form-group mb-3">
                        <input type="text" className="form-control" id="accountname" name="accountname" placeholder="Account Name"></input>
                    </div>
                    <div className="form-group mb-3">
                        <input type="email" className="form-control" id="email" name="email" placeholder="Email"></input>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="password" name="password" placeholder="Password"></input>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="confirmpassword" placeholder="Confirm Password"></input>
                    </div>
                        <button type="submit" value="Submit" className="btn btn-primary mt-3">Register</button>
                    </form>
                        <div style={{textAlign: "right"}}>
                            <a href="/login">Log In</a>
                        </div>
                    <br />
                </div>
            </div>
        </div>
    );
    
    
  }

export default Registration;
