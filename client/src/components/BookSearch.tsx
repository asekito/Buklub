import * as React from "react";
import fetchCommand from "../../utils/fetching";
import "../assets/BookSearch.scss";

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
    <div className="container">
      <h1>Book Search</h1>
      <form name="pageSearch" className="book-search-form">
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
          <div className="grid-container-search">
            <div className="grid-item header"></div>
            <div className="grid-item header">Title</div>
            <div className="grid-item header">Author</div>
            <div className="grid-item header">Description</div>
            {/* <div className="grid-item header">Total Pages</div> */}
            <div className="grid-item header">Publisher</div>
            {/* <div className="grid-item header">Published Date</div> */}
          </div>
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
              <div className="grid-container-search">
                <img src={link} alt="book image" />
                <div className="grid-item">{data.title}</div>
                <div className="grid-item">{data.authors}</div>
                <div className="grid-item description">
                  {data.description ? data.description : ""}
                </div>
                {/* <div className="grid-item">
                  {data.pageCount > 0 ? data.pageCount : "Unknown"}
                </div> */}
                <div className="grid-item">
                  {data.publisher ? data.publisher : "Unknown"}
                </div>
                {/* <div className="grid-item">
                  {data.publishedDate ? data.publishedDate : "Unknown"}
                </div> */}
              </div>
            );
          })}
        </div>
      ) : null}
      {/*
        Modal here
      */}
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
