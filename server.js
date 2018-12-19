const path = require('path')
const fs = require('fs')
const express =require('express')
const ReactSSR = require('react-dom/server')

const serverEntry = require('./dist/server-entry').default
const tplPath = path.join(__dirname, './dist/index.html')
const template = fs.readFileSync(tplPath, 'utf8') // 不指定utf-8,默认是buffer

const app = express()
app.use(express.static('dist'));
app.get('*', (req, res) => {
  const context = {}
  const appStr = ReactSSR.renderToString(serverEntry(req, context)())
  let str = template.replace('<!--app-->', appStr)
  str = str.replace('<!--script-->', `<script>__init_server=true</script>`)
  // console.log(str)
  res.send(str)
})

app.listen(2333, () => {
  console.log('server is listening on 2333')
})