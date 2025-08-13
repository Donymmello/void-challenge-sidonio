
-- 1. Empresas
CREATE TABLE empresas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cnpj VARCHAR(20) NOT NULL UNIQUE,
    telefone VARCHAR(15),
    email VARCHAR(100)
);

-- 2. Campanhas
CREATE TABLE campanhas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    empresa_id INT,
    data_inicio DATE NOT NULL,
    data_fim DATE,
    FOREIGN KEY (empresa_id) REFERENCES empresas(id) ON DELETE CASCADE
);

-- 3. Técnicos
CREATE TABLE tecnicos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    campanha_id INT,
    FOREIGN KEY (campanha_id) REFERENCES campanhas(id) ON DELETE CASCADE
);

-- 4. Produtores
CREATE TABLE produtores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    localizacao VARCHAR(255)
);

-- 5. Relacionamento Produtores x Campanhas (com Técnico)
CREATE TABLE produtores_campanhas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    produtor_id INT,
    campanha_id INT,
    tecnico_id INT,
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_transferencia TIMESTAMP NULL,
    FOREIGN KEY (produtor_id) REFERENCES produtores(id) ON DELETE CASCADE,
    FOREIGN KEY (campanha_id) REFERENCES campanhas(id) ON DELETE CASCADE,
    FOREIGN KEY (tecnico_id) REFERENCES tecnicos(id) ON DELETE CASCADE
);
