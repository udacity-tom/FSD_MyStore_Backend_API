INSERT INTO users(id, admin, username, firstname, lastname, password, houseNum, street1, street2, city, postcode, country) VALUES(0, TRUE, '', '', '', '', '', '', '', '', '', '');
INSERT INTO users(id, admin, username, firstname, lastname, password, houseNum, street1, street2, city, postcode, country) VALUES(1, TRUE, 'Barney', 'Benny', 'Scholpferb', '$2b$10$vdxOw56kdXTjuh.v8IvlPOF1fu3yvleynLYYbkJw8qPEBeIVWCuSG', '15', 'Barnicle Drive', 'West Wheatton', 'Arkansas', '22938', 'USA');
INSERT INTO users(id, admin, username, firstname, lastname, password, houseNum, street1, street2, city, postcode, country) VALUES(2, FALSE, 'Hella', 'Helen', 'Batrib', '$2b$10$vdxOw56kdXTjuh.v8IvlPOF1fu3yvleynLYYbkJw8qPEBeIVWCuSG', '338993', 'Apartment 5C', 'Holegrab Road', 'Nuneasis', 'PI M0N', 'Ireland');
INSERT INTO users(id, admin, username, firstname, lastname, password, houseNum, street1, street2, city, postcode, country) VALUES(3, FALSE, 'Jakey', 'Jake', 'Grossenpfiff', '$2b$10$Nwz5HSm8IGxvPBKrtWFmHOEfMqoIlwI6dBB7DMyFalZISMTSqf.MW', 'Falling Cottage', 'Arbanzis Street', '', 'Headonors', 'Rakemund', 'USA');
INSERT INTO users(id, admin, username, firstname, lastname, password, houseNum, street1, street2, city, postcode, country) VALUES(4, TRUE,  'Will', 'William', 'Burk', '$2b$10$6Scfn2HTUNtQKStr6G1meeOcWkbCoy2kcQdflcbR9rJ2105GfQogG', 'Flat 4', 'Block 7', 'Reynolds Street', 'Watterborne', '998223', 'United Kingdom');
INSERT INTO users(id, admin, username, firstname, lastname, password, houseNum, street1, street2, city, postcode, country) VALUES(5, FALSE,  'Bill', 'William', 'Burk', '$2b$10$K/JK3x0..R.PeLZSuZMrHuRzgIP2D8RPxzOXSTMoDqxaigC6XxFum', '230', 'Ambledon Road', '', 'Haverwille', 'PP0 RJS', 'Gibralter');
ALTER SEQUENCE users_id_seq RESTART WITH 6;