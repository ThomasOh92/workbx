module.exports = (dbPoolInstance) => {
  let getWebLinks= async(accountid) => {
    let values = [accountid]
    let queryString = "SELECT id, link, linkname, xPos, yPos, account_id FROM weblinks WHERE account_id = $1"
    let answer
    try {
        answer = await dbPoolInstance.query(queryString, values);
    } catch (err) {
        console.log(err)
    }
    console.log(answer)
    return answer.rows
  }

  let insertWebLinks= async (link, linkName, xPos, yPos, account_id) => {
    let values = [link, linkName, xPos, yPos, account_id];
    let queryString = "INSERT INTO weblinks (link, linkname, xPos, yPos, account_id) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    let answer;
    try {
        answer = await dbPoolInstance.query(queryString, values);
    } catch (err) {
        console.log("query err", err)
    }
    return answer.rows[0];
  }

  let deleteWebLinks= async (accountid) => {
    values = [accountid]
    console.log(values)
    let queryString = "DELETE FROM weblinks WHERE account_id = $1 RETURNING *"
    let answer
    try{
        answer = await dbPoolInstance.query(queryString, values);
    }catch (err){
        console.log(err)
    }
    return answer.rows[0]
  }


  return {
    getWebLinks,
    insertWebLinks,
    deleteWebLinks
  };
};