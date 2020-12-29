/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS contactUsComments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  comments MEDIUMTEXT NOT NULL,
  createdAt datetime NOT NULL
);