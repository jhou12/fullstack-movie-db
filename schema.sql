DROP DATABASE IF EXISTS test;
CREATE DATABASE test;
USE test;

CREATE TABLE movies (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(50) NOT NULL,
  watched BOOLEAN,
  statsVisible BOOLEAN,
  year INT,
  runtime INT,
  metascore INT,
  imdb DECIMAL(10,1),
  PRIMARY KEY (ID)
);

INSERT INTO movies (title, watched, statsVisible, year, runtime, metascore, imdb) VALUES
('Mean Girls', true, true, 2004, 97, 71, 7.0),
('Hackers', false, false, 1995, 107, 62, 6.3),
('The Grey', false, false, 2011, 117, 65, 6.8),
('Sunshine', false, false, 2007, 107, 70, 7.2),
('Ex Machina', false, false, 2015, 108, 76, 7.7);

/* EXECUTE WITH: mysql -u root < schema.sql