var express = require("express")
var cors = require("cors")
var server  = express()
server.listen(29000)

var mysql = require("mysql")
var connectionString = "mysql://mjazz1:1jazzm@127.0.0.1/member"
var pool  = mysql.createPool(connectionString)
var con = mysql.createConnection(connectionString)

server.use(express.json())
server.use(cors())

server.get("/check-status", checkStatus)
server.get("/list-member", listMember)
server.post("/add-member", addMember)
server.put("/update-member", updateMember)
server.delete("/delete-member", deleteMember)

function checkStatus(request, response) {
        response.send("Server is OK")
}

function listMember(request, response) {
        pool.query("select * from user", function show(error, data) {
                                         if (error == null) response.send(data)
                                         else response.send(error)
                                      })
}

function addMember(request, response) {
        const id = request.body.id
        const name = request.body.name
        const surname = request.body.surname
        const gender = request.body.gender
        const telephone = request.body.telephone

    con.query('insert into user values(?,?,?,?,?)',[id,name,surname,gender,telephone], (err,result) => {
        if (!err) {
            response.send("Sucess")
        } else {
            console.log(err.message)
            response.send(err)
        }
    })
}

function updateMember(request, response) {
    const id = request.body.id
    const name = request.body.name

    con.query("UPDATE user SET name = ? WHERE id = ?", [name, id], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            response.send(result)
        }
    })

    function deleteMember(request, response) {
        const telephone = request.params.telephone
    
        con.query("DELETE FROM user where telephone = ?", [telephone], (err, result) => {
            if (err){
                console.log(err)
         } else {
                response.send(result)
         }
        })
    }
