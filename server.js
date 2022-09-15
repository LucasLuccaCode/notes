require("dotenv").config()

const express = require("express")
const app = express()
const routes = require("./routes")
const path = require("path")
const mongoose = require("mongoose")
const PORT = 3000

//Connecting on Mongodb
mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(() => {
  console.log("Connected to Mongodb")
  app.emit("logged")
})
  .catch(err => console.log("Erro ao se conectar ao Mongodb"))

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.resolve(__dirname, "public")))

//View Engine
app.set("views", path.resolve(__dirname, "src", "views"))
app.set("view engine", "ejs")

//Routes
app.use(routes)

app.on("logged", () => {
  app.listen(PORT, () => {
    console.log("Listening on port 3000")
  })
})