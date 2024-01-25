const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const RecommendSchema = new Schema(
  {
    movieTitle: String,
    summary: String,
    coverPhoto: String,
    imdb: String,
    author: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const RecommendModel = model("Recommend", RecommendSchema); 

module.exports = RecommendModel; 
