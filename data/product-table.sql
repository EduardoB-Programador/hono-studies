CREATE TABLE product(
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    price DECIMAL NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES account_superuser(id)
);