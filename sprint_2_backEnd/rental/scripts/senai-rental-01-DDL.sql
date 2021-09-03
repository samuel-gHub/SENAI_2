CREATE DATABASE T_RENTAL_Samuel;
GO

USE T_RENTAL_Samuel;
GO

--CHAVES PRIMARIAS

CREATE TABLE EMPRESA 
(
 idEmpresa TINYINT PRIMARY KEY IDENTITY(1,1),
 nomeEmpresa VARCHAR(20) NOT NULL
);
GO 

CREATE TABLE CLIENTE 
(
 idCliente TINYINT PRIMARY KEY IDENTITY(1,1),
 nome VARCHAR(20) NOT NULL,
 sobrenome VARCHAR(30) DEFAULT 'N�O INFORMADO',
 cnh CHAR(15) UNIQUE NOT NULL
);
GO

CREATE TABLE MARCA 
(
 idMarca TINYINT PRIMARY KEY IDENTITY(1,1),
 nomeMarca VARCHAR(20) NOT NULL UNIQUE
);
GO


--CHAVES ESTRANGEIRAS

CREATE TABLE MODELO 
(
 idModelo SMALLINT PRIMARY KEY IDENTITY(1,1),
 idMarca TINYINT FOREIGN KEY REFERENCES MARCA(idMarca),
 nomeModelo VARCHAR(50) NOT NULL
);
GO

CREATE TABLE VEICULO 
(
 idVeiculo SMALLINT PRIMARY KEY IDENTITY(1,1),
 idModelo SMALLINT FOREIGN KEY REFERENCES MODELO(idModelo),
 idEmpresa TINYINT FOREIGN KEY REFERENCES EMPRESA(idEmpresa),
 corVeiculo VARCHAR(50) NOT NULL
);
GO

CREATE TABLE ALUGUEL 
(
 idAluguel SMALLINT PRIMARY KEY IDENTITY(1,1),
 idVeiculo SMALLINT FOREIGN KEY REFERENCES VEICULO(idVeiculo),
 idCliente TINYINT FOREIGN KEY REFERENCES CLIENTE(idCliente),
 dataRetirada DATETIME NOT NULL,
 dataDevolucao DATETIME NOT NULL,
 valorAluguel MONEY NOT NULL
);
GO

