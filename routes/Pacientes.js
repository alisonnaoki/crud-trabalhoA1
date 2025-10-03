const express = require('express')
const router = express.Router()

let pacientes = [
  {
    id: 1,
    nome: "João Silva",
    cpf: "98765432100",
    email: "joao.silva@email.com",
    telefone: "11 91234-5678",
    dataNascimento: "15/03/1980",
    endereco: "Rua das Flores, 123",
    planoSaude: "Unimed"
  }
]

// Listar todos os pacientes
router.get('/pacientes', (req, res, next) => {
  res.json(pacientes)
})

// Buscar paciente por id
router.get('/pacientes/:id', (req, res, next) => {
  const idRecebido = req.params.id
  const paciente = pacientes.find(p => p.id == idRecebido)
  if (!paciente) {
    return res.status(404).json({ error: "Paciente não encontrado!!!" })
  }
  res.json(paciente)
})

// Criar novo paciente
router.post('/pacientes', (req, res, next) => {
  const { nome, cpf, email, telefone, dataNascimento, endereco, planoSaude } = req.body

  if (!nome || !cpf || !email || !telefone || !dataNascimento || !endereco) {
    return res.status(400).json({ error: "nome, cpf, email, telefone, dataNascimento e endereco são obrigatórios!!!" })
  }

  const pacienteExistente = pacientes.find(p => p.cpf == cpf)
  if (pacienteExistente) {
    return res.status(409).json({ error: "CPF já cadastrado!!!" })
  }

  const novoPaciente = {
    id: Date.now(),
    nome,
    cpf,
    email,
    telefone,
    dataNascimento,
    endereco,
    planoSaude: planoSaude || null
  }

  pacientes.push(novoPaciente)
  res.status(201).json({ message: "Paciente cadastrado com sucesso!!!", novoPaciente })
})

// Atualizar paciente
router.put('/pacientes/:id', (req, res, next) => {
  const idRecebido = req.params.id
  const { nome, email, telefone, dataNascimento, endereco, planoSaude } = req.body

  if (!nome || !email || !telefone || !dataNascimento || !endereco) {
    return res.status(400).json({ error: "nome, email, telefone, dataNascimento e endereco são obrigatórios!!!" })
  }

  const paciente = pacientes.find(p => p.id == idRecebido)
  if (!paciente) {
    return res.status(404).json({ error: "Paciente não encontrado!!" })
  }

  paciente.nome = nome
  paciente.email = email
  paciente.telefone = telefone
  paciente.dataNascimento = dataNascimento
  paciente.endereco = endereco
  paciente.planoSaude = planoSaude || paciente.planoSaude

  res.json({ message: "Cadastro de paciente atualizado com sucesso!!!" })
})

// Excluir paciente
router.delete('/pacientes/:id', (req, res, next) => {
  const idRecebido = req.params.id
  const paciente = pacientes.find(p => p.id == idRecebido)
  if (!paciente) {
    return res.status(404).json({ error: "Paciente não encontrado!!!" })
  }

  pacientes = pacientes.filter(p => p.id != idRecebido)

  res.json({ message: "Paciente excluído com sucesso!!!" })
})

module.exports = router
