CREATE TABLE account_superuser(
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    email VARCHAR(64) NOT NULL,
    password VARCHAR(64) NOT NULL,
    options JSONB,
    image BYTEA,
    active BOOLEAN NOT NULL DEFAULT true
);