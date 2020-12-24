import * as React from "react";
import { dummyDataBookWishList } from "./DummyData";
import fetchCommand from "../../../utils/fetching";
import authCheck from "../../../utils/token-check";
import { useHistory } from "react-router-dom";
const AddToLiteraryHistory = React.lazy(() => import("./AddToLiteraryHistory"));
const AddToWishlist = React.lazy(() => import("./AddToWishlist"));

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
    <div>
      <h1>Read List</h1>
      <div>
        <h3>Literary History</h3>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Rating</th>
              <th>Favorite</th>
              <th>Times Read</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {litHistoryBooks.map((b) => (
              <tr key={b.bookDetailID}>
                <td>{b.title}</td>
                <td>{b.authors}</td>
                <td>{b.bookDetailBookRating}</td>
                <td>{b.bookDetailBookFavorite ? "Yes" : "No"}</td>
                <td>{b.bookDetailBookTimesRead}</td>
                <td>{b.bookDetailBookStatusLabel}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => setAddToHistory(!addToHistory)}>Add Book</button>
        {addToHistory ? (
          <AddToLiteraryHistory
            addToHistory={addToHistory}
            setAddToHistory={setAddToHistory}
            uid={uid}
          />
        ) : null}
      </div>
      <div>
        <h3>Wish List</h3>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            {wishlist.map((b) => (
              <tr key={b.bookDetailID}>
                <td>{b.title}</td>
                <td>{b.authors}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => setAddToWishlist(!addToWishlist)}>
          Add Book
        </button>
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
