DROP DATABASE IF EXISTS Netwerk; -- careful with this line!! only run this script once when creating the database

CREATE DATABASE Netwerk;

USE Netwerk;

CREATE TABLE Users (
  userID INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  displayName VARCHAR(50) NOT NULL,
  username VARCHAR(50) NOT NULL,
  passwerd VARCHAR(50) NOT NULL,
  image VARCHAR(100),
  company VARCHAR(50),
  job VARCHAR(50),
  description VARCHAR(100)
);

CREATE TABLE LikedUsers (
	relationshipID INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
	userID INT(11) NOT NULL,
	FOREIGN KEY fk1(userID) REFERENCES Users(userID),
    likedID INT(11) NOT NULL
);
    
INSERT INTO Users (displayName, username, passwerd, image, company, job, description) VALUES ('Jeffrey Miller, PhD', 'jmiller', '201prof', 'https://viterbi.usc.edu/directory/images/2dafc9bc59c736884ae57b7235d5bc67.jpg', 'University of Southern California', 'Professor', 'How are you guys doing on Assignment 5?');
INSERT INTO Users (displayName, username, passwerd, image, company, job, description) VALUES ('Aaron Cote', 'aaron', 'cote', 'https://viterbi.usc.edu/directory/images/f63135c17a6d1de62db55dd4de3ffb50.png', 'University of Southern California', 'Professor', 'Any questions?');
INSERT INTO Users (displayName, username, passwerd, image, company, job, description) VALUES ('Michael Shindler', 'michael', 'shindler', 'http://ranchopark.lagolfclubs.com/clubs/images/rancho/Event194/060910_0139.JPG', 'University of Southern California', 'Professor', 'I am blessed to have you all as students.');
INSERT INTO Users (displayName, username, passwerd, image, company, job, description) VALUES ('Leonard Adleman', 'leonard', 'adleman', 'https://upload.wikimedia.org/wikipedia/commons/a/af/Len-mankin-pic.jpg', 'University of Southern California', 'Professor', 'Mathematics is less related to accounting than it is to philosophy.');
INSERT INTO Users (displayName, username, passwerd, image, company, job, description) VALUES ('Gandhi Puvvada', 'gandhi', 'puvvada', 'https://archive.is/L9KK/1a25b305e961a023fb94a1dd6d271c734c5ab503.jpg', 'University of Southern California', 'Professor', 'Wasting clock cycles is a sin.');

INSERT INTO LikedUsers (userID, likedID) VALUES (1, 2);
INSERT INTO LikedUsers (userID, likedID) VALUES (1, 3);
INSERT INTO LikedUsers (userID, likedID) VALUES (1, 4);
INSERT INTO LikedUsers (userID, likedID) VALUES (1, 5);