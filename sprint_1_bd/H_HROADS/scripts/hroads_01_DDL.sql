CREATE DATABASE SENAI_HROADS_TARDE;
GO

USE	SENAI_HROADS_TARDE;
GO

CREATE TABLE CLASSE
(
	idClasse TINYINT PRIMARY KEY IDENTITY(1,1),
	nomeClasse VARCHAR(20) NOT NULL UNIQUE,
	ptsVida SMALLINT NOT NULL,
	ptsMana SMALLINT NOT NULL
);
GO

CREATE TABLE PERSONAGEM
(
	idPersonagem TINYINT PRIMARY KEY IDENTITY(1,1),
	idClasse TINYINT FOREIGN KEY REFERENCES CLASSE(idClasse), 
	nomePersonagem VARCHAR(20) NOT NULL UNIQUE,
	dataCriacao DATE NOT NULL,
	dataAtualizacao DATE NOT NULL
);
GO

CREATE TABLE TIPO_HABILIDADE
(
	idTipoHabilidade TINYINT PRIMARY KEY IDENTITY(1,1),
	nomeTipoHabilidade VARCHAR(20) NOT NULL UNIQUE,
);
GO

CREATE TABLE HABILIDADE
(
	idHabilidade SMALLINT PRIMARY KEY IDENTITY(1,1),
	idTipoHabilidade TINYINT FOREIGN KEY REFERENCES TIPO_HABILIDADE(idTipoHabilidade), 
	nomeHabilidade VARCHAR(20) NOT NULL UNIQUE,
);
GO

CREATE TABLE CLASSE_HABILIDADE
(
	idClasseHabilidade SMALLINT PRIMARY KEY IDENTITY(1,1),
	idHabilidade SMALLINT FOREIGN KEY REFERENCES HABILIDADE(idHabilidade), 
	idClasse TINYINT FOREIGN KEY REFERENCES CLASSE(idClasse),
);
GO

CREATE TABLE PLAYER
(
	idPlayer TINYINT PRIMARY KEY IDENTITY(1,1),
	idPersonagem TINYINT FOREIGN KEY REFERENCES PERSONAGEM(idPersonagem), 
	nomePlayer VARCHAR(20) NOT NULL,
);
GO


