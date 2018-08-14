const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quoteSchema = new Schema({
  content: { type: String, required: true },
  votes: { type: Number, default: 0 },
  isAppropriate: { type: Boolean, default: true }
});

const Quote = mongoose.model("Quote", quoteSchema);

module.exports = Quote;
