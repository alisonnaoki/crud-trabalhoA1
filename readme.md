1-Comandos para início do projeto
npm init -y
npm install express cors
npm install --save-dev nodemon

2-Criação de files e folders
pasta routes/
index.js

3-Configurar scripts no package.json
"scripts": {
"start": "nodemon index.js",
"test": "echo \"Error: no test specified\" && exit 1"
}

4-Importar express e cors no index.js

5-Fazer configuração inicial do index.js

6-Criação dos CRUDS
routes/
    Consultas.js
    Enfermeiros.js
    Medicamentos.js
    Medicos.js
    Pacientes.js