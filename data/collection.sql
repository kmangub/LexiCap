DROP TABLE IF EXISTS words;

CREATE TABLE words (
    id SERIAL PRIMARY KEY,
    word varchar(255),
    definitions varchar(1000),
    synonyms varchar(1000),
    image_url varchar(255),
    quote varchar(1000)
);