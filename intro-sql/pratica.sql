-- Active: 1679955856143@@127.0.0.1@3306
CREATE TABLE
 books(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    author TEXT NOT NULL, 
    page_count INTEGER,
    price REAL NOT NULL
);

DROP TABLE books;

SELECT * FROM books;

INSERT INTO 
books (id, name,author,page_count,price) 
VALUES("8503012928" , "O Quinze" , "Rachel de Queiroz", 208, 24.95);

INSERT INTO
books (id, name,author,price) 
VALUES("8578887239", "Dom Casmurro", "Machado de Assis", 46.77);

INSERT INTO books VALUES
("8503012928" , "O Quinze" , "Rachel de Queiroz", 208, 24.95)
("8578887239", "Dom Casmurro", "Machado de Assis",null, 46.77);

UPDATE books SET page_count=464 WHERE id="8578887239";

DELETE FROM books WHERE id="8503012928";

CREATE TABLE tarefas(
    id TEXT PRIMARY KEY NOT NULL,
    dia TEXT ,
    urgencia TEXT,
);

SELECT * FROM tarefas;

DROP TABLE tarefas;

INSERT INTO tarefas VALUES("1", "27/03", "verde"),("2", "27/03", "vermelha"),("3", "27/03", "azul");

UPDATE tarefas SET urgencia="nenhuma" WHERE id="2";

DELETE FROM tarefas WHERE id="01";

