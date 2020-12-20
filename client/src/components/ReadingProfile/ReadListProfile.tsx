import * as React from "react";
import { dummyDataBookWishList, dummyDataBookHistory } from "./DummyData";
const AddToLiteraryHistory = React.lazy(() => import("./AddToLiteraryHistory"));
// import AddToLiteraryHistory from "./AddToLiteraryHistory";

// interface

const ReadListProfile: React.FC = () => {
  // just grab top 10 of database for this page
  // rest in a paginated page with all info
  const [addToHistory, setAddToHistory] = React.useState<boolean>(true);

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
