const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const db = require("../config") //import konfigurasi db

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//GET: /kasir -> endpoint utk mengakses data kasir
app.get("/", (req,res) => {
    let sql = "select * from kasir"
    db.query(sql, (err, result) => {
        if (err) {
            throw err
        }
        else {
            let response = {
                count: result.length,
                kasir: result
            }

            res.setHeader("Content-Type", "application/json")
            res.send(JSON.stringify(response))
        }
    })
})

//POST: /kasir -> endpoint untuk pencarian data kasir
app.post("/", (req,res) => {
    let find = req.body.find
    let sql = "select * from kasir where id_kasir like '%"
    +find+"%' or nama_kasir like '%"+find+"%'"

    db.query(sql, (err, result) => {
        if (err) {
            throw err
        } else {
            let response = {
                count: result.length,
                kasir: result
            }

            res.setHeader("Content-Type", "application/json")
            res.send(JSON.stringify(response))
        }
    })
})

//POST: /pegawai/save -> endpoint untuk insert data kasir
app.post("/save", (req,res) => {
    let data = {
        id_kasir: req.body.id_kasir,
        nama_kasir: req.body.nama_kasir,
        user_kasir: req.body.user_kasir,
        pass_kasir: req.body.pass_kasir,
    }
    let message = ""

    let sql = "insert into kasir set ?"
    db.query(sql, data, (err,result) => {
        if (err) {
            message = err.message
        } else {
            message = result.affectedRows + " row inserted"
        }

        let response = {
            message : message
        }

        res.setHeader("Content-Type", "application/json")
        res.send(JSON.stringify(response))
    })
})

//POST: /kasir/update -> endpoint utk update data kasir
app.post("/update", (req,res) => {
    let data = [{
        id_kasir: req.body.id_kasir,
        nama_kasir: req.body.nama_kasir,
        user_kasir: req.body.user_kasir,
        pass_kasir: req.body.pass_kasir
    }, req.body.id_kasir]
    let message = ""

    let sql = "update kasir set ? where id_kasir = ?"
    db.query(sql,data, (err,result) => {
        if (err) {
            message = err.message
        } else {
            message = result.affectedRows + " row updated"
        }

        let response = {
            message : message
        }

        res.setHeader("Content-Type", "application/json")
        res.send(JSON.stringify(response))
    })
})

//DELETE: /kasir/:id_kasir -> endpoint utk hapus data kasir
app.delete("/:id_kasir", (req,res) => {
    let data = {
        id_kasir : req.params.id_kasir
    }
    let message = ""
    let sql = "delete from kasir where ?"
    db.query(sql, data, (err, result) => {
        if (err) {
            message = err.message
        } else {
            message = result.affectedRows + " row deleted"
        }

        let response = {
            message : message
        }

        res.setHeader("Content-Type", "application/json")
        res.send(JSON.stringify(response))
    })
})

module.exports = app