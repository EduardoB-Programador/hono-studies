CREATE TABLE staff(
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    user_id INT NOT NULL,
    email VARCHAR(64) NOT NULL UNIQUE,
    password VARCHAR(64) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true,
    FOREIGN KEY (user_id) REFERENCES account_superuser(id)
);