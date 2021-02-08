//inisialisasi library
const express = require("express")
const app = express()

//import route kasir
const kasir = require("./route/kasir")
app.use("/kasir", kasir)

//import route admin
const admin = require("./route/admin")
app.use("/admin", admin)

//membuat web server dengan port 2000
app.listen(2000, () => {
    console.log("Server run on port 2000")
})