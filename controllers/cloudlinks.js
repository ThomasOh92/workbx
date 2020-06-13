module.exports = (db) => {

  let getCloudLinks = async (req, res) => {
    try{
        const modelRequest = await db.cloudlinks.getCloudLinks(req.cookies.account_id)
        res.send(modelRequest)
    }catch(err){
        console.log(err)
    }
  }

  let saveCloudLinks = async (req, res) =>{
    console.log("all", req.body)
    try {
        let deleteInfo = await db.cloudlinks.deleteCloudLinks(req.cookies.account_id)

        console.log(deleteInfo)

        for (let el of req.body.cloudLinks){
            let insertInfo = await db.cloudlinks.insertCloudLinks(el.link, el.fileName, el.position.x, el.position.y, req.cookies.account_id)
            console.log(insertInfo)
        }

        res.send("done")

    }catch (err){
        console.log(err)
    }
  }


  return {
    getCloudLinks,
    saveCloudLinks
  };

}