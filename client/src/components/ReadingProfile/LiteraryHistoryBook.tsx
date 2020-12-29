import * as React from "react";
import { IBookItems } from "./ReadListProfile";
import "../../assets/LiteraryHistoryBook.scss";

const LiteraryHistoryBook: React.FC<IProps> = ({
  currentBook,
  currentBookModal,
  setCurrentBookModal,
}) => {
  const [noteEditable, setNoteEditable] = React.useState<boolean>(false);

  const editSaveHandler = () => {
    setNoteEditable(!noteEditable);
    const originalText = document.getElementById("book-notes-content")
      ?.innerHTML; // or innerText or textcontent? figure out which is best to use -- especially important once mark up feature is starting
  };

  return currentBook ? (
    <div className="modal">
      <button
        className="exit-modal"
        onClick={(e) => {
          e.preventDefault();
          setCurrentBookModal(!currentBookModal);
        }}
      >
        x
      </button>
      <h1>{currentBook.title}</h1>
      <div className="current-book-info">
        <div className="image">
          <img src={currentBook.thumbnail} />
        </div>
        <div className="info">
          <div>{currentBook.authors}</div>
          <div>{currentBook.description}</div>
          <div>{currentBook.pageCount > 0 ? currentBook.pageCount : null}</div>
          <div>
            {currentBook.publisher
              ? `Published by ${currentBook.publisher}`
              : null}
          </div>
          <div>
            {currentBook.publishedDate
              ? `Published on ${formatDate(currentBook.publishedDate)}`
              : null}
          </div>
        </div>
      </div>

      <div className="current-book-user-info">
        <h2>Details</h2>
        <div className="basic-userbook-info">
          <div>
            {currentBook.bookDetailBookRating > -1
              ? `You rated this book ${currentBook.bookDetailBookRating}/10`
              : null}
          </div>
          <div>Status: {currentBook.bookDetailBookStatusLabel}</div>
          <div>
            {currentBook.bookDetailBookFavorite
              ? "Favorited!"
              : "Not favorited"}
          </div>
          <div>
            {currentBook.bookDetailBookTimesRead
              ? `You have read this book ${currentBook.bookDetailBookTimesRead} times`
              : "You have not completed this book yet."}
          </div>
        </div>
        <div>Reading timeline</div>
        <div className="book-timeline">
          <div>
            {formatDate(currentBook.bookDetailBookStartDate)
              ? formatDate(currentBook.bookDetailBookStartDate)
              : "No start date."}
          </div>
          <div>
            {formatDate(currentBook.bookDetailBookEndDate)
              ? formatDate(currentBook.bookDetailBookEndDate)
              : "No end date."}
          </div>
        </div>

        <div className="book-notes-header">
          <div>
            <b>Notes:</b>
          </div>
          <button onClick={() => editSaveHandler()}>
            {noteEditable ? "Save" : "Edit"}
          </button>
        </div>

        <div
          id="book-notes-content"
          className="book-notes-box"
          contentEditable={noteEditable}
        >
          {currentBook.bookDetailBookNotes}
        </div>
      </div>
    </div>
  ) : null;
};

export default LiteraryHistoryBook;

interface IProps {
  currentBook: IBookItems | undefined;
  currentBookModal: boolean;
  setCurrentBookModal: React.Dispatch<boolean>;
}

const formatDate = (d: string) => {
  let newDate = new Date(d);
  let year = newDate.getFullYear();
  let month = (1 + newDate.getMonth()).toString().padStart(2, "0");
  let day = newDate.getDate().toString().padStart(2, "0");
  return !month || !year || !day ? null : `${month}/${day}/${year}`;
};
// make into util func
