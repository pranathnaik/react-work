const { Schema, model } = require("mongoose");

const schema = Schema({
  username: { type: String, unique: true },
  firstname: { type: String },
  lastname: { type: String },
  country: { type: String },
});
module.exports = model("users", schema);
