CREATE TABLE IF NOT EXISTS userBookDetails (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userID INT NOT NULL,
  bookID INT NOT NULL,
  bookRating FLOAT NOT NULL,
  status INT DEFAULT NULL,
  favorite INT DEFAULT 0,
  timesRead INT DEFAULT 0,
  notes MEDIUMTEXT DEFAULT NULL,
  startDate DATE DEFAULT NULL,
  endDate Date DEFAULT NULL,
  FOREIGN KEY (userID) REFERENCES users(id),
  FOREIGN KEY (bookID) REFERENCES books(id)
);