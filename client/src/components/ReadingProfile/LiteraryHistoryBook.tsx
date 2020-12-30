import * as React from "react";
import { IBookItems } from "./ReadListProfile";
import fetchCommand from "../../../utils/fetching";
import "../../assets/LiteraryHistoryBook.scss";

const LiteraryHistoryBook: React.FC<IProps> = ({
  currentBook,
  currentBookModal,
  setCurrentBookModal,
}) => {
  const [noteEditable, setNoteEditable] = React.useState<boolean>(false);

  const editSaveHandler = () => {
    setNoteEditable(!noteEditable);
    const editedNote = document.getElementById("book-notes-content")?.innerText; // or innerText or textcontent? figure out which is best to use -- especially important once mark up feature is starting

    if (editedNote !== currentBook?.bookDetailBookNotes) {
      // patch request to change the notes in the database
      // alert if they are sure they want to save?
      const bookObject = {
        userBookDetailID: currentBook?.bookDetailID,
        userID: currentBook?.userID,
        bookID: currentBook?.bookID,
        bookRating: currentBook?.bookDetailBookRating,
        status: currentBook?.bookDetailBookStatus,
        favorite: currentBook?.bookDetailBookFavorite,
        timesRead: currentBook?.bookDetailBookTimesRead,
        notes: currentBook?.bookDetailBookNotes,
        startDate: currentBook?.bookDetailBookStartDate,
        bookDetailBookEndDate: currentBook?.bookDetailBookEndDate,
        wishlist: currentBook?.bookDetailBookWishlist,
      };

      fetchCommand("/api/literary-history", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...bookObject,
          notes: editedNote,
        }),
      }).then((res) => console.log(res));
    }
  };

  const cancelHandler = () => {
    // prompt with material ui if they wish to cancel?
    if (
      document.getElementById("book-notes-content")?.innerHTML !==
      currentBook?.bookDetailBookNotes
    ) {
      if (confirm("Are you sure you want to dispose of all changes?")) {
        setNoteEditable(false);
        let element = document.getElementById("book-notes-content");
        if (element && currentBook) {
          element.innerHTML = currentBook.bookDetailBookNotes;
        }
      }
    } else {
      setNoteEditable(false);
    }
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
          <div className="editing-buttons">
            {noteEditable ? (
              <button onClick={() => editSaveHandler()}>Save</button>
            ) : (
              <button onClick={() => setNoteEditable(true)}>Edit</button>
            )}

            {noteEditable ? (
              <button onClick={() => cancelHandler()}>Cancel</button>
            ) : null}
          </div>
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

// const editingMode = (submitFunc, editStateFunc) => (
//   <div>
//     <button></button>
//   </div>
// );
// const nonEditingMode = (editStateFunc) => {}

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
