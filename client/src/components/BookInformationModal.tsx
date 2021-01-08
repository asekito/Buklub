import * as React from "react";
import { IBookItems } from "./ReadingProfile/ReadListProfile";

const BookInformationModal: React.FC<IProps> = ({
  currentBookModal,
  setCurrentBookmodal,
}) => {
  return (
    <div className="modal">
      <button
        className="exit-modal"
        onClick={() => setCurrentBookmodal(!currentBookModal)}
      >
        x
      </button>
      <h1>Modal here</h1>
    </div>
  );
};

export default BookInformationModal;

interface IProps {
  currentBookModal: boolean;
  setCurrentBookmodal: React.Dispatch<boolean>;
}
