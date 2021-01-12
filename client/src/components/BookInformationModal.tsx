import * as React from "react";
import { BookFromDb } from "./BookSearch";
import Modal from "@material-ui/core/Modal";
import authCheck from "../../utils/token-check";
import { useHistory } from "react-router-dom";
const AddToLiteraryHistory = React.lazy(
  () => import("../components/ReadingProfile/AddToLiteraryHistory")
);

// import { IBookItems } from "./ReadingProfile/ReadListProfile";

const BookInformationModal: React.FC<IProps> = ({
  currentBookModal,
  setCurrentBookmodal,
  currentBook,
  loggedIn,
}) => {
  const history = useHistory();
  const [addToHistory, setAddToHistory] = React.useState<boolean>(true);
  const [uid, setUid] = React.useState<number>(-1);

  const AddToHistory = () => {
    authCheck(history, "login").then((res) => setUid(res.uid));
    setAddToHistory(!addToHistory);
  };

  // React.useEffect(() => {}, []);

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
          <button onClick={() => AddToHistory()}>Add To History</button>
          <button>Add To Wishlist</button>
        </div>
      ) : (
        <div>Must be logged in to add to your history.</div>
      )}
      <Modal open={addToHistory} onClose={setAddToHistory}>
        <AddToLiteraryHistory
          addToHistory={addToHistory}
          setAddToHistory={setAddToHistory}
          uid={uid}
          chosenWishlistBook={null}
          setChosenWishlistBook={null}
          existingBookID={currentBook.id}
        />
      </Modal>
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
