import * as React from "react";
import fetchCommand from "../../../utils/fetching";
import { IBook } from "./AddToLiteraryHistory";

const AddToWishlist: React.FC<IAddWishlist> = () => {
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

  return (
    <div>
      <h1>Add to Wishlist</h1>
      <form id="wishlist-add">
        <label htmlFor="book">Book</label>
        <input
          name="book"
          onChange={(e) => bookSearchHandler(e)}
          autoComplete="off"
        />
        <div>
          {potentialBooks.length > 0 ? (
            <ul>
              {potentialBooks.map((b, i) => (
                <li
                  key={b.id}
                  onClick={() =>
                    setBookWish({
                      title: b.title,
                      authors: b.authors,
                      bookID: b.id,
                    })
                  }
                >
                  <button type="button">{b.title}</button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
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
}
