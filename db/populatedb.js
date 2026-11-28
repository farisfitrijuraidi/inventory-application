#! /usr/bin/env node

import pg from "pg";

const { Client } = pg;

const SQL = `
CREATE TABLE IF NOT EXISTS genre (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    label VARCHAR (255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS developer (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (255) NOT NULL UNIQUE,
    country VARCHAR (255)
);

CREATE TABLE IF NOT EXISTS game (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (255) NOT NULL UNIQUE,
    price_rm NUMERIC(10,2) NOT NULL CHECK (price_RM >= 0),
    release_year INTEGER NOT NULL CHECK (release_year >= 1980),
    rating_ign NUMERIC(3,1) CHECK (rating_IGN BETWEEN 1 AND 10),
    stock_amount INTEGER NOT NULL CHECK (stock_amount >= 0),
    genre_id INTEGER NOT NULL REFERENCES genre(id),
    developer_id INTEGER NOT NULL REFERENCES developer(id)
);

INSERT INTO genre (label) 
VALUES 
    ('Action'), 
    ('Adventure'), 
    ('Action-Adventure'), 
    ('Role-Playing Games') 
    ON CONFLICT (label) DO NOTHING;
 
INSERT INTO developer (name, country) 
VALUES 
    ('Nintendo EPD', 'Japan'), 
    ('Capcom', 'Japan'), 
    ('Sega', 'Japan'), 
    ('Rockstar Games', 'USA') 
    ON CONFLICT (name) DO NOTHING;

INSERT INTO game (name, price_rm, release_year, rating_ign, stock_amount, genre_id, developer_id) 
VALUES 
    ('Grand Theft Auto VI', 339, 2026, 10.0, 10, (SELECT id FROM genre WHERE label = 'Action-Adventure'), (SELECT id FROM developer WHERE name = 'Rockstar Games')) ON CONFLICT (name) DO NOTHING;
`;

const seedDatabase = async (connectionString) => {
    console.log("seeding...");
    const client = new Client({ connectionString });

    try {
        await client.connect();
        await client.query(SQL);
        console.log("done");
    } catch (error) {
        console.error("Something went wrong: ", error.message);
    } finally {
        await client.end();
    }
};

const dbUrl = process.argv[2] ? process.argv[2] : process.env.DATABASE_URL;
if (!dbUrl) {
    console.log("dbUrl is empty");
} else {
    seedDatabase(dbUrl);
}
