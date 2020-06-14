module.exports = (dbPoolInstance) => {
  let getLocalLinks= async(accountid) => {
    let values = [accountid]
    let queryString = "SELECT id, link, filename, xPos, yPos, account_id FROM locallinks WHERE account_id = $1"
    let answer
    try {
        answer = await dbPoolInstance.query(queryString, values);
    } catch (err) {
        console.log(err)
    }
    console.log(answer)
    return answer.rows
  }

  let insertLocalLinks= async (link, fileName, xPos, yPos, account_id) => {
    let values = [link, fileName, xPos, yPos, account_id];
    let queryString = "INSERT INTO locallinks (link, filename, xPos, yPos, account_id) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    let answer;
    try {
        answer = await dbPoolInstance.query(queryString, values);
    } catch (err) {
        console.log("query err", err)
    }
    return answer.rows[0];
  }

  let deleteLocalLinks= async (accountid) => {
    values = [accountid]
    console.log(values)
    let queryString = "DELETE FROM locallinks WHERE account_id = $1 RETURNING *"
    let answer
    try{
        answer = await dbPoolInstance.query(queryString, values);
    }catch (err){
        console.log(err)
    }
    return answer.rows[0]
  }


  return {
    getLocalLinks,
    insertLocalLinks,
    deleteLocalLinks
  };
};