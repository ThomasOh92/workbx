/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
const sha256 = require('js-sha256');
const SALT = "everyday i'm hustlin";

module.exports = (dbPoolInstance) => {

  // `dbPoolInstance` is accessible within this function scope

  let registerAccount = async (email, accountname, pw) => {
    let hashedpw = sha256(pw);
    values = [email, accountname, hashedpw];
    let queryString = "INSERT INTO accounts (email, accountname, password) VALUES ($1, $2, $3) RETURNING *";
    let answer;
    try {
        answer = await dbPoolInstance.query(queryString, values)
    } catch (err){
        console.log(err, "query err")
    }
    let currentSessionCookie = sha256(answer.rows[0].id + "logged" + SALT)
    return {currentSessionCookie, queryResult: answer.rows[0]}
  };

  let verifyLogin = async (email, pw) => {
    //Verifying password
    let hashedpw = sha256(pw)
    let values = [email]
    let queryString = "SELECT * FROM accounts WHERE email = $1";
    const queryResult = await dbPoolInstance.query(queryString, values)
    let loginSuccess;
    if (queryResult.rows[0].password === hashedpw){
        loginSuccess = true;
    } else {
        loginSuccess = false;
    }
    let currentSessionCookie = sha256(queryResult.rows[0].id + "logged" + SALT)

    return {loginSuccess,
            queryResult: queryResult.rows[0],
            currentSessionCookie
            }
  };

  return {
    registerAccount,
    verifyLogin
  };
};