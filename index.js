const app = require('express')()

const DocuSign = require(`${__dirname}/docusign`)

const PORT = process.env.PORT || 3000

app.get('/docusign', (req, res) => {
  const client = new DocuSign()
  client.authenticate(req, res)
})

app.listen(PORT, 'localhost', err => {
  if (err) { throw err }
  console.log(`> Go to port ${PORT}, dawg`)
})
