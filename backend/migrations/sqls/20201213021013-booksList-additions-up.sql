ALTER TABLE books
ADD COLUMN summary VARCHAR(255),
ADD COLUMN publisher VARCHAR(255),
ADD COLUMN publishDate date,
ADD COLUMN smallThumbNailImage VARCHAR(255),
ADD COLUMN thumbnailImageLink VARCHAR(255);