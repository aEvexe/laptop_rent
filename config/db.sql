-- Active: 1745409352670@@127.0.0.1@3306@laptop_contarct

CREATE TABLE brand (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255)
);

CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255)
);

CREATE TABLE laptops (
    id INT PRIMARY KEY AUTO_INCREMENT,
    model VARCHAR(255),
    brand_id INT,
    category_id INT,
    price DECIMAL(10, 2),
    FOREIGN KEY (brand_id) REFERENCES brand (id),
    FOREIGN KEY (category_id) REFERENCES categories (id)
);

CREATE TABLE feature (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    isMain BOOLEAN,
    value_type VARCHAR(255)
);

CREATE TABLE laptopFeatures (
    laptopId INT,
    featureId BIGINT,
    value VARCHAR(255),
    PRIMARY KEY (laptopId, featureId),
    FOREIGN KEY (laptopId) REFERENCES laptops (id),
    FOREIGN KEY (featureId) REFERENCES feature (id)
);

CREATE TABLE customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255) UNIQUE,
    last_name VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(255) UNIQUE,
    address VARCHAR(255) UNIQUE,
    passport VARCHAR(255) UNIQUE
);

CREATE TABLE seller (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE laptop_stocks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    laptop_id INT,
    quatity INT,
    added_by INT,
    added_at DATETIME,
    FOREIGN KEY (laptop_id) REFERENCES laptops (id),
    FOREIGN KEY (added_by) REFERENCES seller (id)
);

CREATE TABLE contracts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    laptop_id INT,
    duration INT,
    seller_id INT,
    FOREIGN KEY (customer_id) REFERENCES customers (id),
    FOREIGN KEY (laptop_id) REFERENCES laptops (id),
    FOREIGN KEY (seller_id) REFERENCES seller (id)
);

CREATE TABLE payments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    contract_id INT,
    amount DECIMAL(10, 2),
    payment_date DATE,
    FOREIGN KEY (contract_id) REFERENCES contracts (id)
);

INSERT INTO
    brand (name)
VALUES ('Apple'),
    ('Dell'),
    ('HP'),
    ('Lenovo'),
    ('Asus'),
    ('Acer'),
    ('Microsoft'),
    ('MSI'),
    ('Razer'),
    ('Samsung');

INSERT INTO
    categories (name)
VALUES ('Gaming'),
    ('Business'),
    ('Ultrabook'),
    ('Student'),
    ('2-in-1'),
    ('Budget'),
    ('Premium'),
    ('Workstation'),
    ('Chromebook'),
    ('Convertible');

INSERT INTO
    feature (name, isMain, value_type)
VALUES ('Processor', TRUE, 'text'),
    ('RAM', TRUE, 'number'),
    ('Storage', TRUE, 'text'),
    (
        'Graphics Card',
        FALSE,
        'text'
    ),
    (
        'Display Size',
        TRUE,
        'number'
    ),
    ('Battery Life', FALSE, 'text'),
    ('Weight', FALSE, 'number'),
    ('OS', TRUE, 'text'),
    ('Color', FALSE, 'text'),
    ('Resolution', FALSE, 'text');

INSERT INTO
    seller (name, email, password)
VALUES (
        'Alice Seller',
        'alice@example.com',
        'pass1'
    ),
    (
        'Bob Seller',
        'bob@example.com',
        'pass2'
    ),
    (
        'Charlie Seller',
        'charlie@example.com',
        'pass3'
    ),
    (
        'David Seller',
        'david@example.com',
        'pass4'
    ),
    (
        'Eva Seller',
        'eva@example.com',
        'pass5'
    ),
    (
        'Frank Seller',
        'frank@example.com',
        'pass6'
    ),
    (
        'Grace Seller',
        'grace@example.com',
        'pass7'
    ),
    (
        'Henry Seller',
        'henry@example.com',
        'pass8'
    ),
    (
        'Ivy Seller',
        'ivy@example.com',
        'pass9'
    ),
    (
        'Jack Seller',
        'jack@example.com',
        'pass10'
    );

INSERT INTO
    customers (
        first_name,
        last_name,
        email,
        phone,
        address,
        passport
    )
VALUES (
        'John',
        'Doe',
        'john@example.com',
        '1234567890',
        '123 Main St',
        'A1234567'
    ),
    (
        'Jane',
        'Smith',
        'jane@example.com',
        '2345678901',
        '234 Oak St',
        'B2345678'
    ),
    (
        'Alice',
        'Johnson',
        'alicej@example.com',
        '3456789012',
        '345 Pine St',
        'C3456789'
    ),
    (
        'Bob',
        'Williams',
        'bobw@example.com',
        '4567890123',
        '456 Elm St',
        'D4567890'
    ),
    (
        'Carol',
        'Brown',
        'carolb@example.com',
        '5678901234',
        '567 Cedar St',
        'E5678901'
    ),
    (
        'David',
        'Jones',
        'davidj@example.com',
        '6789012345',
        '678 Spruce St',
        'F6789012'
    ),
    (
        'Emily',
        'Miller',
        'emilym@example.com',
        '7890123456',
        '789 Birch St',
        'G7890123'
    ),
    (
        'Frank',
        'Davis',
        'frankd@example.com',
        '8901234567',
        '890 Maple St',
        'H8901234'
    ),
    (
        'Grace',
        'Garcia',
        'graceg@example.com',
        '9012345678',
        '901 Walnut St',
        'I9012345'
    ),
    (
        'Hank',
        'Martinez',
        'hankm@example.com',
        '0123456789',
        '012 Cherry St',
        'J0123456'
    );

INSERT INTO
    laptops (
        model,
        brand_id,
        category_id,
        price
    )
