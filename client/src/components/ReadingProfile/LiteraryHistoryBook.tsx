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
  const [detailsEditable, setDetailsEditable] = React.useState<boolean>(false);

  const editDetailHandler = async (e: any) => {
    e.preventDefault();
    setDetailsEditable(!detailsEditable);
  };

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

  const cancelHandler = (type: string) => {
    // prompt with material ui if they wish to cancel?
    if (type === "notes") {
      if (
        document.getElementById("book-notes-content")?.innerHTML !==
        currentBook?.bookDetailBookNotes
      ) {
        if (
          confirm(
            "Are you sure you want to cancel editing the details?\nAny changes will note be saved."
          )
        ) {
          setNoteEditable(false);
          let element = document.getElementById("book-notes-content");
          if (element && currentBook) {
            element.innerHTML = currentBook.bookDetailBookNotes;
          }
        }
      } else {
        setNoteEditable(false);
      }
    }

    if (type === "details") {
      if (
        confirm(
          "Are you sure you want to cancel editing the details?\nAny changes will note be saved."
        )
      ) {
        setDetailsEditable(false);
      }
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
        <div className="book-notes-header" style={{ alignItems: "center" }}>
          <h2>Details</h2>
          {detailsEditable ? (
            <div>
              <button>Save</button>
              <button onClick={() => cancelHandler("details")}>Cancel</button>
            </div>
          ) : (
            <button onClick={(e) => editDetailHandler(e)}>Edit</button>
          )}
        </div>
        <div className="basic-userbook-info">
          <div>
            {detailsEditable ? (
              <div>
                You rated this book{" "}
                {
                  <select name="bookDetailBookRating">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                }
                /10
              </div>
            ) : currentBook.bookDetailBookRating > -1 ? (
              `You rated this book ${currentBook.bookDetailBookRating}/10`
            ) : null}
          </div>
          <div>
            {detailsEditable ? (
              <div>
                Status:{" "}
                {
                  <select
                    name="bookDetailBookStatus"
                    value={currentBook.bookDetailBookStatusLabel}
                  >
                    <option value="0">In-Progress</option>
                    <option value="1">Completed</option>
                    <option value="2">Abandoned</option>
                    <option value="3">On Hold</option>
                  </select>
                }
              </div>
            ) : (
              <div>Status: {currentBook.bookDetailBookStatusLabel}</div>
            )}
          </div>
          <div>
            {detailsEditable ? (
              <div>
                Favorite?{" "}
                <select name="bookDetailBookFavorite">
                  <option value="1">Yes</option>
                  <option value="0" selected>
                    No
                  </option>
                </select>
              </div>
            ) : (
              <div>
                {currentBook.bookDetailBookFavorite
                  ? "Favorited!"
                  : "Not favorited"}
              </div>
            )}
          </div>
          <div>
            {detailsEditable ? (
              <div>
                Number of times read:{" "}
                <input
                  type="number"
                  name="bookDetailBookTimesRead"
                  value={currentBook.bookDetailBookTimesRead}
                />
              </div>
            ) : (
              <div>
                {currentBook.bookDetailBookTimesRead
                  ? `You have read this book ${currentBook.bookDetailBookTimesRead} times`
                  : "You have not completed this book yet."}
              </div>
            )}
          </div>
        </div>
        <div>Reading timeline</div>
        <div className="book-timeline">
          <div>
            {detailsEditable ? (
              <div>
                Start Date:{" "}
                <input
                  type="date"
                  value={
                    currentBook.bookDetailBookStartDate
                      ? currentBook.bookDetailBookStartDate
                      : ""
                  }
                />
              </div>
            ) : (
              <div>
                {formatDate(currentBook.bookDetailBookStartDate)
                  ? `Start Date: ${formatDate(
                      currentBook.bookDetailBookStartDate
                    )}`
                  : "No Start Date."}
              </div>
            )}
          </div>
          <div>
            {detailsEditable ? (
              <div>
                End Date:{" "}
                {
                  <input
                    type="date"
                    value={
                      currentBook.bookDetailBookEndDate
                        ? currentBook.bookDetailBookEndDate
                        : ""
                    }
                  />
                }
              </div>
            ) : (
              <div>
                {formatDate(currentBook.bookDetailBookEndDate)
                  ? `End Date: ${formatDate(currentBook.bookDetailBookEndDate)}`
                  : "No End Date."}
              </div>
            )}
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
              <button onClick={() => cancelHandler("notes")}>Cancel</button>
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
