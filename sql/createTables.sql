CREATE TABLE developers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE
);

CREATE TYPE OS AS ENUM ('Windows', 'Linux', 'MacOS');

CREATE TABLE developerInfos (
  id SERIAL PRIMARY KEY,
  developerSince DATE NOT NULL,
  preferredOS OS NOT NULL,
  developerId INTEGER UNIQUE NOT NULL REFERENCES developers(id) ON DELETE CASCADE
);

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description TEXT,
  repository VARCHAR(120) NOT NULL,
  startDate DATE NOT NULL,
  endDate DATE,
  developerId INTEGER REFERENCES developers(id) ON DELETE SET NULL
);
