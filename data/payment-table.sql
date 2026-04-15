CREATE TABLE payment(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    staff_id INT NOT NULL,
    client_id INT NOT NULL,
    product_id INT NOT NULL,
    amount INT NOT NULL,
    transaction DECIMAL NOT NULL,
    exp_date DATE NOT NULL, DEFAULT DATE.NOW()
    FOREIGN KEY (user_id) REFERENCES account_superuser(id),
    FOREIGN KEY (staff_id) REFERENCES staff(id),
    FOREIGN KEY (client_id) REFERENCES client(id),
    FOREIGN KEY (product_id) REFERENCES product(id)
);