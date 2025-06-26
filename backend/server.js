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

// Usuário de teste (senha: 123456)
const testUser = {
  id: 1,
  email: 'admin@barbearia.com',
  password: '123456', // senha simples para teste
  name: 'Administrador'
};

// Hash da senha 123456 para comparação
const hashedPassword = '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi';

// Rota de login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  
  console.log('Login attempt:', { email, password }); // Debug
  
  if (email !== testUser.email) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }
  
  // Comparação simples para teste
  if (password !== testUser.password) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }
  
  const token = jwt.sign({ userId: testUser.id }, 'secret_key', { expiresIn: '1h' });
  res.json({ token, user: { id: testUser.id, email: testUser.email } });
});

// Servir o Angular para todas as outras rotas
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/my-app/browser/index.html'));
});

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
  console.log('Site disponível em: http://localhost:3001');
});