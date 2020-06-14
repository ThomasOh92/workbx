module.exports = (db) => {

  let getLocalLinks = async (req, res) => {
    try{
        const modelRequest = await db.locallinks.getLocalLinks(req.cookies.account_id)
        res.send(modelRequest)
    }catch(err){
        console.log(err)
    }
  }

  let saveLocalLinks = async (req, res) =>{
    console.log("all", req.body)
    try {
        let deleteInfo = await db.locallinks.deleteLocalLinks(req.cookies.account_id)

        console.log(deleteInfo)

        for (let el of req.body.localLinks){
            let insertInfo = await db.locallinks.insertLocalLinks(el.link, el.fileName, el.position.x, el.position.y, req.cookies.account_id)
            console.log(insertInfo)
        }

        res.send("done")

    }catch (err){
        console.log(err)
    }
  }


  return {
    getLocalLinks,
    saveLocalLinks
  };

}