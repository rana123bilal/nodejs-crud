CREATE TABLE Users (
    id TEXT,
    login TEXT,
    password TEXT,
    age INTEGER,
    isDeleted BOOLEAN,
);

INSERT INTO Users (login, password, age, id) VALUES ('bilal', 'doe', 25, 'a192e125-8387-40c5-816f-ab344b25b15f');