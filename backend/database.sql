-- Tabela de Clientes
CREATE TABLE Clientes (
    cod_cliente INT PRIMARY KEY IDENTITY(1,1),
    nome NVARCHAR(100),
    telefone_1 NVARCHAR(20),
    telefone_2 NVARCHAR(20),
    email NVARCHAR(100),
    estado NVARCHAR(50),
    bairro NVARCHAR(50),
    rua NVARCHAR(100),
    numero NVARCHAR(10),
    complemento NVARCHAR(50),
    CEP NVARCHAR(20)
);
GO

-- Pessoa Física
CREATE TABLE Pessoa_Fisica (
    cod_cliente INT PRIMARY KEY,
    cpf NVARCHAR(14) NOT NULL UNIQUE,
    FOREIGN KEY (cod_cliente) REFERENCES Clientes(cod_cliente)
);
GO

-- Pessoa Jurídica
CREATE TABLE Pessoa_Juridica (
    cod_cliente INT PRIMARY KEY,
    cnpj NVARCHAR(18) NOT NULL UNIQUE,
    FOREIGN KEY (cod_cliente) REFERENCES Clientes(cod_cliente)
);
GO

-- Funcionários
CREATE TABLE Funcionarios (
    cod_funcionario INT PRIMARY KEY IDENTITY(1,1),
    nome NVARCHAR(100),
    email NVARCHAR(100),
    telefone_1 NVARCHAR(20),
    telefone_2 NVARCHAR(20),
    dtnas DATE,
    idade INT,
    funcao NVARCHAR(50),
    cpf NVARCHAR(14) NOT NULL UNIQUE,
    estado_civil NVARCHAR(30)
);
GO

-- Serviços
CREATE TABLE Servico (
    cod_servico INT PRIMARY KEY IDENTITY(1,1),
    cod_funcionario INT NOT NULL,
    tipo NVARCHAR(100),
    valor_servico DECIMAL(10,2),
    FOREIGN KEY (cod_funcionario) REFERENCES Funcionarios(cod_funcionario)
);
GO

-- Solicitações
CREATE TABLE Solicitacao (
    cod_solicitacao INT PRIMARY KEY IDENTITY(1,1),
    cod_cliente INT NOT NULL,
    data DATE,
    horario TIME,
    valor_solicitacao DECIMAL(10,2),
    FOREIGN KEY (cod_cliente) REFERENCES Clientes(cod_cliente)
);
GO

-- Itens de Serviço (relacionamento entre solicitação, funcionário e serviço)
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
GO

-- Tabela de Usuários do Sistema (Login)
CREATE TABLE usuarios (
    id INT PRIMARY KEY IDENTITY(1,1),
    nome NVARCHAR(100),
    email NVARCHAR(100) UNIQUE,
    senha NVARCHAR(255) NOT NULL,
    tipo_usuario NVARCHAR(20) NOT NULL
        CHECK (tipo_usuario IN ('admin', 'comum'))
);
GO

-- Inserir admin de teste (criptografe depois com bcrypt)
INSERT INTO usuarios (nome, email, senha, tipo_usuario)
VALUES ('Jardel', 'jardel.add31@gmail.com', 'senha_nao_criptografada', 'admin');
GO
