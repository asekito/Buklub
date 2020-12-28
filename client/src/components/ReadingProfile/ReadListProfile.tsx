import * as React from "react";
import fetchCommand from "../../../utils/fetching";
import authCheck from "../../../utils/token-check";
import { useHistory } from "react-router-dom";
const AddToLiteraryHistory = React.lazy(() => import("./AddToLiteraryHistory"));
const AddToWishlist = React.lazy(() => import("./AddToWishlist"));
import "../../assets/ReadListProfile.scss";
import Modal from "@material-ui/core/Modal";

const ReadListProfile: React.FC = () => {
  // just grab top 10 of database for this page
  // rest in a paginated page with all info
  const [litHistoryBooks, setLitHistoryBooks] = React.useState<IBookItems[]>(
    []
  );
  const [wishlist, setWishlist] = React.useState<IBookItems[]>([]);
  const [addToHistory, setAddToHistory] = React.useState<boolean>(false);
  const [addToWishlist, setAddToWishlist] = React.useState<boolean>(false);
  const [uid, setUid] = React.useState<number>(-1);
  const history = useHistory();

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
    }).then((res) => {
      if (res.response && res.body.length > 0) {
        setLitHistoryBooks(res.body);
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

  return (
    <div className="container">
      {/* <h1>Read List</h1> */}
      <div>
        <div>
          <h3>Literary History</h3>
          <button onClick={() => setAddToHistory(!addToHistory)}>
            Add Book
          </button>
        </div>
        <div className="grid-container-history">
          <div className="grid-item header">Title</div>
          <div className="grid-item header">Author</div>
          <div className="grid-item header">Rating</div>
          <div className="grid-item header">Favorite</div>
          <div className="grid-item header">Times Read</div>
          <div className="grid-item header">Status</div>
        </div>
        {litHistoryBooks.map((b) => (
          <div className="grid-container-history" key={b.bookDetailID}>
            <div className="grid-item title">{b.title}</div>
            <div className="grid-item">{b.authors}</div>
            <div className="grid-item">{b.bookDetailBookRating}</div>
            <div className="grid-item">
              {b.bookDetailBookFavorite ? "Yes" : "No"}
            </div>
            <div className="grid-item">{b.bookDetailBookTimesRead}</div>
            <div className="grid-item">{b.bookDetailBookStatusLabel}</div>
          </div>
        ))}
        {/* {addToHistory ? (
          <AddToLiteraryHistory
            addToHistory={addToHistory}
            setAddToHistory={setAddToHistory}
            uid={uid}
          />
        ) : null} */}
        <Modal open={addToHistory} onClose={setAddToHistory}>
          <AddToLiteraryHistory
            addToHistory={addToHistory}
            setAddToHistory={setAddToHistory}
            uid={uid}
          />
        </Modal>
      </div>
      <div>
        <div>
          <h3>Wish List</h3>
          <button onClick={() => setAddToWishlist(!addToWishlist)}>
            Add Book
          </button>
        </div>
        <div className="grid-container-wishlist">
          <div className="grid-item">Title</div>
          <div className="grid-item">Author</div>
        </div>

        {wishlist.map((b) => (
          <div className="grid-container-wishlist" key={b.bookDetailID}>
            <div className="grid-item">{b.title}</div>
            <div className="grid-item">{b.authors}</div>
          </div>
        ))}

        {addToWishlist ? (
          <AddToWishlist
            addToWishlist={addToWishlist}
            setAddToWishlist={setAddToWishlist}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ReadListProfile;

interface IBookItems {
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
}
