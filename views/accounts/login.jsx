var React = require("react");

class LogIn extends React.Component {
  render() {
    return (
      <html>
        <head>
            <link href="//cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/css/materialize.min.css" rel="stylesheet" id="bootstrap-css"></link>
            <script src="//cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/js/materialize.min.js"></script>
            <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
        </head>
        <body className="pre-app-body">
            <div className ="container-fluid pre-app-box">

                <div class="row justify-content-center">
                    <div className="col-sm-6 col-md-4 d-inline-flex">
                   <img className="logo" src="/img/logo.png" alt="logo"/>
                   <h5 className="logo-text">Banana Box</h5>
                    </div>
                </div>

                <div class="row justify-content-center">
                  <div className="col-sm-6 col-md-4 shadow p-3 mt-3 mb-5">
                    <div className="container mb-4"><h3 className="form-header">Log In</h3></div>
                    <form method="POST" action="/login" className = "container">
                      <div className="form-group mb-3">
                        <input type="text" className="form-control" id="email" name="email" placeholder="Email"></input>
                      </div>
                      <div className="form-group">
                        <input type="password" className="form-control" id="password" name="password" placeholder="Password"></input>
                      </div>
                        <button type="submit" value="Submit" className="btn btn-primary">Log In</button>
                    </form>
                        <div style={{textAlign: "right"}}>
                            <a href="/registration">Register</a>
                        </div>
                  </div>
                </div>
        </div>
        </body>
      </html>
    );
  }
}

module.exports = LogIn;