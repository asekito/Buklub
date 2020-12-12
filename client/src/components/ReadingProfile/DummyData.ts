export const dummyDataBookHistory = [
  {
    Title: "The Great Gatsby",
    Author: "F. Scott Fitzgerald",
    Rating: "N/A", // -1
    Status: "Abandoned", // make into integer value in
    Favorite: 0,
    Reads: 0,
  },
  {
    Title: "Minor Feelings",
    Author: "Cathy Diep",
    Rating: "9.6",
    Status: "Completed",
    Favorite: 1,
    Reads: 1,
  },
  {
    Title: "The Odyssey",
    Author: "Homer",
    Rating: "8.2",
    Status: "In-Progress (Re-read)",
    Favorite: 1,
    Reads: 2,
  },
  {
    Title: "The Handmaid's Tale",
    Author: "Margaret Atwood",
    Rating: "N/A", // -1 in database
    Status: "Abandoned",
    Favorite: 0,
    Reads: 0,
  },
];

export const dummyDataBookWishList = [
  { Title: "Ornamentalism", Author: "Anne Anlin Cheng" },
  { Title: "2666", Author: "Roberto Bolaño" },
  { Title: "All About Love", Author: "Bell Hooks" },
  { Title: "Desert Solitaire", Author: "Edward Abbey" },
];

//2

// book
// {
//   id,
//   title,
//   author,
//   totalPages
// }

// user
// {
//   id,
//   userName,
//   firstName,
//   lastName,
//   password
// }

// userBookDetail
// {
//   id,
//   userID,
//   bookID,
//   rating,
//   status,
//   favorite,
//   timesRead,
// }
