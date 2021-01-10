import * as React from "react";
import fetchCommand from "../../utils/fetching";
import "../assets/BookSearch.scss";
import Modal from "@material-ui/core/Modal";
import authCheck from "../../utils/token-check";
import { useHistory } from "react-router-dom";
const BookInformationModal = React.lazy(() => import("./BookInformationModal"));

const BookSearch = () => {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState({
    title: "",
    author: "",
  });
  const [searchResult, setSearchResult] = React.useState([]);
  const [currentBookModal, setCurrentBookModal] = React.useState<boolean>(
    false
  );
  const [currentBook, setCurrentBook] = React.useState<BookFromDb>({
    id: 0,
    googleBookID: "",
    title: "",
    authors: "",
    publishedDate: "",
    publisher: "",
    smallThumbnail: "",
    description: "",
    thumbnail: "",
    pageCount: 0,
    imageLinks: { smallThumbnail: "", thumbnail: "" },
  });

  React.useEffect(() => {
    const token = localStorage.getItem("user")
      ? localStorage.getItem("user")
      : null;
    fetchCommand("/api/auth-check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token }),
    }).then((res) => {
      if (res.response && res.uid) {
        setLoggedIn(true);
      }

      if (res.error && res.error.name === "JsonWebTokenError") {
        setLoggedIn(false);
      }
    });
  }, []);

  // React.useEffect(() => {
  //   const token = localStorage.getItem("user")
  //     ? localStorage.getItem("user")
  //     : null;

  //   fetchCommand("/api/auth-check", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ token: token }),
  // }).then((res) => {
  //   console.log(res, "hi");
  //   if (res.response && res.uid) {
  //     setLoggedIn(true);
  //   }

  //   if (res.error && res.error.name === "JsonWebTokenError") {
  //     setLoggedIn(false);
  //   }
  // });
  // }, []);

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
            console.log(data);
            // if (data.imageLinks) {
            //   smallLink = data.imageLinks.smallThumbnail;
            //   link = data.imageLinks.thumbnail;
            // } else {
            //   smallLink = data.smallThumbnail;
            //   link = data.thumbnail;
            // }
            return (
              <div
                className="grid-container-search"
                onClick={() => {
                  setCurrentBookModal(!currentBookModal);
                  setCurrentBook(data);
                }}
              >
                <img src={data.smallThumbnail} alt="book image" />
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
      <Modal open={currentBookModal} onClose={setCurrentBookModal}>
        <BookInformationModal
          currentBookModal={currentBookModal}
          setCurrentBookmodal={setCurrentBookModal}
          currentBook={currentBook}
          loggedIn={loggedIn}
        />
      </Modal>
    </div>
  );
};

export default BookSearch;

type search = {
  title: string;
  author: string;
};

export interface BookFromDb {
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
