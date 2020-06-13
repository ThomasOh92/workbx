module.exports = (dbPoolInstance) => {
  let getCloudLinks= async(accountid) => {
    let values = [accountid]
    let queryString = "SELECT id, link, filename, xPos, yPos, account_id FROM cloudlinks WHERE account_id = $1"
    let answer
    try {
        answer = await dbPoolInstance.query(queryString, values);
    } catch (err) {
        console.log(err)
    }
    console.log(answer)
    return answer.rows
  }

  let insertCloudLinks= async (link, fileName, xPos, yPos, account_id) => {
    let values = [link, fileName, xPos, yPos, account_id];
    let queryString = "INSERT INTO cloudlinks (link, filename, xPos, yPos, account_id) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    let answer;
    try {
        answer = await dbPoolInstance.query(queryString, values);
    } catch (err) {
        console.log("query err", err)
    }
    return answer.rows[0];
  }

  let deleteCloudLinks= async (accountid) => {
    values = [accountid]
    console.log(values)
    let queryString = "DELETE FROM cloudlinks WHERE account_id = $1 RETURNING *"
    let answer
    try{
        answer = await dbPoolInstance.query(queryString, values);
    }catch (err){
        console.log(err)
    }
    return answer.rows[0]
  }


  return {
    getCloudLinks,
    insertCloudLinks,
    deleteCloudLinks
  };
};