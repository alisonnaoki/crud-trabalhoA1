const express = require('express')
const router = express.Router()

let consultas = [
{
id: 1,
pacienteId: 1,
medicoId: 1,
data: "2024-07-01",
hora: "14:00",
motivo: "Consulta de rotina"
}
]

router.get('/consultas', (req, res, next) => {
res.json(consultas)
})

router.get('/consultas/:id', (req, res, next) => {
const idRecebido = req.params.id
const consulta = consultas.find(c => c.id == idRecebido)
if (!consulta) {
return res.status(404).json({ error: "Consulta não encontrada!!!" })
}
res.json(consulta)
})

router.post('/consultas', (req, res, next) => {
const { pacienteId, medicoId, data, hora, motivo } = req.body

if (!pacienteId || !medicoId || !data || !hora || !motivo) {
return res.status(400).json({ error: "pacienteId, medicoId, data, hora e motivo são obrigatórios!!!" })
}

const novaConsulta = {
id: Date.now(),
pacienteId,
medicoId,
data,
hora,
motivo
}

consultas.push(novaConsulta)
res.status(201).json({ message: "Consulta cadastrada com sucesso!!!", novaConsulta })
})

router.put('/consultas/:id', (req, res, next) => {
const idRecebido = req.params.id
const { pacienteId, medicoId, data, hora, motivo } = req.body

if (!pacienteId || !medicoId || !data || !hora || !motivo) {
return res.status(400).json({ error: "pacienteId, medicoId, data, hora e motivo são obrigatórios!!!" })
}

const consulta = consultas.find(c => c.id == idRecebido)
if (!consulta) {
return res.status(404).json({ error: "Consulta não encontrada!!" })
}

consulta.pacienteId = pacienteId
consulta.medicoId = medicoId
consulta.data = data
consulta.hora = hora
consulta.motivo = motivo

res.json({ message: "Consulta atualizada com sucesso!!!" })
})

router.delete('/consultas/:id', (req, res, next) => {
const idRecebido = req.params.id
const consulta = consultas.find(c => c.id == idRecebido)
if (!consulta) {
return res.status(404).json({ error: "Consulta não encontrada!!!" })
}

consultas = consultas.filter(c => c.id != idRecebido)

res.json({ message: "Consulta excluída com sucesso!!!" })
})

module.exports = router