import * as React from "react";
import fetchCommand from "../../../utils/fetching";
// import { TextField } from "@material-ui/core";
// import { Autocomplete } from "@material-ui/lab";

interface Props {
  addToHistory: boolean;
  setAddToHistory: React.Dispatch<boolean>;
}

interface IBookHistory {
  userID: number;
  bookID: number | string;
  rating: number;
  status: number;
  timesRead: number;
  favorite: number;
  notes?: string;
  startDate?: string;
  endDate?: string;
}

interface IBook {
  id: number;
  title: string;
  authors: string | [];
  description: string;
  googleBookID: string;
  pageCount: number;
  publishedDate: string;
  publisher: string;
  smallThumbnail: string;
  thumbnail: string;
}

const AddToLiteraryHistory: React.FC<Props> = ({
  addToHistory,
  setAddToHistory,
}) => {
  const [
    literaryHistoryBook,
    setLiteraryHistoryBook,
  ] = React.useState<IBookHistory>({
    userID: 0,
    bookID: 0,
    rating: 0,
    status: 0,
    timesRead: 0,
    favorite: 0,
    notes: "",
    startDate: "",
    endDate: "",
  });

  const [bookSearch, setBookSearch] = React.useState<string>("");
  const [authorSearch, setAuthorSearch] = React.useState<string>("");
  const [potentialBooks, setPotentialBooks] = React.useState([]);

  const changeHandler = (e: any) => {
    const { name, value } = e.target;
    setLiteraryHistoryBook({ ...literaryHistoryBook, [name]: value });
  };

  const bookSearchHandler = (e: any) => {
    const { value } = e.target;
    setBookSearch(value);
  };

  const submitHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(bookSearch);
  };

  // material ui in the future for the drop down!!!
  React.useEffect(() => {
    if (bookSearch.length > 1 || authorSearch.length > 1) {
      // const abortController = new AbortController();
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
      // abortController.abort();
      console.log(potentialBooks);
    }
  }, [bookSearch]);

  React.useEffect(() => {
    if (bookSearch.length === 0) {
      setPotentialBooks([]);
      setBookSearch("");
    }
  }, [bookSearch]);

  return (
    <div>
      <h1>Add a book</h1>
      <form id="book-add">
        <label htmlFor="book">Book</label>
        {/* <Autocomplete
          freeSolo
          // options={potentialBooks.map((b: IBook) => b.title)}
          options={potentialBooks}
          renderOption={(option: IBook) => option.title}
          getOptionLabel={(option: IBook) => option.title}
          noOptionsText={"Nothing"}
          onChange={(e, val: IBook) => {
            if (val.id) {
              setLiteraryHistoryBook({
                ...literaryHistoryBook,
                bookID: val.id,
              });
            }
          }}
          onInputChange={(e, inputVal) => setBookSearch(inputVal)}
          renderInput={(params) => (
            <TextField {...params} label="Search for a book" name="book" />
          )}
        /> */}

        <input
          name="book"
          onChange={(e) => setBookSearch(e.target.value)}
          autoComplete="off"
        />
        <div>
          {potentialBooks.length > 0 ? (
            <ul>
              {potentialBooks.map((b: IBook, i) => (
                <li
                  key={b.id}
                  onClick={() =>
                    setLiteraryHistoryBook({
                      ...literaryHistoryBook,
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

        <label htmlFor="status">Status</label>
        <select
          name="status"
          value={literaryHistoryBook.status}
          onChange={(e) => changeHandler(e)}
        >
          <option value="0">In-Progress</option>
          <option value="1">Completed</option>
          <option value="2">Abandoned</option>
          <option value="3">On Hold</option>
        </select>

        <p>Rating</p>
        <label htmlFor="rating">0</label>
        <input
          type="radio"
          name="rating"
          value="0"
          onChange={(e) => changeHandler(e)}
        />
        <label htmlFor="rating">1</label>
        <input
          type="radio"
          name="rating"
          value="1"
          onChange={(e) => changeHandler(e)}
        />
        <label htmlFor="rating">2</label>
        <input
          type="radio"
          name="rating"
          value="2"
          onChange={(e) => changeHandler(e)}
        />
        <label htmlFor="rating">3</label>
        <input
          type="radio"
          name="rating"
          value="3"
          onChange={(e) => changeHandler(e)}
        />
        <label htmlFor="rating">4</label>
        <input
          type="radio"
          name="rating"
          value="4"
          onChange={(e) => changeHandler(e)}
        />
        <label htmlFor="rating">5</label>
        <input
          type="radio"
          name="rating"
          value="5"
          onChange={(e) => changeHandler(e)}
        />
        <label htmlFor="rating">6</label>
        <input
          type="radio"
          name="rating"
          value="6"
          onChange={(e) => changeHandler(e)}
        />
        <label htmlFor="rating">7</label>
        <input
          type="radio"
          name="rating"
          value="7"
          onChange={(e) => changeHandler(e)}
        />
        <label htmlFor="rating">8</label>
        <input
          type="radio"
          name="rating"
          value="8"
          onChange={(e) => changeHandler(e)}
        />
        <label htmlFor="rating">9</label>
        <input
          type="radio"
          name="rating"
          value="9"
          onChange={(e) => changeHandler(e)}
        />
        <label htmlFor="rating">10</label>
        <input
          type="radio"
          name="rating"
          value="10"
          onChange={(e) => changeHandler(e)}
        />

        <label htmlFor="timesRead">Times read</label>
        <input
          type="number"
          name="timesRead"
          autoComplete="off"
          onChange={(e) => changeHandler(e)}
        />

        <label htmlFor="favorite">One of your favorites?</label>
        <select name="favorite" onChange={(e) => changeHandler(e)}>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>
        <div>
          <label htmlFor="notes"></label>
          <textarea
            name="notes"
            cols={50}
            rows={10}
            form="book-add"
            placeholder="Notes"
            onChange={(e) => changeHandler(e)}
          />
        </div>
        <label htmlFor="startDate">Start Date</label>
        <input
          type="date"
          name="startDate"
          onChange={(e) => changeHandler(e)}
        />

        <label htmlFor="endDate">End Date</label>
        <input type="date" name="endDate" onChange={(e) => changeHandler(e)} />

        <input
          type="submit"
          value="Add Book"
          onClick={(e) => submitHandler(e)}
        />
      </form>
    </div>
  );
};

export default AddToLiteraryHistory;
