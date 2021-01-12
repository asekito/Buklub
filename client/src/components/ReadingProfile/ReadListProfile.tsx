import * as React from "react";
import fetchCommand from "../../../utils/fetching";
import authCheck from "../../../utils/token-check";
import { useHistory } from "react-router-dom";
const AddToLiteraryHistory = React.lazy(() => import("./AddToLiteraryHistory"));
const AddToWishlist = React.lazy(() => import("./AddToWishlist"));
const LiteraryHistoryBook = React.lazy(() => import("./LiteraryHistoryBook"));
import "../../assets/ReadListProfile.scss";
import Modal from "@material-ui/core/Modal";
// import { IBook } from "./AddToLiteraryHistory";

const ReadListProfile: React.FC = () => {
  // just grab top 10 of database for this page
  // rest in a paginated page with all info
  const history = useHistory();
  const [litHistoryBooks, setLitHistoryBooks] = React.useState<IBookItems[]>(
    []
  );
  const [wishlist, setWishlist] = React.useState<IBookItems[]>([]);
  const [addToHistory, setAddToHistory] = React.useState<boolean>(false);
  const [addToWishlist, setAddToWishlist] = React.useState<boolean>(false);
  const [currentBook, setCurrentBook] = React.useState<IBookItems>({
    userID: 0,
    userName: "",
    bookID: 0,
    googleBookID: 0,
    title: "",
    authors: "",
    pageCount: 0,
    description: "",
    publisher: "",
    publishedDate: "",
    thumbnail: "",
    smallThumbnail: "",
    bookDetailID: 0,
    bookDetailBookStatus: 0,
    bookDetailBookFavorite: 0,
    bookDetailBookTimesRead: 0,
    bookDetailBookRating: 0,
    bookDetailBookNotes: "",
    bookDetailBookStatusLabel: "",
    bookDetailBookStartDate: "",
    bookDetailBookEndDate: "",
    bookDetailBookWishlist: 0,
  });
  const [currentBookModal, setCurrentBookModal] = React.useState<boolean>(
    false
  );
  const [
    chosenWishlistBook,
    setChosenWishlistBook,
  ] = React.useState<IChosenWishlistBook>({
    bookDetailID: 0,
    title: "",
  });

  const [uid, setUid] = React.useState<number>(-1);

  React.useEffect(() => {
    const getUid = async () => {
      const result = await authCheck(history, "login");
      return result;
    };
    getUid().then((res) => setUid(res.uid));
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem("user");
    fetchCommand(`/api/literary-history`, {
      method: "GET",
      headers: {
        auth: token,
      },
    })
      .then((res) => {
        if (res.response && res.body.length > 0) {
          setLitHistoryBooks(res.body);
        }

        throw res;
      })
      .catch((err) => {
        if (!err.response && err.error) {
          window.location.reload();
        }
      });

    fetchCommand(`/api/literary-history-favorites`, {
      method: "GET",
      headers: {
        auth: token,
      },
    }).then((res) => {
      if (res.response && res.body.length > 0) {
        setWishlist(res.body);
      }
    });
  }, []);

  const bookClickHandler = (b: IBookItems) => {
    setCurrentBook(b);
    setCurrentBookModal(!currentBookModal);
  };

  const deleteHandler = (e: React.MouseEvent, bookDetailID: number) => {
    if (
      confirm(
        "Are you sure you wish to delete this book from your wishlist?\nYou cannot undo this."
      )
    ) {
      const token = localStorage.getItem("user");

      fetchCommand(`/api/literary-history/${bookDetailID}`, {
        method: "DELETE",
        headers: {
          auth: token,
        },
      })
        .then((res) => {
          if (!res.response) {
            throw res;
          }

          if (res.response) {
            alert("Book was successfully deleted.");
            window.location.reload();
          }
        })
        .catch((err) => {
          alert(err.error);
        });
    }
  };

  return (
    <div className="container">
      <div className="history-container">
        <div>
          <h3>Literary History</h3>
          <button
            className="add-book btn"
            onClick={() => setAddToHistory(!addToHistory)}
          >
            Add Book
          </button>
        </div>
        <div className="grid-container-history">
          <div className="grid-item header"></div>
          <div className="grid-item header">Title</div>
          <div className="grid-item header">Author</div>
          <div className="grid-item header">Rating</div>
          <div className="grid-item header">Favorite</div>
          <div className="grid-item header">Status</div>
        </div>
        {litHistoryBooks.map((b) => (
          <div
            className="grid-container-history"
            key={b.bookDetailID}
            onClick={(e) => bookClickHandler(b)}
          >
            <div className="grid-item">
              <img src={b.smallThumbnail} />
            </div>
            <div className="grid-item title">{b.title}</div>
            <div className="grid-item author">{b.authors}</div>
            <div className="grid-item">{b.bookDetailBookRating}</div>
            <div className="grid-item">
              {b.bookDetailBookFavorite ? "Yes" : "No"}
            </div>
            <div className="grid-item">{b.bookDetailBookStatusLabel}</div>
          </div>
        ))}
      </div>
      {/* ROOM FOR PAGINATION NAVIGATION STUFF */}

      <div className="history-container">
        <div>
          <h3>Wish List</h3>
          <button
            className="add-book btn"
            onClick={() => setAddToWishlist(!addToWishlist)}
          >
            Add Book
          </button>
        </div>
        <div className="grid-container-wishlist">
          <div className="grid-item"></div>
          <div className="grid-item header">Title</div>
          <div className="grid-item header">Author</div>
          <div className="grid-item header"></div>
          <div className="grid-item header"></div>
        </div>

        {wishlist.map((b) => (
          <div className="grid-container-wishlist" key={b.bookDetailID}>
            <div className="grid-item">
              <img src={b.smallThumbnail} />
            </div>
            <div className="grid-item title">{b.title}</div>
            <div className="grid-item author">{b.authors}</div>
            <div className="grid-item button">
              <button
                onClick={() => {
                  setChosenWishlistBook({
                    bookDetailID: b.bookDetailID,
                    title: b.title,
                  });
                  setAddToHistory(true);
                }}
              >
                Edit
              </button>
            </div>
            <div className="grid-item button">
              <button
                onClick={(e) => {
                  deleteHandler(e, b.bookDetailID);
                  console.log(b);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        <Modal open={currentBookModal} onClose={setCurrentBookModal}>
          <LiteraryHistoryBook
            currentBook={currentBook}
            setCurrentBook={setCurrentBook}
            currentBookModal={currentBookModal}
            setCurrentBookModal={setCurrentBookModal}
          />
        </Modal>
        <Modal open={addToHistory} onClose={setAddToHistory}>
          <AddToLiteraryHistory
            addToHistory={addToHistory}
            setAddToHistory={setAddToHistory}
            uid={uid}
            chosenWishlistBook={chosenWishlistBook}
            setChosenWishlistBook={setChosenWishlistBook}
            existingBookID={-1}
          />
        </Modal>
        <Modal open={addToWishlist} onClose={setAddToWishlist}>
          <AddToWishlist
            addToWishlist={addToWishlist}
            setAddToWishlist={setAddToWishlist}
            // uid={uid}
          />
        </Modal>
      </div>
    </div>
  );
};

export default ReadListProfile;

export interface IBookItems {
  userID: number;
  userName: string;
  bookID: number;
  googleBookID: number;
  title: string;
  authors: string;
  pageCount: number;
  description: string;
  publisher: string;
  publishedDate: string;
  thumbnail: string;
  smallThumbnail: string;
  bookDetailID: number;
  bookDetailBookStatus: number;
  bookDetailBookFavorite: number;
  bookDetailBookTimesRead: number;
  bookDetailBookRating: number;
  bookDetailBookNotes: string;
  bookDetailBookStatusLabel: string;
  bookDetailBookStartDate: string;
  bookDetailBookEndDate: string;
  bookDetailBookWishlist?: number;
}

export interface IChosenWishlistBook {
  bookDetailID: number;
  title: string;
}
