CREATE TABLE client(
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    sec_num VARCHAR(14) NOT NULL,
    address VARCHAR(60) NOT NULL,
    user_id INT NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true,
    FOREIGN KEY (user_id) REFERENCES account_superuser(id)
);