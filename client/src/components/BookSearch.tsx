import * as React from "react";
import fetchCommand from "../../utils/fetching";

const BookSearch = () => {
  // remember to encode the params yo
  const [search, setSearch] = React.useState({
    title: "",
    author: "",
  });
  const [searchResult, setSearchResult] = React.useState([]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setSearch({ ...search, [name]: value });
  };

  const clickHandler = (e: React.MouseEvent, searchItems: search) => {
    e.preventDefault();
    const { title, author } = searchItems;
    if (title.length === 0 && author.length === 0) {
      return alert("Please fill in one or more of the search fields.");
    }
    const titleEncoded = encodeURI(title);
    const authorEncoded = encodeURI(author);
    fetchCommand(
      `/api/book-search/book?title=${titleEncoded}&author=${authorEncoded}`,
      { method: "GET" }
    )
      .then((data) => {
        if (data.error) {
          throw data.error;
        }
        setSearchResult(data.body);
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <h1>Book Search</h1>
      <form name="pageSearch">
        <label htmlFor="bookSearch">Title</label>
        <input
          type="text"
          placeholder="Book Title"
          name="title"
          onChange={(e) => changeHandler(e)}
        />
        <label htmlFor="authorSearch">Author</label>
        <input
          type="text"
          placeholder="Book Author"
          name="author"
          onChange={(e) => changeHandler(e)}
        />
        <input
          type="submit"
          value="search"
          onClick={(e) => clickHandler(e, search)}
        />
      </form>
      {searchResult.length > 0 ? (
        <div>
          <table>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Total Pages</th>
            </tr>
            {searchResult.map((data: BookFromDb) => (
              <tr>
                <td>{data.title}</td>
                <td>{data.author}</td>
                <td>{data.totalPages > 0 ? data.totalPages : "Unknown"}</td>
              </tr>
            ))}
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default BookSearch;

type search = {
  title: string;
  author: string;
};

interface BookFromDb {
  id: number;
  googleBookID: string;
  title: string;
  author: string;
  publishDate: string;
  publisher: string;
  smallThumbNailImage: string;
  summary: string;
  thumbnailImageLink: string;
  totalPages: number;
}
