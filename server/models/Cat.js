const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CatSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Укажите имя кота'],
      unique: true,
    },
    age: {
      type: Number,
    },
  },
  { versionKey: false }
);

const Cat = mongoose.model('Cat', CatSchema);

module.exports = Cat;