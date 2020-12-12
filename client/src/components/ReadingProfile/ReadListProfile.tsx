import * as React from "react";
import { dummyDataBookWishList, dummyDataBookHistory } from "./DummyData";

const ReadListProfile = () => {
  // just grab top 10 of database for this page
  // rest in a paginated page with all info

  return (
    <div>
      <h1>Read List</h1>
      <div>
        <h3>Literary History</h3>
        <table>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Rating</th>
            <th>Status</th>
            <th>Number of completed reads</th>
          </tr>
          {dummyDataBookHistory.map((book) => (
            <tr>
              <td>{book.Title}</td>
              <td>{book.Author}</td>
              <td>{book.Rating}</td>
              <td>{book.Status}</td>
              <td>{book.Reads}</td>
            </tr>
          ))}
        </table>
        <button>Add Book</button>
      </div>
      <div>
        <h3>Wish List</h3>
        <table>
          <tr>
            <th>Title</th>
            <th>Author</th>
          </tr>
          {dummyDataBookWishList.map((book) => (
            <tr>
              <td>{book.Title}</td>
              <td>{book.Author}</td>
            </tr>
          ))}
        </table>
        <button>Add Book</button>
      </div>
      <div>
        <h3>Favorites</h3>
        <table>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Rating</th>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default ReadListProfile;
