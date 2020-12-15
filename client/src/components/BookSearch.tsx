import * as React from "react";
import fetchCommand from "../../utils/fetching";

const BookSearch = () => {
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
      `/api/book-search/book?title=${titleEncoded}&author=${
        authorEncoded || ""
      }`,
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
          autoComplete="off"
          onChange={(e) => changeHandler(e)}
        />
        <label htmlFor="authorSearch">Author</label>
        <input
          type="text"
          placeholder="Book Author"
          name="author"
          autoComplete="off"
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
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Author</th>
                <th>Description</th>
                <th>Total Pages</th>
                <th>Publisher</th>
                <th>Published Date</th>
              </tr>
            </thead>
            <tbody>
              {searchResult.map((data: BookFromDb) => {
                let smallLink = "";
                let link = "";

                if (data.imageLinks) {
                  smallLink = data.imageLinks.smallThumbnail;
                  link = data.imageLinks.thumbnail;
                } else {
                  smallLink = data.smallThumbnail;
                  link = data.thumbnail;
                }
                return (
                  <tr>
                    <img src={link} alt="book-image" />
                    <td>{data.title}</td>
                    <td>{data.authors}</td>
                    <td>{data.description ? data.description : ""}</td>
                    <td>{data.pageCount > 0 ? data.pageCount : "Unknown"}</td>
                    <td>{data.publisher ? data.publisher : "Unknown"}</td>
                    <td>
                      {data.publishedDate ? data.publishedDate : "Unknown"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
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
  authors: string;
  publishedDate: string;
  publisher: string;
  smallThumbnail: string;
  description: string;
  thumbnail: string;
  pageCount: number;
  imageLinks?: { smallThumbnail: string; thumbnail: string };
}