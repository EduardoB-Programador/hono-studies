CREATE TABLE client(
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    sec_num VARCHAR(14) NOT NULL UNIQUE,
    address VARCHAR(60) NOT NULL,
    user_id INT NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true,
    creation_date DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES account_superuser(id)
);