DROP TABLE IF EXISTS words;

CREATE TABLE words (
    id SERIAL PRIMARY KEY,
    word varchar(255),
    pronunciation varchar(255),
    prtSpeech varchar(255),
    sound varchar(255),
    definitions TEXT,
    synonyms TEXT,
    example varchar(255),
    image_url varchar(255),
    quote varchar(1000),
    author varchar(255)
);