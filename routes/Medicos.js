const express = require('express')
const router = express.Router()

let medicos = [
{
id: 1,
nome: "Dra. Maria Oliveira",
crm: "123456",
especialidade: "Cardiologia",
email: "maria.oliveira@hospital.com",
telefone: "11 99888-7766"
}
]

router.get('/medicos', (req, res, next) => {
res.json(medicos)
})

router.get('/medicos/:id', (req, res, next) => {
const idRecebido = req.params.id
const medico = medicos.find(m => m.id == idRecebido)
if (!medico) {
return res.status(404).json({ error: "Médico não encontrado!!!" })
}
res.json(medico)
})

router.post('/medicos', (req, res, next) => {
const { nome, crm, especialidade, email, telefone } = req.body

if (!nome || !crm || !especialidade || !email || !telefone) {
return res.status(400).json({ error: "nome, crm, especialidade, email e telefone são obrigatórios!!!" })
}

const medicoExistente = medicos.find(m => m.crm == crm)
if (medicoExistente) {
return res.status(409).json({ error: "CRM já cadastrado!!!" })
}

const novoMedico = {
id: Date.now(),
nome,
crm,
especialidade,
email,
telefone
}

medicos.push(novoMedico)
res.status(201).json({ message: "Médico cadastrado com sucesso!!!", novoMedico })
})

router.put('/medicos/:id', (req, res, next) => {
const idRecebido = req.params.id
const { nome, especialidade, email, telefone } = req.body

if (!nome || !especialidade || !email || !telefone) {
return res.status(400).json({ error: "nome, especialidade, email e telefone são obrigatórios!!!" })
}

const medico = medicos.find(m => m.id == idRecebido)
if (!medico) {
return res.status(404).json({ error: "Médico não encontrado!!" })
}

medico.nome = nome
medico.especialidade = especialidade
medico.email = email
medico.telefone = telefone

res.json({ message: "Cadastro de médico atualizado com sucesso!!!" })
})

router.delete('/medicos/:id', (req, res, next) => {
const idRecebido = req.params.id
const medico = medicos.find(m => m.id == idRecebido)
if (!medico) {
return res.status(404).json({ error: "Médico não encontrado!!!" })
}

medicos = medicos.filter(m => m.id != idRecebido)

res.json({ message: "Médico excluído com sucesso!!!" })
})

module.exports = router