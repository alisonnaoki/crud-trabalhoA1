const express = require('express')
const router = express.Router()

let medicamentos = [
{
id: 1,
nome: "Paracetamol",
fabricante: "Farmacêutica XYZ",
principioAtivo: "Paracetamol",
dosagem: "500mg",
estoque: 100
}
]

router.get('/medicamentos', (req, res, next) => {
res.json(medicamentos)
})

router.get('/medicamentos/:id', (req, res, next) => {
const idRecebido = req.params.id
const medicamento = medicamentos.find(m => m.id == idRecebido)
if (!medicamento) {
return res.status(404).json({ error: "Medicamento não encontrado!!!" })
}
res.json(medicamento)
})

router.post('/medicamentos', (req, res, next) => {
const { nome, fabricante, principioAtivo, dosagem, estoque } = req.body

if (!nome || !fabricante || !principioAtivo || !dosagem || estoque == null) {
return res.status(400).json({ error: "nome, fabricante, principioAtivo, dosagem e estoque são obrigatórios!!!" })
}

const medicamentoExistente = medicamentos.find(m => m.nome.toLowerCase() === nome.toLowerCase())
if (medicamentoExistente) {
return res.status(409).json({ error: "Medicamento já cadastrado!!!" })
}

const novoMedicamento = {
id: Date.now(),
nome,
fabricante,
principioAtivo,
dosagem,
estoque
}

medicamentos.push(novoMedicamento)
res.status(201).json({ message: "Medicamento cadastrado com sucesso!!!", novoMedicamento })
})

router.put('/medicamentos/:id', (req, res, next) => {
const idRecebido = req.params.id
const { nome, fabricante, principioAtivo, dosagem, estoque } = req.body

if (!nome || !fabricante || !principioAtivo || !dosagem || estoque == null) {
return res.status(400).json({ error: "nome, fabricante, principioAtivo, dosagem e estoque são obrigatórios!!!" })
}

const medicamento = medicamentos.find(m => m.id == idRecebido)
if (!medicamento) {
return res.status(404).json({ error: "Medicamento não encontrado!!" })
}

medicamento.nome = nome
medicamento.fabricante = fabricante
medicamento.principioAtivo = principioAtivo
medicamento.dosagem = dosagem
medicamento.estoque = estoque

res.json({ message: "Medicamento atualizado com sucesso!!!" })
})

router.delete('/medicamentos/:id', (req, res, next) => {
const idRecebido = req.params.id
const medicamento = medicamentos.find(m => m.id == idRecebido)
if (!medicamento) {
return res.status(404).json({ error: "Medicamento não encontrado!!!" })
}

medicamentos = medicamentos.filter(m => m.id != idRecebido)

res.json({ message: "Medicamento excluído com sucesso!!!" })
})

module.exports = router