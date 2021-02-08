const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const db = require("../config") //import konfigurasi db

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//GET: /admin -> endpoint utk mengakses data admin
app.get("/", (req,res) => {
    let sql = "select * from admin"
    db.query(sql, (err, result) => {
        if (err) {
            throw err
        }
        else {
            let response = {
                count: result.length,
                admin: result
            }

            res.setHeader("Content-Type", "application/json")
            res.send(JSON.stringify(response))
        }
    })
})

//POST: /admin -> endpoint untuk pencarian data admin
app.post("/", (req,res) => {
    let find = req.body.find
    let sql = "select * from admin where id_admin like '%"
    +find+"%' or nama_admin like '%"+find+"%'"

    db.query(sql, (err, result) => {
        if (err) {
            throw err
        } else {
            let response = {
                count: result.length,
                admin: result
            }

            res.setHeader("Content-Type", "application/json")
            res.send(JSON.stringify(response))
        }
    })
})

//POST: /admin/save -> endpoint untuk insert data admin
app.post("/save", (req,res) => {
    let data = {
        id_admin: req.body.id_admin,
        nama_admin: req.body.nama_admin,
        user_admin: req.body.user_admin,
        pass_admin: req.body.pass_admin,
    }
    let message = ""

    let sql = "insert into admin set ?"
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

//POST: /admin/update -> endpoint utk update data admin
app.post("/update", (req,res) => {
    let data = [{
        id_admin: req.body.id_admin,
        nama_admin: req.body.nama_admin,
        user_admin: req.body.user_admin,
        pass_admin: req.body.pass_admin
    }, req.body.id_admin]
    let message = ""

    let sql = "update admin set ? where id_admin = ?"
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

//DELETE: /admin/:id_admin -> endpoint utk hapus data admin
app.delete("/:id_admin", (req,res) => {
    let data = {
        id_admin : req.params.id_admin
    }
    let message = ""
    let sql = "delete from admin where ?"
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