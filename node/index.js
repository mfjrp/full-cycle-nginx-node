const { application } = require('express')
const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'jsnodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const createTable = `CREATE TABLE IF NOT EXISTS people (id int not null auto_increment, name varchar(255), primary key(id));`
connection.query(createTable);
const sql = `INSERT INTO people(name) values('Mauricio Frasson Full Cycle')`
connection.query(sql)

app.get('/', (req,res) => {
    connection.query(
        'SELECT * FROM `people`;',
        function(err, results, fields) {
            var listNames = '';
            for(let person of results) {
                listNames = listNames.concat("<p>Nome: " + person.name + "</p><br/>")
            }
            res.send('<h1>Full Cycle Rocks!</h1><br/><strong>Lista de pessoas</strong><br/>' + listNames)
        }
    );
    connection.end()
}) 

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})