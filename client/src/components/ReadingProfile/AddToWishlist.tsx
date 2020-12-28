import * as React from "react";
import fetchCommand from "../../../utils/fetching";
import { IBook } from "./AddToLiteraryHistory";
import "../../assets/AddToWishlist.scss";

const AddToWishlist: React.FC<IAddWishlist> = ({
  addToWishlist,
  setAddToWishlist,
}) => {
  const [bookSearch, setBookSearch] = React.useState<string>("");
  const [authorSearch, setAuthorSearch] = React.useState<string>("");
  const [potentialBooks, setPotentialBooks] = React.useState<IBook[]>([]);
  const [bookWish, setBookWish] = React.useState<IBookWish>();

  React.useEffect(() => {
    if (bookSearch.length > 1 || authorSearch.length > 1) {
      const title = encodeURI(bookSearch);
      const author = encodeURI(authorSearch);
      fetchCommand(`/api/book-search/book/?title=${title}&author=${author}`, {
        method: "GET",
      })
        .then(async (res) => {
          if (res.error) {
            throw new Error(res.error);
          }
          await setPotentialBooks(res.body);
        })
        .catch((err) => console.log(err));
    }
  }, [bookSearch]);

  React.useEffect(() => {
    if (bookSearch.length === 0) {
      setPotentialBooks([]);
      setBookSearch("");
    }
  }, [bookSearch]);

  const bookSearchHandler = (e: any) => {
    const { value } = e.target;
    setBookSearch(value);
  };

  const submitHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("user");
    fetchCommand("/api/literary-history", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...bookWish, token: token }),
    }).then((res) => {
      if (res.response) {
        setAddToWishlist(!addToWishlist);
        window.location.reload();
      }
    });
  };

  return (
    <div className="modal add-wishlist">
      <button
        className="exit-modal"
        onClick={(e) => {
          e.preventDefault();
          setAddToWishlist(!addToWishlist);
        }}
      >
        x
      </button>
      <h1>Add to Wishlist</h1>
      <form id="wishlist-add">
        <label htmlFor="book">Book</label>
        <input
          name="book"
          onChange={(e) => bookSearchHandler(e)}
          autoComplete="off"
          id="wish-search"
        />
        <div className="potential-books">
          {potentialBooks.length > 0 ? (
            <ul>
              {potentialBooks.map((b, i) => (
                <li
                  key={b.id}
                  onClick={(e: React.MouseEvent) => {
                    setBookWish({
                      title: b.title,
                      authors: b.authors,
                      bookID: b.id,
                      wishlist: 1,
                    });
                    setPotentialBooks([]);
                    setBookSearch("");
                    (document.getElementById(
                      "wish-search"
                    ) as HTMLFormElement).value = b.title;
                  }}
                >
                  <button type="button">{`${b.title} By ${b.authors}`}</button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <input type="submit" onClick={(e) => submitHandler(e)} />
      </form>
    </div>
  );
};

export default AddToWishlist;

interface IAddWishlist {
  addToWishlist: boolean;
  setAddToWishlist: React.Dispatch<boolean>;
}

interface IBookWish {
  bookID: number;
  title: string;
  authors: string | [];
  wishlist: number;
}
