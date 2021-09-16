CREATE DATABASE SENAI_HROADS_TARDE;
GO

USE SENAI_HROADS_TARDE;
GO

CREATE TABLE tipoUsuario (
idTipoUsuario INT PRIMARY KEY IDENTITY (1,1),
titulo VARCHAR (13) NOT NULL
);
GO

CREATE TABLE usuario (
idUsuario INT PRIMARY KEY IDENTITY (1,1),
nickname VARCHAR (120) NOT NULL,
email VARCHAR (256) UNIQUE NOT NULL,
senha VARCHAR (256) NOT NULL,
idTipoUsuario INT FOREIGN KEY REFERENCES tipoUsuario (idTipoUsuario)
);
GO

CREATE TABLE tipoHabilidade (
idTipo TINYINT PRIMARY KEY IDENTITY (1,1),
nomeTipo VARCHAR (10) NOT NULL
);
GO

CREATE TABLE habilidade (
idHabilidade TINYINT PRIMARY KEY IDENTITY (1,1),
idTipo TINYINT FOREIGN KEY REFERENCES tipoHabilidade(idTipo),
nomeHabilidade VARCHAR (30) NOT NULL
);
GO

CREATE TABLE classe (
idClasse TINYINT PRIMARY KEY IDENTITY (1,1),
nomeClasse VARCHAR (20) NOT NULL
);
GO

CREATE TABLE classe_habilidade (
idClasse TINYINT FOREIGN KEY REFERENCES classe(idClasse),
idHabilidade TINYINT FOREIGN KEY REFERENCES habilidade(idHabilidade)
);
GO

CREATE TABLE personagem (
idPersonagem INT PRIMARY KEY IDENTITY (1,1),
idClasse TINYINT FOREIGN KEY REFERENCES classe(idClasse),
nomePersonagem VARCHAR (50) NOT NULL,
vidaMax VARCHAR (2000) NOT NULL,
manaMax VARCHAR (1200) NOT NULL,
dataCriacao DATETIME NOT NULL,
dataAtualizacao DATETIME NOT NULL
);
GO