const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// Servir arquivos estáticos do Angular
app.use(express.static(path.join(__dirname, '../dist/my-app/browser')));

// Rota de login - apenas usuários do banco Azure
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Simulação de consulta ao Azure (substitua pela conexão real)
  console.log('Tentativa de login:', email);
  
  // Por enquanto, retorna erro até configurar mssql
  res.status(401).json({ 
    message: 'Configure o módulo mssql para conectar ao Azure SQL Server' 
  });
});

// Servir o Angular para todas as outras rotas
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/my-app/browser/index.html'));
});

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
  console.log('Site disponível em: http://localhost:3001');
  console.log('AVISO: Configure mssql para conectar ao Azure SQL Server');
});