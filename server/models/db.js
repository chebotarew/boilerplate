const mongoose = require("mongoose");
module.exports.models = {
    Cat: require("./Cat"),   
  };

const db = {
 
  findAll: (Model, populate) => {
    if (populate) {
      return Model.find().populate(populate);
    }
    return Model.find();
  },
  findById: (Model, id) => {
    return Model.findById(id);
  },
  findByProp: (prop, Model) => {
    return Model.findOne(prop);
  },
  create: ( Model, data) => {
    const item = new Model();
    for (var key in data) {
      item[key] = data[key];
    }
    return item.save({ new: true });
  },
  update: ( Model, id, data) => {
    return Model.findOneAndUpdate(id, data);
  },
  updateByProp: (prop, data, Model) => {
    return Model.findOneAndUpdate(prop, data, { new: true });
  },
  delete: ( Model, id) => {
    return Model.findOneAndRemove(id);
  },
  removeByProp: (prop, Model) => {
    return Model.findOneAndRemove(prop);
  }
};

module.exports.db = db;
