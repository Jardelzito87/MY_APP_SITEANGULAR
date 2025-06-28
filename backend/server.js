const express = require('express');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');
const crypto = require('crypto');

const app = express();
app.use(express.json());
app.use(cors());

// Servir arquivos estáticos do Angular
app.use(express.static(path.join(__dirname, '../dist/my-app/browser')));

// Configuração do SQL Server Azure
const config = {
  user: 'jardel.sgomes1',
  password: 'Bea293016#',
  server: 'barbeariaserver.database.windows.net',
  database: 'barbearia_db',
  options: {
    encrypt: true,
    trustServerCertificate: false,
  }
};

// Rota de login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  
  console.log('Tentativa de login:', email);
  
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('email', sql.VarChar, email)
      .query('SELECT * FROM usuarios WHERE email = @email');
    
    console.log('Usuários encontrados:', result.recordset.length);
    
    if (result.recordset.length === 0) {
      console.log('Usuário não encontrado');
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }
    
    const user = result.recordset[0];
    console.log('Usuário encontrado:', user.email);
    console.log('Colunas disponíveis:', Object.keys(user));
    
    // Verificar se existe campo senha ou password
    const senhaHash = user.senha || user.password;
    console.log('Hash encontrado:', senhaHash ? 'Sim' : 'Não');
    
    if (!senhaHash) {
      console.log('Campo senha vazio no banco');
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }
    
    console.log('Comparando senhas com bcrypt...');
    const isValid = await bcrypt.compare(password, senhaHash);
    console.log('Senha válida:', isValid);
    
    if (!isValid) {
      console.log('Senha incorreta');
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }
    
    console.log('Login bem-sucedido!');
    const token = jwt.sign({ userId: user.id }, 'secret_key', { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, email: user.email } });
    
    await sql.close();
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rota para solicitar reset de senha
app.post('/api/forgot-password', async (req, res) => {
  const { email } = req.body;
  
  console.log('Solicitação de reset para:', email);
  
  try {
    const pool = await sql.connect(config);
    
    // Verificar se usuário existe
    const userResult = await pool.request()
      .input('email', sql.VarChar, email)
      .query('SELECT id FROM usuarios WHERE email = @email');
    
    if (userResult.recordset.length === 0) {
      return res.status(404).json({ message: 'Email não encontrado' });
    }
    
    // Gerar token de reset
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetExpires = new Date(Date.now() + 3600000); // 1 hora
    
    console.log('Token gerado:', resetToken);
    console.log('Link de reset: http://localhost:3001/reset-password?token=' + resetToken);
    
    // Salvar token no banco (se as colunas existirem)
    try {
      await pool.request()
        .input('email', sql.VarChar, email)
        .input('token', sql.VarChar, resetToken)
        .input('expires', sql.DateTime, resetExpires)
        .query('UPDATE usuarios SET reset_token = @token, reset_expires = @expires WHERE email = @email');
    } catch (dbError) {
      console.log('Colunas reset_token/reset_expires não existem no banco');
    }
    
    console.log('SIMULAÇÃO: Email seria enviado para:', email);
    res.json({ 
      message: 'Email de reset enviado com sucesso',
      debug_token: resetToken // APENAS PARA TESTE - REMOVER EM PRODUÇÃO
    });
    
    await sql.close();
  } catch (error) {
    console.error('Erro ao processar reset:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rota para resetar senha com token
app.post('/api/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;
  
  console.log('Reset de senha com token:', token);
  
  try {
    const pool = await sql.connect(config);
    
    // Verificar token válido
    const tokenResult = await pool.request()
      .input('token', sql.VarChar, token)
      .query('SELECT id, email, reset_expires FROM usuarios WHERE reset_token = @token');
    
    if (tokenResult.recordset.length === 0) {
      return res.status(400).json({ message: 'Token inválido' });
    }
    
    const user = tokenResult.recordset[0];
    
    // Verificar se token não expirou
    if (new Date() > new Date(user.reset_expires)) {
      return res.status(400).json({ message: 'Token expirado' });
    }
    
    // Validar nova senha
    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Nova senha deve ter pelo menos 6 caracteres' });
    }
    
    // Remover validação de senha igual (não temos a senha atual)
    
    // Gerar hash da nova senha
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    console.log('Nova senha hash gerado');
    
    // Atualizar senha e limpar token
    await pool.request()
      .input('email', sql.VarChar, user.email)
      .input('senha', sql.VarChar, hashedPassword)
      .query('UPDATE usuarios SET senha = @senha, reset_token = NULL, reset_expires = NULL WHERE email = @email');
    
    console.log('Senha atualizada com sucesso');
    res.json({ message: 'Senha alterada com sucesso' });
    
    await sql.close();
  } catch (error) {
    console.error('Erro ao resetar senha:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Servir o Angular para todas as outras rotas
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/my-app/browser/index.html'));
});

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
  console.log('Site disponível em: http://localhost:3001');
  console.log('Conectado ao SQL Server Azure');  
});