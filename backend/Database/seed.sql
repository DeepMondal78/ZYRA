-- ZYRA Sample Seed Data

INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'admin@zyra.com', '$2a$10$YourHashedPasswordHere', 'admin'),
('Customer User', 'user@zyra.com', '$2a$10$YourHashedPasswordHere', 'customer');

INSERT INTO products (name, description, price, category, stock, image_url) VALUES
('Luxury Silk Shirt', 'High-end tailored silk fashion shirt.', 199.99, 'Apparel', 10, '/zara1.webp'),
('Leather Jacket', 'Premium luxury tailored leather jacket.', 499.99, 'Outerwear', 5, '/zara2.webp');