//import library mysql
const mysql = require("mysql")

//inisialisasi db yang digunakan
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "restoran"
})

//lakukan koneksi db
db.connect(error => {
    if (error) {
        console.log(error.message)
    } else {
        console.log("MySQL Connected")
    }
})
//export konfigurasi database
module.exports = db