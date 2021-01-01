import * as React from "react";
import { IBookItems } from "./ReadListProfile";
import fetchCommand from "../../../utils/fetching";
import "../../assets/LiteraryHistoryBook.scss";

const LiteraryHistoryBook = ({
  currentBook,
  setCurrentBook,
  currentBookModal,
  setCurrentBookModal,
}: IProps) => {
  const [noteEditable, setNoteEditable] = React.useState<boolean>(false);

  const editSaveHandler = async () => {
    setNoteEditable(!noteEditable);
    // patch request to change the notes in the database
    // alert if they are sure they want to save? material ui
    fetchCommand("/api/literary-history", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentBook),
    })
      .then((res) => {
        if (res.response) {
          // good do something here?
          alert("Edits saved!");
        }

        if (!res.response) {
          throw res;
        }
      })
      .catch((err) => {
        alert(err.error);
      });
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

        {noteEditable ? (
          <textarea
            className="book-notes-box"
            onChange={async (e: any) =>
              setCurrentBook({
                ...currentBook,
                bookDetailBookNotes: e.target.value,
              })
            }
          >
            {currentBook.bookDetailBookNotes}
          </textarea>
        ) : (
          <div id="book-notes-content" className="book-notes-box">
            {currentBook.bookDetailBookNotes}
          </div>
        )}
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
  currentBook: IBookItems;
  setCurrentBook: React.Dispatch<IBookItems>;
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
