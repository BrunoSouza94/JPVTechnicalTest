USE master
GO

CREATE DATABASE JPVTechnicalTest
GO

use JPVTechnicalTest
GO

CREATE TABLE PESSOAS (
	ID INT IDENTITY(1,1) PRIMARY KEY,
	FULL_NAME VARCHAR(255) NOT NULL,
	BIRTHDAY DATE NOT NULL,
	CPF VARCHAR(255) NOT NULL,
	INCOME DECIMAL(10, 2) NOT NULL
)
GO