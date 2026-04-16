CREATE TABLE account_superuser(
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    email VARCHAR(64) NOT NULL UNIQUE,
    password VARCHAR(64) NOT NULL,
    options JSONB,
    image VARCHAR(255),
    active BOOLEAN NOT NULL DEFAULT true,
    creation_date DATE NOT NULL DEFAULT CURRENT_TIMESTAMP
);