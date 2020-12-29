import * as React from "react";
import { IBookItems } from "./ReadListProfile";
import "../../assets/LiteraryHistoryBook.scss";

const LiteraryHistoryBook: React.FC<IProps> = ({
  currentBook,
  setCurrentBookModal,
}) => {
  return currentBook ? (
    <div className="modal">
      <h1>BOOK HERE</h1>
      <div className="current-book-info">
        <div className="image">
          <img src={currentBook.thumbnail} height={100} />
        </div>
        <div className="info">
          <div>{currentBook.title}</div>
          <div>{currentBook.authors}</div>
          <div>{currentBook.description}</div>
          <div>{currentBook.pageCount}</div>
          <div>{currentBook.publisher}</div>
          <div>{currentBook.publishedDate}</div>
        </div>
      </div>
    </div>
  ) : null;
};

export default LiteraryHistoryBook;

interface IProps {
  currentBook: IBookItems | undefined;
  setCurrentBookModal: React.Dispatch<boolean>;
}
