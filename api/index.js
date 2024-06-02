const S1 = require('s1db')
const db = new S1(process.env.S1_TOKEN)

const { v4: uuidv4 } = require('uuid');

module.exports = async (req, res) => {
  let response = await fetch('https://jamsapi.hackclub.dev/openai/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_TOKEN}`
      },
      body: JSON.stringify({
        'model': 'gpt-3.5-turbo',
        'messages': [
          {
            'role': 'user',
            'content': `Generate the HTML, CSS and JS for the world's worst website. It must be at least 5,000 lines of code. It must all be one index.html file. Only respond with the contents of the file, nothing else. Use random colours and random fonts. Hard to read fonts are preferred.`
          }
        ],
      })
    }).then(r => r.json())
    
  let uuid = uuidv4();
  await db.set(uuid, response.choices[0].message.content)
  return res.redirect(`/site?id=${uuid}`)
}