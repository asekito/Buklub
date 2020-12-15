import * as React from "react";

interface Props {
  // setAddToHistory: React.SetStateAction<boolean>;
  addToHistory: boolean;
  setAddToHistory: React.Dispatch<boolean>;
}

interface IBookHistory {
  userID: number;
  bookID: number;
  rating: number;
  status: number;
  timesRead: number;
  favorite: number;
  notes?: string;
  startDate?: string;
  endDate?: string;
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

  return (
    <div>
      <h1>Add a book</h1>
    </div>
  );
};

export default AddToLiteraryHistory;
