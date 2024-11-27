import React, { useState, useEffect } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import axios from 'axios';

const Tarefas = () => {
  const [tarefas, setTarefas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    editarTarefas();
  }, []);

  const editarTarefas = async () => {
    const response = await axios.get('http://localhost:5000/tarefas');
    setTarefas(response.data);
  };

  const criarTarefa = async () => {
    await axios.post('http://localhost:5000/tarefas', { titulo, descricao });
    editarTarefas();
    setTitulo('');
    setDescricao('');
  };

  const atualizarTarefa = async () => {
    await axios.put(`http://localhost:5000/tarefas/${editId}`, { titulo, descricao });
    editarTarefas();
    setTitulo('');
    setDescricao('');
    setEditId(null);
  };

  const deletaTarefa = async id => {
    await axios.delete(`http://localhost:5000/tarefas/${id}`);
    editarTarefas();
  };

  return (
    <div className="container">
      <h1>Gerenciador de Tarefas</h1>
      <Form>
        <Form.Group controlId="formTitulo">
          <Form.Label>Título</Form.Label>
          <Form.Control type="text" placeholder="Digite o título" value={titulo} onChange={e => setTitulo(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formDescricao">
          <Form.Label>Descrição</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Digite a descrição" value={descricao} onChange={e => setDescricao(e.target.value)} />
        </Form.Group>
        <Button variant="primary" onClick={editId ? atualizarTarefa : criarTarefa}>
          {editId ? 'Atualizar Tarefa' : 'Adicionar Tarefa'}
        </Button>
      </Form>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Título</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {tarefas.map(tarefa => (
            <tr key={tarefa.id}>
              <td>{tarefa.id}</td>
              <td>{tarefa.titulo}</td>
              <td>{tarefa.descricao}</td>
              <td>
                <Button variant="warning" onClick={() => { setTitulo(tarefa.titulo); setDescricao(tarefa.descricao); setEditId(tarefa.id); }}>Editar</Button>
                <Button variant="danger" onClick={() => deletaTarefa(tarefa.id)}>Deletar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Tarefas;
