const express = require("express")
const app = express()
const port = 3000

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin) //获取请求源 这样所有请求就都有访问权限了
  res.header("Access-Control-Allow-Credentials", true)
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
  )
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
  res.header("Content-Type", "application/json;charset=utf-8")
  next()
})

app.get("/", async (req, res) => {
  const axios = require("axios")
  let resp = await axios(
    "http://v.juhe.cn/joke/content/list.php?sort=desc&time=1687762025&key=adbd6058c09e347a866e76fe8eb59de5"
  )
  // 代理服务器请求头
  res.header("Access-Control-Allow-Origin", "*")
  res.send(resp.data)
})
app.get("/hot", (req, res) => {
  res.send({ name: "小江", age: 20 })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
