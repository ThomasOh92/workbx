module.exports = (db) => {

  let getWebLinks = async (req, res) => {
    try{
        const modelRequest = await db.weblinks.getWebLinks(req.cookies.account_id)
        res.send(modelRequest)
    }catch(err){
        console.log(err)
    }
  }

  let saveWebLinks = async (req, res) =>{
    console.log("all", req.body)
    try {
        let deleteInfo = await db.weblinks.deleteWebLinks(req.cookies.account_id)

        console.log(deleteInfo)

        for (let el of req.body.webLinks){
            let insertInfo = await db.weblinks.insertWebLinks(el.link, el.linkName, el.position.x, el.position.y, req.cookies.account_id)
            console.log(insertInfo)
        }

        res.send("done")

    }catch (err){
        console.log(err)
    }
  }


  return {
    getWebLinks,
    saveWebLinks
  };

}