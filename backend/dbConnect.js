const { Sequelize, Model, DataTypes } = require("sequelize");
const { Op } = Sequelize;
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
    port: process.env.DB_PORT,
    logging: false,
  }
);

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

const UserBookDetail = sequelize.define(
  "userBookDetails",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bookID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bookRating: DataTypes.FLOAT,
    status: DataTypes.INTEGER,
    favorite: DataTypes.INTEGER,
    timesRead: DataTypes.INTEGER,
    notes: DataTypes.TEXT,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
  },
  {
    timestamps: false,
  }
);

const Book = sequelize.define(
  "books",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    googleBookID: DataTypes.STRING,
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    totalPages: DataTypes.INTEGER,
    summary: DataTypes.TEXT,
    publisher: DataTypes.STRING,
    publishDate: DataTypes.DATE,
    smallThumbNailImage: DataTypes.STRING,
    thumbnailImageLink: DataTypes.STRING,
  },
  { timestamps: false }
);

module.exports = { sequelize, User, UserBookDetail, Book, Op };
