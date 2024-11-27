const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tarefaDB'
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('Conectado ao banco de dados MySQL');
});

// Rota para criar uma tarefa
app.post('/tarefas', (req, res) => {
  const { titulo, descricao } = req.body;
  const sql = 'INSERT INTO tarefas (titulo, descricao) VALUES (?, ?)';
  db.query(sql, [titulo, descricao], (err, result) => {
    if (err) throw err;
    res.send('Tarefa adicionada com sucesso!');
  });
});

// Rota para ler todas as tarefas
app.get('/tarefas', (req, res) => {
  const sql = 'SELECT * FROM tarefas';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Rota para atualizar uma tarefa
app.put('/tarefas/:id', (req, res) => {
  const { id } = req.params;
  const { titulo, descricao } = req.body;
  const sql = 'UPDATE tarefas SET titulo = ?, descricao = ? WHERE id = ?';
  db.query(sql, [titulo, descricao, id], (err, result) => {
    if (err) throw err;
    res.send('Tarefa atualizada com sucesso!');
  });
});

// Rota para deletar uma tarefa
app.delete('/tarefas/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM tarefas WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send('Tarefa deletada com sucesso!');
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});


//mkdir server-app
//cd server-app
//npm init -y
//npm install express mysql body-parser cors


//CREATE DATABASE tarefaDB;
//USE tarefaDB;
//CREATE TABLE tarefas (
  //id INT AUTO_INCREMENT PRIMARY KEY,
  //titulo VARCHAR(255) NOT NULL,
  //descricao TEXT
//);

