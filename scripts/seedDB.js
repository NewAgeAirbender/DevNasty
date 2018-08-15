const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Quotes collection and inserts the quotes below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/femdevonly_db"
);

const quoteSeed = [
  {
    content: "You're really cute for an engineer",
    votes: 0,
    isAppropriate: true
  },
  {
    content: "Wow! You're pretty good at this for a woman!",
    votes: 0,
    isAppropriate: true
  },
  {
    content: "You know, that happens to men too",
    votes: 0,
    isAppropriate: true
  },
  {
    content: "Can you show me where the developers work?",
    votes: 0,
    isAppropriate: true
  },
  {
    content: "Most girls aren’t into this kind of stuff.",
    votes: 0,
    isAppropriate: true
  },
  {
    content: "You got it! Clever girl!",
    votes: 0,
    isAppropriate:true 
  },
  {
    content: "It’s not ‘P.C.’ to say this, but…",
    votes: 0,
    isAppropriate:true 
  },
  {
    content: "No, when I complain about ‘geek girls,’ I don’t mean you. You’re a real geek.",
    votes: 0,
    isAppropriate:true 
  },
  {
    content: "You’re a girl, but you’re not, like, a girl-girl, y’know?",
    votes: 0,
    isAppropriate:true 
  }
];

db.Quote
  .remove({})
  .then(() => db.Quote.collection.insertMany(quoteSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
