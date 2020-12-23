import * as React from "react";
import fetchCommand from "../../../utils/fetching";

interface IAddWishlist {
  addToWishlist: boolean;
  setAddToWishlist: React.Dispatch<boolean>;
}

interface IWishlistBook {
  title: string;
  authors: string;
}

const AddToWishlist: React.FC<IAddWishlist> = () => {
  const [wishlist, setWishlist] = React.useState();
  return (
    <div>
      <h1>Add to Wishlist</h1>
    </div>
  );
};

export default AddToWishlist;
