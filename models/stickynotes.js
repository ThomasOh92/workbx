module.exports = (dbPoolInstance) => {
  let getStickyNotes = async(accountid) => {
    let values = [accountid]
    let queryString = "SELECT id, content, xPos, yPos, account_id FROM stickynotes WHERE account_id = $1"
    let answer
    try {
        answer = await dbPoolInstance.query(queryString, values);
    } catch (err) {
        console.log(err)
    }
    console.log(answer)
    return answer.rows
  }

  let insertStickyNotes = async (content, xPos, yPos, account_id) => {
    let values = [content, xPos, yPos, account_id];
    let queryString = "INSERT INTO stickynotes (content, xPos, yPos, account_id) VALUES ($1, $2, $3, $4) RETURNING *";
    let answer;
    try {
        answer = await dbPoolInstance.query(queryString, values);
    } catch (err) {
        console.log("query err", err)
    }
    return answer.rows[0];
  }

  let deleteStickyNotes = async (accountid) => {
    values = [accountid]
    console.log(values)
    let queryString = "DELETE FROM stickynotes WHERE account_id = $1 RETURNING *"
    let answer
    try{
        answer = await dbPoolInstance.query(queryString, values);
    }catch (err){
        console.log(err)
    }
    return answer.rows[0]
  }


  return {
    getStickyNotes,
    insertStickyNotes,
    deleteStickyNotes
  };
};