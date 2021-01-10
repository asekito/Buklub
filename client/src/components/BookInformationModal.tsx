import * as React from "react";
import { BookFromDb } from "./BookSearch";

// import { IBookItems } from "./ReadingProfile/ReadListProfile";

const BookInformationModal: React.FC<IProps> = ({
  currentBookModal,
  setCurrentBookmodal,
  currentBook,
  loggedIn,
}) => {
  // React.useEffect(() => {
  //   authCheck(history, "login");
  // }, []);
  React.useEffect(() => {}, []);

  return (
    <div className="modal">
      <button
        className="exit-modal"
        onClick={() => setCurrentBookmodal(!currentBookModal)}
      >
        x
      </button>
      <h1>Modal here</h1>
      <div className="all-info-container">
        <div className="main-info">
          <div>
            {/*Left side thumbnail */}
            <img src={currentBook.smallThumbnail} alt="book image" />
          </div>
          <div>
            {/*right side thumbnail */}
            <div>{currentBook.title}</div>
            <div>{currentBook.authors}</div>
            <div>{currentBook.description}</div>
          </div>
        </div>
        <div className="sub-info">
          <div>{currentBook.pageCount}</div>
          <div>{currentBook.publisher}</div>
          <div>{currentBook.publishedDate}</div>
        </div>
      </div>
      {loggedIn ? (
        <div>
          <button>Add To History</button>
          <button>Add To Wishlist</button>
        </div>
      ) : (
        <div>Must be logged in to add to your history.</div>
      )}
    </div>
  );
};

export default BookInformationModal;

interface IProps {
  currentBookModal: boolean;
  setCurrentBookmodal: React.Dispatch<boolean>;
  currentBook: BookFromDb;
  loggedIn: boolean;
}