VALUES ('MacBook Pro', 1, 3, 1999.99),
    ('XPS 13', 2, 3, 1499.99),
    ('Pavilion', 3, 6, 599.99),
    ('ThinkPad X1', 4, 2, 1299.99),
    ('ROG Zephyrus', 5, 1, 1799.99),
    ('Aspire 5', 6, 6, 499.99),
    (
        'Surface Laptop 4',
        7,
        3,
        1199.99
    ),
    ('MSI Stealth', 8, 1, 1599.99),
    ('Blade 15', 9, 1, 1899.99),
    (
        'Galaxy Book',
        10,
        10,
        1099.99
    );

INSERT INTO
    laptop_stocks (
        laptop_id,
        quatity,
        added_by,
        added_at
    )
VALUES (1, 5, 1, NOW()),
    (2, 4, 2, NOW()),
    (3, 6, 3, NOW()),
    (4, 3, 4, NOW()),
    (5, 7, 5, NOW()),
    (6, 8, 6, NOW()),
    (7, 2, 7, NOW()),
    (8, 1, 8, NOW()),
    (9, 9, 9, NOW()),
    (10, 5, 10, NOW());

INSERT INTO
    laptopFeatures (laptopId, featureId, value)
VALUES (1, 1, 'M2 Pro'),
    (1, 2, '16'),
    (1, 3, '512GB SSD'),
    (2, 1, 'i7-1250U'),
    (2, 2, '16'),
    (3, 1, 'i5-1135G7'),
    (3, 2, '8'),
    (4, 1, 'i7-1185G7'),
    (4, 2, '16'),
    (5, 1, 'Ryzen 9 5900HS');

INSERT INTO
    contracts (
        customer_id,
        laptop_id,
        duration,
        seller_id
    )
VALUES (1, 1, 12, 1),
    (2, 2, 6, 2),
    (3, 3, 9, 1),
    (4, 4, 18, 3),
    (5, 5, 12, 2),
    (6, 6, 24, 1),
    (7, 7, 6, 3),
    (8, 8, 12, 2),
    (9, 9, 10, 1),
    (10, 10, 8, 2);

INSERT INTO
    payments (
        contract_id,
        amount,
        payment_date
    )
VALUES (1, 124.99, '2025-05-01'),
    (2, 119.99, '2025-07-10'),
    (3, 83.33, '2025-05-01'),
    (4, 74.99, '2025-05-01'),
    (5, 120.00, '2025-05-01'),
    (6, 50.00, '2025-05-01'),
    (7, 95.00, '2025-05-01'),
    (8, 200.00, '2025-05-01'),
    (9, 120.00, '2025-05-01'),
    (10, 100.00, '2025-05-01');

INSERT INTO
    contracts (
        customer_id,
        laptop_id,
        duration,
        seller_id,
        created_at
    )
VALUES (1, 2, 12, 1, '2024-12-01'),
    (2, 3, 10, 2, '2025-01-15'),
    (3, 1, 8, 3, '2025-04-20');

ALTER TABLE contracts
ADD COLUMN first_payment DECIMAL(10, 2),
ADD COLUMN remaining_balance DECIMAL(10, 2),
ADD COLUMN monthly_payment DECIMAL(10, 2),
ADD COLUMN next_payment_date DATE;

INSERT INTO
    contracts (
        customer_id,
        laptop_id,
        duration,
        seller_id,
        first_payment,
        remaining_balance,
        monthly_payment,
        payments_remaining,
        next_payment_date,
        created_at
    )
VALUES (
        1,
        1,
        12,
        1,
        2500000,
        7500000,
        625000,
        10,
        '2024-12-01',
        '2024-11-15'
    );

INSERT INTO
    contracts (
        customer_id,
        laptop_id,
        duration,
        seller_id,
        first_payment,
        remaining_balance,
        monthly_payment,
        payments_remaining,
        next_payment_date,
        created_at
    )
VALUES (
        1,
        1,
        12,
        1,
        2500000,
        7500000,
        625000,
        10,
        '2024-05-01',
        '2024-04-01'
    ), -- Overdue for 5 months
    (
        2,
        2,
        10,
        2,
        3000000,
        6000000,
        600000,
        9,
        '2024-10-15',
        '2024-08-15'
    ), -- Overdue for 2 months
    (
        3,
        3,
        24,
        3,
        2000000,
        10000000,
        416667,
        23,
        '2024-11-10',
        '2024-09-10'
    ), -- Overdue for 1 month
    (
        4,
        4,
        18,
        4,
        1500000,
        9000000,
        500000,
        17,
        '2024-03-01',
        '2024-01-01'
    ), -- Overdue for 9 months
    (
        5,
        5,
        6,
        5,
        2500000,
        5000000,
        833333,
        5,
        '2024-12-01',
        '2024-10-01'
    ), -- Overdue for 1 month
    (
        6,
        6,
        12,
        6,
        2800000,
        5600000,
        466667,
        11,
        '2024-06-10',
        '2024-04-10'
    ), -- Overdue for 2 months
    (
        7,
        7,
        18,
        7,
        1800000,
        7200000,
        400000,
        17,
        '2024-07-01',
        '2024-05-01'
    ), -- Overdue for 4 months
    (
        8,
        8,
        24,
        8,
        2200000,
        8800000,
        366667,
        23,
        '2024-08-01',
        '2024-06-01'
    ), -- Overdue for 3 months
    (
        9,
        9,
        12,
        9,
        2600000,
        7800000,
        650000,
        11,
        '2024-09-01',
        '2024-07-01'
    ), -- Overdue for 2 months
    (
        10,
        10,
        24,
        10,
        2400000,
        9600000,
        400000,
        23,
        '2024-12-15',
        '2024-10-15'
    );
-- Overdue for 2 months