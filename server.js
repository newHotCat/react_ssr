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
  const {Routes, store, add_todo} = serverEntry(req, context)
  store.dispatch(add_todo('我是服务端获取的数据'))
  console.log('----------------------触发dispatch')
  const appStr = ReactSSR.renderToString(Routes())
  let str = template.replace('<!--app-->', appStr)
  str = str.replace('<!--script-->', `<script>__init_server=true</script>`)
  str = str.replace('<!--script-->', `<script>window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())}</script>`)
  console.log(context)
  console.log(str)
  if (context.url) {
    console.log(context.url)
    res.redirect(context.url)
  } else {
    res.send(str)
  }
})

app.listen(2333, () => {
  console.log('server is listening on 2333')
})