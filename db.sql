DO
$do$
BEGIN
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email varchar UNIQUE NOT NULL,
        password varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        user_id int REFERENCES users(id) NOT NULL,
        text varchar NOT NULL
    );
END
$do$;