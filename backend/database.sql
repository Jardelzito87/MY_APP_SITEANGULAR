-- Script to create the database and tables for the application
CREATE TABLE Clientes (
    cod_cliente INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    telefone_1 VARCHAR(20),
    telefone_2 VARCHAR(20),
    email VARCHAR(100),
    estado VARCHAR(50),
    bairro VARCHAR(50),
    rua VARCHAR(100),
    numero VARCHAR(10),
    complemento VARCHAR(50),
    CEP VARCHAR(20)
);

CREATE TABLE Pessoa_Fisica (
    cod_cliente INT PRIMARY KEY,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    FOREIGN KEY (cod_cliente) REFERENCES Clientes(cod_cliente)
);

CREATE TABLE Pessoa_Juridica (
    cod_cliente INT PRIMARY KEY,
    cnpj VARCHAR(18) NOT NULL UNIQUE,
    FOREIGN KEY (cod_cliente) REFERENCES Clientes(cod_cliente)
);

CREATE TABLE Funcionarios (
    cod_funcionario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    email VARCHAR(100),
    telefone_1 VARCHAR(20),
    telefone_2 VARCHAR(20),
    dtnas DATE,
    idade INT,
    funcao VARCHAR(50),
    cpf VARCHAR(14) NOT NULL UNIQUE,
    estado_civil VARCHAR(30)
);

CREATE TABLE Servico (
    cod_servico INT PRIMARY KEY AUTO_INCREMENT,
    cod_funcionario INT NOT NULL,
    tipo VARCHAR(100),
    valor_servico DECIMAL(10,2),
    FOREIGN KEY (cod_funcionario) REFERENCES Funcionarios(cod_funcionario)
);

CREATE TABLE Solicitacao (
    cod_solicitacao INT PRIMARY KEY AUTO_INCREMENT,
    cod_cliente INT NOT NULL,
    data DATE,
    horario TIME,
    valor_solicitacao DECIMAL(10,2),
    FOREIGN KEY (cod_cliente) REFERENCES Clientes(cod_cliente)
);

CREATE TABLE item_servico (
    cod_solicitacao INT,
    cod_funcionario INT,
    cod_servico INT,
    quant INT,
    valor_item_servico DECIMAL(10,2),
    data DATE,
    horario TIME,
    PRIMARY KEY (cod_solicitacao, cod_funcionario, cod_servico),
    FOREIGN KEY (cod_solicitacao) REFERENCES Solicitacao(cod_solicitacao),
    FOREIGN KEY (cod_funcionario) REFERENCES Funcionarios(cod_funcionario),
    FOREIGN KEY (cod_servico) REFERENCES Servico(cod_servico)
);

-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS alemaobarbearia;
USE alemaobarbearia;

-- Criar tabela de usuários
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir usuário de teste (senha: 123456)
INSERT INTO users (email, password, name) VALUES 
('admin@barbearia.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrador');
-- Inserir dados iniciais de clientes
