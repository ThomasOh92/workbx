module.exports = (db) => {

  let getStickyNotes = async (req, res) => {
    try{
        const modelRequest = await db.stickynotes.getStickyNotes(req.cookies.account_id)
        res.send(modelRequest)
    }catch(err){
        console.log(err)
    }
  }

  let saveStickyNotes = async (req, res) =>{
    console.log("all", req)
    try {
        let deleteInfo = await db.stickynotes.deleteStickyNotes(req.cookies.account_id)

        console.log(deleteInfo)

        for (let el of req.body.stickyNotes){
            let insertInfo = await db.stickynotes.insertStickyNotes(el.content, el.position.x, el.position.y, req.cookies.account_id)
            console.log(insertInfo)
        }

        res.send("done")

    }catch (err){
        console.log(err)
    }
  }


  return {
    getStickyNotes,
    saveStickyNotes
  };

}