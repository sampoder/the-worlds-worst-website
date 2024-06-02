const S1 = require('s1db')
const db = new S1(process.env.S1_TOKEN)

module.exports = async (req, res) => {
  if(!req.query.id){
    return res.redirect(`/`)
  } else {
    let html = await db.get(req.query.id)
    return res.send(html)
  }
}