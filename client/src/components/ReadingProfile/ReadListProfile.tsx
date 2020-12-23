import * as React from "react";
import { dummyDataBookWishList, dummyDataBookHistory } from "./DummyData";
import fetchCommand from "../../../utils/fetching";
import authCheck from "../../../utils/token-check";
import { useHistory } from "react-router-dom";
const AddToLiteraryHistory = React.lazy(() => import("./AddToLiteraryHistory"));
// import AddToLiteraryHistory from "./AddToLiteraryHistory";
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
  bookDetailBookStartDate: string;
  bookDetailBookEndDate: string;
}

const ReadListProfile: React.FC = () => {
  // just grab top 10 of database for this page
  // rest in a paginated page with all info
  const [litHistoryBooks, setLitHistoryBooks] = React.useState<IBookItems[]>(
    []
  );
  const [addToHistory, setAddToHistory] = React.useState<boolean>(false);
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
  }, []);

  return (
    <div>
      <h1 onClick={() => console.log(litHistoryBooks)}>Read List</h1>
      <div>
        <h3>Literary History</h3>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Number of completed reads</th>
            </tr>
          </thead>
          <tbody>
            {dummyDataBookHistory.map((book) => (
              <tr>
                <td>{book.Title}</td>
                <td>{book.Author}</td>
                <td>{book.Rating}</td>
                <td>{book.Status}</td>
                <td>{book.Reads}</td>
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
            {dummyDataBookWishList.map((book) => (
              <tr>
                <td>{book.Title}</td>
                <td>{book.Author}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button>Add Book</button>
      </div>
      <div>
        <h3>Favorites</h3>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Rating</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};

export default ReadListProfile;
