const express = require('express')
const router = express.Router()

let enfermeiros = [
{
id: 1,
nome: "Carlos Pereira",
coren: "654321",
email: "carlos.pereira@hospital.com",
telefone: "11 97777-6655"
}
]

router.get('/enfermeiros', (req, res, next) => {
res.json(enfermeiros)
})

router.get('/enfermeiros/:id', (req, res, next) => {
const idRecebido = req.params.id
const enfermeiro = enfermeiros.find(e => e.id == idRecebido)
if (!enfermeiro) {
return res.status(404).json({ error: "Enfermeiro não encontrado!!!" })
}
res.json(enfermeiro)
})

router.post('/enfermeiros', (req, res, next) => {
const { nome, coren, email, telefone } = req.body

if (!nome || !coren || !email || !telefone) {
return res.status(400).json({ error: "nome, coren, email e telefone são obrigatórios!!!" })
}

const enfermeiroExistente = enfermeiros.find(e => e.coren == coren)
if (enfermeiroExistente) {
return res.status(409).json({ error: "COREN já cadastrado!!!" })
}

const novoEnfermeiro = {
id: Date.now(),
nome,
coren,
email,
telefone
}

enfermeiros.push(novoEnfermeiro)
res.status(201).json({ message: "Enfermeiro cadastrado com sucesso!!!", novoEnfermeiro })
})

router.put('/enfermeiros/:id', (req, res, next) => {
const idRecebido = req.params.id
const { nome, email, telefone } = req.body

if (!nome || !email || !telefone) {
return res.status(400).json({ error: "nome, email e telefone são obrigatórios!!!" })
}

const enfermeiro = enfermeiros.find(e => e.id == idRecebido)
if (!enfermeiro) {
return res.status(404).json({ error: "Enfermeiro não encontrado!!" })
}

enfermeiro.nome = nome
enfermeiro.email = email
enfermeiro.telefone = telefone

res.json({ message: "Cadastro de enfermeiro atualizado com sucesso!!!" })
})

router.delete('/enfermeiros/:id', (req, res, next) => {
const idRecebido = req.params.id
const enfermeiro = enfermeiros.find(e => e.id == idRecebido)
if (!enfermeiro) {
return res.status(404).json({ error: "Enfermeiro não encontrado!!!" })
}

enfermeiros = enfermeiros.filter(e => e.id != idRecebido)

res.json({ message: "Enfermeiro excluído com sucesso!!!" })
})

module.exports = router